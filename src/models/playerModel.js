import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Player = sequelize.define(
    "player",
    {
        id_player: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        dni: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(80),
            allowNull: true,
            defaultValue: null,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
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

// Player.belongsTo(User, { foreignKey: "user_id" });
// Player.hasMany(TeamPlayer, { foreignKey: "player_id" });

export default Player;
