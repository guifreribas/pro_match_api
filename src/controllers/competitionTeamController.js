import CompetitionTeam from "../models/competitionTeamModel.js";
import config from "../config/config.js";
import Team from "#src/models/teamModel.js";

export const getCompetitionTeams = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.competition_category_id) {
		whereConditions.competition_category_id =
			req.query.competition_category_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}
	if (req.query.competition_category_id) {
		whereConditions.competition_category_id =
			req.query.competition_category_id;
	}
	const include = [
		{
			model: Team,
			attributes: ["id_team", "name", "avatar"],
		},
	];

	try {
		const { count, rows } = await CompetitionTeam.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
			include,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1
				? `${config.API_BASE_URL}/competitionTeams?page=${page - 1}`
				: null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/competitionTeams?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "CompetitionTeams fetched successfully",
			data: {
				items: rows.map((competitionTeam) => ({
					id_competition_team: competitionTeam.id_competition_team,
					competition_category_id:
						competitionTeam.competition_category_id,
					team_id: competitionTeam.team_id,
					team: competitionTeam?.team
						? {
								id_team: competitionTeam.team.id_team,
								name: competitionTeam.team.name,
								avatar: competitionTeam.team.avatar,
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
				self: `${config.API_BASE_URL}/competitionTeams?page=${page}`,
				first: `${config.API_BASE_URL}/competitionTeams?page=1`,
				last: `${config.API_BASE_URL}/competitionTeams?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error to get competitionTeams" });
	}
};

export const getCompetitionTeam = async (req, res) => {
	try {
		const competitionTeam = await CompetitionTeam.findByPk(req.params.id);
		if (competitionTeam) {
			res.status(200).json({
				success: true,
				message: "CompetitionTeam fetched successfully",
				data: competitionTeam,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "CompetitionTeam not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get competitionTeam" });
	}
};

export const createCompetitionTeam = async (req, res) => {
	try {
		const competitionTeam = await CompetitionTeam.create(req.body);
		res.status(201).json({
			success: true,
			message: "CompetitionTeam created successfully",
			data: competitionTeam,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create competitionTeam" });
	}
};

export const updateCompetitionTeam = async (req, res) => {
	try {
		const competitionTeam = await CompetitionTeam.update(req.body, {
			where: { id_competition_team: req.params.id },
		});

		res.status(200).json({
			status: "success",
			message: "CompetitionTeam updated successfully",
			data: competitionTeam,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to update competitionTeam" });
	}
};

export const deleteCompetitionTeam = async (req, res) => {
	try {
		const competitionTeam = await CompetitionTeam.destroy({
			where: { id_competition_team: req.params.id },
		});
		if (competitionTeam) {
			res.status(200).json({
				success: true,
				message: "CompetitionTeam deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "CompetitionTeam not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete competitionTeam" });
	}
};
