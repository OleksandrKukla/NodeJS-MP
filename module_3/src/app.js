import express from 'express';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';
import cors from 'cors';

import { initialize as initializeComponents } from './components';
import dbConfig from './config/db.config';
import logger from './logger';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const loggerInstance = logger(app);

const connection = new Sequelize(dbConfig.connectionUrl, {
    logging: message => loggerInstance.info(message)
});

initializeComponents(app, connection);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log("app running on port: ", server.address().port);
});