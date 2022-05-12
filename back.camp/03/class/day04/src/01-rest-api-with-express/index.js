
import express from "express";
import bodyParser from "body-parser";
import config from "../00-config/config.js";

/* express */
const app = express();

/* middleware */
app.use(bodyParser.json());

/* endpoint */
// GET http://localhost:3000
app.get('/', ( req, res ) => {
    res.send('Hello World!');
});

// POST http://localhost:3000/eco
app.post('/eco', ( req, res ) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(config.port, config.ip);