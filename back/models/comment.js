module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', // mysql에는 comments 테이블 생성 => 자동으로 소문자, 복수 형태로 변경됨
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 댓글이 어떤 사용자에게, 어떤 게시물에 속해있는지
      // UserId: {}
      // PostId: {}
    },
    {
      charset: 'utf8mb4', // 이모티콘을 저장하려면 mb4를 추가해야 함
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  Comment.associate = db => {
    db.Comment.belongsTo(db.User); // 댓글은 작성자에게 속해있다
    db.Comment.belongsTo(db.Post); // 댓글은 게시물에 속해있다
  };
  return Comment;
};
