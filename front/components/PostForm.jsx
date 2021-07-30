import { Form, Input, Button } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../modules/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.post);
  const [text, setText] = useState('');

  const imageInput = useRef();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText('');
  }, [dispatch]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          추가
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;