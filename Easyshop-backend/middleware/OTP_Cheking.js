const { Users_collection } = require("../models/MongoDB_model");
const { error_res } = require("../services/respons_service");
const bcrypt = require("bcryptjs");

const otp_Checking = async (req, res, next) => {
  try {
    // const email = req.body?.email
    // const otp = req.body?.otp
    const { email, UserName, otp, resetpass } = req?.body || {};
    console.log("sahmim eita body::", req.body);

    // return error_res(res, { status_code: 400, message: "email required" });

    if (!otp) {
      return error_res(res, { status_code: 400, message: "otp required" });
    }
    //    const user = await Users_collection.findOne({ UserName }, { password: 0 });
    // console.log(user,"user.............");
    let user = false;
    if (resetpass) {
      user = await Users_collection.findOne({ email }, { password: 0 });
    } else {
      user = await Users_collection.findOne({ UserName }, { password: 0 });
    }
    console.log(user, "user.............");

    if (!user) {
      return error_res(res, {
        status_code: 404,
        message: `user not found with this user: ${resetpass ? email : UserName}`,
      });
    }
    const { Otp } = user;
    const { value, CreateAT } = Otp;
    const isValidOTP = await bcrypt.compare(otp, Otp.value);
    console.log(isValidOTP, value, otp, user, "amarder inbox");

    if (!isValidOTP) {
      return error_res(res, { status_code: 400, message: "invalid OTP" });
    }
    if (new Date(CreateAT).getTime() < Date.now()) {
      return error_res(res, { status_code: 404, message: "otp Expired" });
    }
    req.user = user;
    req.email = email;
    req.isValidOTP = true;
    next();
  } catch (error) {
    error_res(res, { status_code: error.status, message: error.message });
  }
};

module.exports = { otp_Checking };
