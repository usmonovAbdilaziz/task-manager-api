const jwt = require("jsonwebtoken");
const config = require("../config/app.js");

const generateAccessToken = async (payload) => {
  const accessToken = jwt.sign(payload, config.ACCSESS_TOKEN_KEY, {
    expiresIn: config.ACCSESS_TOKEN_TIME,
  });
  return accessToken;
};
const generateRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(payload, config.ACCSESS_TOKEN_KEY, {
    expiresIn: config.ACCSESS_TOKEN_TIME,
  });
  return refreshToken;
};

async function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
