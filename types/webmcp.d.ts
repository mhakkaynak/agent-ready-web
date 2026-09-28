export {};

declare global {
  type WebMcpTool = {
    name: string;
    title?: string;
    description: string;
    inputSchema?: Record<string, unknown>;
    annotations?: {
      readOnlyHint?: boolean;
      untrustedContentHint?: boolean;
      consequentialHint?: boolean;
      debugging?: boolean;
    };
    execute: (input: Record<string, unknown>, options: { signal: AbortSignal }) => Promise<unknown>;
  };

  interface WebMcpModelContext {
    registerTool(
      tool: WebMcpTool,
      options?: { signal?: AbortSignal; exposedTo?: string[] },
    ): Promise<void>;
  }

  interface Document {
    readonly modelContext?: WebMcpModelContext;
  }
}
