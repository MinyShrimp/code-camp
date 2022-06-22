import express from "express";

const app = express();

app.get("/stocks", (req, res) => {
    res.send("주식 가격 조회");
});

app.get("/stocks/max", (req, res) => {
    res.send("최대 가격 조회");
});

app.post("/stocks", (req, res) => {
    res.send("신규 주식 등록");
});

app.listen(3000);
