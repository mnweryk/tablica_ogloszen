const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'empty search patch created!'
    })
});

module.exports = router;