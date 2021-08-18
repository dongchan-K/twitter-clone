const Sequelize = require('sequelize');
// 환경 변수 설정 => 배포 시 production으로 환경 변수 설정
const env = process.env.NODE_ENV || 'development';
// config 파일 중 develop 가져옴 => 배포 시 production
const config = require('../config/config.json')[env];
const db = {};

// sequelize는 내부적으로 mysql2를 사용하는데 mysql2에 해당 정보들을 보내 node와 mysql 을 연결할 수 있게 도와줌
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 빈 db 객체에 모델 등록
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// 반복문 돌면서 관계 연결
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
