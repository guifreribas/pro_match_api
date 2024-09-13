import Competition from "../models/competitionModel.js";
import config from "../config/config.js";
import CompetitionType from "#src/models/competitionTypeModel.js";
import Category from "#src/models/categoryModel.js";
import Organization from "#src/models/organizationModel.js";
import CompetitionCategory from "#src/models/competitionCategoryModel.js";
import { sequelize } from "#src/db.js";
import { Op } from "sequelize";

export const getCompetitions = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;
	const query = req.query;

	const whereConditions = {};
	if (query.q) {
		whereConditions.name = { [Op.like]: `%${query.q}%` };
	}
	if (query.id_competition) {
		whereConditions.id_competition = query.id_competition;
	}
	if (query.name) {
		whereConditions.name = query.name;
	}
	if (query.format) {
		whereConditions.format = query.format;
	}
	if (query.is_initialized) {
		whereConditions.is_initialized = query.is_initialized;
	}
	if (query.organization_id) {
		whereConditions.organization_id = query.organization_id;
	}
	if (query.competition_type_id) {
		whereConditions.competition_type_id = query.competition_type_id;
	}
	if (req.user.id_user) {
		whereConditions.user_id = req.user.id_user;
	}

	try {
		let include = [];
		const includeCompetitionType = query.includeCompetitionType === "true";
		const includeOrganization = query.includeOrganization === "true";
		const includeCompetitionCategory =
			query.includeCompetitionCategory === "true";

		if (includeCompetitionType) {
			include.push({
				model: CompetitionType,
				attributes: ["name"],
			});
		}
		if (includeOrganization) {
			include.push({
				model: Organization,
				attributes: ["name", "address", "logo"],
			});
		}
		if (includeCompetitionCategory) {
			include.push({
				model: CompetitionCategory,
				attributes: ["id_competition_category", "season"],
				include: [
					{
						model: Category,
						attributes: ["name", "gender"],
					},
				],
			});
		}

		const { count, rows } = await Competition.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
			include,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1
				? `${config.API_BASE_URL}/competitions?page=${page - 1}`
				: null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/competitions?page=${page + 1}`
				: null;

		res.status(200).json({
			success: true,
			message: "Competitions fetched successfully",
			data: {
				items: rows.map((competition) => ({
					id_competition: competition.id_competition,
					name: competition.name,
					format: competition.format,
					isInitizalized: competition?.is_initialized === 1,
					competitionType: competition?.competition_type
						? {
								name: competition.competition_type.name,
						  }
						: null,
					organization: competition?.organization
						? {
								name: competition.organization.name,
								address: competition.organization.address,
								logo: competition.organization.logo,
						  }
						: null,

					competitionCategory: competition?.competition_category
						? {
								competition_category_id:
									competition.competition_category
										.id_competition_category,
								season: competition.competition_category.season,
								category: competition.competition_category
									.category
									? {
											name: competition
												.competition_category.category
												.name,
											gender: competition
												.competition_category.category
												.gender,
									  }
									: null,
						  }
						: null,
					competition_type_id: competition.competition_type_id,
					createdAt: competition.createdAt,
					updatedAt: competition.updatedAt,
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
				self: `${config.API_BASE_URL}/competitions?page=${page}`,
				first: `${config.API_BASE_URL}/competitions?page=1`,
				last: `${config.API_BASE_URL}/competitions?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Error to get competitions",
			message: error.message,
		});
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
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create competition" });
	}
};

export const createCompetitionFull = async (req, res) => {
	if (!req.user.id_user) {
		return res.status(401).json({
			success: false,
			message: "You must be logged in to create a competition",
			timestamp: new Date().toISOString(),
		});
	}
	console.log(req.body);
	if (
		!req.body.name ||
		!req.body.format ||
		!req.body.competition_type_id ||
		!req.body.organization_id ||
		!req.body.season ||
		!req.body.category_id
	) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields",
			timestamp: new Date().toISOString(),
		});
	}

	const transaction = await sequelize.transaction();

	try {
		const createdCompetition = await Competition.create(
			{
				name: req.body.name,
				format: req.body.format,
				is_initialized: false,
				competition_type_id: req.body.competition_type_id,
				organization_id: req.body.organization_id,
				user_id: req.user.id_user,
			},
			{ transaction }
		);
		console.log(createdCompetition);
		if (!createdCompetition) {
			await transaction.rollback();
			return res.status(400).json({
				success: false,
				message: "Error to create competition",
				data: null,
				timestamp: new Date().toISOString(),
			});
		}

		const competitionCategory = await CompetitionCategory.create(
			{
				competition_id: createdCompetition.id_competition,
				category_id: req.body.category_id,
				season: req.body.season,
				user_id: req.user.id_user,
			},
			{ transaction }
		);
		if (!competitionCategory) {
			await transaction.rollback();
			return res.status(400).json({
				success: false,
				message: "Error to create competitionCategory",
				data: null,
				timestamp: new Date().toISOString(),
			});
		}

		await transaction.commit();

		res.status(201).json({
			success: true,
			message: "Competition created successfully",
			data: {
				id_competition: createdCompetition.id_competition,
				name: createdCompetition.name,
				format: createdCompetition.format,
				isInitizalized: createdCompetition?.is_initialized === 1,
				competition_type_id: createdCompetition.competition_type_id,
				competitionCategory,
				createdAt: createdCompetition.createdAt,
				updatedAt: createdCompetition.updatedAt,
			},

			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error details:", error); // Això mostrarà més informació de l'error
		await transaction.rollback();
		res.status(500).json({
			success: false,
			message: "Error to create competition",
			error: error.message, // Això inclourà el missatge d'error al cos de la resposta
			timestamp: new Date().toISOString(),
		});
		// res.status(500).json({ error: "Error to create competition" });
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
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Competition not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete competition" });
	}
};
