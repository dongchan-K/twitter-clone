import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

// styled-components를 활용한 inline-style 최적화
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

// ant-design guttuer로 인한 가로 스크롤 생기는 문제 css 오버라이딩으로 해결
const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const Layout = ({ children }) => {
  const { myInfo } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>트위터</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {myInfo ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/dongchan-K"
            target="_blank"
            rel="noreferrer noopener"
          >
            My GitHub
          </a>
        </Col>
      </Row>
    </div>
  );
};

// children 요소의 타입 지정
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
