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
