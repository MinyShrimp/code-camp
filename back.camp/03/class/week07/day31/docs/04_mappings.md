##### nGram 애널라이저 mappings 등록하기 #####

    # postman nGram 애널라이저 mappings 등록하기
    PUT http://localhost:9200/myproduct0333/_mappings
    {
      "properties": {
        "name": {
          "type": "text"
        },
        "description": {
          "type": "text",
          "analyzer": "my_ngram_analyzer"
        },
        "price": {
          "type": "long"
        }
      }
    }

     # postman _mappings 조회하여 nGram 애널라이저 등록여부 확인하기
    GET http://localhost:9200/myproduct0333/_mappings


##### nGram 애널라이저 mappings 변경하기 #####

    # postman nGram 애널라이저 mappings 변경하기(필드 추가) - (성공)
    PUT http://localhost:9200/myproduct0333/_mappings
    {
      "properties": {
        "name": {
          "type": "text"
        },
        "description": {
          "type": "text",
          "analyzer": "my_ngram_analyzer"
        },
        "price": {
          "type": "long"
        },
        "qqq": {
          "type": "text"
        }
      }
    }

    # postman nGram 애널라이저 mappings 변경하기(필드 수정) - (실패)
    PUT http://localhost:9200/myproduct0333/_mappings
    {
      "properties": {
        "name": {
          "type": "text"
        },
        "description": {
          "type": "text",
          "analyzer": "my_ngram_analyzer"
        },
        "price": {
          "type": "text"     // long => text로 변경 실패!!
        },
        "qqq": {
          "type": "text"
        }
      }
    }

##### nGram 애널라이저 mappings 확인하기 #####

    # postman 상품재등록(최신마우스)
    POST http://localhost:9200/myproduct0333/_doc/1
    {
      "name": "최신마우스",
      "description": "안녕하세요. Bestshop입니다! 국내 최고 Best 상품만 판매합니다!",
      "price": 10000
    }

    # postman 상품검색연습 - (성공)
    POST http://localhost:9200/myproduct0333/_search
    {
      "query": {
        "match": {
          "description": "Bestshop"
        }
      }
    }

    # postman 상품검색연습 - (성공)
    POST http://localhost:9200/myproduct0333/_search
    {
      "query": {
        "match": {
          "description": "Best"
        }
      }
    }