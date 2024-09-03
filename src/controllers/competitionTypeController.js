import CompetitionType from "../models/competitionTypeModel.js";
import config from "../config/config.js";

export const getCompetitionTypes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.name) {
        whereConditions.name = req.query.name;
    }

    try {
        const { count, rows } = await CompetitionType.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/competitionTypes?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/competitionTypes?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "CompetitionTypes fetched successfully",
            data: {
                items: rows.map((competitionType) => ({
                    id_competition_type: competitionType.id_competition_type,
                    name: competitionType.name,
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
                self: `${config.API_BASE_URL}/competitionTypes?page=${page}`,
                first: `${config.API_BASE_URL}/competitionTypes?page=1`,
                last: `${config.API_BASE_URL}/competitionTypes?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get competitionTypes" });
    }
};

export const getCompetitionType = async (req, res) => {
    try {
        const competitionType = await CompetitionType.findByPk(req.params.id);
        if (competitionType) {
            res.status(200).json({
                success: true,
                message: "CompetitionType fetched successfully",
                data: competitionType,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "CompetitionType not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get competitionType" });
    }
};

export const createCompetitionType = async (req, res) => {
    try {
        const competitionType = await CompetitionType.create(req.body);
        res.status(201).json({
            success: true,
            message: "CompetitionType created successfully",
            data: competitionType,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create competitionType" });
    }
};

export const updateCompetitionType = async (req, res) => {
    try {
        const competitionType = await CompetitionType.update(req.body, {
            where: { id_competition_type: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "CompetitionType updated successfully",
            data: competitionType,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update competitionType" });
    }
};

export const deleteCompetitionType = async (req, res) => {
    try {
        const competitionType = await CompetitionType.destroy({
            where: { id_competition_type: req.params.id },
        });
        if (competitionType) {
            res.status(200).json({
                success: true,
                message: "CompetitionType deleted successfully",
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "CompetitionType not found",
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete competitionType" });
    }
};
