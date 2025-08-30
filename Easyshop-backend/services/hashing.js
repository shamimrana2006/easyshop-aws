require("dotenv").config();
const bcrypt = require("bcryptjs");
const CreateHashText = async (text) => {
  return await bcrypt.hash(text, parseInt(process.env.salt));
};

module.exports = { CreateHashText };
