const jwt = require("jsonwebtoken");

const tokenCreate = async (data, secrete, expiresIn = "1d") => {
  return await jwt.sign(data, secrete, {
    expiresIn,
  });
};

module.exports = { tokenCreate };
