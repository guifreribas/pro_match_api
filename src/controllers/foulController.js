import Foul from "../models/foulModel.js";

export const getFouls = async (req, res) => {
    try {
        const fouls = await Foul.findAll();
        res.status(200).json({
            success: true,
            message: "Fouls fetched successfully",
            data: fouls,
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
