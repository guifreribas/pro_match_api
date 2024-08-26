import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Category = sequelize.define(
    "category",
    {
        id_category: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        organization_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        competition_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

// Category.belongsTo(Organization, { foreignKey: "organization_id" });
// Category.belongsTo(Competition, { foreignKey: "competition_id" });
// Category.belongsTo(User, { foreignKey: "user_id" });

export default Category;
