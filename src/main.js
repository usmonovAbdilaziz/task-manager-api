const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", userRouter);

module.exports = app;
