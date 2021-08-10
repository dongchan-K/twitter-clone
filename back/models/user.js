module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', // mysql에는 users 테이블 생성 => 자동으로 소문자, 복수 형태로 변경됨
    {
      email: {
        type: DataTypes.STRING(30), // 문자열 30글자 이내
        allowNull: false, // 필수 조건 => Not Null 과 같음
        unique: true, // 고유 값 => Primary Key와 같음
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // 패스워드는 암호화 하면 길이가 늘어남
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  User.associate = db => {};
  return User;
};
