var express = require('express');
var router = express.Router();

const AccessCode = require('../models/access-code');

/* GET add code page. */
router.get('/add-code', async (req, res) => {
  res.render('add-code');
});

router.post('/add-code', async (req, res) => {
    const password = req.body.password;

    if (password !== 'Cafeperfecto2020') {
        console.log('wrong password');
        return res.redirect('/admin/add-code');
    }

    const createAccessCode = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
     const newCode = createAccessCode(5);

     const newAccessCode = new AccessCode({
        accessCode: newCode
     });
     newAccessCode.save();

     req.flash("code", newCode);
     return res.redirect('/admin/add-code')


})

module.exports = router;
