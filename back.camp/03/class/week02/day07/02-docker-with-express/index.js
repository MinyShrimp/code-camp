
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import swaggerOptions from "./swagger/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";

/* express settings */
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const corsOptions = {
    origin: 'http://localhost:5500'
};

const __dirname = path.resolve();
dotenv.config({
    path: path.join(__dirname, '.env')
});

/* data */
const datas = [];
let autoIncreaseIndex = 0;

/* middleware */
app.use( cors(corsOptions) );
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', async ( req, res ) => {
    const body = req.body;
    const myPhone = body.phone;

    const isValid = isValidPhoneNumber( myPhone );
    if( isValid ) {
        const myToken = getRandomToken( 6 );

        const isOK = await sendSMS(myPhone, myToken);
        if( isOK ) {
            res.send("발송 성공");
        } else {
            res.status(400).send("발송 실패");
        }
    } else {
        res.status(400).send("발송 실패");
    }
});

app.listen(process.env.PORT, process.env.IP);