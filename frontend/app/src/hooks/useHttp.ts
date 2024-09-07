// import { fetchAuthSession } from "aws-amplify/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
});

api.interceptors.request.use(async (config) => {
  // If Authenticated, append ID Token to Request Header
  //   const idToken = (await fetchAuthSession()).tokens?.idToken;
  //   if (idToken) {
  //     config.headers["Authorization"] = "Bearer " + idToken.toString();
  //   }
  config.headers["Content-Type"] = "application/json";
  return config;
});

const fetcher = (url: string) => {
  return api.get(url).then((res) => res.data);
};

const url = "profile";
const data = api.get(url).then((res) => {
  const data = res.data;
  console.log(data);
  return res.data;
});

const fetcfWithParams = ([url, params]: [string, Record<string, any>]) => {
  return api
    .get(url, {
      params,
    })
    .then((res) => res.data);
};

// useSWR の返り値は {data, error}

const useHttp = () => {
  return {
    get: <Data = any, Error = any>(
      url: string | [string, ...unknown[]] | null,
      config?: SWRConfiguration,
    ) => {
      return useSWR<Data, AxiosError<Error>>(
        url,
        typeof url === "string" ? fetcher : fetcfWithParams,
        {
          ...config,
        },
      );
    },

    getOnce: <RES = any, DATA = any>(
      url: string,
      params?: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .get<RES, AxiosResponse<RES>, DATA>(url, {
            params,
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            }
            reject(err);
          });
      });
    },

    post: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .post<RES, AxiosResponse<RES>, DATA>(url, data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            }
            reject(err);
          });
      });
    },

    put: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .put<RES, AxiosResponse<RES>, DATA>(url, data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            }
            reject(err);
          });
      });
    },

    delete: <RES = any, DATA = any>(
      url: string,
      params?: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .delete<RES, AxiosResponse<RES>, DATA>(url, {
            params,
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            }
            reject(err);
          });
      });
    },
    patch: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .patch<RES, AxiosResponse<RES>, DATA>(url, data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            }
            reject(err);
          });
      });
    },
  };
};

export default useHttp;
