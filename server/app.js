const express = require('express')
const app = express()
const port = 8080

app.get("/", (req, res) => {
  res.send("serverAPI")
})

app.listen(port, () => {
  console.log("Server API is served on: localhost:" + port)
})
