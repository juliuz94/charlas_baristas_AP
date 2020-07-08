var express = require('express');
var router = express.Router();

const Barista = require('../models/barista');
const e = require('express');

/* GET home page. */
router.get('/', async (req, res) => {
  let baristas = await Barista.find({}).sort({priority : 'asc'});
  res.render('index', { baristas: baristas });
});

module.exports = router;
