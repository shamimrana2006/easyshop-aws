const { error_res } = require("../services/respons_service");
const createError = require("http-errors");

const client_error = (req, res, next) => {
  const pageNotFoundError = new createError(404, "page not found");
  next(pageNotFoundError);
};

const server_error = (err, req, res, next) => {
  error_res(res, { status_code: err.status, message: err.message });
};

module.exports = {
  client_error,
  server_error,
};
