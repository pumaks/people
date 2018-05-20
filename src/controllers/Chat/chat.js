'use strict';

require('../../models/chat/message');

const Message = require('./message');
const Dialog = require('./dialog');
const User = require('../../models/user');
const { sendNotification } = require('../ws');

const online = [];

const index = async (req, res) => {
  const login = req.params.login;
  const companion = await User.findOne({ login }, '_id, login').exec();
  const dialog = await Dialog.findByMembers(req.user._id, companion._id);
  res.render('Chat/dialog', {
    title: 'Dialog',
    user: req.user,
    companion,
    dialog
  });
};

const sendToWS = (ws, ...dataArr) => {
  const data = {};
  dataArr.forEach(obj => Object.assign(data, obj));
  ws.send(JSON.stringify(data));
};

const sendMessage = async ({ msgText, companionId, chatId }, ws) => {
  const { _doc: msg } = await Message.create(msgText, companionId);
  Dialog.addMsgToDialog(chatId, msg._id);
  const companionWS = online.find(ws => ws.userId.toString() === companionId);
  if (companionWS) sendToWS(companionWS, msg);
  else sendNotification(companionId, { text: msgText, login: ws.login });
  sendToWS(ws, msg, { type: 'msg' });
};

const sendTypingSignal = ({ companionId }) => {
  const companionWS = online.find(ws => ws.userId.toString() === companionId);
  if (companionWS) sendToWS(companionWS, { type: 'typing' });
};

const closedWS = e => {
  const index = online.indexOf(e.target);
  online.splice(index, 1);
};

const parseMsg = e => {
  const data = JSON.parse(e.data);
  switch (data.type) {
    case 'msg':
      sendMessage(data, e.target);
      break;
    case 'typing':
      sendTypingSignal(data);
      break;
  }
};

const connect = (ws, req) => {
  ws.userId = req.user._id;
  ws.login = req.user.login;
  online.push(ws);
  ws.onmessage = parseMsg;
  ws.onclose = closedWS;
};

module.exports = {
  index,
  connect
};
