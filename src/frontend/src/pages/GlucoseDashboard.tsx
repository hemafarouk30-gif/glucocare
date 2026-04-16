import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { LoginPrompt } from "../components/LoginPrompt";
import {
  useAddGlucoseLog,
  useDeleteGlucoseLog,
  useGlucoseLogs,
  useGlucoseSummary,
} from "../hooks/useGlucose";
import {
  CONTEXT_LABELS,
  GLUCOSE_RANGE_LABELS,
  type GlucoseContext,
  type GlucoseRange,
  classifyGlucose,
} from "../types/glucose";

// Static design-token-aligned color map for Recharts (oklch sRGB strings)
const CHART_COLORS = {
  line: "oklch(0.58 0.15 166)", // primary teal-green
  outOfRange: "oklch(0.62 0.19 24)", // coral-red for high/low readings
  reference: "oklch(0.62 0.19 24)", // coral-red for range boundaries
  grid: "oklch(0.90 0.01 0)", // subtle neutral grid
  axis: "oklch(0.48 0.01 0)", // muted axis labels
} as const;

const RANGE_BADGE_VARIANT: Record<
  GlucoseRange,
  "default" | "secondary" | "destructive" | "outline"
> = {
  low: "destructive",
  in_range: "default",
  high: "secondary",
  very_high: "destructive",
};

function GlucoseRangeBadge({ value }: { value: number }) {
  const range = classifyGlucose(value, "random");
  return (
    <Badge variant={RANGE_BADGE_VARIANT[range]} className="text-xs">
      {range === "in_range" && <span className="mr-1">●</span>}
      {GLUCOSE_RANGE_LABELS[range]}
    </Badge>
  );
}

