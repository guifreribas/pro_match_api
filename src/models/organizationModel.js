import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

import Competition from "./competitionModel.js";
import User from "./userModel.js";

const Organization = sequelize.define(
    "organization",
    {
        id_organization: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING(255),
            defaultValue: null,
            allowNull: true,
        },
        competition_id: {
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

Organization.belongsTo(Competition, { foreignKey: "competition_id" });
Organization.belongsTo(User, { foreignKey: "user_id" });

export default Organization;
