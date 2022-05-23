import axios from "axios";
import cheerio from "cheerio";

/**
 * Cheerio Service
 */
class CheerioService {
    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Controller => Cheerio => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 내가 좋아하는 사이트를 cheerio를 활용하여 scraping 한 후,
     * 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
     *
     * @param {string} prefer
     * @returns Object
     */
    getOpenGraph = async (prefer) => {
        try {
            const og = { title: "", image: "", description: "" };
            const html = await axios.get(prefer);
            const $ = cheerio.load(html.data);
            $("meta").each((idx, element) => {
                if ($(element).attr("property")) {
                    const key = $(element).attr("property").split(":")[1];
                    const value = $(element).attr("content");
                    og[key] = value;
                }
            });
            return og;
        } catch (e) {
            // 도중에 Error가 날경우, 기본값을 반환
            return { title: "", image: "", description: "" };
        }
    };
}

export default CheerioService;
