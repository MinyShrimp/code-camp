import express from "express";
import config from "./src/config.js";

/* express settings */
const app = express();

/* middleware */
app.use( express.json() );

/* end-point */

// GET http://localhost:3000
app.get('/', ( req, res ) => {
    res.send( datas );
});

app.listen(config.port, config.ip);