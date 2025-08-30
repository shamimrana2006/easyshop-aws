const { Users_collection } = require("../models/MongoDB_model");
const { success_res, error_res } = require("../services/respons_service");

const theme_toggling = async (req, res) => {
  try {
    const user = req.user.toObject();
    if (!user)
      return error_res(res, {
        message: "user not found from theme-toggling",
        status_code: 404,
      });
    const { UserName, isDarkMode } = user;
    const userdata = await Users_collection.findOneAndUpdate(
      { UserName },
      { $set: { isDarkMode: !isDarkMode } },
      { new: true }
    );

    success_res(res, {
      message: "update theme",
      status_code: 200,
      payLoad: userdata,
    });
  } catch (error) {
    error_res(res, {
      message: "something went wrong for update theme",
      status_code: 404,
    });
  }
};

module.exports = { theme_toggling };
