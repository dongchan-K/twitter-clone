import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../modules/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

// styled-components를 활용한 inline-style 최적화
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ loading }) => ({
    loading: loading['user/LOG_IN_REQUEST'],
  }));

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ id, password }));
  }, [id, password, dispatch]);

  const styleCaching = useMemo(() => ({ marginTop: 10 }), []);

  return (
    // antd의 onFinish는 e.preventDefault()가 적용 되어있음
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <ButtonWrapper style={styleCaching}>
          <Button type="primary" htmlType="submit" loading={loading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
