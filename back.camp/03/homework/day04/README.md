# HOMEWORK 4일차

## 설치
```
yarn add express swagger-jsdoc swagger-ui-express
```

## 요청사항 1
1. `day04` 폴더 안에, 명령어를 통해 `package.json` 파일을 자동으로 만들어주세요. 
2. `package.json` 파일에 **"type": "module”** 을 추가해 주세요.
3. `day04` 폴더 안에 `express`, `swagger-jsdoc`, `swagger-ui-express`를 설치해 주세요. 
4. index.js 파일을 만들어 회원 목록을 조회하는 API를 만들어 주세요.
    1. API Method는 `GET` 방식으로 조회합니다.
    2. API Endpoint는 **`/users`** 입니다.
    3. Postman에서 해당 API를 요청했을 때, 하드코딩된 회원 5명의 데이터를 받아와야 합니다.
        
        ⇒ 회원 1명의 데이터는 `객체` 1개이며,  총 5개의 객체를 `하나의 배열`로 담아서 받습니다.
        
    4. 각각의 회원 데이터는 `email, name, phone, personal(주민등록번호 앞자리), prefer(내가 좋아하는 사이트)`가 반드시 포함되어야 합니다. `key` 값을 반드시 동일하게 작성해 주세요!
        
        ```jsx
        // 회원 1명 데이터 객체 예시
        { 
        	email : "aaa@gmail.com", 
        	name : "철수",
        	phone : "010-1234-5678",
        	personal : "220110-2222222",
        	prefer : "https://naver.com"
        }
        ```
        
5. 만든 API를 Postman으로 요청해 보고, 요청과 응답이 모두 보이게 캡쳐해 주세요.
![](./file/postman_users.png)

## 요청사항 2
1. 커피 목록을 조회하는 API를 만들어 주세요.
    1. API Method는 `GET` 방식으로 조회합니다.
    2. API Endpoint는 `/starbucks` 입니다.
    3. Postman에서 해당 API를 요청했을 때, 하드코딩된 커피 10개의 데이터를 받아 와야 합니다.
    ⇒ 커피 1개의 데이터는 객체 1개이며,  총 10개의 객체를 하나의 배열로 담아서 받습니다.
    4. 각각의 커피 데이터는 이름(name), 칼로리(kcal)가 반드시 포함되어야 합니다. 
        
        반드시 `key` 값을 예시와 동일하게 작성해 주세요!
        
        ```jsx
        // 커피 1개 객체 데이터 예시
        { name: '아메리카노', kcal: 5 }
        ```
        
2. 만든 API를 Postman으로 요청해 보고, 화면을 캡쳐해 주세요.
![](./file/postman_starbucks.png)

## 요청사항 3
1. 회원 목록 조회 API, 커피 목록 조회 API 각각에 대해 `Swagger`를 활용하여 API 명세서를 만들어 주세요.
    1. `users.swagger.js` 파일에 회원 목록 조회 API 명세를 만들어 주세요. 
    2. `starbucks.swagger.js` 파일에 커피 목록 조회 API 명세를 만들어 주세요. 
    3. `config.js` 파일에 swagger 설정 파일을 만들어 주세요.
2. Swagger 문서에 접속해 **모든** api를 테스트해 보고 결과를 캡쳐해 주세요.
![](./file/swagger_users_before.png)
![](./file/swagger_users_after.png)
![](./file/swagger_starbucks_before.png)
![](./file/swagger_starbucks_after.png)
    
3.  코드를 작성한 `day04` 폴더를 **zip** 파일로 압축해서 클래스룸에 올려주세요. (node_modules 폴더 제외!)