const express = require('express');

const router = express.Router();
const tree = require('./tree');

router.use('/tree', tree);

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).json({ ok: 200 });
});

module.exports = router;