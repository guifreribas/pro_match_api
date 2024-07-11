import config from "../config/config.js";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await User.findAndCountAll({
            offset,
            limit,
        });

        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/users?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/users?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: {
                items: rows.map((user) => ({
                    id_user: user.id_user,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    birthday: user.birthday,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                })),
                itemCount: rows.length,
                totalItems: count,
                currentPage: page,
                pageSize: limit,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
            links: {
                self: `${config.API_BASE_URL}/users?page=${page}`,
                first: `${config.API_BASE_URL}/users?page=1`,
                last: `${config.API_BASE_URL}/users?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get users" });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: user,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {
                    id_user: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get user" });
    }
};

export const createUser = async (req, res) => {
    console.log({ body: req.body });
    try {
        const user = await User.create(req.body);
        console.log({ user });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
            links: {
                self: `${config.API_BASE_URL}/users/${user.id_user}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: { id_user: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
            links: {
                self: `${config.API_BASE_URL}/users/${user.id_user}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: { id_user: req.params.id },
        });
        if (user) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete user" });
    }
};
