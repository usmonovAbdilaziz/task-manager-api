const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/admin.routes.js");
const authRouter = require("./routes/auth.routes.js");
const taskRouter = require("./routes/task.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

module.exports = app;
