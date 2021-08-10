module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image', // mysql에는 images 테이블 생성 => 자동으로 소문자, 복수 형태로 변경됨
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  Image.associate = db => {
    db.Image.belongsTo(db.Post); // 이미지는 게시물에 속해있다
  };
  return Image;
};
