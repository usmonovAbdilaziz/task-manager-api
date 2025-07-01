const { Router } = require("express");
const adminController = require("../controllers/auth.controller.js");
const AuthGuard = require("../guards/auth.guard.js");
const SelfGuard = require("../guards/self.guard.js");
const OnlyGuard = require("../guards/only.guard.js");

const controller = adminController;
const router = Router();

router
  .post("/register", controller.createUser)
  .post("/login", controller.loginUser)
  .post("/refresh", controller.newAccesToken)
  .post("/forgot-password", controller.forgotPassword)
  .post("/change-password", controller.changePassword)
  .get("/", controller.getAllUsers)
  .get("/me", AuthGuard, controller.getMe)
  .get("/:id", AuthGuard, OnlyGuard, controller.getUserById)
  .put("/me", AuthGuard, controller.updateMe)
  .put("/:id", AuthGuard, OnlyGuard, controller.updatedUser)
  .delete("/:id", AuthGuard, SelfGuard, controller.deleteUser);

module.exports = router;
