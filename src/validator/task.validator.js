const Joi = require("joi");

function createTaskValidator(data) {
  const task = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
  });

  return task.validate(data);
}
function updateTaskValidator(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().allow(""),
  });

  return schema.validate(body);
}

module.exports = { createTaskValidator, updateTaskValidator };
