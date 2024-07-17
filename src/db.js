import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from "./config/config.js";

dotenv.config();

const sequelize = new Sequelize(
    // config.database.database,
    // config.database.username,
    // config.database.password,
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        // host: config.database.host,
        host: process.env.HOST_NAME,
        dialect: "mysql",
    }
);

const syncroModel = async () => {
    try {
        // Sincronizar el modelo con la base de datos (crear la tabla si no existe)
        // Con "alter: true" se sincronizan las columnas y se crean/eliminan si fuera necesario
        await sequelize.sync({ force: false }).then(() => {
            console.log("Models synced with the database");
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await syncroModel();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, testConnection };
