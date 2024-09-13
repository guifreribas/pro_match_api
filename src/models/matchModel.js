import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Match = sequelize.define(
	"match",
	{
		id_match: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM(
				"SCHEDULED",
				"IN_PROGRESS",
				"FINISHED",
				"POSTPONED",
				"CANCELED",
				"ABANDONED",
				"TO_BE_SCHEDULED"
			),
			defaultValue: "TO_BE_SCHEDULED",
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		local_team: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		visitor_team: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		competition_category_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

// Match.belongsTo(Category, { foreignKey: "category_id" });
// Match.belongsTo(Team, { foreignKey: "local_team" });
// Match.belongsTo(Team, { foreignKey: "visitor_team" });

export default Match;
