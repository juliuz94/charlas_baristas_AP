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
    
    const inscrito = await Inscrito.find({email: req.body.email})
    console.log(inscrito)

    const isAlreadyRegistered = inscrito.some(el => el.event === 'cafe-y-salud')
    console.log(isAlreadyRegistered)
    
    if (inscrito === null || !isAlreadyRegistered) {
        const newInscrito = new Inscrito ({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.telephone,
            event: req.body.event
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
    }

    req.flash('error', 'Ya estás inscrito a este evento');
    res.redirect('/eventos');

})

router.get('/inscritos', async (req, res) => {
    const inscritos = await Inscrito.find({event: 'cafe-y-salud'});
    console.log(inscritos.length)
    res.render('lista-inscritos', {event: 'Café y Salud', inscritos: inscritos, amount: inscritos.length});
});

module.exports = router;