export const getTeamPlayers = async (req, res) => {
    try {
        const teamPlayers = await TeamPlayer.findAll();
        res.status(200).json({
            success: true,
            message: "TeamPlayers fetched successfully",
            data: teamPlayers,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get teamPlayers" });
    }
};

export const getTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.findByPk(req.params.id);
        if (teamPlayer) {
            res.status(200).json({
                success: true,
                message: "TeamPlayer fetched successfully",
                data: teamPlayer,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "TeamPlayer not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get teamPlayer" });
    }
};

export const createTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.create(req.body);
        res.status(201).json({
            success: true,
            message: "TeamPlayer created successfully",
            data: teamPlayer,
            links: {
                self: `${config.API_BASE_URL}/teamPlayers/${teamPlayer.id_team_player}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create teamPlayer" });
    }
};

export const updateTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.update(req.body, {
            where: { id_team_player: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "TeamPlayer updated successfully",
            data: teamPlayer,
            links: {
                self: `${config.API_BASE_URL}/teamPlayers/${teamPlayer.id_team_player}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update teamPlayer" });
    }
};

export const deleteTeamPlayer = async (req, res) => {
    try {
        const teamPlayer = await TeamPlayer.destroy({
            where: { id_team_player: req.params.id },
        });
        if (teamPlayer) {
            res.status(200).json({
                success: true,
                message: "TeamPlayer deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "TeamPlayer not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete teamPlayer" });
    }
};
