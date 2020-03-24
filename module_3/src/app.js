import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(PORT, () => {
        console.log("app running on port: ", server.address().port);
    });
}

export default app;