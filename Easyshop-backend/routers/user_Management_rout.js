console.time("register");
require("dotenv").config();
const passport = require("passport");
const {
  register_controller,
  login_controller,
  reset_db_controller,
  profile_controller,
  otp_sender_verify,
  verificationUpdating,
  reset_password_otp,
  user_updating,
  LogoutAT,
  reset_password_otp_token,
  token_checkFor_resetPass,
} = require("../controller/auth-controller");
const { otp_Checking } = require("../middleware/OTP_Cheking");
const { theme_toggling } = require("../controller/theme-toggle");
const userManagement_router = require("express").Router();
const Check_user_log = passport.authenticate("jwt", { session: false });
const reset_pass_passport = passport.authenticate("jwtresetPass", {
  session: false,
});


userManagement_router.post("/registration", register_controller);
userManagement_router.get("/theme-toggle", Check_user_log, theme_toggling);
userManagement_router.get("/logout", Check_user_log, LogoutAT);
userManagement_router.post("/login", login_controller);
userManagement_router.get("/resetDB", reset_db_controller);
userManagement_router.get("/profile", Check_user_log, profile_controller);
//active user
userManagement_router.post(
  "/verify-account-otp",
  Check_user_log,
  otp_sender_verify
);
userManagement_router.post(
  "/verify-account",
  Check_user_log,
  otp_Checking,
  verificationUpdating
);
//reset password ...
userManagement_router.post("/reset-pass-otp", reset_password_otp);
userManagement_router.post(
  "/reset_password_otp_token",
  otp_Checking,
  reset_password_otp_token
);
userManagement_router.post(
  "/reset_password_save",
  reset_pass_passport,
  token_checkFor_resetPass
);
//end...
userManagement_router.post("/update-user-info", Check_user_log, user_updating);

module.exports = {
  userManagement_router,
};
