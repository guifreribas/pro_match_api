import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    host: process.env.HOST_NAME,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000/api",
    NODE_ENV: process.env.NODE_ENV,
};

export default config;
