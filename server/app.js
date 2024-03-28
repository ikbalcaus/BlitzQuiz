const { app } = require("./setup.js");
const serverUrl = "http://localhost";
const port = 8080;

require("./setup.js");
require("./API/quizzes.js");
require("./API/questions.js");
require("./API/answers.js");
require("./API/exam.js");

app.listen(port, () => {
    console.log("Server API is running on: " + serverUrl + ":" + port);
});
