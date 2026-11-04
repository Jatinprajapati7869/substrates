export async function runWebMCPTool<T>(
  staticToolName: string,
  operation: () => T | Promise<T>,
): Promise<T> {
  void staticToolName;
  return operation();
}
