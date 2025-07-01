const router = require("express").Router();
const controller = require("../controllers/task.controller.js");
const AuthGuard = require("../guards/auth.guard");

router
  .post("/", AuthGuard, controller.createTask)
  .get("/", AuthGuard, controller.getMyTasks)
  .put("/:id", AuthGuard, controller.updateTask)
  .delete("/:id", AuthGuard, controller.deleteTask);

module.exports = router;
