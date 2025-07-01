const prisma = require("../prisma/clent");
const { handleError, succesMessage } = require("../helpers/res.error.succes");
const token = require("../utils/token.js");
const config = require("../config/app.js");

class AdminController {
  async getStats(_, res) {
    try {
      const totalUsers = await prisma.user.count();
      const totalTasks = await prisma.task.count();

      const usersByRole = await prisma.user.groupBy({
        by: ["role"],
        _count: { role: true },
      });

      return succesMessage(res, {
        totalUsers,
        totalTasks,
        usersByRole,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async logOutAdmin(req, res) {
    try {
      const refreshToken = req.cookies?.refreshTokenAdmin;
      if (!refreshToken) {
        return handleError(res, "Refresh token epxired", 400);
      }
      const decodedToken = await token.verifyToken(
        refreshToken,
        config.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        return handleError(res, "Invalid token", 400);
      }
      const admin = await prisma.user.findUnique({
        where: { id: decodedToken.id },
      });
      if (!admin) {
        return handleError(res, "Admin not found", 404);
      }
      res.clearCookie("refreshTokenAdmin");
      return succesMessage(res, {});
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new AdminController();
