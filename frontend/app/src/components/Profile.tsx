import { useProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { profile } = useProfile();
  console.log({ profile });

  return <div>{profile?.firstName}</div>;
};
