/**
 * /src/utils/isValid.utils.js
 * Data 검사를 위한 함수를 모아둔 곳
 */

import { getTokenByPhone } from "../controllers/token.controller.js";
import { getUserByPhone } from "../controllers/user.controller.js";

/**
 * Null, Undefined Check
 * undefined 또는 null이 아니면 true를 반환
 * @param {*} value
 * @returns Boolean
 */
const isValid = ( value ) => {
    return !( value === undefined || value === null );
}

/**
 * Type Check
 * 두 변수를 비교해서 같은 type이면 true를 반환
 * @param {*} v1
 * @param {*} v2
 * @returns Boolean
 */
const isEqualType = ( v1, v2 ) => {
    return typeof(v1) === typeof(v2);
}

/**
 * isValid 이전에 시행
 * @param {*} value 
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - TODO: 
 *   - SQL Injection 검사
 */
const isValidAfter = ( value ) => {
    // undefined, null 검사
    if( !isValid(value) ) { return false; }

    // String type 검사
    if( !isEqualType(value, "") ) { return false; }

    return true;
}

/**
 * 주민번호 검사
 * @param {string} personal
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - 정규식 검사
 *   - ( 숫자 6 자리로 이루어짐 ) 으로 시작해야함
 *   - -
 *   - ( 숫자 7 자리로 이루어짐 ) 으로 끝나야함
 */
 export const isValidPersonal = ( personal ) => {
    // undefined, null 검사
    // String type 검사
    if( !isValidAfter( personal ) ) { return false; }

    // ( 숫자 6 자리로 이루어짐 ) 으로 시작해야함
    // -
    // ( 숫자 7 자리로 이루어짐 ) 으로 끝나야함
    const personalRole = /^(\d{6})-(\d{7})$/i;
    return personalRole.test(personal);
}

/**
 * 핸드폰 번호 검사
 * @param {string} phoneNumber
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - 정규식 검사
 *   - ( 01 로 시작함 + 숫자(0 ~ 9) ) 로 시작해야함
 *   - 숫자 3 ~ 4 자리로 이루어짐
 *   - ( 숫자 4자리로 이루어짐 ) 으로 끝나야함
 */
export const isValidPhoneNumber = ( phoneNumber ) => {
    // undefined, null 검사
    // String type 검사
    if( !isValidAfter( phoneNumber ) ) { return false; }

    // ( 01 로 시작함 + 숫자(0 ~ 9) ) 로 시작해야함
    // ( 숫자 3 ~ 4 자리로 이루어짐 )
    // ( 숫자 4자리로 이루어짐 ) 으로 끝나야함
    const phoneRole = /^(01\d{1})(\d{3,4})(\d{4})$/i;
    return phoneRole.test(phoneNumber);
}

/**
 * 이메일 검사
 * @param {string} email 
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - 정규식 검사
 *   - ( 숫자, 영어소문자, 영어대문자 )를 포함한 1글자 로 시작해야함
 *   - ( ( ( -, _, . )은 있을 수도 있고 없을 수도 있다 ) + ( 숫자, 영어소문자, 영어대문자 ) )를 포함한 0글자이상
 *   - @
 *   - ( 숫자, 영어소문자, 영어대문자 )를 포함한 1글자
 *   - ( ( ( -, _, . )은 있을 수도 있고 없을 수도 있다 ) + ( 숫자, 영어소문자, 영어대문자 ) )를 포함한 0글자이상
 *   - .
 *   - ( 영어소문자, 영어대문자 )를 포함한 2 ~ 3글자 로 끝나야함
 */
export const isValidEmail = ( email ) => {
    // undefined, null 검사
    // String type 검사
    if( !isValidAfter( email ) ) { return false; }
    
    // ( 숫자, 영어소문자, 영어대문자 )를 포함한 1글자 로 시작해야함
    // ( ( ( -, _, . )은 있을 수도 있고 없을 수도 있다 ) + ( 숫자, 영어소문자, 영어대문자 ) )를 포함한 0글자이상
    // @
    // ( 숫자, 영어소문자, 영어대문자 )를 포함한 1글자
    // ( ( ( -, _, . )은 있을 수도 있고 없을 수도 있다 ) + ( 숫자, 영어소문자, 영어대문자 ) )를 포함한 0글자이상
    // .
    // ( 영어소문자, 영어대문자 )를 포함한 2 ~ 3글자 로 끝나야함
    const emailRole = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return emailRole.test(email);
}

