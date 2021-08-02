import React, { useCallback, useState } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
  color: red;
`;

const SubmitWrapper = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
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
    ['plugin:react/recommended'],
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordConfirm) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, [password, passwordConfirm, term]);

  return (
    <Layout>
      <Head>
        <title>회원가입 | Twitter</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
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
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </SubmitWrapper>
      </Form>
      ;
    </Layout>
  );
};

export default Signup;
