import useProfileApi from "./useProfileApi";

// NOTE: 正直 useProfileApi と統合してもよいきがする。
//       本来はuseSWR/GETで取得したデータや、postやputによるデータ更新の関数をここに書くべきだが、
//       今回はサンプルコードなのでそこまでのロジックが無いという状況。
export const useProfile = () => {
  const {
    getProfileOnce,
    postProfile,
    getProfile,
    putProfile,
    patchedProfile,
  } = useProfileApi();

  return {
    getProfile,
    getProfileOnce,
    postProfile,
    putProfile,
    patchedProfile,
  };
};
