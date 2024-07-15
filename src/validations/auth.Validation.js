import { body } from "express-validator";

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const registerValidation = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("name").isString().withMessage("Name must be a string"),
    body("last_name").isString().withMessage("Last name must be a string"),
];

export const forgotPasswordValidator = [body("email").isEmail()];

export const changePasswordValidator = [
    body("token").exists(),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isLength({ min: 5 })
        .withMessage("Password should be at least 5 characters"),
];
