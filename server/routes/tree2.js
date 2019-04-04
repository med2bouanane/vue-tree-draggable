const express = require('express');
const router = express.Router();
const tree = require('../models/tree2');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).json(tree);
});

module.exports = router;