import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import { Routing } from './router';
import { sequelize } from './models';
import { requestLogger } from './utils/requestLogger';



const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', Routing());

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        return console.log(`Express server is listening at http://localhost:${PORT}`);
    })
})
