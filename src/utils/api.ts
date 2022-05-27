import axios, { AxiosRequestConfig } from "axios";
import { contentType, decodeToken, getAuthHeader } from "utils/auth";
import { IHeaderRequest, IDataRequest, IResponse, IApiResponse } from "types";
import { API_BASE_URL } from "./constants";
import { EContentType, EMethod } from "types/enums";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: EContentType.JSON, ...contentType(EContentType.JSON) },
  withCredentials: true,
});

async function execApi<T>(
  method: EMethod,
  url: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
) {
  configs = configs ?? {};
  Object.assign(configs, { url, method, headers, data: null });

  if (data) {
    configs.data = data;
  }

  Object.assign(configs, { headers: configs.headers || {} });

  configs &&
    configs.headers &&
    !configs.headers.Authorization &&
    Object.assign(configs.headers, getAuthHeader(decodeToken().token));

  try {
    const response = await API.request(configs);
    const result: IApiResponse<T> = {
      data: null,
      success: false,
      errors: "",
      status_code: response.status,
    };

    try {
      result.success = Math.floor(response.status / 200) === 1;

      if (result.success) {
        result.data = response.data;
        result.success = true;
        result.errors = "";
      } else {
        result.errors = response.data.errors;
      }
    } catch (e) {
      result.errors = e as string;
    }
    return result;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const response = error.response.data;
      response.success = false;
      response.status_code = error.response.status;
      return response;
    } else {
      return {
        success: false,
        data: null,
        errors: error as string,
        status_code: 500,
      };
    }
  }
}

export function apiGet<T>(
  url: string,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi<T>(EMethod.GET, url, undefined, headers, configs);
}

export function apiPost<T>(
  url: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.POST, url, data, headers, configs);
}

export function apiPut<T>(
  url: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.PUT, url, data, headers, configs);
}

export function apiPatch<T>(
  url: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.PATCH, url, data, headers, configs);
}

export function apiDelete<T>(
  url: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.DELETE, url, data, headers, configs);
}
