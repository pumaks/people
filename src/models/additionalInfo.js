'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdditionalInfoSchema = new Schema({});

module.exports = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
