var express = require('express');
var router = express.Router();
var util = require('../modules/util')
/* GET home page. */
router.get('/vp', async function(req, res, next) {
    let power = await util.getCurieVp();
    let vp = {"vp" : power}
    res.json (vp);
});

module.exports = router;
