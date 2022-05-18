
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import swaggerOptions from "./swagger/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";
import { Board } from "./models/board.model.js";

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

mongoose.connect("mongodb://my-db:27017/MyDocker");

/* data */
const datas = [];
let autoIncreaseIndex = 0;

/* middleware */
app.use( cors(corsOptions) );
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */

////////////////////////////////////////////////////////////////////////////////////////////////
// Hello
app.get('/', ( _, res ) => {
    res.send("hello world!");
})

// Board
app.get('/boards', async ( req, res ) => {
    const result = await Board.find();
    res.send(result);
});

app.post('/boards', async ( req, res ) => {
    const body = req.body;

    const board = new Board({
        writer: body.writer,
        title:  body.title,
        contents: body.contents
    });
    await board.save();

    res.send("hello world!");
});

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