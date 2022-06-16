
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors"

import config from "../00-config/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";

/* express settings */
const app = express();
const swaggerSpec = swaggerJsdoc(config.swaggerOptions);
const corsOptions = {
    origin: 'http://localhost:5500'
};

/* data */
const datas = [];
let autoIncreaseIndex = 0;

/* middleware */
app.use( cors(corsOptions) );
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', ( req, res ) => {
    const body = req.body;
    const myPhone = body.phone;

    const isValid = isValidPhoneNumber( myPhone );
    if( isValid ) {
        const myToken = getRandomToken( 6 );
        const responseMsg = sendSMS(myPhone, myToken);
        res.send(responseMsg);
    } else {
        res.status(400).send("인증 실패");
    }
});

app.listen(config.port, config.ip);