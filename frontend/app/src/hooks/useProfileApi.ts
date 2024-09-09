import useHttp from "./useHttp";

export type TProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export const useProfileApi = () => {
  const http = useHttp();

  return {
    getProfile: (id: string) => {
      return http.get<TProfile, string>(`profile/${id}`, {
        keepPreviousData: true,
      });
    },
    getProfileOnce: (id: string) => {
      return http.getOnce<TProfile, unknown>(`profile/${id}`);
    },
    postProfile: (id: string, body: TProfile) => {
      return http.post<TProfile, TProfile>("profile", body);
    },
    putProfile: (id: string, body: TProfile) => {
      return http.put<TProfile, TProfile>(`profile/${id}`, body);
    },
    patchedProfile: (id: string, body: Partial<TProfile>) => {
      return http.patch<TProfile, Partial<TProfile>>(`profile/${id}`, body);
    },
  };
};

export default useProfileApi;
