import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Card = sequelize.define(
	"cards",
	{
		id_card: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		card_type: {
			type: DataTypes.ENUM("YELLOW", "RED", "BLUE"),
			allowNull: false,
			required: true,
		},
		minute: {
			type: DataTypes.INTEGER(3),
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
		match_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
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

// Card.belongsTo(Match, { foreignKey: "match_id" });
// Card.belongsTo(Player, { foreignKey: "player_id" });
// Card.belongsTo(Team, { foreignKey: "team_id" });

export default Card;
