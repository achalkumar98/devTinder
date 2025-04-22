const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 7777;

app.post("/signup", async (req, res) => {
  // Creating a instance of the user model
  const user = new User({
    firstName: "Achal",
    lastName: "Kumar",
    email: "achal1620@gmail.com",
    password: "12345678",
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error in adding user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", +err);
  });
