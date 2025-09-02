const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const validateRequest = require("../middlewares/validateRequest");

authRouter.post(
  "/signup",
  validateSignUpData,
  validateRequest,
  async (req, res) => {
    try {
      const { firstName, lastName, emailId, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });

      const savedUser = await user.save();
      const token = await savedUser.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, 
        // sameSite: "none",
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({ message: "User Added Successfully", data: savedUser });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Incorrect password. Please try again.");
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    // secure: true,
    // sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successfully" });
});


module.exports = authRouter;
