import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Team = sequelize.define(
    "team",
    {
        id_team: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(80),
            defaultValue: null,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

export default Team;
