import TeamPlayer from "../models/teamPlayerModel.js";
import config from "../config/config.js";
import Player from "../models/playerModel.js";
import Team from "../models/teamModel.js";
import { sequelize } from "#src/db.js";

export const getTeamPlayers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.user_id) {
        whereConditions.user_id = req.query.user_id;
    }
    if (req.query.team_id) {
        whereConditions.team_id = req.query.team_id;
    }
    if (req.query.player_id) {
        whereConditions.player_id = req.query.player_id;
    }
    const sortyBy = req.query.sortBy || "player_number";
    const sortOrder = req.query.sortOrder || "ASC";
    try {
        const { count, rows } = await TeamPlayer.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
            order: [[sortyBy, sortOrder.toUpperCase()]],
            include: [
                {
                    model: Player,
                    attributes: [
                        "name",
                        "last_name",
                        "birthday",
                        "avatar",
                        "dni",
                    ],
                },
                {
                    model: Team,
                    attributes: ["name", "avatar"],
                },
            ],
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/teamPlayers?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/teamPlayers?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "TeamPlayers fetched successfully",
            data: {
                items: rows.map((teamPlayer) => ({
                    id_team_player: teamPlayer.id_team_player,
                    team_id: teamPlayer.team_id,
                    player_id: teamPlayer.player_id,
                    player_number: teamPlayer.player_number,
                    player: teamPlayer.player
                        ? {
                              name: teamPlayer.player.name,
                              last_name: teamPlayer.player.last_name,
                              birthday: teamPlayer.player.birthday,
                              avatar: teamPlayer.player.avatar,
                              dni: teamPlayer.player.dni,
                          }
                        : null,
                    team: teamPlayer.team
                        ? {
                              name: teamPlayer.team.name,
                              avatar: teamPlayer.team.avatar,
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
                self: `${config.API_BASE_URL}/teamPlayers?page=${page}`,
                first: `${config.API_BASE_URL}/teamPlayers?page=1`,
                last: `${config.API_BASE_URL}/teamPlayers?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error to get teamPlayers",
            message: error.message,
        });
    }
};

export const getTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.findByPk(req.params.id);
        if (teamPlayer) {
            res.status(200).json({
                success: true,
                message: "TeamPlayer fetched successfully",
                data: teamPlayer,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "TeamPlayer not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get teamPlayer" });
    }
};

export const createTeamPlayer = async (req, res) => {
    const { team_id, player_id, player_number } = req.body;

    // Check if all required fields are present
    if (!team_id || !player_id || !player_number) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Missing required fields",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }

    const transaction = await sequelize.transaction();

    try {
        //Check if player number is already used
        const isPlayerNumberUsed = await isPlayerNumberTaken(
            team_id,
            player_number,
            transaction
        );
        if (isPlayerNumberUsed) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Player number already used",
                data: null,
                timestamp: new Date().toISOString(),
            });
        }
        const teamPlayer = await TeamPlayer.create(req.body, { transaction });

        const findPlayer = Player.findByPk(req.body.player_id, { transaction });
        const findTeam = await Team.findByPk(req.body.team_id, { transaction });

        const [player, team] = await Promise.all([findPlayer, findTeam]);

        const teamPlayerResponse = formatTeamPlayerResponse(
            teamPlayer,
            player,
            team
        );
        res.status(201).json({
            success: true,
            message: "TeamPlayer created successfully",
            data: teamPlayerResponse,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error to create teamPlayer",
            message: error.message,
        });
    }
};

const isPlayerNumberTaken = async (team_id, player_number, transaction) => {
    return await TeamPlayer.findOne({
        where: {
            team_id,
            player_number,
        },
        transaction,
    });
};

const formatTeamPlayerResponse = (teamPlayer, player, team) => ({
    id_team_player: teamPlayer.id_team_player,
    team_id: teamPlayer.team_id,
    player_id: teamPlayer.player_id,
    player_number: teamPlayer.player_number,
    player: player
        ? {
              name: player.name,
              last_name: player.last_name,
              birthday: player.birthday,
              avatar: player.avatar,
              dni: player.dni,
          }
        : null,
    team: team
        ? {
              name: team.name,
              avatar: team.avatar,
          }
        : null,
});

export const updateTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.update(req.body, {
            where: { id_team_player: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "TeamPlayer updated successfully",
            data: teamPlayer,
            links: {
                self: `${config.API_BASE_URL}/teamPlayers/${teamPlayer.id_team_player}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update teamPlayer" });
    }
};

export const deleteTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.destroy({
            where: { id_team_player: req.params.id },
        });
        if (teamPlayer) {
            res.status(200).json({
                success: true,
                message: "TeamPlayer deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "TeamPlayer not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete teamPlayer" });
    }
};
