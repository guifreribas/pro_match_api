import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const CompetitionCategory = sequelize.define(
    "competition_category",
    {
        id_competition_category: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        competition_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

// CompetitionCategory.belongsTo(Competition, { foreignKey: "competition_id" });
// CompetitionCategory.belongsTo(Category, { foreignKey: "category_id" });

export default CompetitionCategory;
