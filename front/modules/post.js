import shortId from 'shortid';
import faker from 'faker';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: '동찬',
    //   },
    //   content: '첫번째 게시글 #해시태그 #익스프레스',
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://newsimg.sedaily.com/2020/08/14/1Z6KQFT39O_2.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://file.mk.co.kr/meet/neds/2019/12/image_readtop_2019_1044263_15761995784012463.png',
    //     },
    //   ],
    //   Comments: [
    //     {
    //       id: shortId.generate(),
    //       content: '확인합니다.',
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'jungks',
    //       },
    //     },
    //     {
    //       id: shortId.generate(),
    //       content: '좋아요!',
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'wooddack',
    //       },
    //     },
    //   ],
    // },
  ],
  imagePaths: [],
  hasMorePost: true,
  loadPostDone: false,
  addPostDone: false,
  addCommentDone: false,
  removePostDone: false,
  postError: null,
};

// 테스트용 더미 데이터 생성 함수
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

// 더미 데이터
const dummyPost = (payload) => ({
  id: payload.id,
  content: payload.content,
  User: { id: 1, nickname: '동찬' },
  Images: [],
  Comments: [],
});

const dummyComment = (payload) => ({
  id: shortId.generate(),
  content: payload,
  User: { id: 1, nickname: '동찬' },
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPostRequest: (state, action) => {
      state.loadPostDone = false;
      state.postError = null;
    },
    loadPostSuccess: (state, { payload }) => {
      state.mainPosts = payload.concat(state.mainPosts);
      state.loadPostDone = true;
      state.hasMorePost = state.mainPosts.length < 50;
    },
    loadPostFailure: (state, { payload: error }) => {
      state.postError = error;
    },
    addPostRequest: (state, action) => {
      state.addPostDone = false;
      state.postError = null;
    },
    addPostSuccess: (state, { payload }) => {
      state.mainPosts.unshift(dummyPost(payload));
      state.addPostDone = true;
    },
    addPostFailure: (state, { payload: error }) => {
      state.postError = error;
    },
    addCommentRequest: (state, action) => {
      state.addCommentDone = false;
      state.postError = null;
    },
    addCommentSuccess: (state, { payload }) => {
      const post = state.mainPosts.find(
        (mainPost) => mainPost.id === payload.postId,
      );
      post.Comments.unshift(dummyComment(payload.content));
      state.addCommentDone = true;
    },
    addCommentFailure: (state, { payload: error }) => {
      state.postError = error;
    },
    removePostRequest: (state, action) => {
      state.removePostDone = false;
      state.postError = null;
    },
    removePostSuccess: (state, { payload }) => {
      state.mainPosts = state.mainPosts.filter(
        (mainPost) => mainPost.id !== payload,
      );
      state.removePostDone = true;
    },
    removePostFailure: (state, { payload: error }) => {
      state.postError = error;
    },
  },
});

export const postActionCreator = postSlice.actions;

export default postSlice;