export function GlucoseDashboardPage() {
  const { isAuthenticated } = useInternetIdentity();

  const { data: logs, isLoading: logsLoading } = useGlucoseLogs();
  const { data: summary, isLoading: summaryLoading } = useGlucoseSummary();
  const addLog = useAddGlucoseLog();
  const deleteLog = useDeleteGlucoseLog();

  const [value, setValue] = useState("");
  const [context, setContext] = useState<GlucoseContext>("fasting");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  const handleAdd = () => {
    const num = Number(value);
    if (!value || Number.isNaN(num) || num < 20 || num > 600) {
      toast.error("Please enter a valid glucose value (20–600 mg/dL)");
      return;
    }
    const timestamp = dateTime ? new Date(dateTime).getTime() : undefined;
    addLog.mutate(
      { value: num, context, notes: notes || undefined, timestamp },
      {
        onSuccess: () => {
          toast.success("Reading logged successfully");
          setValue("");
          setDateTime("");
          setNotes("");
        },
        onError: () => {
          toast.error("Failed to save reading. Please try again.");
        },
      },
    );
  };

  // Prepare chart data from last 14 entries (reversed to oldest→newest)
  const chartData = [...(logs ?? [])]
    .slice(0, 14)
    .reverse()
    .map((log) => ({
      date: format(new Date(log.timestamp), "MMM d"),
      value: log.value,
      range: classifyGlucose(log.value, log.context),
    }));

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-6 space-y-6"
      data-ocid="dashboard.page"
    >
      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Last reading */}
        <Card
          className="elevation-soft"
          data-ocid="dashboard.last_reading_card"
        >
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton
                className="h-10 w-32"
                data-ocid="dashboard.last_reading.loading_state"
              />
            ) : summary?.lastReading ? (
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-foreground">
                    {summary.lastReading.value}
                  </span>
                  <span className="text-sm text-muted-foreground">mg/dL</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlucoseRangeBadge value={summary.lastReading.value} />
                  <span className="text-xs text-muted-foreground">
                    {format(
                      new Date(summary.lastReading.timestamp),
                      "h:mm a, MMM d",
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No readings yet</p>
            )}
          </CardContent>
        </Card>

        {/* 7-day average */}
        <Card className="elevation-soft" data-ocid="dashboard.avg7_card">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              7-Day Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton
                className="h-10 w-24"
                data-ocid="dashboard.avg7.loading_state"
              />
            ) : (
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-foreground">
                    {summary?.average7Day ?? "—"}
                  </span>
                  {summary?.average7Day != null && (
                    <span className="text-sm text-muted-foreground">mg/dL</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Comparison to week
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 7-day High / Low */}
        <Card className="elevation-soft" data-ocid="dashboard.high_low_card">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              7-Day Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton
                className="h-10 w-20"
                data-ocid="dashboard.high_low.loading_state"
              />
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <ArrowUp className="w-3.5 h-3.5 text-destructive" />
                  <span className="font-mono font-bold text-lg text-foreground">
                    {summary?.high7DayValue ?? "—"}
                  </span>
                  {summary?.high7DayValue != null && (
                    <span className="text-xs text-muted-foreground">
                      mg/dL high
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowDown className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono font-bold text-lg text-foreground">
                    {summary?.low7DayValue ?? "—"}
                  </span>
                  {summary?.low7DayValue != null && (
                    <span className="text-xs text-muted-foreground">
                      mg/dL low
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trend chart */}
      <Card className="elevation-soft" data-ocid="dashboard.trend_chart_card">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Blood Glucose Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logsLoading ? (
            <Skeleton
              className="h-56 w-full"
              data-ocid="dashboard.chart.loading_state"
            />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={224}>
              <LineChart
                data={chartData}
                margin={{ top: 8, right: 8, bottom: 0, left: -20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={CHART_COLORS.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                />
                <YAxis
                  domain={[60, 260]}
                  tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 13 }}
                  formatter={(val: number) => [`${val} mg/dL`, "Glucose"]}
                />
                <ReferenceLine
                  y={70}
                  stroke={CHART_COLORS.reference}
                  strokeDasharray="4 2"
                  label={{ value: "70", fontSize: 10 }}
                />
                <ReferenceLine
                  y={140}
                  stroke={CHART_COLORS.reference}
                  strokeDasharray="4 2"
                  label={{ value: "140", fontSize: 10 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS.line}
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    const isOff =
                      payload.range === "high" ||
                      payload.range === "very_high" ||
                      payload.range === "low";
                    return (
                      <circle
                        key={`dot-${cx}-${cy}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={
                          isOff ? CHART_COLORS.outOfRange : CHART_COLORS.line
                        }
                        stroke="#fff"
                        strokeWidth={1.5}
                      />
                    );
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div
              className="h-56 flex items-center justify-center text-muted-foreground text-sm"
              data-ocid="dashboard.chart_empty_state"
            >
              No readings to display yet. Log your first reading below.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log new reading */}
      <Card className="elevation-soft" data-ocid="dashboard.log_reading_card">
        <CardHeader>
          <CardTitle className="font-display text-lg">Log a Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="glucose-value">Glucose (mg/dL)</Label>
              <Input
                id="glucose-value"
                type="number"
                placeholder="e.g. 114"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min={20}
                max={600}
                data-ocid="dashboard.glucose_value_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="glucose-context">Context</Label>
              <Select
                value={context}
                onValueChange={(v) => setContext(v as GlucoseContext)}
              >
                <SelectTrigger
                  id="glucose-context"
                  data-ocid="dashboard.context_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CONTEXT_LABELS) as GlucoseContext[]).map(
                    (k) => (
                      <SelectItem key={k} value={k}>
                        {CONTEXT_LABELS[k]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="glucose-datetime">Date &amp; Time</Label>
              <Input
                id="glucose-datetime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                data-ocid="dashboard.datetime_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="glucose-notes">Notes (optional)</Label>
              <Input
                id="glucose-notes"
                placeholder="e.g. After dinner"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                data-ocid="dashboard.notes_input"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleAdd}
              disabled={addLog.isPending}
              className="gap-2"
              data-ocid="dashboard.log_submit_button"
            >
              <Plus className="w-4 h-4" />
              {addLog.isPending ? "Saving…" : "Log Reading"}
            </Button>
            {addLog.isPending && (
              <span
                className="ml-3 text-xs text-muted-foreground"
                data-ocid="dashboard.log.loading_state"
              >
                Saving to blockchain…
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reading history */}
      <div data-ocid="dashboard.logs_section">
        <h2 className="font-display text-lg font-semibold mb-3">
          Reading History
        </h2>
        {logsLoading ? (
          <div className="space-y-2" data-ocid="dashboard.logs.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : !logs?.length ? (
          <Card
            className="border-dashed"
            data-ocid="dashboard.logs_empty_state"
          >
            <CardContent className="py-10 text-center text-muted-foreground text-sm">
              No readings logged yet. Start by logging your first glucose
              reading above.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2" data-ocid="dashboard.logs_list">
            {logs.slice(0, 20).map((log, idx) => {
              const range = classifyGlucose(log.value, log.context);
              return (
                <div
                  key={log.id}
                  className="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4 elevation-soft"
                  data-ocid={`dashboard.log_item.${idx + 1}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-xl font-bold text-foreground tabular-nums">
                      {log.value}
                      <span className="text-xs font-normal text-muted-foreground ml-1">
                        mg/dL
                      </span>
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant={RANGE_BADGE_VARIANT[range]}
                          className="text-xs"
                        >
                          {GLUCOSE_RANGE_LABELS[range]}
                        </Badge>
                        {log.context !== "random" && (
                          <span className="text-xs text-muted-foreground">
                            {CONTEXT_LABELS[log.context]}
                          </span>
                        )}
                      </div>
                      {log.notes && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {log.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {format(new Date(log.timestamp), "MMM d, h:mm a")}
                    </span>
                    <button
                      type="button"
                      aria-label="Delete reading"
                      data-ocid={`dashboard.delete_button.${idx + 1}`}
                      onClick={() =>
                        deleteLog.mutate(log.id, {
                          onSuccess: () => toast.success("Reading deleted"),
                          onError: () =>
                            toast.error("Failed to delete reading"),
                        })
                      }
                      className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Separator />
      <div className="text-xs text-muted-foreground pb-2">
        Target range: 70–140 mg/dL (general). Always consult your healthcare
        provider for personalized targets.
      </div>
    </div>
  );
}
