var express = require('express');
var router = express.Router();

const Barista = require('../models/barista');

/* GET home page. */
router.get('/', async (req, res) => {
  const baristas = await Barista.find({});
  res.render('index', { baristas: baristas });
});

module.exports = router;
