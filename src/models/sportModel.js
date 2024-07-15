import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Sport = sequelize.define(
    "sport",
    {
        id_sport: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.ENUM(
                "FUTBOL",
                "BASQUET",
                "VOLEIBOL",
                "PADEL",
                "EA SPORT",
                "GENERIC"
            ),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
    }
);

export default Sport;
