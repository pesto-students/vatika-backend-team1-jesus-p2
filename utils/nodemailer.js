const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function emailVerification(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vatika.plants@gmail.com",
      pass: process.env.PASS,
    },
  });

  let OTP = Math.floor(1000 + Math.random() * 9000);

  let details = {
    from: "vatika.plants@gmail.com",
    to:email,
    subject: "Vatika Email Verification",
    text: `Please Verify Your Email - Verification Code ${OTP}`,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) console.log(err);
    else console.log("OTP Sent !");
  });
  return OTP;
}

module.exports = emailVerification;
