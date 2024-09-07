import { MutatorCallback, useSWRConfig } from "swr";
import useHttp from "./useHttp";

type TProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export const useProfileApi = () => {
  const http = useHttp();
  const { mutate } = useSWRConfig();

  return {
    getProfile: () => {
      return http.getOnce<TProfile>("profile", {
        keepPreviousData: true,
      });
    },
  };
};

export default useProfileApi;
