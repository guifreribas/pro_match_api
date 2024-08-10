import Field from "../models/fieldModel.js";
import config from "../config/config.js";

export const getFields = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.name) {
        whereConditions.name = req.query.name;
    }
    if (req.query.type) {
        whereConditions.type = req.query.type;
    }
    if (req.query.competition_id) {
        whereConditions.competition_id = req.query.competition_id;
    }
    if (req.query.user_id) {
        whereConditions.user_id = req.query.user_id;
    }

    try {
        const { count, rows } = await Field.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1 ? `${config.API_BASE_URL}/fields?page=${page - 1}` : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/fields?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Fields fetched successfully",
            data: {
                items: rows.map((field) => ({
                    id_field: field.id_field,
                    name: field.name,
                    type: field.type,
                    competition_id: field.competition_id,
                    user_id: field.user_id,
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
                self: `${config.API_BASE_URL}/fields?page=${page}`,
                first: `${config.API_BASE_URL}/fields?page=1`,
                last: `${config.API_BASE_URL}/fields?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error to get fields",
            data: null,
            links: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const getField = async (req, res) => {
    try {
        const field = await Field.findByPk(req.params.id);
        if (field) {
            res.status(200).json({
                success: true,
                message: "Field fetched successfully",
                data: field,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Field not found",
                data: null,
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to get field",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const createField = async (req, res) => {
    try {
        const field = await Field.create(req.body);
        res.status(201).json({
            success: true,
            message: "Field created successfully",
            data: field,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error to create field",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const updateField = async (req, res) => {
    try {
        const field = await Field.update(req.body, {
            where: { id_field: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Field updated successfully",
            data: field,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to update field",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const deleteField = async (req, res) => {
    try {
        const field = await Field.destroy({
            where: { id_field: req.params.id },
        });
        if (field) {
            res.status(200).json({
                success: true,
                message: "Field deleted successfully",
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Field not found",
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to delete field",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
};
