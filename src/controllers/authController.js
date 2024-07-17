import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { serialize } from "cookie";

export async function register(req, res) {
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

        const { name, last_name, email, password, role, birthday } = req.body;
        const isEmailExist = await User.findOne({ where: { email } });
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
            secure: config.NODE_ENV === "production",
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

export async function login(req, res) {
    try {
        const errors = validationResult(req);

        // If there are validation errors, respond with a 400 Bad Request status
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Verificar si el correo electrónico y la contraseña son correctos
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                code: -25,
                message: "user No exist",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                code: -5,
                message: "Credenciales incorrectas",
            });
        }

        // Generar un token de acceso y lo guardo en un token seguro (httpOnly)
        const accessToken = jwt.sign(
            { id_user: user.id_user, name: user.name },
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

        // Enviar una respuesta al cliente
        res.status(200).json({
            code: 1,
            message: "Login OK",
            data: {
                user: {
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: -100,
            message: "Ha ocurrido un error al iniciar sesión",
            error: error,
        });
    }
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
