const app = require("./backend/api.js");
const port = 8080;

app.listen(port, () => {
  console.log("Server API is served on: localhost:" + port)
});
