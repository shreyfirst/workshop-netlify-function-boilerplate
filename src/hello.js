import nodemailer from "nodemailer"

exports.handler = async (event, context) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kory18@ethereal.email',
        pass: 'qjWuKphDgZ1eDrZZbQ'
    }
});
  
let message = {
  from: 'Sender Name <sender@example.com>',
  to: 'Recipient <shreysgupta@gmail.com>',
  subject: 'Nodemailer is unicode friendly ✔',
  text: 'Hello to myself!',
  html: '<p><b>Hello</b> to myself!</p>'
};

transporter.sendMail(message, (err, info) => {
  if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
  }

  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
  
  return { statusCode: 200 }
};
