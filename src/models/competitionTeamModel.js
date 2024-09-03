import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const CompetitionTeam = sequelize.define(
    "competition_team",
    {
        id_competition_team: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        competition_category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        team_id: {
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

// CompetitionTeam.belongsTo(CompetitionCategory, { foreignKey: "competition_category_id" });
// CompetitionTeam.belongsTo(Team, { foreignKey: "team_id" });

export default CompetitionTeam;
