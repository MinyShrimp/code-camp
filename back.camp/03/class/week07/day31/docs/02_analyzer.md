##### 엘라스틱서치의 검색원리 분석하기 #####

    # postman 디폴트(standard) 애널라이저 사용하기
    POST http://localhost:9200/myproduct03/_analyze
    {
      "text": "안녕하세요. Bestshop입니다! Best"
    }

    # postman standard 애널라이저 사용하기
    POST http://localhost:9200/myproduct03/_analyze
    {
      "analyzer": "standard",
      "text": "안녕하세요. Bestshop입니다! Best"
    }

    # postman whitespace 애널라이저 사용하기
    POST http://localhost:9200/myproduct03/_analyze
    {
      "analyzer": "whitespace",
      "text": "안녕하세요. Bestshop입니다! Best"
    }

    # postman keyword 애널라이저 사용하기
    POST http://localhost:9200/myproduct03/_analyze
    {
      "analyzer": "keyword",
      "text": "안녕하세요. Bestshop입니다! Best"
    }

    # postman snowball 애널라이저 사용하기 - (추가실습)
    POST http://localhost:9200/myproduct03/_analyze
    {
      "analyzer": "snowball",
      "text": "안녕하세요. Bestshop입니다! Best going"
    }

    # postman standard 토크나이저 사용하기 - (추가실습)
    POST http://localhost:9200/myproduct03/_analyze
    {
      "tokenizer": "standard",
      "text": "안녕하세요. Bestshop입니다! Best going"
    }
