'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    text: { type: String, required: true, maxlength: 50 },
    from: { type: Schema.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

module.exports = mongoose.model('Message', Message);
