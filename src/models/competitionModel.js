import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Competition = sequelize.define(
    "competition",
    {
        id_competition: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        format: {
            type: DataTypes.ENUM(
                "SINGLE_ROUND",
                "DOUBLE_ROUND",
                "KNOCKOUT",
                "KNOCKOUT_DOUBLE",
                "KNOCKOUT_SINGLE"
            ),
            allowNull: false,
        },
        is_initialized: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            allowNull: true,
        },
        competition_type_id: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            allowNull: false,
        },
        organization_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user_id: {
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

export default Competition;
