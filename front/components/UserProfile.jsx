import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActionCreator } from '../modules/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myInfo, loading } = useSelector(({ user, loading }) => ({
    myInfo: user.myInfo,
    loading: loading['user/logoutRequest'],
  }));

  const { logoutRequest } = userActionCreator;

  const onLogOut = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch, logoutRequest]);

  return (
    <Card
      actions={[
        <div key="twit">
          게시글 수
          <br />
          {myInfo.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {myInfo.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {myInfo.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{myInfo?.nickname[0]}</Avatar>}
        title={myInfo?.nickname}
      />
      <Button onClick={onLogOut} loading={loading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
