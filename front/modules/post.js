import shortId from 'shortid';
import produce from 'immer';

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
          id: shortId.generate(),
          src: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://newsimg.sedaily.com/2020/08/14/1Z6KQFT39O_2.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://file.mk.co.kr/meet/neds/2019/12/image_readtop_2019_1044263_15761995784012463.png',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          content: '확인합니다.',
          User: {
            id: shortId.generate(),
            nickname: '정진',
          },
        },
        {
          id: shortId.generate(),
          content: '이처니언!',
          User: {
            id: shortId.generate(),
            nickname: '우딱',
          },
        },
      ],
    },
  ],
  imagePaths: [],
  postError: null,
  addPostDone: false,
  addCommentDone: false,
  removePostDone: false,
};

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

export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

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

export const removePostRequestAction = (payload) => ({
  type: REMOVE_POST_REQUEST,
  payload,
});

// reducer => 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 / 불변성을 지켜야함
const post = (state = initialState, action) => {
  // immer 사용시 state 아닌 draft 조작후 break 처리
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostDone = false;
        draft.postError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.payload));
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.postError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentDone = false;
        draft.postError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        // 게시글 아이디가 postId와 일치하는 요소를 찾은 후
        const post = draft.mainPosts.find(
          (mainPost) => mainPost.id === action.postId,
        );
        // 해당 게시글에 댓글 추가
        post.Comments.unshift(dummyComment(action.payload.content));
        draft.addCommentDone = true;
        break;
        // const postIndex = draft.mainPosts.findIndex(
        //   (mainPost) => mainPost.id === action.payload.postId,
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [
        //   dummyComment(action.payload.content),
        //   ...post.Comments,
        // ];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.postError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostDone = false;
        draft.postError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (mainPost) => mainPost.id !== action.payload,
        );
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.postError = action.error;
        break;
      default:
        break;
    }
  });
};

export default post;
