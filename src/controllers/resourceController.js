import config from "../config/config.js";
import Resource from "../models/resourceModel.js";
import { extractFileName } from "../utils/utils.js";

export const getResources = async (req, res) => {
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

    try {
        const { count, rows } = await Resource.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/resources?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/resources?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Resources fetched successfully",
            data: {
                items: rows.map((resource) => ({
                    id_resource: resource.id_resource,
                    name: resource.name,
                    type: resource.type,
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
                self: `${config.API_BASE_URL}/resources?page=${page}`,
                first: `${config.API_BASE_URL}/resources?page=1`,
                last: `${config.API_BASE_URL}/resources?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error to get resources",
            data: null,
            links: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const getResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (resource) {
            res.status(200).json({
                success: true,
                message: "Resource fetched successfully",
                data: resource,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Resource not found",
                data: null,
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to get resource",
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
};

export const createResource = async (req, res) => {
    if (!req.body.type) {
        return res.status(400).json({
            success: false,
            message: "Error to create resource",
            timestamp: new Date().toISOString(),
        });
    }
    try {
        const imageUrl = req.file.path;
        const publicId = extractFileName(req.file.path);
        const type = req.body.type || "IMAGE";

        const resource = await Resource.create({
            name: publicId,
            type,
        });

        res.status(200).json({
            success: true,
            message: "Imatge pujada correctament",
            data: resource,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error to create resource",
            timestamp: new Date().toISOString(),
        });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.destroy({
            where: { id_resource: req.params.id },
        });
        if (resource) {
            res.status(200).json({
                success: true,
                message: "Resource deleted successfully",
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Resource not found",
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to delete resource",
            timestamp: new Date().toISOString(),
        });
    }
};
