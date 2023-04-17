import { useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head"; // 헤드 부분만 수정할 수 있도록 next에서 지원
import Router from "next/router";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  // 로그아웃 할 경우
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  });

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
