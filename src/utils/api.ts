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

export default API;