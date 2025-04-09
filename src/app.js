const express = require("express");

const app = express();

const port = 7777;

// Tthe will handle only Get request method
app.get("/user", (req, res) => {
  res.send({firstName: "Achal", lastName: "Kumar"}  );
});

app.post("/user", (req, res) => {
  res.send("Data Successfully Send to the database");
})

app.put("/user", (req, res) => {
  res.send("Data Successfully updated to the database");
});

app.patch("/user", (req, res) => {
  res.send("Data Successfully Minor updated to the database");
});

app.delete("/user", (req, res) => {
  res.send("Data Successfully deleted from the database");
});

// This will Handel all the http request methods like get, post, put, delete, patch
app.use("/test", (req, res) => {
  res.send("Test route");
});

app.listen(port, () => {
  console.log("Server is running on port 7777");
});
