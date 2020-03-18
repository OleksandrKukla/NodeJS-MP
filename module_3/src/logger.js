import winston from 'winston';
import config from './config/logger.config';

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(config.file),
        new winston.transports.Console(config.console)
    ],
    exitOnError: false,
});

export default app => {
    app.use((req, res, next) => {
        // unsafe - no filter for sensitive data
        logger.info(req.originalUrl, { data: req.body });
        next();
    });

    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.status(500).send('Something went wrong');
        next();
    });

    process
        .on('unhandledRejection', error => {
            logger.error(error);
        })
        .on('uncaughtException', error => {
            logger.error(error);
        });

    return logger;
}