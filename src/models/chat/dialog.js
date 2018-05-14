'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema(
  {
    name: String,
    members: [{ type: Schema.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.ObjectId, ref: 'Message' }]
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt'
    }
  }
);

module.exports = mongoose.model('Chat', Dialog);
