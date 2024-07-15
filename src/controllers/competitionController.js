import Competition from "../models/competitionModel.js";
import config from "../config/config.js";

export const getCompetitions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.type) {
        whereConditions.type = req.query.type;
    }
    if (req.query.subtype) {
        whereConditions.subtype = req.query.subtype;
    }

    try {
        const { count, rows } = await Competition.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/competitions?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/competitions?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Competitions fetched successfully",
            data: {
                items: rows.map((competition) => ({
                    id_competition: competition.id_competition,
                    type: competition.type,
                    subtype: competition.subtype,
                    createdAt: competition.createdAt,
                    updatedAt: competition.updatedAt,
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
                self: `${config.API_BASE_URL}/competitions?page=${page}`,
                first: `${config.API_BASE_URL}/competitions?page=1`,
                last: `${config.API_BASE_URL}/competitions?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get competitions" });
    }
};

export const getCompetition = async (req, res) => {
    try {
        const competition = await Competition.findByPk(req.params.id);
        if (competition) {
            res.status(200).json({
                success: true,
                message: "Competition fetched successfully",
                data: competition,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Competition not found",
                data: {
                    id_competition: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get competition" });
    }
};

export const createCompetition = async (req, res) => {
    try {
        const competition = await Competition.create(req.body);
        res.status(201).json({
            success: true,
            message: "Competition created successfully",
            data: competition,
            links: {
                self: `${config.API_BASE_URL}/competitions/${competition.id_competition}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create competition" });
    }
};

export const updateCompetition = async (req, res) => {
    try {
        const competition = await Competition.update(req.body, {
            where: { id_competition: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Competition updated successfully",
            data: competition,
            links: {
                self: `${config.API_BASE_URL}/competitions/${competition.id_competition}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update competition" });
    }
};

export const deleteCompetition = async (req, res) => {
    try {
        const competition = await Competition.destroy({
            where: { id_competition: req.params.id },
        });
        if (competition) {
            res.status(200).json({
                success: true,
                message: "Competition deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Competition not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete competition" });
    }
};
