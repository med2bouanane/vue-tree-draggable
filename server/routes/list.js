const express = require('express');
const router = express.Router();
const list = require('../models/list');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).json(list);
});

module.exports = router;