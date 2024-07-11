export const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.status(200).json({
            success: true,
            message: "Teams fetched successfully",
            data: teams,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get teams" });
    }
};

export const getTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);
        if (team) {
            res.status(200).json({
                success: true,
                message: "Team fetched successfully",
                data: team,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Team not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get team" });
    }
};

export const createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: team,
            links: {
                self: `${config.API_BASE_URL}/teams/${team.id_team}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create team" });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const team = await Team.update(req.body, {
            where: { id_team: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Team updated successfully",
            data: team,
            links: {
                self: `${config.API_BASE_URL}/teams/${team.id_team}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update team" });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const team = await Team.destroy({
            where: { id_team: req.params.id },
        });
        if (team) {
            res.status(200).json({
                success: true,
                message: "Team deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Team not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete team" });
    }
};
