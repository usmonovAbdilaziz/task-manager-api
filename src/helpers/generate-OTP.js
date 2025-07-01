const { generate } = require("otp-generator");

module.exports = generetOTP = () => {
  return generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
