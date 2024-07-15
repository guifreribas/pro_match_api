import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
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
