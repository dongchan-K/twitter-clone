import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { myInfo, mainPosts } = useSelector((state) => ({
    myInfo: state.user.myInfo,
    mainPosts: state.post.mainPosts,
  }));

  return (
    <Layout>
      {myInfo && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Home;
