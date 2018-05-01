'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zlakovigor@gmail.com',
    pass: 'igorzlakov99'
  }
});

const send = (to, link) => {
  const mailOptins = {
    from: 'zlakovigor@gmail.com',
    to,
    subject: 'Submit email',
    text: 'Hi, podtverdi!',
    html: `<a href="${link}">${link}</a>`
  };
  transporter.sendMail(mailOptins, (err, info) => {
    if (err) console.log(err.message);
    else console.log('Email sent to', info.response);
  });
};

module.exports = {
  send
};
