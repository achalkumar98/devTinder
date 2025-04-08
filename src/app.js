const express = require("express");

const app = express();

const port = 7777;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/hello", (req, res) => {
    res.send("Hello Hello!");
});

app.get("/test", (req, res) => {
    res.send("Hello Hello and hello!");
});

app.listen(port, () => {
  console.log("Server is running on port 7777");
});
