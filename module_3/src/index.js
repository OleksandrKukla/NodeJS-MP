import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import { initialize as initializeComponents } from './components';
import logger from './logger';
import app from './app';

dotenv.config();

const loggerInstance = logger(app);

const connection = new Sequelize(process.env.DB_CONNECTION_URL, {
    logging: message => loggerInstance.info(message)
});

initializeComponents(app, connection);

export default app;