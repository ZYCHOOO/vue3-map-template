export interface MockParams {
  url: string,
  type: string,
  data?: any,
  params?: any,
  // response?: any
  response(option?: any): Record<string, unknown>;
}