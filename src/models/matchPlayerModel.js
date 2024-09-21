import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const MatchPlayer = sequelize.define(
	"match_player",
	{
		id_match_player: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
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
		team_player_id: {
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
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

// MatchPlayer.belongsTo(Match, { foreignKey: "match_id" });
// MatchPlayer.belongsTo(Player, { foreignKey: "player_id" });
// MatchPlayer.belongsTo(Team, { foreignKey: "team_id" });

export default MatchPlayer;
