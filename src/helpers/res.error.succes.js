const handleError = (res, error, code = 500) => {
  const errorMsg = error.message ? error.message : error;
  return res.status(code).json({
    statusCode: code,
    message: errorMsg || "Internal server error",
  });
};

const succesMessage = (res, resDate, code = 200) => {
  return res.status(code).json({
    statusCode: code,
    message: "success",
    data: resDate || null,
  });
};
module.exports = {
  handleError,
  succesMessage,
};
