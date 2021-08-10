const config = require('../../lib/config');

exports.register = (req, res) => {};

exports.list = (req, res) => {
  const sql = 'SELECT * FROM users';
  config.query(sql, (err, data, fileds) => {
    if (err) throw err;
    res.json(data);
  });
};
