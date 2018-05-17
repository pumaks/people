'use strict';

const Message = require('../../models/chat/message');

const create = (text, from) => new Message({ text, from }).save();

module.exports = {
  create
};
