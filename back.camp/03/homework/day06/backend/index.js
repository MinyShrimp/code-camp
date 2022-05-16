import express        from "express";
import swaggerUi      from "swagger-ui-express";
import swaggerJsdoc   from "swagger-jsdoc";
import cors           from "cors";

import swaggerOptions from "./swagger/config.js";

/* Data */
const Users = [
    {
        email: "aaa@gamil.com",
        name: "철수",
        phone: "010-1111-1111",
        personal: "220512-1111111",
        prefer: "https://naver.com"
    }, 
    {
        email: "bbb@gamil.com",
        name: "영희",
        phone: "010-2222-2222",
        personal: "220512-2222222",
        prefer: "https://gmail.com"
    }, 
    {
        email: "ccc@gamil.com",
        name: "훈이",
        phone: "010-3333-3333",
        personal: "220512-3333333",
        prefer: "https://yahoo.com"
    }, 
    {
        email: "ddd@gamil.com",
        name: "맹구",
        phone: "010-4444-4444",
        personal: "220512-4444444",
        prefer: "https://nate.com"
    }, 
    {
        email: "eee@gamil.com",
        name: "짱구",
        phone: "010-5555-5555",
        personal: "220512-5555555",
        prefer: "https://velog.com"
    }, 
];

const Coffees = [
    { name: '에스프레소',      kcal: 0 },
    { name: '아메리카노',      kcal: 1 },
    { name: '마끼아또',        kcal: 2 },
    { name: '카푸치노',        kcal: 3 },
    { name: '카페라떼',        kcal: 4 },
    { name: '아포카토',        kcal: 5 },
    { name: '카페모카',        kcal: 6 },
    { name: '비엔나',          kcal: 7 },
    { name: '카라멜라떼',      kcal: 8 },
    { name: '카라멜 마끼아또', kcal: 9 },
]

const port = 3000;

/* express settings */
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

/* middleware */
app.use(cors({
    origin: [ "http://localhost:5500", "http://127.0.0.1:5500" ]
}));
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */
// GET http://localhost:3000/users
app.get('/users', ( req, res ) => {
    res.send( Users );
});

// GET http://localhost:3000/starbucks
app.get('/starbucks', ( req, res ) => {
    res.send( Coffees );
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});