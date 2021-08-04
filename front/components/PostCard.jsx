import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePostRequestAction } from '../modules/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  // ?. 옵셔널 체이닝 연산자 => myInfo가 null 또는 undefined일 경우 undefined를 반환, 그렇지 않으면 id를 참조
  const { id, loading } = useSelector((state) => ({
    id: state.user.myInfo?.id,
    loading: state.loading['post/REMOVE_POST_REQUEST'],
  }));

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setcommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setcommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction(post.id));
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),

          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={loading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && <div>댓글 부분</div>}
      <CommentForm post={post} />
      <List
        header={`${post.Comments.length}개의 댓글`}
        itemLayout="horizontal"
        dataSource={post.Comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.User.nickname}
              avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
              content={item.content}
            />
          </li>
        )}
      />
    </div>
  );
};

// shape를 사용하면 객체 같은 경우 더 구체적으로 type 지정 가능
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
