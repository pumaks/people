'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true },
    login: { type: String, required: true, lowercase: true, min: 1 },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    additionalInfo: { type: Schema.ObjectId, ref: 'additionalInfo' }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

UserSchema.virtual('url').get(function() {
  return 'user/' + this.login;
});

module.exports = mongoose.model('User', UserSchema);
