import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
<<<<<<< HEAD
import apiRoutes from "./src/api/index.api";
=======
import apiRoutes from "./src/api";
>>>>>>> 57e7e173847416b2275bfb5e222b6cf6d36eaef7
import errorHandler from "./src/middleware/errorHandler.middleware";
import notFoundHandler from "./src/middleware/notFoundHandler.middleware";
import { databaseInit } from "./src/mongo/initDb";
import databaseStreamsInit from "./src/mongo/streams";
import './src/prototypes'

const app = express();

databaseInit();
databaseStreamsInit();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
