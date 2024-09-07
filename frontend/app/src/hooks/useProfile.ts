import useProfileApi from "./useProfileApi";

export const useProfile = () => {
  const { getProfile } = useProfileApi();
  const { data: profile, error } = getProfile();

  return {
    profile,
  };
};
