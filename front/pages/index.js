import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPostRequestAction } from '../modules/post';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo, mainPosts, hasMorePost, loading } = useSelector((state) => ({
    myInfo: state.user.myInfo,
    mainPosts: state.post.mainPosts,
    hasMorePost: state.post.hasMorePost,
    loading: state.loading['post/LOAD_POST_REQUEST'],
  }));

  // 최초에 게시물 불러오기
  useEffect(() => {
    dispatch(loadPostRequestAction());
  }, [dispatch]);

  // 스크롤 시 게시물 불러오기
  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        // 더 불러올 게시물이 있고 로딩중이 아니라면 게시물을 불러옴
        if (hasMorePost && !loading) {
          dispatch(loadPostRequestAction());
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePost, loading]);

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
