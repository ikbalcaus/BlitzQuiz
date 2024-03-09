const { app } = require("./setup.js");
const port = 8080;

require("./setup.js");
require("./API/quizzes.js");
require("./API/questions.js");
require("./API/answers.js");
require("./API/results.js");

app.listen(port, () => {
  console.log("Server API is served on: localhost:" + port)
});
