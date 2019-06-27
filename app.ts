import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorHandler";
import notFoundHandler from "express";
import compression from "compression";
import logger from "morgan";
import initDatabaseStreams from "./src/mongo/streams";
import apiRoutes from "./src/api";
import { databaseInit } from "./src/mongo/initDb";

const app = express();

databaseInit();
initDatabaseStreams();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
