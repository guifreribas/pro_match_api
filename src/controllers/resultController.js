import Result from "../models/resultModel.js";
import config from "../config/config.js";

export const getResults = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.match_id) {
        whereConditions.match_id = req.query.match_id;
    }
    if (req.query.local_team_goals) {
        whereConditions.local_team_goals = req.query.local_team_goals;
    }
    if (req.query.visitor_team_goals) {
        whereConditions.visitor_team_goals = req.query.visitor_team_goals;
    }

    try {
        const { count, rows } = await Result.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/results?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/results?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Results fetched successfully",
            data: {
                items: rows.map((result) => ({
                    id_result: result.id_result,
                    match_id: result.match_id,
                    local_team_goals: result.local_team_goals,
                    visitor_team_goals: result.visitor_team_goals,
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
                self: `${config.API_BASE_URL}/results?page=${page}`,
                first: `${config.API_BASE_URL}/results?page=1`,
                last: `${config.API_BASE_URL}/results?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get results" });
    }
};

export const getResult = async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Result fetched successfully",
                data: result,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Result not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get result" });
    }
};

export const createResult = async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.status(201).json({
            success: true,
            message: "Result created successfully",
            data: result,
            links: {
                self: `${config.API_BASE_URL}/results/${result.id_result}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create result" });
    }
};

export const updateResult = async (req, res) => {
    try {
        const result = await Result.update(req.body, {
            where: { id_result: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Result updated successfully",
            data: result,
            links: {
                self: `${config.API_BASE_URL}/results/${result.id_result}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update result" });
    }
};

export const deleteResult = async (req, res) => {
    try {
        const result = await Result.destroy({
            where: { id_result: req.params.id },
        });
        if (result) {
            res.status(200).json({
                success: true,
                message: "Result deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Result not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete result" });
    }
};
