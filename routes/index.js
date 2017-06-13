'use strict';

const express = require('express');
const router = express.Router();

// let AppName = require('../models/appName-model');

// Get Homepage
router.get('/', (req, res) => {
  // AppName.findOne( (err, appname) => {
  //   res.render('index', { title: 'Emily', name: appname.name })
  // });
  res.render('index', {title: 'Emily'})
});

module.exports = router;
