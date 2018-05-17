'use strict';

const Dialog = require('../../models/chat/dialog');

const create = (...members) => new Dialog({ members }).save();

const findDialog = members =>
  Dialog.findOne({ members: { $in: members } })
    .populate('messages')
    .exec();

const findByMembers = async (...members) =>
  (await findDialog(members)) || (await create(members));

const addMsg = (chatId, msgId) =>
  Dialog.findByIdAndUpdate(chatId, {
    $push: { messages: msgId }
  }).exec();

module.exports = {
  findByMembers,
  addMsg,
  create
};
