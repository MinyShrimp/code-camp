/**
 * import
 */
import puppeteer from "puppeteer";
import mongoose from "mongoose";

import { Stock } from "./models/stock.model.js";

/**
 * MongoDB Connect
 */
mongoose.connect('mongodb://localhost:27017/Stock');

/**
 * Config
 */
const baseUrl = "https://finance.naver.com";

const url = `${baseUrl}/item/sise.naver?code=005930`;
const selectors = {
    title: "#middle > div.h_company > div.wrap_company > h2 > a",
    nowPrice: "#chart_area > div.rate_info > div > p.no_today > em",
    prevPrice:
        "#chart_area > div.rate_info > table > tbody > tr:nth-child(1) > td.first > em",
    marketPrice:
        "#chart_area > div.rate_info > table > tbody > tr:nth-child(2) > td.first > em",
};

/**
 * Crawling
 */
const startCrawling = async () => {
    // 크롤링 결과를 담을 곳
    const datas = {
        searchDate: new Date()
    };

    // Chronium 실행
    const browser = await puppeteer.launch({ headless: false });

    // Page 생성
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // Page 이동
    await page.goto(url);

    // 1초 대기
    await page.waitForTimeout(1000);

    // selector를 이용해 textContent 가져오기
    for (let key in selectors) {
        datas[key] = await page.$eval(selectors[key], (el) =>
            el.textContent.trim()
        );
    }

    datas.nowPrice    = Number(datas.nowPrice.replace(",", ""));
    datas.prevPrice   = Number(datas.prevPrice.replace(",", ""));
    datas.marketPrice = Number(datas.marketPrice.replace(",", ""));

    await browser.close();
    return datas;
};

/**
 * Main Function
 */
const data = await startCrawling();
const newStock = new Stock(data);
await newStock.save();

console.log ( data );