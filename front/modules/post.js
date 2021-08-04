export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '동찬',
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
        },
        {
          src: 'https://newsimg.sedaily.com/2020/08/14/1Z6KQFT39O_2.jpg',
        },
        {
          src: 'https://file.mk.co.kr/meet/neds/2019/12/image_readtop_2019_1044263_15761995784012463.png',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '정진',
          },
          content: '확인합니다.',
        },
        {
          User: {
            nickname: '우딱',
          },
          content: '이처니언!',
        },
      ],
    },
  ],
  imagePaths: [],
  postError: null,
  addPostDone: false,
  addCommentDone: false,
};

// 더미 데이터
const dummyPost = {
  id: 2,
  content: '더미 데이터',
  User: { id: 1, nickname: '동찬' },
  Images: [],
  Comments: [],
};

export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

// action creator
export const addPostRequestAction = (payload) => ({
  type: ADD_POST_REQUEST,
  payload,
});

export const addCommentRequestAction = (payload) => ({
  type: ADD_COMMENT_REQUEST,
  payload,
});

// reducer
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostDone: false,
        postError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        postError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentDone: false,
        postError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        postError: action.error,
      };
    default:
      return state;
  }
};

export default post;
