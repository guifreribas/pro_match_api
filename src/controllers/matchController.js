export const getMatches = async (req, res) => {
    try {
        const matches = await Match.findAll();
        res.status(200).json({
            success: true,
            message: "Matches fetched successfully",
            data: matches,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get matches" });
    }
};

export const getMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);
        if (match) {
            res.status(200).json({
                success: true,
                message: "Match fetched successfully",
                data: match,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Match not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get match" });
    }
};

export const createMatch = async (req, res) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json({
            success: true,
            message: "Match created successfully",
            data: match,
            links: {
                self: `${config.API_BASE_URL}/matches/${match.id_match}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create match" });
    }
};

export const updateMatch = async (req, res) => {
    try {
        const match = await Match.update(req.body, {
            where: { id_match: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Match updated successfully",
            data: match,
            links: {
                self: `${config.API_BASE_URL}/matches/${match.id_match}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update match" });
    }
};

export const deleteMatch = async (req, res) => {
    try {
        const match = await Match.destroy({
            where: { id_match: req.params.id },
        });
        if (match) {
            res.status(200).json({
                success: true,
                message: "Match deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Match not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete match" });
    }
};
