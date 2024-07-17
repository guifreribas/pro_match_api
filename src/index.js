//app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

import authRouter from "../src/routes/authRoutes.js";
import cardRouter from "../src/routes/cardsRoutes.js";
import cardsRouter from "../src/routes/cardsRoutes.js";
import categoriesRouter from "../src/routes/categoriesRoutes.js";
import competitionsRoutes from "./routes/competitionsRoutes.js";
import foulRouter from "../src/routes/foulRoutes.js";
import goalRouter from "../src/routes/goalRoutes.js";
import matchesRouter from "../src/routes/matchesRoutes.js";
import organizationsRouter from "../src/routes/organizationsRoutes.js";
import playersRouter from "../src/routes/playersRoutes.js";
import resourcesRouter from "./routes/resourcesRoutes.js";
import resultsRouter from "../src/routes/resultsRoutes.js";
import sportsRouter from "../src/routes/sportsRoutes.js";
import teamsRouter from "../src/routes/teamsRoutes.js";
import usersRouter from "../src/routes/usersRoutes.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:4200",
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/card", cardRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/competition", competitionsRoutes);
app.use("/api/fouls", foulRouter);
app.use("/api/goals", goalRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/organizations", organizationsRouter);
app.use("/api/players", playersRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/results", resultsRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/users", usersRouter);

app.listen(config.port, () => console.log("Server started", config.port));
