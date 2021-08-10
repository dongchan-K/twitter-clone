const express = require('express');
const api = require('./api');

const app = express();

app.use('/api', api);

app.listen(3065, () => {
  console.log(`Sever is running on http://localhost:3065`);
});
