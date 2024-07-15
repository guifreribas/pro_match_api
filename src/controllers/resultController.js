import Result from "../models/resultModel.js";

export const getResults = async (req, res) => {
    try {
        const results = await Result.findAll();
        res.status(200).json({
            success: true,
            message: "Results fetched successfully",
            data: results,
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
