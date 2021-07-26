import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followingList = [
    { nickname: '동찬' },
    { nickname: '정진' },
    { nickname: '트위터' },
  ];

  const followerList = [
    { nickname: '동찬' },
    { nickname: '정진' },
    { nickname: '트위터' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | Twitter</title>
      </Head>
      <Layout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </Layout>
      ;
    </>
  );
};

export default Profile;
