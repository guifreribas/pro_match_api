import Sport from "../models/sportModel.js";
import config from "../config/config.js";

export const getSports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.name) {
        whereConditions.name = req.query.name;
    }

    try {
        const { count, rows } = await Sport.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/sports?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/sports?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Sports fetched successfully",
            data: {
                items: rows.map((sport) => ({
                    id_sport: sport.id_sport,
                    name: sport.name,
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
                self: `${config.API_BASE_URL}/sports?page=${page}`,
                first: `${config.API_BASE_URL}/sports?page=1`,
                last: `${config.API_BASE_URL}/sports?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get sports" });
    }
};

export const getSport = async (req, res) => {
    try {
        const sport = await Sport.findByPk(req.params.id);
        if (sport) {
            res.status(200).json({
                success: true,
                message: "Sport fetched successfully",
                data: sport,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Sport not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get sport" });
    }
};

export const createSport = async (req, res) => {
    try {
        const sport = await Sport.create(req.body);
        res.status(201).json({
            success: true,
            message: "Sport created successfully",
            data: sport,
            links: {
                self: `${config.API_BASE_URL}/sports/${sport.id_sport}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to create sport" });
    }
};

export const updateSport = async (req, res) => {
    try {
        const [updatedRows] = await Sport.update(req.body, {
            where: { id_sport: req.params.id },
        });

        if (updatedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Sport not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }

        const sport = await Sport.findByPk(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Sport updated successfully",
            data: sport,
            links: {
                self: `${config.API_BASE_URL}/sports/${sport.id_sport}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update sport" });
    }
};

export const deleteSport = async (req, res) => {
    try {
        const sport = await Sport.destroy({
            where: { id_sport: req.params.id },
        });
        if (sport) {
            res.status(200).json({
                success: true,
                message: "Sport deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Sport not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete sport" });
    }
};
