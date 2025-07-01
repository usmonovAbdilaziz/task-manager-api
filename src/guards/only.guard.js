const { handleError } = require("../helpers/res.error.succes.js");

module.exports = OnlyGuard = (req, res, next) => {
  if (req.user?.id == req.params?.id) {
    return next();
  } else {
    return handleError(res, "Forbidden user", 403);
  }
};
