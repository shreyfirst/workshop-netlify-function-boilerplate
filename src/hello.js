import nodemailer from "nodemailer"

exports.handler = async (event, context) => {

  let final = "f";

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'coby96@ethereal.email',
        pass: 'wdUJk4WUa7Na8PBb3M'
    }
});
  
let mailOptions = {
  from: 'coby96@ethereal.email',
  to: 's@fundsy.io',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    final = "e" + error
  } else {
    console.log('Email sent: ' + info.response);
    final = "i" + info
  }
});

  return { 
    statusCode: 200,
    body: "d" + final
  }
};
