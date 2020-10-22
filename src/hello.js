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
  
  transporter.sendMail({
    from: 'kory18@ethereal.email', 
    to: "shreysgupta@gmail.com", 
    subject: "Test email", 
    text: "Hello world"
  });
  
  return { statusCode: 200 }
};
