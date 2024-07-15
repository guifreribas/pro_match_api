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
        type: {
            type: DataTypes.ENUM("LIGUE", "TOURNAMENT"),
            allowNull: false,
        },
        subtype: {
            type: DataTypes.ENUM("SINGLE_ROUND", "DOUBLE_ROUND", "KNOCKOUT"),
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
