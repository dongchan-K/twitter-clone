import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { addCommentRequestAction } from '../modules/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const { id, addCommentDone } = useSelector((state) => ({
    id: state.user.myInfo,
    addCommentDone: state.post.addCommentDone,
  }));
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  // 정상적으로 코멘트가 작성되었으면 코멘트 창 초기화
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone, setCommentText]);

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentRequestAction({
        content: commentText,
        postId: post.id,
        userId: id,
      }),
    );
  }, [dispatch, post.id, commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type="primary" htmlType="submit">
          삐빅
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
