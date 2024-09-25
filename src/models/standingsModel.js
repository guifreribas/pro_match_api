import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Standings = sequelize.define(
	"standings",
	{
		id_standings: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		competition_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		team_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		competition_category_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			required: true,
		},
		matches_played: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		victories: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		draws: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		losses: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		goals_for: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		goals_against: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
		goals_difference: {
			type: DataTypes.VIRTUAL,
			get() {
				return (
					this.getDataValue("goals_for") -
					this.getDataValue("goals_against")
				);
			},
		},
		points: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			required: true,
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

// Standings.belongsTo(Match, { foreignKey: "match_id" });
// Standings.belongsTo(Player, { foreignKey: "player_id" });
// Standings.belongsTo(Team, { foreignKey: "team_id" });
// Standings.belongsTo(TeamPlayer, { foreignKey: "team_player_id" });

export default Standings;
