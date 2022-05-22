/**
 * import
 */
import puppeteer from "puppeteer";
import mongoose from "mongoose";

import { Starbucks } from "./models/starbucks.model.js";

/**
 * MongoDB Connect
 */
mongoose.connect("mongodb://localhost:27017/MiniProject");

/**
 * Config
 */
const url = "https://www.starbucks.co.kr/menu/drink_list.do";
const selector = ".goDrinkView > img";

/**
 * Crawling
 */
const startCrawling = async () => {
    // Chronium 실행
    const browser = await puppeteer.launch({ headless: false });

    // Page 생성
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // Page 이동
    await page.goto(url);

    // 1초 대기
    await page.waitForTimeout(1000);

    // selector를 이용해 img의 src, alt 가져오기
    const datas = await page.$$eval(selector, (el) =>
        el.map((x) => {
            return { img: x.getAttribute("src"), name: x.getAttribute("alt") };
        })
    );

    await browser.close();
    return datas.map(v => new Starbucks(v));
};

/**
 * Main Function
 */
const datas = await startCrawling();
await Starbucks.bulkSave(datas);
console.log("서버 저장 완료");
