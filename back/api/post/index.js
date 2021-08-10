const express = require('express');
const postController = require('./postController');

const router = express.Router();

router.post('/', postController.post);

router.delete('/', postController.delete);

module.exports = router;
