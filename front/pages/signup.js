import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import Head from 'next/head';
import useInput from '../hooks/useInput';
import Layout from '../components/Layout';
import { signUpRequestAction } from '../modules/user';

const ErrorMessage = styled.div`
  color: red;
`;

const SubmitWrapper = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ loading }) => ({
    loading: loading['user/SIGN_UP_REQUEST'],
  }));

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordConfirm) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch(signUpRequestAction({ email, password }));
  }, [email, password, passwordConfirm, term]);

  return (
    <Layout>
      <Head>
        <title>회원가입 | Twitter</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-confirm">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-confirm"
            type="password"
            value={passwordConfirm}
            required
            onChange={onChangePasswordConfirm}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의해주세요</ErrorMessage>}
        </div>
        <SubmitWrapper>
          <Button type="primary" htmlType="submit" loading={loading}>
            가입하기
          </Button>
        </SubmitWrapper>
      </Form>
      ;
    </Layout>
  );
};

export default Signup;
