##### prefix 검색 #####

    # postman prefix 검색하기(성공) - 최신마우스
    {
      "query": {
        "bool": {
          "should":[{ "prefix": { "name": "최" } }]
        }
      }
    }

    # postman prefix 검색하기(실패) - 최신마우스
    {
      "query": {
        "match": {
          "name": "최"
        }
      }
    }