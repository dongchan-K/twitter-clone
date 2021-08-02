import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../modules/user';

const UserProfile = () => {
  const { myInfo, loading } = useSelector(({ user, loading }) => ({
    myInfo: user.myInfo,
    loading: loading['user/LOG_OUT_REQUEST'],
  }));
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          짹쨱
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followings">
          팔로워
          <br />0
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
