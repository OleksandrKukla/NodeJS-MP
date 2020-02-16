import express from 'express';
import bodyParser from 'body-parser';

import users from './users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

users(app);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log("app running on port: ", server.address().port);
});