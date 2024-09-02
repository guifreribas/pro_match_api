import Organization from "../models/organizationModel.js";
import config from "../config/config.js";

export const getOrganizations = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    if (req.query.name) {
        whereConditions.name = req.query.name;
    }
    if (req.query.logo) {
        whereConditions.logo = req.query.logo;
    }
    if (req.query.user_id) {
        whereConditions.user_id = req.query.user_id;
    }

    try {
        const { count, rows } = await Organization.findAndCountAll({
            where: whereConditions,
            offset,
            limit,
        });
        const totalPages = Math.ceil(count / limit);
        const previousLink =
            page > 1
                ? `${config.API_BASE_URL}/organizations?page=${page - 1}`
                : null;
        const nextLink =
            page < totalPages
                ? `${config.API_BASE_URL}/organizations?page=${page + 1}`
                : null;

        res.status(200).json({
            success: true,
            message: "Organizations fetched successfully",
            data: {
                items: rows.map((organization) => ({
                    id_organization: organization.id_organization,
                    name: organization.name,
                    address: organization.address,
                    logo: organization.logo,
                    user_id: organization.user_id,
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt,
                })),
                itemCount: rows.length,
                totalItems: count,
                currentPage: page,
                pageSize: limit,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
            links: {
                self: `${config.API_BASE_URL}/organizations?page=${page}`,
                first: `${config.API_BASE_URL}/organizations?page=1`,
                last: `${config.API_BASE_URL}/organizations?page=${totalPages}`,
                next: nextLink,
                previous: previousLink,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error);
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
