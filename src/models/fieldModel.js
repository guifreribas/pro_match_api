import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Field = sequelize.define(
    "field",
    {
        id_field: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(
                "INDOOR_SOCCER_TURF",
                "INDOOR_SOCCER",
                "SEVEN_A_SIDE_FOTBALL"
            ),
            allowNull: false,
        },
        organization_id: {
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

Field.belongsTo(Organization, { foreignKey: "organization_id" });
Field.belongsTo(Competition, { foreignKey: "competition_id" });
Field.belongsTo(User, { foreignKey: "user_id" });

export default Field;
