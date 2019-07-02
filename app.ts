import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import apiRoutes from "./src/api";
import errorHandler from "./src/middleware/errorHandler.middleware";
import notFoundHandler from "./src/middleware/notFoundHandler.middleware";
import { databaseInit } from "./src/mongo/initDb";
import initDatabaseStreams from "./src/mongo/streams";

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

export default app;
