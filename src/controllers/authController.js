import { validationResult } from "express-validator";
import User from "../models/userModel.js";

export async function register(req, res) {
    console.log(req.body);

    try {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        const {
            name,
            last_name,
            email,
            password,
            role = "USER",
            birthday,
        } = req.body;
        const isEmailExist = await User.findOne({ where: { email } });
        console.log({ isEmailExist });
        if (isEmailExist) {
            return res.status(400).json({
                code: 400,
                message: "Email already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.BCRYPT_SALT)
        );
        const user = await User.create({
            name,
            last_name,
            email,
            password: hashedPassword,
            role,
            birthday,
        });
        console.log({ user });

        const accessToken = jwt.sign(
            {
                id_user: user.id_user,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET
        );
        const token = serialize("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        res.setHeader("Set-Cookie", token);
        res.status(201).json({
            code: 201,
            success: true,
            message: "User created successfully",
            data: {
                id_user: user.id_user,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error to register",
            error: error,
        });
    }
}

export function login(req, res) {
    res.send("Login");
}

export function logout(req, res) {
    res.send("Logout");
}

export function forgotPassword(req, res) {
    res.send("Forgot Password");
}

export function resetPassword(req, res) {
    res.send("Reset Password");
}
