const nodemailer = require('nodemailer');

function sendEmail({ email, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bcards123456@gmail.com',
      pass: 'irgsqzqxwqiouamy',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: 'bcards123456@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('Error ' + err);
    } else {
      console.log('Email sent successfully' + info.response);
    }
  });
}

module.exports = { sendEmail };
