var steemconnect = require('../modules/steemconnect')
var express = require('express');
var router = express.Router();

/* GET auth listing. */
router.post('/', (req, res, next) => {
    console.log("auth called");
    if (!req.query.access_token ) {
        let uri = steemconnect.getLoginURL();
        console.log(uri);
        res.redirect(uri);
    } else {
        steemconnect.setAccessToken(req.query.access_token);
        steemconnect.me((err, steemResponse) => {
          req.session.steemconnect = steemResponse.account;
          res.redirect('/user')
        });
    }
});

router.get('/logout', (req, res) => {
   req.session.destroy();
   res.redirect("/")
});

module.exports = router;