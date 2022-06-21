## 기본연습

    # 기초가이드 제공 사이트: https://esbook.kimjmin.net (엘라스틱서치 가이드북)

    # postman 기본 조회
    GET http://localhost:9200

### 게시글등록 ~ 테이블삭제

    # postman CRUD연습(C) - 게시글등록
    POST http://localhost:9200/myboard/_doc/1
    {
      "title": "제목입니다~",
      "contents": "내용입니다~"
    }

    # postmans CRUD연습(R) - 테이블조회
    GET http://localhost:9200/myboard/_search

    # postmans CRUD연습(D) - 테이블제거
    DELETE http://localhost:9200/myboard

    # postmans CRUD연습(R) - 테이블조회
    GET http://localhost:9200/myboard/_search

### 상품CRUD

    # postman CRUD연습(C) - 상품등록(최신마우스)
    POST http://localhost:9200/myproduct03/_doc/1
    {
      "name": "최신마우스",
      "description": "안녕하세요. Bestshop입니다! 국내 최고 Best 상품만 판매합니다!",
      "price": 10000
    }

    # postman CRUD연습(C) - 상품등록(기계식키보드)
    POST http://localhost:9200/myproduct03/_doc/2
    {
      "name": "기계식키보드",
      "description": "기계식 키보드 오늘만 특가!!",
      "price": 20000
    }

    # postman CRUD연습(R) - 상품조회(최신마우스)
    GET http://localhost:9200/myproduct03/_doc/1

    # postman CRUD연습(R) - 상품조회(기계식키보드)
    GET http://localhost:9200/myproduct03/_doc/2

    # postman CRUD연습(R) - 상품목록조회
    GET http://localhost:9200/myproduct03/_search

    # postman CRUD연습(U) - 상품수정(기계식키보드 => 기계식키보드(청축))
    PUT http://localhost:9200/myproduct03/_doc/2
    {
      "name": "기계식키보드(청축)",
      "description": "기계식 키보드 오늘만 특가!!",
      "price": 30000
    }

    # postman CRUD연습(R) - 상품조회(기계식키보드(청축))
    GET http://localhost:9200/myproduct03/_doc/2

### 검색어로 조회하기

    # postman 상품검색연습 - (성공)
    POST http://localhost:9200/myproduct03/_search
    {
      "query": {
        "match": {
          "description": "Best"
        }
      }
    }

    # postman 상품검색연습 - (실패)
    POST http://localhost:9200/myproduct03/_search
    {
      "query": {
        "match": {
          "description": "Bestshop"
        }
      }
    }
