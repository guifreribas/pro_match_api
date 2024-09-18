import { Op } from "sequelize";
import config from "../config/config.js";
import User from "../models/userModel.js";
import { getTokenFromCookie } from "../utils/utils.js";
import jwt from "jsonwebtoken";

export const getMe = async (req, res) => {
	const cookies = await req.headers.cookie;
	const token = getTokenFromCookie(cookies);
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "No token provided",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
	const decoded = jwt.decode(token);
	if (!decoded.id_user) {
		return res.status(401).json({
			success: false,
			message: "Invalid token",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}

	try {
		const user = await User.findByPk(decoded.id_user);
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
				data: null,
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to get user",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const getUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.name) {
		whereConditions.name = { [Op.like]: `%${req.query.name}%` };
	}
	if (req.query.last_name) {
		whereConditions.last_name = { [Op.like]: `%${req.query.last_name}%` };
	}
	if (req.query.email) {
		whereConditions.email = { [Op.like]: `%${req.query.email}%` };
	}
	if (req.query.dni) {
		whereConditions.dni = req.query.dni;
	}

	// Can filter by birthday. Format: YYYY-MM-DD. Example:
	//  // ?birthdayBefore=2000-01-01
	//  // ?birthdayAfter=2000-01-01
	//  // ?birthdayEqual=2000-01-01

	if (req.query.birthdayBefore) {
		whereConditions.birthday = {
			...whereConditions.birthday,
			[Op.lte]: new Date(req.query.birthdayBefore),
		};
	}
	if (req.query.birthdayAfter) {
		whereConditions.birthday = {
			...whereConditions.birthday,
			[Op.gte]: new Date(req.query.birthdayAfter),
		};
	}
	if (req.query.birthdayEqual) {
		whereConditions.birthday = {
			...whereConditions.birthday,
			[Op.eq]: new Date(req.query.birthdayEqual),
		};
	}

	try {
		const { count, rows } = await User.findAndCountAll({
			where: whereConditions,
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
		res.status(500).json({
			success: false,
			message: "Error to get users",
			data: null,
			links: null,
			timestamp: new Date().toISOString(),
		});
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
				data: null,
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to get user",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: user,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to create user",
			data: null,
			timestamp: new Date().toISOString(),
		});
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
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to update user",
			data: null,
			timestamp: new Date().toISOString(),
		});
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
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to delete user",
			timestamp: new Date().toISOString(),
		});
	}
};
