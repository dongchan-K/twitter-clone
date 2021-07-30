import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.myInfo?.id);
  const [commentText, onChangeCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

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
