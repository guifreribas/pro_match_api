import Match from "../models/matchModel.js";
import Team from "../models/teamModel.js";
import Player from "../models/playerModel.js";
import Competition from "../models/competitionModel.js";
import Category from "../models/categoryModel.js";
import Organization from "../models/organizationModel.js";

export const getOverview = async (req, res) => {
	const userId = req.user.id_user;

	try {
		const [
			matchCount,
			teamCount,
			playerCount,
			competitionCount,
			categoryCount,
			organizationCount,
		] = await Promise.all([
			Match.count({ where: { user_id: userId } }),
			Team.count({ where: { user_id: userId } }),
			Player.count({ where: { user_id: userId } }),
			Competition.count({ where: { user_id: userId } }),
			Category.count({ where: { user_id: userId } }),
			Organization.count({ where: { user_id: userId } }),
		]);

		res.status(200).json({
			success: true,
			message: "Overview fetched successfully",
			data: {
				matchCount,
				teamCount,
				playerCount,
				competitionCount,
				categoryCount,
				organizationCount,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Error to get overview",
			message: error,
		});
	}
};
