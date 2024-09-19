import Match from "../models/matchModel.js";
import Team from "../models/teamModel.js";
import config from "../config/config.js";
import CompetitionCategory from "#src/models/competitionCategoryModel.js";
import Category from "#src/models/categoryModel.js";
import Organization from "#src/models/organizationModel.js";
import Competition from "#src/models/competitionModel.js";
import { Op } from "sequelize";

export const getMatches = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.id_match) {
		whereConditions.id_match = req.query.id_match;
	}
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

	if (req.query.user_id) {
		whereConditions.user_id = req.query.user_id;
	}

	if (req.query.dateBefore) {
		whereConditions.date = {
			[Op.lte]: new Date(req.query.dateBefore),
		};
	}
	if (req.query.dateAfter) {
		whereConditions.date = {
			...whereConditions.date,
			[Op.gte]: new Date(req.query.dateAfter),
		};
	}
	if (req.query.date) {
		whereConditions.date = {
			...whereConditions.date,
			[Op.eq]: new Date(req.query.date),
		};
	}
	const include = [
		{
			model: Team,
			as: "localTeam",
			attributes: ["id_team", "name", "avatar"],
		},
		{
			model: Team,
			as: "visitorTeam",
			attributes: ["id_team", "name", "avatar"],
		},
		{
			model: CompetitionCategory,
			include: [
				{
					model: Category,
					attributes: ["name", "gender"],
					include: [
						{
							model: Organization,
							as: "organization",
							attributes: ["name", "address", "logo"],
						},
					],
				},
				{
					model: Competition,
					attributes: ["name", "format", "is_initialized"],
				},
			],
		},
	];
	// if (req.query.season) {
	// 	include.push({
	// 		model: CompetitionCategory,
	// 		as: "competitionCategory",
	// 		attributes: ["season"],
	// 		where: { sease: req.query.season },
	// 	});
	// }
	try {
		const { count, rows } = await Match.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
			include,
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
					local_team: {
						id_team: match.localTeam.id_team,
						name: match.localTeam.name,
						avatar: match.localTeam.avatar,
					},
					visitor_team: {
						id_team: match.visitorTeam.id_team,
						name: match.visitorTeam.name,
						avatar: match.visitorTeam.avatar,
					},
					competition_category: {
						id_competition_category:
							match.competition_category.id_competition_category,
						season: match.competition_category.season,
					},
					competition: {
						id_competition:
							match.competition_category.competition
								.id_competition,
						name: match.competition_category.competition.name,
						format: match.competition_category.competition.format,
						is_initialized:
							match.competition_category.competition
								.is_initialized,
					},
					category: {
						id_category:
							match.competition_category.category.id_category,
						name: match.competition_category.category.name,
						gender: match.competition_category.category.gender,
					},
					organization: {
						id_organization:
							match.competition_category.category.organization
								.id_organization,
						name: match.competition_category.category.organization
							.name,
						address:
							match.competition_category.category.organization
								.address,
						logo: match.competition_category.category.organization
							.logo,
					},
					competition_category_id:
						match.competition_category.competition_category_id,
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
		res.status(500).json({
			error: "Error to get matches",
			error: error.message,
		});
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
	const transaction = await sequelize.transaction();
	try {
		const match = await Match.create(req.body);
		res.status(201).json({
			success: true,
			message: "Match created successfully",
			data: match,
			timestamp: new Date().toISOString(),
		});
		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
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
