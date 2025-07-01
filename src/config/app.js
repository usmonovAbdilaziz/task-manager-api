const { config } = require("dotenv");
config();
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  PORT: process.env.PORT,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCSESS_TOKEN_TIME: process.env.ACCSESS_TOKEN_TIME,
  ACCSESS_TOKEN_KEY: process.env.ACCSESS_TOKEN_KEY,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASWORD: process.env.MAIL_PASWORD,
};
