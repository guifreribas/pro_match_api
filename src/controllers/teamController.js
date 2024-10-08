import Team from "../models/teamModel.js";
import config from "../config/config.js";
import { Op } from "sequelize";

export const getTeams = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.id_team) {
		whereConditions.id_team = req.query.id_team;
	}
	if (req.query.q) {
		whereConditions.name = { [Op.like]: `%${req.query.q}%` };
	}
	if (req.query.name) {
		whereConditions.name = req.query.name;
	}
	if (req.query.avatar) {
		whereConditions.avatar = req.query.avatar;
	}
	if (req.query.user_id) {
		whereConditions.user_id = req.query.user_id;
	}
	try {
		const { count, rows } = await Team.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1 ? `${config.API_BASE_URL}/teams?page=${page - 1}` : null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/teams?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "Teams fetched successfully",
			data: {
				items: rows.map((team) => ({
					id_team: team.id_team,
					name: team.name,
					avatar: team.avatar,
					user_id: team.user_id,
					created_at: team.created_at,
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
				self: `${config.API_BASE_URL}/teams?page=${page}`,
				first: `${config.API_BASE_URL}/teams?page=1`,
				last: `${config.API_BASE_URL}/teams?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error to get teams",
			message: error.message,
		});
	}
};

export const getTeam = async (req, res) => {
	try {
		const team = await Team.findByPk(req.params.id);
		if (team) {
			res.status(200).json({
				success: true,
				message: "Team fetched successfully",
				data: team,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Team not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get team" });
	}
};

export const createTeam = async (req, res) => {
	try {
		const team = await Team.create(req.body);
		res.status(201).json({
			success: true,
			message: "Team created successfully",
			data: team,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create team" });
	}
};

export const updateTeam = async (req, res) => {
	try {
		const team = await Team.update(req.body, {
			where: { id_team: req.params.id },
		});
		const teamUpdated = await Team.findByPk(req.params.id);

		res.status(200).json({
			status: "success",
			message: "Team updated successfully",
			data: teamUpdated,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to update team", message: error });
	}
};

export const deleteTeam = async (req, res) => {
	try {
		const team = await Team.destroy({
			where: { id_team: req.params.id },
		});
		if (team) {
			res.status(200).json({
				success: true,
				message: "Team deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Team not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete team" });
	}
};
