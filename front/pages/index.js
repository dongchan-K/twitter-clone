import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { postActionCreator } from '../modules/post';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo, mainPosts, hasMorePost, loading } = useSelector((state) => ({
    myInfo: state.user.myInfo,
    mainPosts: state.post.mainPosts,
    hasMorePost: state.post.hasMorePost,
    loading: state.loading['post/LOAD_POST_REQUEST'],
  }));

  // IntersectionObserver 관찰 대상 지정
  const target = useRef(null);

  const { loadPostRequest } = postActionCreator;

  // 최초에 게시물 불러오기
  useEffect(() => {
    dispatch(loadPostRequest());
  }, [loadPostRequest, dispatch]);

  // 스크롤 시 게시물 불러오기
  useEffect(() => {
    const options = {
      root: null, // 뷰포트를 기준으로 대상을 관찰
      threshold: 0, // 관찰 대상이 조금이라도 보이면 콜백이 실행
    };

    // 뷰포트와 관찰 대상의 교차 부분이 변경될 때 실행될 콜백
    const callback = (entries, observer) => {
      // 개체가 관찰되고 있다면 게시물 더 불러옴
      if (entries[0].isIntersecting) {
        dispatch(loadPostRequest());
      }
    };

    // 관찰자 생성
    const observer = new IntersectionObserver(callback, options);

    // 관찰 대상이 지정 되었다면 관찰자는 대상을 관찰
    if (target.current) {
      observer.observe(target.current);
    }

    // useEffect 실행 후 뒷정리 함수 => 관찰 중지함수
    return () => observer.disconnect();
  }, [dispatch, loadPostRequest, mainPosts, target, hasMorePost, loading]);

  return (
    <Layout>
      {myInfo && <PostForm />}
      {/* 마지막 게시물에 IntersectionObserver의 target ref 설정 */}
      {mainPosts.map((post, i) =>
        mainPosts.length - 1 === i ? (
          <PostCard
            key={post.id}
            post={post}
            ref={hasMorePost && !loading ? target : undefined}
          />
        ) : (
          <PostCard key={post.id} post={post} />
        ),
      )}
    </Layout>
  );
};

export default Home;
