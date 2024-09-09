import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { TProfile } from "../hooks/useProfileApi";

export const Profile = () => {
  const {
    getProfile,
    getProfileOnce,
    postProfile,
    putProfile,
    patchedProfile,
  } = useProfile();

  const [gottenOnceName, setGottenOnceName] = useState("NA");
  const [postedName, setPostedName] = useState("NA");
  const [putName, setPutName] = useState("NA");
  const [patchedAge, setPatchedAge] = useState(0);

  const { data: profile, error: _, mutate } = getProfile("1");

  getProfileOnce("3").then((res) => {
    const { data, status: _ } = res;
    setGottenOnceName(data.firstName);
  });
  postProfile("4", {
    id: "4",
    firstName: "John",
    lastName: "Doe",
    email: "ddd",
    age: 20,
  }).then((res) => {
    const { data, status: _ } = res;
    setPostedName(data.firstName);
  });

  const onPutButtonClick = () => {
    putProfile("1", {
      id: "1",
      firstName: "慶亮",
      lastName: "稲垣",
      email: "ddd",
      age: 29,
    }).then((res) => {
      const { data, status: _ } = res;
      setPutName(data.firstName);
    });
  };
  patchedProfile("2", {
    id: "2",
    firstName: "Mike",
    age: 999,
  }).then((res) => {
    const { data, status: _ } = res;
    setPatchedAge(data.age);
  });

  const onMutateButtonClick = (
    profile: TProfile | undefined,
    updatedName: string,
  ) => {
    if (!profile) {
      return;
    }
    mutate({ ...profile, firstName: updatedName }, false);

    // NOTE: 以下の２つだと結局BEに再検証しにいっている。
    //       検証ツールでも GETリクエストの有無で確認できる。
    // mutate({ ...profile, firstName: updatedName });
    // mutate();
  };

  return (
    <>
      <div>Name by GET: {profile?.firstName}</div>
      <div>Name by GET-Once: {gottenOnceName}</div>
      <div>Name by POST: {postedName}</div>
      <div>
        Name by <button onClick={() => onPutButtonClick()}>PUT</button>:{" "}
        {putName}
      </div>
      <div>Age by PATCH: {patchedAge}</div>
      <button onClick={() => onMutateButtonClick(profile, putName)}>
        mutate
      </button>
    </>
  );
};
