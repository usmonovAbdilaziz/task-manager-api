const config = require("./config/app.js");
const app = require("./main.js");

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
