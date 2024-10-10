import MatchPlayer from "../models/matchPlayerModel.js";
import config from "../config/config.js";
import Player from "#src/models/playerModel.js";
import Team from "#src/models/teamModel.js";
import TeamPlayer from "#src/models/teamPlayerModel.js";

export const getMatchPlayers = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.match_id) {
		whereConditions.match_id = req.query.match_id;
	}
	if (req.query.player_id) {
		whereConditions.player_id = req.query.player_id;
	}
	if (req.query.team_id) {
		whereConditions.team_id = req.query.team_id;
	}
	if (req.query.team_player_id) {
		whereConditions.team_player_id = req.query.team_player_id;
	}
	if (req.query.user_id) {
		whereConditions.user_id = req.query.user_id;
	}

	try {
		const { count, rows } = await MatchPlayer.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
			include: [
				{
					model: Player,
					attributes: [
						"id_player",
						"name",
						"last_name",
						"dni",
						"avatar",
					],
				},
				{
					model: Team,
					attributes: ["id_team", "name", "avatar"],
				},
				{
					model: TeamPlayer,
					attributes: ["player_number"],
				},
			],
		});

		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1
				? `${config.API_BASE_URL}/match-players?page=${page - 1}`
				: null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/match-players?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "MatchPlayers fetched successfully",
			data: {
				items: rows.map((matchPlayer) => ({
					id_match_player: matchPlayer.id_match_player,
					match_id: matchPlayer.match_id,
					player_id: matchPlayer.player_id,
					team_id: matchPlayer.team_id,
					user_id: matchPlayer.user_id,
					player: matchPlayer?.player
						? {
								id_player: matchPlayer.player.id_player,
								name: matchPlayer.player.name,
								last_name: matchPlayer.player.last_name,
								dni: matchPlayer.player.dni,
								avatar: matchPlayer.player.avatar,
						  }
						: null,
					team: matchPlayer?.team
						? {
								id_team: matchPlayer.team.id_team,
								name: matchPlayer.team.name,
								avatar: matchPlayer.team.avatar,
						  }
						: null,
					player_number: matchPlayer?.player_number || null,
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
				self: `${config.API_BASE_URL}/match-players?page=${page}`,
				first: `${config.API_BASE_URL}/match-players?page=1`,
				last: `${config.API_BASE_URL}/match-players?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Error to get matchPlayers",
			message: error.message,
		});
	}
};

export const getMatchPlayer = async (req, res) => {
	try {
		const matchPlayer = await MatchPlayer.findByPk(req.params.id);
		if (matchPlayer) {
			res.status(200).json({
				success: true,
				message: "MatchPlayer fetched successfully",
				data: matchPlayer,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "MatchPlayer not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get matchPlayer" });
	}
};

export const createMatchPlayer = async (req, res) => {
	try {
		const matchPlayer = await MatchPlayer.create(req.body);

		const createdMatchPlayer = await MatchPlayer.findOne({
			where: { id_match_player: matchPlayer.id_match_player },
			include: [
				{
					model: Player,
					attributes: [
						"id_player",
						"name",
						"last_name",
						"dni",
						"avatar",
					],
				},
				{
					model: Team,
					attributes: ["id_team", "name", "avatar"],
				},
				{
					model: TeamPlayer,
					attributes: ["player_number"],
				},
			],
		});

		const data = {
			id_match_player: createdMatchPlayer.id_match_player,
			match_id: createdMatchPlayer.match_id,
			player_id: createdMatchPlayer.player_id,
			team_id: createdMatchPlayer.team_id,
			user_id: createdMatchPlayer.user_id,
			player: createdMatchPlayer?.player
				? {
						id_player: createdMatchPlayer.player.id_player,
						name: createdMatchPlayer.player.name,
						last_name: createdMatchPlayer.player.last_name,
						dni: createdMatchPlayer.player.dni,
						avatar: createdMatchPlayer.player.avatar,
				  }
				: null,
			team: createdMatchPlayer?.team
				? {
						id_team: createdMatchPlayer.team.id_team,
						name: createdMatchPlayer.team.name,
						avatar: createdMatchPlayer.team.avatar,
				  }
				: null,
			player_number: createdMatchPlayer?.TeamPlayer
				? createdMatchPlayer.TeamPlayer.player_number
				: null,
		};

		res.status(201).json({
			success: true,
			message: "MatchPlayer created successfully",
			data: data,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create matchPlayer" });
	}
};

export const updateMatchPlayer = async (req, res) => {
	try {
		const matchPlayer = await MatchPlayer.update(req.body, {
			where: { id_match_player: req.params.id },
		});

		res.status(200).json({
			status: "success",
			message: "MatchPlayer updated successfully",
			data: matchPlayer,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to update matchPlayer" });
	}
};

export const deleteMatchPlayer = async (req, res) => {
	try {
		const matchPlayer = await MatchPlayer.destroy({
			where: { id_match_player: req.params.id },
		});
		if (matchPlayer) {
			res.status(200).json({
				success: true,
				message: "MatchPlayer deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "MatchPlayer not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete matchPlayer" });
	}
};
