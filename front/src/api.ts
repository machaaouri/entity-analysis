import { Config } from "./config";
import { FirebaseUser } from "./firebase";
const { REACT_APP_BACKEND } = Config;
export const api = (user: FirebaseUser | null) => {
  const base_url = REACT_APP_BACKEND;

  const validateResponse = (response: any) => {
    if (!response.ok) throw Error(response.statusText);
    return response;
  };

  const toJSON = (response: any) => response.json();

  const get = async <T>(resource: "progress" | "admin" | "me"): Promise<T> => {
    const token = await user?.getIdToken();
    const obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(`${base_url}/${resource}`, obj)
      .then(validateResponse)
      .then(toJSON);
  };

  const post = async <T>(data = {}): Promise<T> => {
    const token = await user?.getIdToken();
    const obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    return fetch(`${base_url}/${"analyze"}`, obj)
      .then(validateResponse)
      .then(toJSON);
  };

  const analyze = async <T>(text: string, start: number) => {
    return await post<T>({ text: text, start_time: start });
  };

  const isAdmin = async <T>(): Promise<T> => {
    return await get<T>("me");
  };

  const admin = async <T>(): Promise<T> => {
    return await get<T>("admin");
  };

  const polling = <T>(
    validate: (res: T) => boolean,
    hasError: (res: T) => boolean,
    interval: number,
    maxAttempts: number,
    partial: (res: T) => void
  ) => {
    let attempts = 0;
    const execute = async (resolve: any, reject: any) => {
      const result = await get<T>("progress");
      attempts++;

      if (hasError(result)) return reject(new Error("An error has occurred !"));
      if (validate(result)) {
        partial(result);
        return resolve(result);
      } else if (maxAttempts && attempts === maxAttempts) {
        return reject(new Error("Exceeded max attempts"));
      } else {
        partial(result);
        setTimeout(execute, interval, resolve, reject);
      }
    };

    return new Promise(execute);
  };

  return {
    analyze,
    polling,
    isAdmin,
    admin,
  };
};
