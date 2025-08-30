const nodemailer = require("nodemailer");
const { error_res } = require("../services/respons_service");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SendMail = async (sender_mail, subject, body) => {
  return await transporter
    .sendMail({
      from: "shamimranaprofessional@gmail.com",
      to: sender_mail,
      subject: subject,
      html: body,
    })
    .then((info) => {
      ////("Message sent: %s", info.messageId);
      ////("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log(sender_mail)
      return info.messageId;
    })
    .catch((err) => {
      ////(err);
      return err.message;
    });
};

module.exports = { transporter, SendMail };
