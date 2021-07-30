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
          src: 'https://lh3.googleusercontent.com/proxy/xBlZP2r8LH5-uu6S5SvHijjCJZ8g_DZQteUi7zrvSzGl3mplWqBO4QLPF-JtrUwog-Vzyq97b0cZqbsgxUHtN0GCygH51-iicnHR6TqKGbQyWhRz3UM',
        },
        {
          src: 'https://thx.us-east-1.linodeobjects.com/coverimages/m_34/%EA%B5%90%EC%9A%94_34.jpg',
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
export const addPost = () => ({ type: ADD_POST });

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
