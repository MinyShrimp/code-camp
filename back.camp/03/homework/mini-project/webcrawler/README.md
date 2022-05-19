## 1-3) WEB-CRAWLER 완성하기

1. webcrawler 폴더에 puppeteer로 크롤링 서버를 만들어 주세요.
2. 해당 서버는 docker를 사용하지 않습니다.
3. 크롤링 서버에서 스타벅스 홈페이지의 커피 목록을 크롤링해 주세요. (최소 30개)
    
    [https://www.starbucks.co.kr/menu/drink_list.do](https://www.starbucks.co.kr/menu/drink_list.do)
    
4. 커피 데이터에는 img, name이 포함되어야 합니다.
    - 이미지 태그를 puppeteer로 크롤링할 때는 텍스트를 가져올 때와 다릅니다! 구글링을 통해 찾아보세요!
5. 크롤링 완료된 데이터를 backend 서버의 database에 저장해 주세요.
    
    `DB 예시`
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da6d7e21-c5c2-4667-96f2-160bcfc4fa15/Untitled.png)