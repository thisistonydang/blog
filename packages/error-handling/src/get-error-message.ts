/**
 * Get error message from any thrown error.
 */
export function get_error_message(error: unknown): string {
  return `Error: ${error instanceof Error ? error.message : String(error)}`;
}
