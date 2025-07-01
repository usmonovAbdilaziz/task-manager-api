const { handleError } = require("../helpers/res.error.succes.js");

module.exports = SelfGuard = (req, res, next) => {
  if (req.user?.role === "ADMIN" || req.user?.id == req.params?.id) {
    return next();
  } else {
    return handleError(res, "Forbidden user", 403);
  }
};
