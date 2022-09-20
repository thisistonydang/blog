/**
 * Get error message from any thrown error.
 */
export function getErrorMessage(error: unknown): string {
  return `Error: ${error instanceof Error ? error.message : String(error)}`;
}
