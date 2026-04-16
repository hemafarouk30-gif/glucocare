module {
  public type GlucoseLog = {
    id : Nat;
    value : Nat; // mg/dL
    timestamp : Int; // nanosecond epoch
    notes : ?Text;
  };

  public type GlucoseLogInput = {
    value : Nat; // mg/dL
    timestamp : Int; // nanosecond epoch
    notes : ?Text;
  };

  public type GlucoseSummary = {
    lastReading : ?GlucoseLog;
    avgLast7Days : ?Float;
    highLast7Days : ?Nat;
    lowLast7Days : ?Nat;
  };
};
