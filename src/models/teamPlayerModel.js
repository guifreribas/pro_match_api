import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const TeamPlayer = sequelize.define(
    "team_player",
    {
        id_team_player: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        player_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        player_number: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
        },
    },
    {
        tableName: "teams_players",
        indexes: [
            {
                unique: true,
                fields: ["team_id", "player_id"],
            },
        ],
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

// TeamPlayer.belongsTo(Team, { foreignKey: "team_id" });
// TeamPlayer.belongsTo(Player, { foreignKey: "player_id" });
// TeamPlayer.belongsTo(User, { foreignKey: "user_id" });

export default TeamPlayer;
