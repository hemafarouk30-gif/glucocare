import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type GlucoseLog as BackendLog, createActor } from "../backend";
import type {
  GlucoseContext,
  GlucoseLog,
  GlucoseLogInput,
  GlucoseSummary,
} from "../types/glucose";

const CTX_PREFIX = "[CTX:";
const CTX_SUFFIX = "]";

/** Encode context into the notes string so it survives the backend round-trip. */
function encodeContext(
  context: GlucoseContext,
  notes: string | undefined,
): string | undefined {
  const tag = `${CTX_PREFIX}${context}${CTX_SUFFIX}`;
  if (!notes) return tag;
  return `${tag} ${notes}`;
}

/** Extract context from notes (default "random" if absent). Strip the tag from display notes. */
function decodeContext(notes: string | undefined): {
  context: GlucoseContext;
  notes: string | undefined;
} {
  if (!notes) return { context: "random", notes: undefined };
  const start = notes.indexOf(CTX_PREFIX);
  if (start === -1) return { context: "random", notes: notes || undefined };
  const end = notes.indexOf(CTX_SUFFIX, start + CTX_PREFIX.length);
  if (end === -1) return { context: "random", notes: notes || undefined };
  const tag = notes.slice(start + CTX_PREFIX.length, end) as GlucoseContext;
  const remaining = notes.slice(end + CTX_SUFFIX.length).trim();
  return { context: tag, notes: remaining || undefined };
}

function adaptLog(b: BackendLog): GlucoseLog {
  const rawNotes = b.notes ?? undefined;
  const { context, notes } = decodeContext(rawNotes);
  return {
    id: String(b.id),
    value: Number(b.value),
    // Backend stores timestamps in nanoseconds; convert to milliseconds
    timestamp: Number(b.timestamp) / 1_000_000,
    context,
    notes,
  };
}

export function useGlucoseLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GlucoseLog[]>({
    queryKey: ["glucoseLogs"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getGlucoseLogs();
      return raw.map(adaptLog).sort((a, b) => b.timestamp - a.timestamp);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGlucoseSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GlucoseSummary>({
    queryKey: ["glucoseSummary"],
    queryFn: async (): Promise<GlucoseSummary> => {
      if (!actor) {
        return {
          average7Day: null,
          average30Day: null,
          lastReading: null,
          inRangePercent7Day: null,
          highCount7Day: 0,
          lowCount7Day: 0,
          high7DayValue: null,
          low7DayValue: null,
        };
      }
      const raw = await actor.getGlucoseSummary();
      const lastReading = raw.lastReading ? adaptLog(raw.lastReading) : null;
      const average7Day =
        raw.avgLast7Days != null ? Math.round(raw.avgLast7Days) : null;
      const high7DayValue =
        raw.highLast7Days != null ? Number(raw.highLast7Days) : null;
      const low7DayValue =
        raw.lowLast7Days != null ? Number(raw.lowLast7Days) : null;

      return {
        average7Day,
        average30Day: null,
        lastReading,
        inRangePercent7Day: null,
        high7DayValue,
        low7DayValue,
        highCount7Day: 0,
        lowCount7Day: 0,
      };
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGlucoseLog() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: GlucoseLogInput): Promise<void> => {
      if (!actor) throw new Error("Not connected");
      const nowNs = BigInt(Date.now()) * 1_000_000n;
      const timestamp = input.timestamp
        ? BigInt(input.timestamp) * 1_000_000n
        : nowNs;
      const encodedNotes = encodeContext(
        input.context,
        input.notes?.trim() || undefined,
      );
      await actor.addGlucoseLog({
        value: BigInt(Math.round(input.value)),
        timestamp,
        notes: encodedNotes,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["glucoseLogs"] });
      qc.invalidateQueries({ queryKey: ["glucoseSummary"] });
    },
  });
}

export function useDeleteGlucoseLog() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteGlucoseLog(BigInt(id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["glucoseLogs"] });
      qc.invalidateQueries({ queryKey: ["glucoseSummary"] });
    },
  });
}
