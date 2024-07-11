export const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        res.status(200).json({
            success: true,
            message: "Organizations fetched successfully",
            data: organizations,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get organizations" });
    }
};

export const getOrganization = async (req, res) => {
    try {
        const organization = await Organization.findByPk(req.params.id);
        if (organization) {
            res.status(200).json({
                success: true,
                message: "Organization fetched successfully",
                data: organization,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Organization not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get organization" });
    }
};

export const createOrganization = async (req, res) => {
    try {
        const organization = await Organization.create(req.body);
        res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
            links: {
                self: `${config.API_BASE_URL}/organizations/${organization.id_organization}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create organization" });
    }
};

export const updateOrganization = async (req, res) => {
    try {
        const organization = await Organization.update(req.body, {
            where: { id_organization: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Organization updated successfully",
            data: organization,
            links: {
                self: `${config.API_BASE_URL}/organizations/${organization.id_organization}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update organization" });
    }
};

export const deleteOrganization = async (req, res) => {
    try {
        const organization = await Organization.destroy({
            where: { id_organization: req.params.id },
        });
        if (organization) {
            res.status(200).json({
                success: true,
                message: "Organization deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Organization not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete organization" });
    }
};
