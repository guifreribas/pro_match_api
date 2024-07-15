import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Match from "./matchModel.js";
import Player from "./playerModel.js";
import Team from "./teamModel.js";

const Goal = sequelize.define(
    "goal",
    {
        id_goal: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        minute: {
            type: DataTypes.INTEGER(3).UNSIGNED,
            allowNull: false,
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
        },
        player_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        match_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Goal.belongsTo(Match, { foreignKey: "match_id" });
Goal.belongsTo(Player, { foreignKey: "player_id" });
Goal.belongsTo(Team, { foreignKey: "team_id" });

export default Goal;
