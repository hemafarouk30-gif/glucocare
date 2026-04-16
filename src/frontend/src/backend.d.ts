import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GlucoseLogInput {
    value: bigint;
    notes?: string;
    timestamp: bigint;
}
export interface GlucoseSummary {
    lowLast7Days?: bigint;
    highLast7Days?: bigint;
    lastReading?: GlucoseLog;
    avgLast7Days?: number;
}
export interface GlucoseLog {
    id: bigint;
    value: bigint;
    notes?: string;
    timestamp: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGlucoseLog(input: GlucoseLogInput): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGlucoseLog(logId: bigint): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getGlucoseLogs(): Promise<Array<GlucoseLog>>;
    getGlucoseSummary(): Promise<GlucoseSummary>;
    isCallerAdmin(): Promise<boolean>;
}
