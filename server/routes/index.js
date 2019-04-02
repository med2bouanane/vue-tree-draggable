const express = require('express');

const router = express.Router();
const tree = require('./tree');
const list = require('./list');

router.use('/tree', tree);
router.use('/list', list);

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).json({ ok: 200 });
});

module.exports = router;