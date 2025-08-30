const { Users_collection } = require("../models/MongoDB_model");
const { success_res, error_res } = require("../services/respons_service");
const bcrypt = require("bcryptjs");
const { tokenCreate } = require("../services/tokenGenerator");
const { cookieGenerate } = require("../services/cookiegenarator");
const { CreateHashText } = require("../services/hashing");
const { SendMail } = require("./Nodemailer");
const { otpCreator, OTPHTML, OTP_Service } = require("../services/otpSrvice");
//register
const register_controller = async (req, res) => {
  const { name, UserName, password, repassword } = req.body;
  if (!UserName) {
    return error_res(res, { status_code: 400, message: "UserName is require" });
  }
  const isAlreadyUser = await Users_collection.find({ UserName });
  if (isAlreadyUser.length > 0) {
    return error_res(res, { message: "user already exist" });
  }

  if (!name) {
    return error_res(res, { status_code: 400, message: "name is require" });
  }
  if (!password) {
    return error_res(res, { status_code: 400, message: "password is require" });
  }
  if (password.length < 6) {
    return error_res(res, {
      status_code: 400,
      message: "minimum 6 character required",
    });
  }
  if (
    !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*<>/]).{6,}$/)
  ) {
    return error_res(res, {
      status_code: 400,
      message:
        "password require at least a uppercase, lowercase, digit and spacial character",
    });
  }
  if (!(password === repassword)) {
    return error_res(res, { status_code: 400, message: "password not match" });
  }
  const emailValue = UserName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ? UserName
    : "";
  try {
    const hashPassword = await CreateHashText(password);

    const newUser = await new Users_collection({
      name,
      email: emailValue,
      UserName,
      password: hashPassword,
    }).save();

    // --------------------------------
    const token = await tokenCreate(
      newUser.toObject(),
      process.env.SECRETE_JWT_KEY,
      "20m"
    );
    const isSecure = req.secure;
    cookieGenerate(res, {
      cookieName: "token",
      cookieValue: token,
      isSecure,
      maxAge: 20 * 60 * 1000,
    });
    // --------------------------------
    const { CreateAt, email } = newUser;

    success_res(res, {
      status_code: 201,
      message: "user created ",
      payLoad: { name, UserName, CreateAt, email },
    });
  } catch (error) {
    ////(error);
    // const errorMessage = Object.values(error.errors).map((err) => {
    //   return err.message;
    // });
    error_res(res, { status_code: 400, message: error.message });
  }
};
//login
const login_controller = async (req, res) => {
  try {
    const { UserName, password } = req.body;

    if (!UserName) {
      return error_res(res, { status_code: 401, message: "UserName required" });
    }

    const findingUser = await Users_collection.findOne({ UserName });

    ////(findingUser);

    if (!findingUser) {
      return error_res(res, { status_code: 400, message: "user not found" });
    }
    if (findingUser) {
      const comparePassword = await bcrypt.compare(
        password,
        findingUser.password
      );
      if (!comparePassword) {
        return error_res(res, { status_code: 400, message: "user not found" });
      }
      if (comparePassword) {
        const token = await tokenCreate(
          (({ password, ...findingUser }) => findingUser)(
            findingUser.toObject()
          ),
          process.env.SECRETE_JWT_KEY,
          "20m"
        );
        const isSecure = req.secure;
        cookieGenerate(res, {
          cookieName: "token",
          cookieValue: token,
          isSecure,
          maxAge: 20 * 60 * 1000,
        });
        const { password, ...userData } = findingUser.toObject(); //mongodb response

        success_res(res, {
          message: "valid user check success",
          status_code: 200,
          payLoad: userData,
        });
      }
    }
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};

// reset db only access super admin
const reset_db_controller = async (req, res) => {
  try {
    await Users_collection.deleteMany();
    success_res(res, {
      status_code: 200,
      message: "successfully reset database",
    });
  } catch (error) {
    error_res(res, { status_code: 401, message: error.message });
  }
};
//profile data
const profile_controller = (req, res, next) => {
  const { password, ...UserDAta } = req.user.toObject();
  success_res(res, {
    status_code: 200,
    message: "success",
    payLoad: UserDAta,
  });
};
//logout
const LogoutAT = async (req, res) => {
  try {
    const user = req.user.toObject();
    if (!user) {
      error_res(res);
    }
    const isSecure = req.secure;
    res.clearCookie("token", {
      httpOnly: isSecure,
      secure: isSecure,
      sameSite: isSecure ? "None" : "lax",
      path: "/",
    });

    success_res(res, { message: "logout successfully", status_code: 200 });
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};
//account verifying opt
const otp_sender_verify = async (req, res) => {
  try {
    const { password, ...UserDAta } = req?.user.toObject();
    const { UserName } = UserDAta;
    if (UserDAta?.isVerified?.value) {
      ////(typeof UserDAta?.isVerified?.value);

      return error_res(res, {
        status_code: 401,
        message: {
          message: "already verified account",
          check: UserDAta?.isVerified?.value,
        },
      });
    }
    const { email } = req?.body || {};
    if (!UserName) {
      return error_res(res, {
        status_code: 400,
        message: "User Not found",
      });
    }
    if (!email) {
      return error_res(res, {
        status_code: 400,
        message: "user Email required",
      });
    }

    const userFinding = await Users_collection.findOne({ email });
    const emailAlreadyUsed = userFinding?.isVerified?.value;

    if (emailAlreadyUsed) {
      return error_res(res, {
        status_code: 404,
        message: "email already verified in another account",
      });
    }

    const responseOPTSERvice = await OTP_Service(
      { email, UserName },
      "verify account OTP"
    );
    return success_res(res, {
      status_code: 200,
      message: responseOPTSERvice,
    });
  } catch (error) {
    ////(error);
    error_res(res, { status_code: 400, message: error.message });
  }
};
//account verification after otp
const verificationUpdating = async (req, res) => {
  try {
    const { UserName } = req.user.toObject();
    const email = req.email;
    if (!req.isValidOTP) {
      error_res(res, {
        status_code: 401,
        message: "otp invalid and unverified",
      });
    }

    await Users_collection.findOneAndUpdate(
      { UserName },
      { "isVerified.value": true, email }
    );
    success_res(res, {
      status_code: 201,
      message: "verification complete",
      payLoad: UserName,
    });
  } catch (error) {}
};
//admin check
const CheckAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = req.user.toObject();

    if (!isAdmin) {
      return error_res(res, { status_code: 401, message: "user not admin" });
    }
    next();
  } catch (err) {
    return error_res(res, { status_code: 400, message: "unAuthorized user" });
  }
};
//reset pass otp geting
const reset_password_otp = async (req, res) => {
  try {
    const { email } = req.body;
    ////(req.body);

    if (!email) {
      return error_res(res, { status_code: 404, message: "email required" });
    }
    const user = await Users_collection.findOne({ email });
    // ////(email);
    // ////("ami reset passowrd otp user : ", user);

    if (!user) {
      return error_res(res, { status_code: 400, message: "user not found" });
    }

    const responseOTP = await OTP_Service(
      { email, UserName: user?.UserName },
      "Reset Password OTP"
    );
    return success_res(res, {
      status_code: 200,
      message: responseOTP,
    });
  } catch (error) {
    ////(error);
    error_res(res, {
      status_code: error.status,
      message: "failed to send opt",
    });
  }
};
//checking otp create token
const reset_password_otp_token = async (req, res) => {
  try {
    const isSecure = req.secure;
    const user = req.user.toObject();
    console.log("ami user:", user);

    if (req.isValidOTP) {
      ////("shamim");
      const token = await tokenCreate(user, process.env.SECRETE_JWT_KEY, "5m");

      cookieGenerate(res, {
        cookieName: "resetPassToken",
        cookieValue: token,
        isSecure,
        maxAge: 5 * 60 * 1000,
      });
      return success_res(res, {
        status_code: 200,
        message: "reset token valid for 5 minutes",
        payLoad: token,
      });
    }
  } catch (error) {
    error_res(res, {
      status_code: 400,
      message: {
        error: error.message,
        cause: "reset password token creation failed",
      },
    });
  }
};
//reset save password
const token_checkFor_resetPass = async (req, res) => {
  try {
    const isSecure = req.secure;

    const password = req.body.password;
    const confirm_password = req.body.Confirmpassword;
    console.log("passowrds=====", password, confirm_password);

    if (!password) {
      error_res(res, { status_code: 404, message: "password Required" });
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*<>/]).{6,}$/
      )
    ) {
      return error_res(res, {
        status_code: 400,
        message:
          "password require at least a uppercase, lowercase, digit and spacial character",
      });
    }

    if (!(password == confirm_password)) {
      error_res(res, { status_code: 400, message: "password not match" });
    }

    const HashPassword = await CreateHashText(password);
    console.log("hashpassword=========", HashPassword);

    res.clearCookie("resetPassToken", {
      httpOnly: isSecure,
      secure: isSecure,
      sameSite: isSecure ? "None" : "lax",
      path: "/",
    });
    const changingPassword = await Users_collection.findOneAndUpdate(
      {
        UserName: req.user.UserName,
      },
      { $set: { password: HashPassword } },
      { new: true }
    );
     const emailconfirmation = await SendMail(req?.user?.email, "changed password", `hei username: ${req?.user?.UserName} your password was changed recently and you can checked it `);

    success_res(res, {
      status_code: 201,
      message: "password changed Successfully",
      payLoad: changingPassword.toObject(),
    });
  } catch (error) {
    error_res(res, { message: error.message, status_code: 404 });
  }
};
//nothing
const reset_password_token = async (req, res) => {
  try {
    if (!req.isValidOTP) {
      return error_res(res, {
        status_code: 401,
        message: "otp invalid and unverified",
      });
    }
    const { email, NewPassword, ConfirmPassword } = req.body;
    if (!NewPassword)
      return error_res(res, {
        message: "new password required",
        status_code: 404,
      });
    if (!ConfirmPassword)
      return error_res(res, {
        message: "new confirm password required",
        status_code: 404,
      });
    if (NewPassword !== ConfirmPassword)
      return error_res(res, {
        message: "NewPassword not match",
        status_code: 401,
      });
    const newPassword = await CreateHashText(NewPassword);
    const user = await Users_collection.findOneAndUpdate(
      { email },
      {
        $set: {
          password: newPassword,
          "isVerified.value": true,
          "isVerified.verifyAT": new Date.now(),
        },
      }
    );
    success_res(res, {
      message: "user password changed successfully",
      status_code: 201,
    });
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};
//nothing
const user_updating = async (req, res) => {
  const { password, ...UserDAta } = req.user.toObject();
  const { email, UserName, name } = req.body;
  // if (UserDAta?.isVerified?.value) {
  //   return error_res(res, { message: "user not verified" });
  // }
  if ((email, !UserName, !name)) {
    await Users_collection.findOneAndUpdate(
      { email: UserDAta.email },
      { email }
    );
    return success_res(res, {
      message: "your email changed",
      status_code: 201,
    });
  }
};

module.exports = {
  register_controller,
  login_controller,
  reset_db_controller,
  profile_controller,
  otp_sender_verify,
  verificationUpdating,
  CheckAdmin,
  reset_password_otp,
  reset_password_otp_token,
  user_updating,
  LogoutAT,
  token_checkFor_resetPass,
};
