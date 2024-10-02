import Standings from "../models/standingsModel.js";
import config from "../config/config.js";
import Team from "#src/models/teamModel.js";
import Competition from "#src/models/competitionModel.js";
import CompetitionCategory from "#src/models/competitionCategoryModel.js";
import Category from "#src/models/categoryModel.js";

export const getStandings = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 20;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.id_standings) {
		whereConditions.id_standings = req.query.id_standings;
	}
	if (req.query.user_id) {
		whereConditions.user_id = req.query.user_id;
	}
	if (req.query.competition_id) {
		whereConditions.competition_id = req.query.competition_id;
	}
	if (req.query.competition_category_id) {
		whereConditions.competition_category_id =
			req.query.competition_category_id;
	}
	if (req.query.user_id) {
		whereConditions.user_id = req.query.user_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}

	const sorteableFields = [
		"matches_played",
		"victories",
		"draws",
		"losses",
		"goals_for",
		"goals_against",
		"goals_difference",
		"points",
	];

	const sortyBy = req.query.sortBy || "points";
	const sortOrder = req.query.sortOrder || "DESC";

	const isValidSortField = sorteableFields.includes(sortyBy);
	if (!isValidSortField) {
		return res.status(400).json({
			success: false,
			message: "Invalid sort field",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}

	const orderDirection = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

	try {
		const { count, rows } = await Standings.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
			order: [[sortyBy, orderDirection]],
			include: [
				{
					model: Team,
					attributes: ["id_team", "name", "avatar"],
				},
				{
					model: Competition,
					attributes: ["id_competition", "name", "format"],
				},
				{
					model: CompetitionCategory,
					attributes: ["id_competition_category", "season"],
					include: [
						{
							model: Category,
							attributes: ["gender", "name"],
						},
					],
				},
			],
		});

		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1
				? `${config.API_BASE_URL}/standings?page=${page - 1}`
				: null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/standings?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "Standings fetched successfully",
			data: {
				items: rows.map((standings) => ({
					id_standings: standings.id_standings,
					team_id: standings.team_id,
					competition_id: standings.competition_id,
					competition_category_id: standings.competition_category_id,
					user_id: standings.user_id,
					organization_id: standings.organization_id,
					matches_played: standings.matches_played,
					victories: standings.victories,
					draws: standings.draws,
					losses: standings.losses,
					goals_for: standings.goals_for,
					goals_against: standings.goals_against,
					goals_difference: standings.goals_difference,
					points: standings.points,
					team: standings?.team
						? {
								id_team: standings.team.id_team,
								name: standings.team.name,
								avatar: standings.team.avatar,
						  }
						: null,
					competition: standings?.competition
						? {
								id_competition:
									standings.competition.id_competition,
								name: standings.competition.name,
								format: standings.competition.format,
						  }
						: null,
					competition_category: standings?.competition_category
						? {
								id_competition_category:
									standings.competition_category
										.id_competition_category,
								season: standings.competition_category.season,
						  }
						: null,
					category: standings.competition_category.category
						? {
								id_category:
									standings.competition_category.category
										.id_category,
								name: standings.competition_category.category
									.name,
								gender: standings.competition_category.category
									.gender,
						  }
						: null,
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
				self: `${config.API_BASE_URL}/standings?page=${page}`,
				first: `${config.API_BASE_URL}/standings?page=1`,
				last: `${config.API_BASE_URL}/standings?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Error to get standings",
			message: error.message,
		});
	}
};

export const getStanding = async (req, res) => {
	try {
		const standings = await Standings.findByPk(req.params.id);
		if (standings) {
			res.status(200).json({
				success: true,
				message: "Standings fetched successfully",
				data: standings,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Standings not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get standings" });
	}
};

export const createStanding = async (req, res) => {
	try {
		const standings = await Standings.create(req.body);
		res.status(201).json({
			success: true,
			message: "Standings created successfully",
			data: standings,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			error: "Error to create standings",
			message: error.message,
		});
	}
};

export const updateStanding = async (req, res) => {
	console.log("Update Standings req.body:", req.body);
	console.log("Update Standings req.params.id:", req.params.id);
	try {
		await Standings.update(req.body, {
			where: { id_standings: req.params.id },
		});
		const updatedStandings = await Standings.findByPk(req.params.id);

		res.status(200).json({
			status: "success",
			message: "Standings updated successfully",
			data: updatedStandings,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			error: "Error to update standings",
			message: error.message,
		});
	}
};

export const deleteStanding = async (req, res) => {
	try {
		const standings = await Standings.destroy({
			where: { id_standing: req.params.id },
		});
		if (standings) {
			res.status(200).json({
				success: true,
				message: "Standings deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Standings not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete standings" });
	}
};
