import Buffer from "buffer";
import { ITokenLocal, TAuthHeader } from "types";
import { APP_TOKEN_NAME } from "./constants";

export const getLocalItem = (name: string) => {
  let data = localStorage.getItem(name);
  try {
    data = JSON.parse(data as string);
  } catch (e) {
    return null;
  }
  return data;
};

export const getSessionItem = (name: string) => {
  let data = sessionStorage.getItem(name);
  try {
    data = JSON.parse(data as string);
  } catch (e) {
    return null;
  }
  return data;
};

export const setLocalItem = (name: string, data: unknown) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const setSessionItem = (name: string, data: unknown) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};

export const removeLocalItem = (name: string) => {
  localStorage.removeItem(name);
};

export const removeSessionItem = (name: string) => {
  sessionStorage.removeItem(name);
};

export const getStorage = (name: string) => {
  return getLocalItem(name) || getSessionItem(name);
};

export const removeStorage = (name: string) => {
  removeLocalItem(name);
  removeSessionItem(name);
};

export const decodeToken = (): ITokenLocal => {
  const UT: ITokenLocal = { token: "", id: "" };
  let localToken = getStorage(APP_TOKEN_NAME);
  if(!localToken)return UT;

  const parse = Buffer.Buffer.from(localToken, "base64").toString().split(".");
  UT.id = parse.pop() ?? "";
  UT.token = parse.join(".");

  return UT;
};

export const stringToBase64 = (str: string): string => {
  return Buffer.Buffer.from(str).toString("base64");
};


export const encodeToken = (UT: ITokenLocal): string => {
  return stringToBase64([UT.token, UT.id].join("."));
};

export const getAuthHeader = (token: string, type: TAuthHeader = 'Bearer'): Record<'Authorization', string> => {
  return { Authorization: `${ type } ${ token }` };
}

export const contentType = (type: string): Record<"Content-Type", string> => {
  return { "Content-Type": type };
};
