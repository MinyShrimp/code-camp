##### nGram 애널라이저 settings 등록하기 #####

    # postman nGram 애널라이저 settings 등록하기
    PUT http://localhost:9200/myproduct0333
    {
      "settings": {
        "analysis": {
          "analyzer": {
            "my_ngram_analyzer": {
              "tokenizer": "my_ngram_tokenizer"    
            }
          },
          "tokenizer": {
            "my_ngram_tokenizer": {
              "type": "nGram",
              "min_gram": "1",
              "max_gram": "10"
            }
          }
        },
        "max_ngram_diff" : "10"
      }
    }

    # postman _settings 조회하여 nGram 토크나이저 등록여부 확인하기
    GET http://localhost:9200/myproduct0333/_settings


##### nGram 애널라이저 settings 변경하기 #####

    # postman nGram 애널라이저 settings 변경을 위한 CLOSE
    POST http://localhost:9200/myproduct0333/_close

    # postman nGram 애널라이저 settings 변경하기(max_ngram_diff 변경)
    PUT http://localhost:9200/myproduct0333/_settings
    {
      "settings": {
        "analysis": {
          "analyzer": {
            "my_ngram_analyzer": {
              "tokenizer": "my_ngram_tokenizer"    
            }
          },
          "tokenizer": {
            "my_ngram_tokenizer": {
              "type": "nGram",
              "min_gram": "1",
              "max_gram": "10"
            }
          }
        },
        "max_ngram_diff" : "20"
      }
    }

    # postman nGram 애널라이저 settings 변경완료를 위한 OPEN
    POST http://localhost:9200/myproduct0333/_open


##### nGram 애널라이저 테스트하기 #####

    # postman my_ngram_analyzer 애널라이저 사용하기
    POST http://localhost:9200/myproduct0333/_analyze
    {
      "analyzer": "my_ngram_analyzer",
      "text": "안녕하세요. Bestshop입니다! Best"
    }