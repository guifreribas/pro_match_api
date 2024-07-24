import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define(
    "user",
    {
        id_user: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING(80),
            defaultValue: null,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN", "USER", "REFEREE"),
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
        ],
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
    }
);

export default User;
