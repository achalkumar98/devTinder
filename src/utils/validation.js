const { body } = require("express-validator");

const validateSignUpData = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 3 }).withMessage("First name too short"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required"),

  body("emailId")
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("password")
    .isStrongPassword().withMessage("Password must be strong"),
];


const validateEditProfileData = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage("First name too short"),

  body("lastName")
    .optional()
    .trim(),

  body("emailId")
    .optional()
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("photoUrl")
    .optional()
    .trim()
    .isURL().withMessage("Invalid photo URL"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"]).withMessage("Invalid gender"),

  body("age")
    .optional()
    .isInt({ min: 18 }).withMessage("Age must be 18 or above"),

  body("about")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("About section too long"),

  body("skills")
    .optional()
    .isArray().withMessage("Skills should be an array of strings"),
];

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
