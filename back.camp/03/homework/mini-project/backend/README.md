## 1-1) BACKEND 완성하기

1. backend 폴더에 docker 기반의 express, mongodb 서버를 만들어 주세요.
2. 위 2개의 서버는 docker-compose로 묶어주세요.
3. 아래 API를 참고해 models 폴더에 3개의 파일을 만들어 mongodb 스키마를 만들어주세요.
    1. starbucksSchema
    2. tokenSchema
    3. userSchema
4. express 서버에 총 5개의 API를 만들어 주세요 
    
    (아래의 삼각형 토글 버튼▶️ 을 누르면 엄청난 설명이..!)
    
    - **회원 가입 API: POST /user**
        - API 요청시 입력 받은 name, email, personal(주민번호), prefer(내가 좋아하는 사이트), pwd(비밀번호), phone(핸드폰번호)를 서버에 함께 보내주어야합니다.
            
            ```json
            {
                "name" : "아라111",
                "email" : "ala@gamil.com",
                "personal" : "220101-1111111",
                "prefer" : "https://naver.com",
                "pwd" : "1234",
                "phone" : "01012345678"
            }
            ```
            
        - 입력 받은 핸드폰 번호로 `Tokens` 문서를 검색해 해당 번호의 isAuth가 true인지 확인합니다.
            - 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 `422` 상태코드와 함께 에러 문구를 반환합니다.
                
                ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/54ed35ec-84ea-4e19-94ec-f4852015976f/Untitled.png)
                
            - true 라면 아래의 로직을 수행합니다.
                - **내가 좋아하는 사이트**로 입력 받은 사이트를 cheerio를 활용하여 scraping 한 후, 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
                - 메타 태그 정보는 og 객체에 (title, description, image)가 들어있도록 만들어주세요.
                - personal(주민번호)는 뒷자리를 `*`로 바꾼후 저장해주세요. (220101-*******)
                - DB에 저장한 후, 회원 가입 환영 이메일을 실제로 전송해주세요.
                - 생성된 user의 _id를 클라이언트에 반환합니다.
                    - DB
                        
                        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08d67040-f9fd-4ca0-837a-9c58c702d140/Untitled.png)
                        
                    - 응답
                        
                        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91f7256a-9cb4-4250-9f73-aeb117f4b08b/Untitled.png)
                        
    - **회원 목록 조회 API: GET /users**
        - API 요청 시 DB에 저장된 User 데이터의 목록을 응답으로 보내주세요.
        - 보내주는 데이터에는  name, email, personal(주민번호), prefer(내가 좋아하는 사이트), phone(핸드폰번호), og 객체(오픈그래프 정보 title, description, image)가 포함되어야합니다.
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e40a712b-69a6-4f03-a89a-69504cbb4ba6/Untitled.png)
            
    - **토큰 인증 요청 API: POST /tokens/phone**
        - API 요청시 입력 받은 핸드폰 번호를 서버로 보내주세요.
        - 토큰을 생성하고, 생성한 토큰을 문자로 전송해주세요.
        - 이때, 입력받은 핸드폰 번호로 문자를 보냅니다.
        - 핸드폰 번호와 토큰, 그리고 **isAuth**는 **false** 값으로 DB에 저장합니다.
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/456917e1-7ad3-4272-9749-2c90279a7d89/Untitled.png)
            
        - 해당 핸드폰 번호가 이미 `Tokens` 문서에 저장되어 있다면 최신 토큰으로 덮어씁니다.
        - 클라이언트에 응답으로 “핸드폰으로 인증 문자가 전송되었습니다!”를 보내줍니다.
    - **인증 완료 API: PATCH /tokens/phone**
        - API 요청시 입력 받은 핸드폰 번호를 `Tokens` 문서에서 찾아봅니다.
            - 핸드폰 번호가 저장되어 있지 않다면 클라이언트에 false를 응답해줍니다.
        - 해당 핸드폰 번호에 함께 저장된 토큰이, 입력 받은 토큰과 일치하지 않는다면 클라이언트에 false를 응답해줍니다.
        - 토큰이 일치하고, isAuth가 false라면 **true**로 변경하여 DB에 저장합니다.
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4702c250-8780-4b85-a7e3-5a28a72ed244/Untitled.png)
            
            - 잘 저장되었다면 클라이언트에 true를 응답해줍니다.
    - **스타벅스 커피 목록 조회API: GET /starbucks**
        - DB에 저장된 커피의 목록을 반환해주세요.
        - 반환하는 커피 데이터에는 img, name, _id가 포함되어야합니다.
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db6d7ebc-01bb-452c-901a-e69171bf6451/Untitled.png)
            
5. 위 API들이 작동 가능하도록 만들어 주세요.
6. 모든 API는 퍼사드 패턴을 최대한 활용해 주세요.
7. 🚨 `env 파일의 변수명은 꼭!! 아래와 동일하게 해주세요!!` 🚨
    
    ```
    - Nodemailer 변수 -
    appPass 변수명 : **EMAIL_PASS**
    sender 변수명 : **EMAIL_SENDER**
    
    - Coolsms 변수 -
    apiKey 변수명 : **SMS_KEY**
    apiSecret 변수명 : **SMS_SECRET**
    sender 변수명 : **SMS_SENDER**
    ```