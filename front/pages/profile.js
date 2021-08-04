import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '../components/Layout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const router = useRouter();
  const { myInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!myInfo?.id) {
      router.push('/');
    }
  }, [myInfo, router]);

  if (!myInfo) return null;

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
