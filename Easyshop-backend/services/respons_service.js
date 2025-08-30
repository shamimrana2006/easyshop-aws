const success_res = (
  res,
  { status_code = 200, message = "success", payLoad = {} }
) => {
  res.status(status_code).json({
    status: status_code,
    message,
    payLoad,
  });
};

const error_res = (res, { status_code = 500, message = "something went wrong" }) => {
  res.status(status_code).json({
    status: status_code,
    message,
  });
};

module.exports = {
  error_res,
  success_res,
};
