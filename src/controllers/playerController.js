export const getPlayers = async (req, res) => {
    try {
        const players = await Player.findAll();
        res.status(200).json({
            success: true,
            message: "Players fetched successfully",
            data: players,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get players" });
    }
};

export const getPlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (player) {
            res.status(200).json({
                success: true,
                message: "Player fetched successfully",
                data: player,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Player not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get player" });
    }
};

export const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json({
            success: true,
            message: "Player created successfully",
            data: player,
            links: {
                self: `${config.API_BASE_URL}/players/${player.id_player}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create player" });
    }
};

export const updatePlayer = async (req, res) => {
    try {
        const player = await Player.update(req.body, {
            where: { id_player: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Player updated successfully",
            data: player,
            links: {
                self: `${config.API_BASE_URL}/players/${player.id_player}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update player" });
    }
};

export const deletePlayer = async (req, res) => {
    try {
        const player = await Player.destroy({
            where: { id_player: req.params.id },
        });
        if (player) {
            res.status(200).json({
                success: true,
                message: "Player deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Player not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete player" });
    }
};
