import nodemailer from "nodemailer"

exports.handler = async (event, context) => {

  const body = event.body;
  const name = body.name;
  const email = body.email;
  const subject = body.subject;
  const message = body.message;

  let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: email,
    to: "my_email@example.com", 
    subject: subject + " - " + name, 
    text: message,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return { 
    statusCode: 200,
    body: event
  }
};
