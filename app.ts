import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import apiRoutes from "./src/api";
import errorHandler from "./src/middleware/errorHandler.middleware";
import notFoundHandler from "./src/middleware/notFoundHandler.middleware";
import swagger from 'swagger-ui-express'
import data from './swagger.json';

var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));
app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
