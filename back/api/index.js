const express = require('express');

const router = express.Router();

const user = require('./user');
const post = require('./post');

router.use('/user', user);
router.use('/post', post);

module.exports = router;
