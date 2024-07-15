import Competition from "../models/competitionModel.js";

export const getCompetitions = async (req, res) => {
    try {
        const competitions = await Competition.findAll();
        res.status(200).json({
            success: true,
            message: "Competitions fetched successfully",
            data: competitions,
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
