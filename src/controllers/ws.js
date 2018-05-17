'use strict';

const online = [];

const closedWS = e => {
  const index = online.indexOf(e.target);
  online.splice(index, 1);
};

const index = (ws, req) => {
  ws.userId = req.user._id;
  online.push(ws);
  ws.onclose = closedWS;
};

const sendNotification = (userId, data) => {
  data.type = 'notification';
  const ws = online.find(ws => ws.userId.toString() === userId);
  if (ws) ws.send(JSON.stringify(data));
};

module.exports = {
  index,
  sendNotification
};
