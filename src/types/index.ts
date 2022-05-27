export interface ITokenLocal {
  token: string;
  id: string | number;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
  errors: string;
  status_code: number;
}

export type TAuthHeader = "Bearer" | "Basic";

export type IHeaderRequest = HeadersInit | Record<string, any>;

export type IDataRequest = Record<string, any>;

export type IResponse<T> = Promise<IApiResponse<T>>;