/**
 * Prefer URL 검사
 * @param {string} url
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - 정규식 검사
 *   - http://name@localhost:5000/blog?id=1
 *   - group 1 : http
 *   - group 2 : name@
 *   - group 3 : localhost
 *   - group 4 : :5000
 *   - group 5 : /blog
 *   - group 6 : ?id=1
 */
export const isValidURL = ( url ) => {
    // undefined, null 검사
    // String type 검사
    if( !isValidAfter( url ) ) { return false; }

    // http://name@localhost:5000/blog?id=1
    // group 1 : http
    // group 2 : name@
    // group 3 : localhost
    // group 4 : :5000
    // group 5 : /blog
    // group 6 : ?id=1
    const urlRole = /^(http|https):\/\/(\w+:{0,1}\w*@)?([\w.]+)(:\d{4,5})?\/?(\/\w+)*(\?\S+)?$/i;
    return urlRole.test(url);
}

/**
 * Token 검사
 * @param {string} token 
 * @returns Boolean
 * 
 * - undefined, null 검사
 * - String type 검사
 * - 정규식 검사
 *   - 6자리의 숫자로 이루어져 있는지 검사
 */
export const isValidToken = ( token ) => {
    // undefined, null 검사
    // String type 검사
    if( !isValidAfter( token ) ) { return false; }

    // 6자리의 숫자로 이루어져 있는지 검사
    const tokenRole = /^\d{6}$/i;
    return tokenRole.test(token);
}

/**
 * Path Token 데이터 검사
 * @param {object} body 
 * @returns Boolean
 * 
 * - 핸드폰 번호 검사
 * - 토큰 검사
 */
export const isValidPatchTokenRequestData = async ( body ) => {
    // 핸드폰 번호 유효한지 확인
    if( !isValidPhoneNumber( body.phone ) ) {
        return false;
    }

    // 토큰이 유효한지 확인
    if( !isValidToken( body.token ) ) {
        return false;
    }

    return true;
}

/**
 * 회원가입 데이터 검사
 * @param {object} body 
 * @returns [Boolean, String]
 * 
 * - 이름 검사
 * - 비밀번호 검사
 * - 주민번호 검사
 * - 핸드폰 번호 검사
 * - 이메일 검사
 * - 좋아하는 사이트 검사
 * - 핸드폰 인증이 되었는지 검사
 * - 핸드폰을 기반으로 User에 데이터가 있는지 검사
 */
export const isValidSignupRequestData = async ( body ) => {
    // 이름 검사
    if( !isValidAfter( body.name ) ) {
        return [false, '이름이 정확하지 않습니다.'];
    }

    // 비밀번호 검사
    if( !isValidAfter( body.pwd ) ) {
        return [false, '비밀번호가 정확하지 않습니다.'];
    }

    // 주민번호 검사
    if( !isValidPersonal( body.personal ) ) {
        return [false, '주민번호가 정확하지 않습니다.'];
    }

    // 핸드폰 번호 검사
    if( !isValidPhoneNumber( body.phone ) ) {
        return [false, '핸드폰 번호가 정확하지 않습니다.'];
    }

    // 이메일 검사
    if( !isValidEmail( body.email ) ) {
        return [false, '이메일이 정확하지 않습니다.'];
    }

    // 좋아하는 사이트 검사
    if( !isValidURL( body.prefer ) ) {
        return [false, '좋아하는 사이트가 정확하지 않습니다.'];
    }

    // 입력 받은 핸드폰 번호로 Tokens 문서를 검색해
    // 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 422 상태코드와 함께 에러 문구를 반환합니다. 
    const token = await getTokenByPhone( body.phone );
    if( token === null || !token.isAuth ) {
        return [false, '에러!! 핸드폰 번호가 인증되지 않았습니다.'];
    }

    // 핸드폰을 기반으로 User에 데이터가 있는지 검사
    const user = await getUserByPhone( body.phone );
    if( user !== null ) {
        return [false, '에러!! 이미 등록되어 있는 휴대폰 번호입니다.'];
    }

    return [true, ""];
}