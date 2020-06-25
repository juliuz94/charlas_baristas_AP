var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', async (req, res) => {
  console.log(req.body);
  return res.status(200).send('nueva notificacion');
});

module.exports = router;
