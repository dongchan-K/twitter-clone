module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', // mysql에는 posts 테이블 생성 => 자동으로 소문자, 복수 형태로 변경됨
    {
      content: {
        type: DataTypes.TEXT, // TEXT는 긴 글 같은 경우 사용
        allowNull: false,
      },
      // RetweetId
    },
    {
      charset: 'utf8mb4', // 이모티콘을 저장하려면 mb4를 추가해야 함
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); // 게시물은 작성자에게 속해있다
    db.Post.belongsToMany(db.Hashtag); // 게시물은 여러개의 해시태그를 가질 수 있다 => 다 대 다 관계
    db.Post.hasMany(db.Comment); // 게시물은 여러개의 댓글을 가질 수 있다
    db.Post.hasMany(db.Image); // 게시물은 여러개의 이미지를 가질 수 있다
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 게시물의 좋아요는 여러 사용자를 가질 수 있다
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 게시글은 어떤 게시물의 리트윗 게시물일 수 있다
  };
  return Post;
};
