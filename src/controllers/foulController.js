import Foul from "../models/foulModel.js";
import config from "../config/config.js";

export const getFouls = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
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
        const { count, rows } = await Foul.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/fouls?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/fouls?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Fouls fetched successfully",
            data: {
                items: rows.map((foul) => ({
                    id_foul: foul.id_foul,
                    minute: foul.minute,
                    part: foul.part,
                    player_id: foul.player_id,
                    team_id: foul.team_id,
                    match_id: foul.match_id,
                    createdAt: foul.createdAt,
                    updatedAt: foul.updatedAt,
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
                self: `${config.API_BASE_URL}/fouls?page=${page}`,
                first: `${config.API_BASE_URL}/fouls?page=1`,
                last: `${config.API_BASE_URL}/fouls?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get fouls" });
    }
};

export const getFoul = async (req, res) => {
    try {
        const foul = await Foul.findByPk(req.params.id);
        if (foul) {
            res.status(200).json({
                success: true,
                message: "Foul fetched successfully",
                data: foul,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Foul not found",
                data: {
                    id_foul: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get foul" });
    }
};

export const createFoul = async (req, res) => {
    try {
        const foul = await Foul.create(req.body);
        res.status(201).json({
            success: true,
            message: "Foul created successfully",
            data: foul,
            links: {
                self: `${config.API_BASE_URL}/fouls/${foul.id_foul}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create foul" });
    }
};

export const updateFoul = async (req, res) => {
    try {
        const foul = await Foul.update(req.body, {
            where: { id_foul: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Foul updated successfully",
            data: foul,
            links: {
                self: `${config.API_BASE_URL}/fouls/${foul.id_foul}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update foul" });
    }
};

export const deleteFoul = async (req, res) => {
    try {
        const foul = await Foul.destroy({
            where: { id_foul: req.params.id },
        });
        if (foul) {
            res.status(200).json({
                success: true,
                message: "Foul deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Foul not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete foul" });
    }
};
