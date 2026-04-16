import Principal "mo:core/Principal";
import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Types "../types/glucose";

module {
  public type GlucoseLog = Types.GlucoseLog;
  public type GlucoseLogInput = Types.GlucoseLogInput;
  public type GlucoseSummary = Types.GlucoseSummary;

  // 7 days in nanoseconds (compile-time constant)
  let sevenDaysNs : Int = 604_800_000_000_000;

  /// Add a new glucose log for the caller. Returns the new log's id.
  public func addLog(
    logs : Map.Map<Principal, List.List<GlucoseLog>>,
    nextId : Nat,
    caller : Principal,
    input : GlucoseLogInput,
  ) : Nat {
    let newLog : GlucoseLog = {
      id = nextId;
      value = input.value;
      timestamp = input.timestamp;
      notes = input.notes;
    };
    let userLogs = switch (logs.get(caller)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<GlucoseLog>();
        logs.add(caller, fresh);
        fresh;
      };
    };
    userLogs.add(newLog);
    nextId;
  };

  /// Return all logs for the caller sorted by timestamp descending.
  public func getLogs(
    logs : Map.Map<Principal, List.List<GlucoseLog>>,
    caller : Principal,
  ) : [GlucoseLog] {
    let userLogs = switch (logs.get(caller)) {
      case (?existing) existing.toArray();
      case null [];
    };
    userLogs.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
  };

  /// Delete a log by id for the caller. No-op if not found.
  public func deleteLog(
    logs : Map.Map<Principal, List.List<GlucoseLog>>,
    caller : Principal,
    logId : Nat,
  ) : () {
    switch (logs.get(caller)) {
      case (?userLogs) {
        let filtered = userLogs.filter(func(l : GlucoseLog) : Bool { l.id != logId });
        logs.add(caller, filtered);
      };
      case null {};
    };
  };

  /// Compute 7-day summary stats for the caller.
  public func getSummary(
    logs : Map.Map<Principal, List.List<GlucoseLog>>,
    caller : Principal,
    now : Int,
  ) : GlucoseSummary {
    let allLogs = getLogs(logs, caller);
    let lastReading : ?GlucoseLog = if (allLogs.size() == 0) null else ?allLogs[0];
    let cutoff = now - sevenDaysNs;
    let recent = allLogs.filter(func(l : GlucoseLog) : Bool { l.timestamp >= cutoff });
    if (recent.size() == 0) {
      return {
        lastReading;
        avgLast7Days = null;
        highLast7Days = null;
        lowLast7Days = null;
      };
    };
    let sum = recent.foldLeft(0, func(acc : Nat, l : GlucoseLog) : Nat = acc + l.value);
    let avg : Float = sum.toInt().toFloat() / recent.size().toInt().toFloat();
    let high = recent.foldLeft(0, func(acc : Nat, l : GlucoseLog) : Nat = Nat.max(acc, l.value));
    let low = recent.foldLeft(recent[0].value, func(acc : Nat, l : GlucoseLog) : Nat = Nat.min(acc, l.value));
    {
      lastReading;
      avgLast7Days = ?avg;
      highLast7Days = ?high;
      lowLast7Days = ?low;
    };
  };
};
