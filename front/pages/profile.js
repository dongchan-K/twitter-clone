import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import Layout from '../components/Layout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

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
