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
  postAdded: false,
};

const ADD_POST = 'post/ADD_POST';

export const addPostRequestAction = () => ({ type: ADD_POST });

const dummyPost = {
  id: 2,
  content: '더미 데이터',
  User: { id: 1, nickname: '동찬' },
  Images: [],
  Comments: [],
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};

export default post;
