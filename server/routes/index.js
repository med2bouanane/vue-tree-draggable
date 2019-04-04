const express = require('express');

const router = express.Router();
const tree2 = require('./tree2');
const tree = require('./tree');
const list = require('./list');

router.use('/tree', tree);
router.use('/list', list);
router.use('/tree2', tree2);

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).json({ ok: 200 });
});

module.exports = router;