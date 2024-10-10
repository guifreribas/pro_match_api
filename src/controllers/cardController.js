import Card from "../models/cardModel.js";
import config from "../config/config.js";
import { sequelize } from "#src/db.js";
import Player from "#src/models/playerModel.js";
import Team from "#src/models/teamModel.js";

export const getCards = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.card_type) {
		whereConditions.card_type = req.query.card_type;
	}
	if (req.query.minute) {
		whereConditions.minute = req.query.minute;
	}
	if (req.query.part) {
		whereConditions.part = req.query.part;
	}
	if (req.query.match_id) {
		whereConditions.match_id = req.query.match_id;
	}
	if (req.query.player_id) {
		whereConditions.player_id = req.query.player_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}

	try {
		const { count, rows } = await Card.findAndCountAll({
			offset,
			limit,
			where: whereConditions,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1 ? `${config.API_BASE_URL}/cards?page=${page - 1}` : null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/cards?page=${page + 1}`
				: null;

		res.status(200).json({
			status: "success",
			message: "Cards fetched successfully",
			data: {
				items: rows.map((card) => ({
					id_card: card.id_card,
					card_type: card.card_type,
					minute: card.minute,
					part: card.part,
					match_id: card.match_id,
					player_id: card.player_id,
					team_id: card.team_id,
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
				self: `${config.API_BASE_URL}/cards?page=${page}`,
				first: `${config.API_BASE_URL}/cards?page=1`,
				last: `${config.API_BASE_URL}/cards?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Error to get cards",
			data: null,
			links: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const getCard = async (req, res) => {
	try {
		const card = await Card.findByPk(req.params.id);
		if (card) {
			res.status(200).json({
				success: true,
				message: "Card fetched successfully",
				data: card,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Card not found",
				data: null,
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to get card",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const createCard = async (req, res) => {
	if (
		!req.body.card_type ||
		!req.body.minute ||
		!req.body.part ||
		!req.body.match_id ||
		!req.body.player_id ||
		!req.body.team_id ||
		!req.body.user_id
	) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}

	const transaction = await sequelize.transaction();
	try {
		const card = await Card.create(req.body);
		res.status(201).json({
			success: true,
			message: "Card created successfully",
			data: card,
			timestamp: new Date().toISOString(),
		});
		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
		res.status(500).json({
			success: false,
			message: error.message,
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const updateCard = async (req, res) => {
	try {
		const card = await Card.update(req.body, {
			where: { id_card: req.params.id },
		});
		res.status(200).json({
			success: true,
			message: "Card updated successfully",
			data: card,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to update card",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const deleteCard = async (req, res) => {
	try {
		const card = await Card.destroy({
			where: { id_card: req.params.id },
		});
		if (card) {
			res.status(200).json({
				success: true,
				message: "Card deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Card not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error to delete card",
			data: null,
			timestamp: new Date().toISOString(),
		});
	}
};

export const getPlayerCardsStats = async (req, res) => {
	// console.log("Params:", req.params);
	// const competitionId = req.params.competitionId;
	const whereConditions = {};
	if (req.query.id_card) {
		whereConditions.id_card = req.query.id_card;
	}
	if (req.query.minute) {
		whereConditions.minute = req.query.minute;
	}
	if (req.query.part) {
		whereConditions.part = req.query.part;
	}
	if (req.query.match_id) {
		whereConditions.match_id = req.query.match_id;
	}
	if (req.query.player_id) {
		whereConditions.player_id = req.query.player_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}
	if (req.query.competition_id) {
		whereConditions.competition_id = req.query.competition_id;
	}
	try {
		const playerCardStats = await Card.findAll({
			attributes: [
				"player_id",
				[
					sequelize.fn(
						"SUM",
						sequelize.literal(
							`CASE WHEN card_type = 'YELLOW' THEN 1 ELSE 0 END`
						)
					),
					"yellowCards",
				],
				[
					sequelize.fn(
						"SUM",
						sequelize.literal(
							`CASE WHEN card_type = 'RED' THEN 1 ELSE 0 END`
						)
					),
					"redCards",
				],
				[
					sequelize.fn(
						"SUM",
						sequelize.literal(
							`CASE WHEN card_type = 'BLUE' THEN 1 ELSE 0 END`
						)
					),
					"blueCards",
				],
			],
			where: whereConditions,
			group: ["player_id"],
			include: [
				{
					model: Player,
					attributes: ["id_player", "name", "last_name", "avatar"],
				},
				{
					model: Team,
					attributes: ["id_team", "name", "avatar"],
				},
			],
		});

		res.status(200).json({
			success: true,
			message: "Player card stats fetched successfully",
			data: playerCardStats,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Error fetching player card stats",
			data: error.message,
			timestamp: new Date().toISOString(),
		});
	}
};
