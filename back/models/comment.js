module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', // mysql에는 comments 테이블 생성 => 자동으로 소문자, 복수 형태로 변경됨
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이모티콘을 저장하려면 mb4를 추가해야 함
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  Comment.associate = db => {};
  return Comment;
};
