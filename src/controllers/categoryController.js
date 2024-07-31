import { Op } from "sequelize";
import Category from "../models/categoryModel.js";
import config from "../config/config.js";

export const getCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.name) {
        whereConditions.name = { [Op.like]: `%${req.query.name}%` };
    }
    if (req.query.organization_id) {
        whereConditions.organization_id = req.query.organization_id;
    }
    if (req.query.competition_id) {
        whereConditions.competition_id = req.query.competition_id;
    }
    if (req.query.user_id) {
        whereConditions.user_id = req.query.user_id;
    }

    try {
        const { count, rows } = await Category.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/categories?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/categories?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: {
                items: rows.map((category) => ({
                    id_category: category.id_category,
                    name: category.name,
                    organization_id: category.organization_id,
                    competition_id: category.competition_id,
                    user_id: category.user_id,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
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
                self: `${config.API_BASE_URL}/categories?page=${page}`,
                first: `${config.API_BASE_URL}/categories?page=1`,
                last: `${config.API_BASE_URL}/categories?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error to get categories" });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).json({
                success: true,
                message: "Category fetched successfully",
                data: category,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Category not found",
                data: {
                    id_category: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get category" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
            links: {
                self: `${config.API_BASE_URL}/categories/${category.id_category}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create category" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.update(req.body, {
            where: { id_category: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
            links: {
                self: `${config.API_BASE_URL}/categories/${category.id_category}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.destroy({
            where: { id_category: req.params.id },
        });
        if (category) {
            res.status(200).json({
                success: true,
                message: "Category deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Category not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete category" });
    }
};
