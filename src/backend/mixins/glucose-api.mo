import Principal "mo:core/Principal";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/glucose";
import GlucoseLib "../lib/glucose";

mixin (
  accessControlState : AccessControl.AccessControlState,
  glucoseLogs : Map.Map<Principal, List.List<Types.GlucoseLog>>,
) {
  var nextLogId : Nat = 0;

  /// Add a new glucose log entry for the authenticated caller
  public shared ({ caller }) func addGlucoseLog(input : Types.GlucoseLogInput) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to log glucose");
    };
    let id = nextLogId;
    nextLogId += 1;
    GlucoseLib.addLog(glucoseLogs, id, caller, input);
  };

  /// Get all glucose logs for the authenticated caller, sorted by timestamp descending
  public query ({ caller }) func getGlucoseLogs() : async [Types.GlucoseLog] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view glucose logs");
    };
    GlucoseLib.getLogs(glucoseLogs, caller);
  };

  /// Delete a specific glucose log by ID for the authenticated caller
  public shared ({ caller }) func deleteGlucoseLog(logId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete glucose logs");
    };
    GlucoseLib.deleteLog(glucoseLogs, caller, logId);
  };

  /// Get summary stats: last reading, 7-day average, 7-day high/low
  public query ({ caller }) func getGlucoseSummary() : async Types.GlucoseSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view glucose summary");
    };
    GlucoseLib.getSummary(glucoseLogs, caller, Time.now());
  };
};
