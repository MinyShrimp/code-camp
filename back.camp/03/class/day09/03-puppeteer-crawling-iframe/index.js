/**
 * import
 */
import puppeteer from "puppeteer";

/**
 * Config
 */
const baseUrl = "https://finance.naver.com";

const url = `${baseUrl}/item/sise.naver?code=005930`;
const titleSelector = "#middle > div.h_company > div.wrap_company > h2 > a";
const selectors = {
    nowPrice: "#chart_area > div.rate_info > div > p.no_today > em",
    prevPrice: "#chart_area > div.rate_info > table > tbody > tr:nth-child(1) > td.first > em",
    marketPrice: "#chart_area > div.rate_info > table > tbody > tr:nth-child(2) > td.first > em"
};

const dateUrl = `/item/sise_day.naver?code=005930`;
const getDateSelectors = ( idx ) => {
    const prefix = `body > table.type2 > tbody > tr:nth-child(${idx}) > `;

    return {
        date: `${prefix}td:nth-child(1)`,
        endPrice: `${prefix}td:nth-child(2)`,
        startPrice: `${prefix}td:nth-child(4)`,
        highPrice: `${prefix}td:nth-child(5)`,
        lowPrice: `${prefix}td:nth-child(6)`,
    };
}

/**
 * Crawling
 */
const startCrawling = async () => {
    // 크롤링 결과를 담을 곳
    const datas = {
        searchDate: new Date(),
        datePrices: [],
        today: {},
        title: ""
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
    datas.title = await page.$eval(titleSelector, (el) => el.textContent.trim());
    for( let key in selectors ) {
        datas.today[key] = await page.$eval(selectors[key], (el) => el.textContent.trim());
    }

    // Page 내의 iframe 가져오기
    const dateIframe = await page.frames().find((el) => el.url().includes(dateUrl));

    // 1초 대기
    await dateIframe.waitForTimeout(1000);

    // iframe 내의 textContent 가져오기
    for(let i = 3; i <= 7; i++) {
        const dateSelector = getDateSelectors(i);

        const resultItem = {};
        for( let key in dateSelector ) {
            resultItem[key] = await dateIframe.$eval(dateSelector[key], (el) => el.textContent.trim());
        }
        datas.datePrices.push( resultItem );
    }

    await browser.close();
    return datas;
};

/**
 * Main Function
 */
console.log( await startCrawling() );
