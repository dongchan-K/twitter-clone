import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { myInfo } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>내 프로필 | Twitter</title>
      </Head>
      <Layout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={myInfo.Followings} />
        <FollowList header="팔로워 목록" data={myInfo.Followers} />
      </Layout>
      ;
    </>
  );
};

export default Profile;
