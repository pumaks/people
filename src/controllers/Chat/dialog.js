'use strict';

require('../../models/chat/message');

const Dialog = require('../../models/chat/dialog');
const User = require('../../models/user');

const wsGetAllMessages = (ws, req) => {};

const addMessage = (ws, req) => {};

const getDialog = async (userId, companionLogin) => {
  const companion = await User.findOne({ login: companionLogin }, '_id').exec();
  const members = [userId, companion._id];
  const dialog = await Dialog.findOne({ members })
    .populate('messages')
    .exec();
  return dialog || (await new Dialog({ members }).save());
};

const index = async (req, res) => {
  const companionLogin = req.params.login;
  const dialog = await getDialog(req.user._id, companionLogin);
  res.render('Chat/dialog', {
    title: 'Dialog',
    companion: { login: companionLogin },
    user: req.user,
    dialog
  });
};

// const sendMessage = e => {
//   const { chatId,  }
// }

const connect = (ws, req) => {
  const login = req.params.login;
  ws.onopen = e => console.log('opened', login, e);
  ws.onmessage = sendMessage;
};



module.exports = {
  index,
  connect
};
