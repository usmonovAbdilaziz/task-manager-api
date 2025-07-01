const router = require("express").Router();
const controller = require("../controllers/auth.controller.js");
const adminController = require("../controllers/admin.controller.js");
const AuthGuard = require("../guards/auth.guard.js");
const RolesGuard = require("../guards/roles.guard.js");

router
  .get("/users", AuthGuard, RolesGuard(["ADMIN"]), controller.getAllUsers)
  .get("/users/:id", AuthGuard, RolesGuard(["ADMIN"]), controller.getUserById)
  .get("/stats", AuthGuard, RolesGuard(["ADMIN"]), adminController.getStats)
  .put("/users/:id", AuthGuard, RolesGuard(["ADMIN"]), controller.updatedUser)
  .delete("/users/:id", AuthGuard, RolesGuard(["ADMIN"]), controller.deleteUser)
  .post(
    "/log-out",
    AuthGuard,
    RolesGuard(["ADMIN"]),
    adminController.logOutAdmin
  );

module.exports = router;
