const {
  handleError,
  succesMessage,
} = require("../helpers/res.error.succes.js");
const prisma = require("../prisma/clent.js");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validator/task.validator.js");

class TaskController {
  async createTask(req, res) {
    try {
      const { value, error } = createTaskValidator(req.body);
      if (error) return handleError(res, error, 422);

      const userId = req.user.id;

      const task = await prisma.task.create({
        data: {
          title: value.title,
          description: value.description,
          userId,
        },
      });

      return succesMessage(res, task, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getMyTasks(req, res) {
    try {
      const userId = req.user.id;

      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      return succesMessage(res, tasks);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;
      console.log(taskId);
      const task = await prisma.task.findUnique({ where: { id: taskId } });

      if (!task) {
        return handleError(res, "Task not found", 404);
      }

      if (task.userId !== userId) {
        return handleError(res, "You can't update this task", 403);
      }

      const { value, error } = updateTaskValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          title: value.title,
          description: value.description,
        },
      });

      return succesMessage(res, updatedTask);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;

      const task = await prisma.task.findUnique({ where: { id: taskId } });

      if (!task) {
        return handleError(res, "Task not found", 404);
      }

      if (task.userId !== userId) {
        return handleError(res, "You can't delete this task", 403);
      }

      await prisma.task.delete({ where: { id: taskId } });

      return succesMessage(res, "Task deleted successfully");
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new TaskController();
