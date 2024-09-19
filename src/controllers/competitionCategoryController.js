import CompetitionCategory from "../models/competitionCategoryModel.js";
import config from "../config/config.js";

export const getCompetitionCategories = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const whereConditions = {};
	if (req.query.competition_id) {
		whereConditions.competition_id = req.query.competition_id;
	}
	if (req.query.category_id) {
		whereConditions.category_id = req.query.category_id;
	}
	if (req.query.season) {
		whereConditions.season = req.query.season;
	}

	try {
		const { count, rows } = await CompetitionCategory.findAndCountAll({
			where: whereConditions,
			offset,
			limit,
		});
		const totalPages = Math.ceil(count / limit);
		const previousLink =
			page > 1
				? `${config.API_BASE_URL}/competitionCategories?page=${
						page - 1
				  }`
				: null;
		const nextLink =
			page < totalPages
				? `${config.API_BASE_URL}/competitionCategories?page=${
						page + 1
				  }`
				: null;

		res.status(200).json({
			success: true,
			message: "CompetitionCategories fetched successfully",
			data: {
				items: rows.map((competitionCategory) => ({
					id_competition_category:
						competitionCategory.id_competition_category,
					competition_id: competitionCategory.competition_id,
					category_id: competitionCategory.category_id,
					user_id: competitionCategory.user_id,
					season: competitionCategory.season,
					createdAt: competitionCategory.createdAt,
					updatedAt: competitionCategory.updatedAt,
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
				self: `${config.API_BASE_URL}/competitionCategories?page=${page}`,
				first: `${config.API_BASE_URL}/competitionCategories?page=1`,
				last: `${config.API_BASE_URL}/competitionCategories?page=${totalPages}`,
				next: nextLink,
				previous: previousLink,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error to get competitionCategories" });
	}
};

export const getCompetitionCategory = async (req, res) => {
	try {
		const competitionCategory = await CompetitionCategory.findByPk(
			req.params.id
		);
		if (competitionCategory) {
			res.status(200).json({
				success: true,
				message: "CompetitionCategory fetched successfully",
				data: competitionCategory,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "CompetitionCategory not found",
				data: {
					id: req.params.id,
				},
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to get competitionCategory" });
	}
};

export const createCompetitionCategory = async (req, res) => {
	try {
		const competitionCategory = await CompetitionCategory.create(req.body);
		res.status(201).json({
			success: true,
			message: "CompetitionCategory created successfully",
			data: competitionCategory,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({ error: "Error to create competitionCategory" });
	}
};

export const updateCompetitionCategory = async (req, res) => {
	console.log(req.body);
	console.log(req.params.id);
	try {
		const competitionCategory = await CompetitionCategory.update(req.body, {
			where: { id_competition_category: req.params.id },
		});

		res.status(200).json({
			status: "success",
			message: "CompetitionCategory updated successfully",
			data: competitionCategory,
			timestamp: new Date().toISOString(),
		});
		console.log("CompetitionCategory REsponse:", competitionCategory);
	} catch (error) {
		res.status(500).json({ error: "Error to update competitionCategory" });
	}
};

export const deleteCompetitionCategory = async (req, res) => {
	try {
		const competitionCategory = await CompetitionCategory.destroy({
			where: { id_competition_category: req.params.id },
		});
		if (competitionCategory) {
			res.status(200).json({
				success: true,
				message: "CompetitionCategory deleted successfully",
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(404).json({
				success: false,
				message: "CompetitionCategory not found",
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		res.status(500).json({ error: "Error to delete competitionCategory" });
	}
};
