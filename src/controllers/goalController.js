import config from "../config/config.js";
import Goal from "../models/goalModel.js";

export const getGoals = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.id_goal) {
		whereConditions.id_goal = req.query.id_goal;
	}
	if (req.query.minute) {
		whereConditions.minute = req.query.minute;
	}
	if (req.query.part) {
		whereConditions.part = req.query.part;
	}
	if (req.query.player_id) {
		whereConditions.player_id = req.query.player_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}
	if (req.query.match_id) {
		whereConditions.match_id = req.query.match_id;
	}

	try {
		const { count, rows } = await Goal.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1 ? `${config.API_BASE_URL}/goals?page=${page - 1}` : null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/goals?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "Goals fetched successfully",
			data: {
				items: rows.map((goal) => ({
					id_goal: goal.id_goal,
					minute: goal.minute,
					part: goal.part,
					player_id: goal.player_id,
					team_id: goal.team_id,
					match_id: goal.match_id,
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
				self: `${config.API_BASE_URL}/goals?page=${page}`,
				first: `${config.API_BASE_URL}/goals?page=1`,
				last: `${config.API_BASE_URL}/goals?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to get goals" });
	}
};

export const getGoal = async (req, res) => {
	try {
		const goal = await Goal.findByPk(req.params.id);
		if (goal) {
			res.status(200).json({
				success: true,
				message: "Goal fetched successfully",
				data: goal,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Goal not found",
				data: {
					id_goal: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get goal" });
	}
};

export const createGoal = async (req, res) => {
	try {
		const goal = await Goal.create(req.body);
		res.status(201).json({
			success: true,
			message: "Goal created successfully",
			data: goal,
			links: {
				self: `${config.API_BASE_URL}/goals/${goal.id_goal}`,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create goal" });
	}
};

export const updateGoal = async (req, res) => {
	try {
		const goal = await Goal.update(req.body, {
			where: { id_goal: req.params.id },
		});
		res.status(200).json({
			success: true,
			message: "Goal updated successfully",
			data: goal,
			links: {
				self: `${config.API_BASE_URL}/goals/${goal.id_goal}`,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to update goal" });
	}
};

export const deleteGoal = async (req, res) => {
	try {
		const goal = await Goal.destroy({
			where: { id_goal: req.params.id },
		});
		if (goal) {
			res.status(200).json({
				success: true,
				message: "Goal deleted successfully",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Goal not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete goal" });
	}
};
