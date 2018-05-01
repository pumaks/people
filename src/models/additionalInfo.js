'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdditionalInfoSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
  avatar: { type: String, default: '' },
  gallery: [{ type: String }]
});

module.exports = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
