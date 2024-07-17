import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Resource = sequelize.define(
    "resource",
    {
        id_resource: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("IMAGE", "VIDEO"),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

export default Resource;
