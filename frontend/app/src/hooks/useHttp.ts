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

const fetcfWithParams = ([url, params]: [string, Record<string, any>]) => {
  return api
    .get(url, {
      params,
    })
    .then((res) => res.data);
};

// useSWRのラッパー
const useHttp = () => {
  return {
    get: <Data, Error>(
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

    // AxiosのGETリクエストのラッパー
    getOnce: <RES, DATA>(
      url: string,
      params?: DATA,
      errorProcess?: (err: unknown) => void,
    ) => {
      return api
        .get<RES, AxiosResponse<RES>, DATA>(url, {
          params,
        })
        .catch((err) => {
          if (errorProcess) {
            errorProcess(err);
          }
          throw Error(err);
        });
    },

    post: <RES, DATA>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return api.post<RES, AxiosResponse<RES>, DATA>(url, data).catch((err) => {
        if (errorProcess) {
          errorProcess(err);
        }
        throw Error(err);
      });
    },

    put: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return api.put<RES, AxiosResponse<RES>, DATA>(url, data).catch((err) => {
        if (errorProcess) {
          errorProcess(err);
        }
        throw Error(err);
      });
    },

    delete: <RES = any, DATA = any>(
      url: string,
      params?: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return api
        .delete<RES, AxiosResponse<RES>, DATA>(url, {
          params,
        })
        .catch((err) => {
          if (errorProcess) {
            errorProcess(err);
          }
          throw Error(err);
        });
    },
    patch: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      errorProcess?: (err: any) => void,
    ) => {
      return api
        .patch<RES, AxiosResponse<RES>, DATA>(url, data)
        .catch((err) => {
          if (errorProcess) {
            errorProcess(err);
          }
          throw Error(err);
        });
    },
  };
};

export default useHttp;
