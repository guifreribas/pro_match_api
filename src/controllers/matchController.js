import Match from "../models/matchModel.js";
import config from "../config/config.js";

export const getMatches = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.status) {
		whereConditions.status = req.query.status;
	}
	if (req.query.competition_category_id) {
		whereConditions.competition_category_id =
			req.query.competition_category_id;
	}
	if (req.query.local_team) {
		whereConditions.local_team = req.query.local_team;
	}
	if (req.query.visitor_team) {
		whereConditions.visitor_team = req.query.visitor_team;
	}
	if (req.query.date) {
		whereConditions.date = req.query.date;
	}
	try {
		const { count, rows } = await Match.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1 ? `${config.API_BASE_URL}/matches?page=${page - 1}` : null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/matches?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "Matches fetched successfully",
			data: {
				items: rows.map((match) => ({
					id_match: match.id_match,
					status: match.status,
					local_team: match.local_team,
					visitor_team: match.visitor_team,
					competition_category_id: match.competition_category_id,
					user_id: match.user_id,
					date: match.date,
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
				self: `${config.API_BASE_URL}/matches?page=${page}`,
				first: `${config.API_BASE_URL}/matches?page=1`,
				last: `${config.API_BASE_URL}/matches?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error to get matches", error });
	}
};

export const getMatch = async (req, res) => {
	try {
		const match = await Match.findByPk(req.params.id);
		if (match) {
			res.status(200).json({
				success: true,
				message: "Match fetched successfully",
				data: match,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Match not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get match" });
	}
};

export const createMatch = async (req, res) => {
	try {
		const match = await Match.create(req.body);
		res.status(201).json({
			success: true,
			message: "Match created successfully",
			data: match,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create match" });
	}
};

export const updateMatch = async (req, res) => {
	try {
		const match = await Match.update(req.body, {
			where: { id_match: req.params.id },
		});

		res.status(200).json({
			status: "success",
			message: "Match updated successfully",
			data: match,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to update match" });
	}
};

export const deleteMatch = async (req, res) => {
	try {
		const match = await Match.destroy({
			where: { id_match: req.params.id },
		});
		if (match) {
			res.status(200).json({
				success: true,
				message: "Match deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Match not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete match" });
	}
};
