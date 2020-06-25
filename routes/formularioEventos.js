require("dotenv").config();
var express = require('express');
var router = express.Router();
const flash = require("express-flash");

const Inscrito = require('../models/inscrito');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/* GET eventos page. */
router.get('/', async (req, res) => {
    res.render('eventos');
});


/* POST  inscripción evento  */
router.post('/', async (req, res) => {
    const newInscrito = new Inscrito ({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.telephone,
        event: 'Conversatorio Día Nacional del Café'
    });
    newInscrito.save();

    const msg = {
        to: req.body.email,
        from: "mercadeo@amorperfectocafe.net",
        templateId: 'd-4937ea48b9864ab09ef247f3c55b4f82',
    };
    await sgMail.send(msg);
    req.flash('message', 'Tus inscripción ha sido exitosa. Por favor revisa tu email');
    res.redirect('/eventos');

})

router.get('/inscritos', async (req, res) => {
    const inscritos = await Inscrito.find({});
    console.log(inscritos);
    res.render('lista-inscritos', {inscritos: inscritos});
});

module.exports = router;