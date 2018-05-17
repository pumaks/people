'use strict';

require('../../models/chat/message');

const Dialog = require('../../models/chat/dialog');
const Message = require('../../models/chat/message');
const User = require('../../models/user');

const online = [];

const getDialog = async (...members) =>
  (await Dialog.findOne({ members: { $in: members } })
    .populate('messages')
    .exec()) || (await new Dialog({ members }).save());

const index = async (req, res) => {
  const companion = await User.findOne(
    { login: req.params.login },
    '_id, login'
  ).exec();
  const dialog = await getDialog(req.user._id, companion._id);
  res.render('Chat/dialog', {
    title: 'Dialog',
    user: req.user,
    companion,
    dialog
  });
};

const sendMessage = async e => {
  const { msgText, companionId, chatId, type } = JSON.parse(e.data);
  if (type === 'writing') {
    console.log(type);
    const companionWS = online.find(ws => ws.userId.toString() === companionId);
    if (companionWS) {
      console.log(type);
      companionWS.send(JSON.stringify({ type: 'writing' }));
    }
  } else {
    const newMsg = await new Message({
      text: msgText,
      from: companionId
    }).save();
    Dialog.findByIdAndUpdate(chatId, {
      $push: { messages: newMsg._id }
    }).exec();
    const companionWS = online.find(ws => ws.userId.toString() === companionId);
    if (companionWS) {
      companionWS.send(JSON.stringify(newMsg));
    }
    e.target.send(JSON.stringify(newMsg));
  }
};

const closedWS = e => {
  const index = online.indexOf(e.target);
  online.splice(index, 1);
  console.log('closed', e.target.userId, online.length);
};

const connect = (ws, req) => {
  ws.userId = req.user._id;
  online.push(ws);
  ws.onmessage = sendMessage;
  ws.onclose = closedWS;
};

module.exports = {
  index,
  connect
};
