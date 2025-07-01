const { handleError } = require("../helpers/res.error.succes.js");

module.exports = RolesGuard = (includeRoles = []) => {
  return (req, res, next) => {
    if (!includeRoles.includes(req.user?.role)) {
      return handleError(res, "Forbidden user", 403);
    }
    next();
  };
};
