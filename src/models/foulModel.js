import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Foul = sequelize.define(
	"foul",
	{
		id_foul: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		minute: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
		},
		part: {
			type: DataTypes.ENUM(
				"FIRST_HALF",
				"SECOND_HALF",
				"EXTRA_TIME_FIRST_HALF",
				"EXTRA_TIME_SECOND_HALF",
				"PENALTIES"
			),
			allowNull: false,
			required: true,
		},
		player_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		team_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		match_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
	},
	{
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

// Foul.belongsTo(Match, { foreignKey: "match_id" });
// Foul.belongsTo(Player, { foreignKey: "player_id" });
// Foul.belongsTo(Team, { foreignKey: "team_id" });

export default Foul;
