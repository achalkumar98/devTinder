const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validateRequest = require("../middlewares/validateRequest");

// Profile Api is to get the user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});

profileRouter.put("/profile/edit", userAuth, validateEditProfileData, validateRequest, async (req, res) => {
  try {
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});


module.exports = profileRouter;
