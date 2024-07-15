import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Player from "./playerModel.js";
import Team from "./teamModel.js";

const TeamPlayer = sequelize.define(
    "team_player",
    {
        team_player_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        team_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        player_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
    },
    {
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

TeamPlayer.belongsTo(Team, { foreignKey: "team_id" });
TeamPlayer.belongsTo(Player, { foreignKey: "player_id" });

export default TeamPlayer;
