import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { userActionCreator } from '../modules/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { myInfo, loading } = useSelector(({ user, loading }) => ({
    myInfo: user.myInfo,
    loading: loading['user/followRequest']
      ? loading['user/followRequest']
      : loading['user/unFollowRequest'],
  }));
  const { followRequest, unFollowRequest } = userActionCreator;

  const isFollowing = myInfo?.Followings.find(
    (Following) => Following.id === post.User.id,
  );
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unFollowRequest(post.User.id));
    } else {
      dispatch(followRequest(post.User.id));
    }
  }, [dispatch, followRequest, unFollowRequest, isFollowing, post.User.id]);

  return (
    <Button loading={loading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
