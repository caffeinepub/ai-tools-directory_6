import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Tool {
    id: bigint;
    websiteUrl: string;
    name: string;
    description: string;
    category: string;
    logoEmoji: string;
    dateAdded: bigint;
}
export interface backendInterface {
    addPendingTool(tool: Tool): Promise<void>;
    addTool(tool: Tool): Promise<void>;
    getAllTools(): Promise<Array<Tool>>;
    getCategories(): Promise<Array<string>>;
    getLatestTools(limit: bigint): Promise<Array<Tool>>;
    getToolsByCategory(category: string): Promise<Array<Tool>>;
    searchTools(searchTerm: string): Promise<Array<Tool>>;
}
