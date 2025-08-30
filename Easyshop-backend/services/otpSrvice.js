const { SendMail } = require("../controller/Nodemailer");
const { Users_collection } = require("../models/MongoDB_model");
const { CreateHashText } = require("./hashing");

const otpCreator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const OTPHTML = (OTP) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f4f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      background: #ffffff;
      margin: 50px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #4a90e2;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #333;
      margin-bottom: 30px;
    }
    .otp-code {
      display: inline-block;
      background-color: #f0f0f0;
      padding: 12px 24px;
      font-size: 22px;
      letter-spacing: 6px;
      font-weight: bold;
      color: #333;
      border-radius: 6px;
    }
    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🔐 EasyShop</div>
    <div class="message">
      This is you OTP expire in 5 minute
    </div>
    <div class="otp-code">${OTP}</div>
    <div class="message" style="margin-top: 30px;">
      if you not request so wait please
    </div>
    <div class="footer">
      &copy; 2025 MyApp. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

const OTP_Service = async ({ email, UserName }, reason) => {
  try {
    console.log(UserName,"ustad ami username paichi email otp te");
    
    const OTP = await otpCreator();

    const body = OTPHTML(OTP);
    const OTPHash = await CreateHashText(OTP);

    await Users_collection.findOneAndUpdate(
      { UserName },
      { "Otp.value": OTPHash, "Otp.CreateAT": Date.now() + 5 * 60 * 1000 }
    );
    await SendMail(email, reason, body);
    return `otp send successfully for ${reason}`;
  } catch (error) {
    ////(error);
    return `otp send failed for ${error.message}`;
  }
};
module.exports = { otpCreator, OTPHTML, OTP_Service };
