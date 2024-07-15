import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Match from "./matchModel.js";

const Result = sequelize.define(
    "result",
    {
        id_result: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        match_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        local_team_goals: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
        },
        visitor_team_goals: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

Result.belongsTo(Match, { foreignKey: "match_id" });

export default Result;
