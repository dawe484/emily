'use strict';

const AppName = require('../models/appName-model');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/emily_database');

let names = [
  new AppName({
    name: 'Emily',
  }),
];

let done = 0;

for (let i = 0; i < names.length; i++) {
  names[i].save( (err, result) => {
    done++;
    if (done === names.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
