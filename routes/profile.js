var express = require('express');
var router = express.Router({mergeParams: true});
var string = require('lodash/string');

const Barista = require('../models/barista');
const Meeting = require('../models/meeting');
const woocommerce = require('../models/woocommerce');

/* GET profile. */
router.get('/:id', async (req, res) => {
  const baristaName = req.params.id;
  const barista = await Barista.findOne({name: baristaName});
  barista.kebabName = string.kebabCase(baristaName)
  res.render('profile', { barista: barista });
});

// GET calendar 
router.post('/order', async(req,res) => {
  const barista = await Barista.findOne({name: req.body.barista});
  const baristaKebab = string.kebabCase(barista);
  const calendarLink = req.body.calendarUrl;
  const orderId = req.body.orderId;
  try {
    const {data} = await woocommerce.get(`orders/${orderId}`);
    const {data:{id, status, date_created, total, billing}} = await woocommerce.get(`orders/${orderId}`);
  

    const client = {
      name: billing.first_name,
      email: billing.email
    }
    
    const dateCreated = new Date(date_created);
    if (dateCreated < new Date('05/22/2020')) return res.render('not-found');
    // console.log('Fecha OK');
    if (total < 50000) return res.render('not-found');
    // console.log('Total OK');
    if (status === 'cancelled') return res.render('not-found');
    // console.log('Status OK');

    const existingMeeting = await Meeting.exists({orderId: orderId});
    if (existingMeeting === true) return res.render('not-found');

    res.render('calendar', {clientName: client, orderId: id, barista: barista});

  } catch (error) {
    return res.render('not-found');
  }
});

//Schedule Meeting
router.post('/addMeeting', async (req, res) => {
  const newMeeting = new Meeting({
    baristaId: req.body.baristaId,
    orderId: req.body.orderId
  });
  newMeeting.save();
});

module.exports = router;
