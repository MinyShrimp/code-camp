
import axios from "axios";
import cheerio from "cheerio";

import { isValidPhoneNumber } from "../utils/phone.js";
import { getTokenByPhone } from "../models/token.model.js";

/**
 * 회원가입 데이터를 검증하는 함수
 * @param {*} body 
 * @returns [Boolean, String]
 */
export const isValidSignupRequestData = async ( body ) => {
    // phone이 undefined인지 확인합니다.
    if( body.phone === undefined ) {
        return [false, 'phone 번호가 입력되지 않았습니다.'];
    }

    // phone이 10 ~ 11자리인지 확인합니다.
    if( !isValidPhoneNumber( body.phone ) ) {
        return [false, 'phone 번호가 정확하지 않습니다.'];
    }

    // 입력 받은 핸드폰 번호로 Tokens 문서를 검색해
    // 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 422 상태코드와 함께 에러 문구를 반환합니다. 
    const user = await getTokenByPhone( body.phone );
    if( user === null || !user.isAuth ) {
        return [false, '에러!! 핸드폰 번호가 인증되지 않았습니다.'];
    }

    return [true, ""];
}

/**
 * 내가 좋아하는 사이트를 cheerio를 활용하여 scraping 한 후,
 * 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
 * 
 * @param {*} prefer 
 * @returns Object
 */
export const getOpenGraph = async ( prefer ) => {
    const og = {};
    const html = await axios.get( prefer );
    const $ = cheerio.load( html.data );
    $("meta").each(( idx, element ) => {
        if( $(element).attr("property") ) {
            const key   = $(element).attr("property").split(':')[1];
            const value = $(element).attr("content");
            og[key] = value;
        }
    });
    return og;
}

/**
 * 
 * 
 * @param personal 
 * @returns String
 */
export const getPersonal = ( personal ) => {
    return `${personal.split('-')[0]}-*******`;
}