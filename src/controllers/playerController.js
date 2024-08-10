import Player from "../models/playerModel.js";
import config from "../config/config.js";

export const getPlayers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {
        user_id: req.user.id_user,
    };
    if (req.query.name) {
        whereConditions.name = req.query.name;
    }
    if (req.query.last_name) {
        whereConditions.last_name = req.query.last_name;
    }
    if (req.query.dni) {
        whereConditions.dni = req.query.dni;
    }
    if (req.query.avatar) {
        whereConditions.avatar = req.query.avatar;
    }
    // Can filter by birthday. Format: YYYY-MM-DD. Example:
    //  // ?birthdayBefore=2000-01-01
    //  // ?birthdayAfter=2000-01-01
    //  // ?birthdayEqual=2000-01-01

    if (req.query.birthdayBefore) {
        whereConditions.birthday = {
            ...whereConditions.birthday,
            [Op.lt]: new Date(req.query.birthdayBefore),
        };
    }
    if (req.query.birthdayAfter) {
        whereConditions.birthday = {
            ...whereConditions.birthday,
            [Op.gt]: new Date(req.query.birthdayAfter),
        };
    }
    if (req.query.birthdayEqual) {
        whereConditions.birthday = {
            ...whereConditions.birthday,
            [Op.eq]: new Date(req.query.birthdayEqual),
        };
    }

    try {
        const { count, rows } = await Player.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/players?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/players?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Players fetched successfully",
            data: {
                items: rows.map((player) => ({
                    id_player: player.id_player,
                    name: player.name,
                    last_name: player.last_name,
                    dni: player.dni,
                    avatar: player.avatar,
                    birthday: player.birthday,
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
                self: `${config.API_BASE_URL}/players?page=${page}`,
                first: `${config.API_BASE_URL}/players?page=1`,
                last: `${config.API_BASE_URL}/players?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get players", error });
    }
};

export const getPlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (player.user_id !== req.user.id_user) {
            return res.status(403).json({
                success: false,
                message: "You do not have the required permissions.",
                data: null,
                timestamp: new Date().toISOString(),
            });
        }
        if (player) {
            res.status(200).json({
                success: true,
                message: "Player fetched successfully",
                data: player,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Player not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get player" });
    }
};

export const createPlayer = async (req, res) => {
    const body = {
        ...req.body,
        last_name: req.body.lastName,
    };
    try {
        const player = await Player.create(body);
        res.status(201).json({
            success: true,
            message: "Player created successfully",
            data: player,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to create player", error });
    }
};

export const updatePlayer = async (req, res) => {
    try {
        const player = await Player.update(req.body, {
            where: { id_player: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Player updated successfully",
            data: player,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update player" });
    }
};

export const deletePlayer = async (req, res) => {
    try {
        const player = await Player.destroy({
            where: { id_player: req.params.id },
        });
        if (player) {
            res.status(200).json({
                success: true,
                message: "Player deleted successfully",
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Player not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete player" });
    }
};
