import config from "../config/config.js";
import Goal from "../models/goalModel.js";

export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        console.log({ goals });
        res.status(200).json({
            success: true,
            message: "Goals fetched successfully",
            data: goals,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get goals" });
    }
};

export const getGoal = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (goal) {
            res.status(200).json({
                success: true,
                message: "Goal fetched successfully",
                data: goal,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Goal not found",
                data: {
                    id_goal: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get goal" });
    }
};

export const createGoal = async (req, res) => {
    try {
        const goal = await Goal.create(req.body);
        res.status(201).json({
            success: true,
            message: "Goal created successfully",
            data: goal,
            links: {
                self: `${config.API_BASE_URL}/goals/${goal.id_goal}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create goal" });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.update(req.body, {
            where: { id_goal: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Goal updated successfully",
            data: goal,
            links: {
                self: `${config.API_BASE_URL}/goals/${goal.id_goal}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update goal" });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.destroy({
            where: { id_goal: req.params.id },
        });
        if (goal) {
            res.status(200).json({
                success: true,
                message: "Goal deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Goal not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete goal" });
    }
};
