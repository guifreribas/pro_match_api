import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const CompetitionType = sequelize.define(
    "competition_type",
    {
        id_competition_type: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

export default CompetitionType;
