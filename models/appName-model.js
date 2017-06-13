'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Avatar Schema
const AppNameSchema = new Schema({
  name: { type: String, required: true },
});

let AppName = module.exports = mongoose.model('AppName', AppNameSchema);

module.exports.getName = (name, callback) => {
  let query = {name: name};
  AppName.findOne(query, callback);
}
