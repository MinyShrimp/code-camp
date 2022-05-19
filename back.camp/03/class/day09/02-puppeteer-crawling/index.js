/**
 * import
 */
import puppeteer from "puppeteer";

/**
 * Config
 */
const url = "https://www.goodchoice.kr/product/search/2";
const selectors = {
    card:     "#poduct_list_area > li:nth-child(2)",
    star:     "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    title:    "#poduct_list_area > li:nth-child(2) > a > div > div.name > strong",
    price:    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    location: "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
};

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
    await page.waitForTimeout( 1000 );

    // selector를 이용해 textContent 가져오기
    const title    = page.$eval(selectors.title,    (el) => el.textContent.trim());
    const star     = page.$eval(selectors.star,     (el) => el.textContent.trim());
    const price    = page.$eval(selectors.price,    (el) => el.textContent.trim());
    const location = page.$eval(selectors.location, (el) => el.textContent.trim());

    console.log( await title, await star, await price, await location );
}

/**
 * Main Function
 */
startCrawling();