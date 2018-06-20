var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/vp', function(req, res, next) {
    let vp = {"vp" : "95.6"}
    res.json (vp);
});

module.exports = router;
