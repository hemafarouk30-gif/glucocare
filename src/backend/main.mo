import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Types "types/glucose";
import GlucoseMixin "mixins/glucose-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let glucoseLogs = Map.empty<Principal, List.List<Types.GlucoseLog>>();

  include GlucoseMixin(accessControlState, glucoseLogs);
};
