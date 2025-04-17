export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  error: string | null;
}
