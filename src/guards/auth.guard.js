const { handleError } = require("../helpers/res.error.succes.js");
const { verifyToken } = require("../utils/token.js");
const config = require("../config/app.js");

module.exports = AuthGuard = async (req, res, next) => {
  const auth = await req.headers.authorization;
  if (!auth) {
    return handleError(res, "Authorization error", 401);
  }
  const bearer = auth.split(" ")[0];
  const token = auth.split(" ")[1];
  if (!bearer || bearer != "Bearer" || !token) {
    return handleError(res, "Token error", 401);
  }
  try {
    const user = await verifyToken(token, config.ACCSESS_TOKEN_KEY);
    req.user = user;
    next();
  } catch (error) {
    return handleError(res, "Unathorized", 401);
  }
};
