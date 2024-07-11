export const getSports = async (req, res) => {
    try {
        const sports = await Sport.findAll();
        res.status(200).json({
            success: true,
            message: "Sports fetched successfully",
            data: sports,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get sports" });
    }
};

export const getSport = async (req, res) => {
    try {
        const sport = await Sport.findByPk(req.params.id);
        if (sport) {
            res.status(200).json({
                success: true,
                message: "Sport fetched successfully",
                data: sport,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Sport not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get sport" });
    }
};

export const createSport = async (req, res) => {
    try {
        const sport = await Sport.create(req.body);
        res.status(201).json({
            success: true,
            message: "Sport created successfully",
            data: sport,
            links: {
                self: `${config.API_BASE_URL}/sports/${sport.id_sport}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create sport" });
    }
};

export const updateSport = async (req, res) => {
    try {
        const sport = await Sport.update(req.body, {
            where: { id_sport: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Sport updated successfully",
            data: sport,
            links: {
                self: `${config.API_BASE_URL}/sports/${sport.id_sport}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update sport" });
    }
};

export const deleteSport = async (req, res) => {
    try {
        const sport = await Sport.destroy({
            where: { id_sport: req.params.id },
        });
        if (sport) {
            res.status(200).json({
                success: true,
                message: "Sport deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Sport not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete sport" });
    }
};
