import express from 'express';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';
import { initialize as initializeComponents } from './components';
import dbConfig from './config/db.config';
import logger from './logger';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

logger(app);

const connection = new Sequelize(dbConfig.connectionUrl);

initializeComponents(app, connection);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log("app running on port: ", server.address().port);
});