import React, { useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
// Icon 라이브러리를 분리하여 성능 면에서 좋아짐 -> antd
import { StopOutlined } from '@ant-design/icons';

// styled-components를 활용한 inline-style 최적화
const ListItemWrapper = styled(List.Item)`
  margin-top: 20px;
`;

const MoreButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const FollowList = ({ header, data }) => {
  // useMemo를 활용한 props 최적화
  const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);
  const style = useMemo(() => ({ marginBottom: 20 }), []);

  return (
    <List
      style={style}
      grid={grid}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <MoreButtonWrapper>
          <Button>더 보기</Button>
        </MoreButtonWrapper>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItemWrapper>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItemWrapper>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
