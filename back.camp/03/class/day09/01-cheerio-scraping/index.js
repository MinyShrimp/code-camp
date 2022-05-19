import axios from "axios";
import cheerio from "cheerio";

/**
 * Blog Data
 */
const blogData = {
    title: "안녕하세요~~",
    contents: "여기 정말 좋은거 같아요! 한번 꼭 놀러오세요!! 여기가 어디냐면 https://daum.net, http://naver.com 이에요!!!"
};

/**
 * 블로그 작성
 */
const createBlogAPI = async ( blogData ) => {
    // 
    const result = [];

    // 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
    const urlRegex  = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    const urlMatchs = blogData.contents.match( urlRegex );
    
    for( let i = 0; i < urlMatchs.length; i++ ) {
        const url = urlMatchs[i];
        const tmp = {};

        // 있다면, 찾은 주소로 get 요청을 보내서 html코드 받아오기 => 스크래핑
        const http = await axios.get(url);

        // 스크래핑 결과에서 OG 코드 골라내서 변수에 저장하기
        const $ = cheerio.load( http.data );
        $("meta").each(( idx, element ) => {
            if( $(element).attr("property") ) {
                const key   = $(element).attr("property").split(':')[1];
                const value = $(element).attr("content");
                tmp[key] = value;
            }
        });

        result.push( tmp );
    }

    return result;
}

/**
 * Main
 */
console.log( await createBlogAPI( blogData ) );