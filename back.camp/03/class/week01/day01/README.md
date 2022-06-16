# 오늘의 목표 - 1일차
* 브라우저 없이 사용하는 Javascript
    * Nodejs, npm, yarn
* Node.js 로 만드는 휴대폰 인증 토큰
    * function / if / Math 등 복습
* 코드 리팩토링을 위한 필수 지식
    * Facade-Pattern / Destructuring

## Node.JS
https://nodejs.org/ko/
> V8 엔진으로 빌드된 Javascript Runtime Application
* 웹 Browser가 아닌 곳에서 Javascript를 실행시키기 위해 제작된 Runtime Application

## NPM
https://npmjs.com
> Node Package Manager
* `npm install [PACKAGE_NAME]`

## Yarn
https://yarnpkg.com/
> Facebook이 만든 Package Manager
* NPM보다 속도가 빠르고 안정성이 높다
* `npm install yarn`
* `yarn add [PACKAGE_NAME]`

```
# npm i <package> --save
yarn add <package>

# npm i <package> --save-dev
yarn add <package> --dev
yarn add <package> -D

# npm uninstall <package>
yarn remove <package>

# npm i <package> -g
yarn global add <package>

# npm init
yarn init
```

## Terminal CMDs
|                 |                              |
| --------------- | ---------------------------- |
| `ls`            | show file list               |
| `mkdir <name>`  | make \<name> directory       |
| `cd <dir_name>` | move \<dir_name> directory   |
| `pwd`           | print working full directory |
| `rm -rf <name>` | remove \<name> file          |
| `cat <name>`    | show \<name> file contents   |
| `.`             | now folder                   |
| `..`            | prev folder                  |

## API
> Application Programing Interface

## Facade-Pattern 
> Facade : 성벽

```js
function checkValidationPhone(phoneNumber) { ... }
function getToken(digit) { ... }
function sendTokenToSMS(phoneNumber, token) { ... }

function createTokenOfPhone(myphone) {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);
    if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken( 6 );

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken);
    }
}
```