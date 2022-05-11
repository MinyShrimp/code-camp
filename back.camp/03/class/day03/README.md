
# DAY 3

## 구조분해할당을 더 깊이있게
### SpreadOperator => 얕은 복사
```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교'
};
let profile2 = {...profile};
profile2.name = "영희";
console.log(profile.name, profile2.name) // "철수", "영희"

let profile3 = profile;
profile3.name = "훈이";
console.log(profile.name, profile3.name) // "훈이", "훈이"
```

```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교',
    hobby: {
        hobby1: "수영하기",
        hobby2: "게임하기"
    }
};
let profile2 = {...profile};
profile2.hobby.hobby1 = "독서하기";
console.log( profile.hobby.hobby1, profile2.hobby.hobby1 );

let profile3 = JSON.parser( JSON.stringify( profile ) );
profile3.hobby.hobby1 = "잠자기";
console.log( profile.hobby.hobby1, profile3.hobby.hobby1 );
```

### RestParameter
```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교'
};

const { name, ...rest } = profile;
console.log(rest); // { age: 13, school: '다람쥐초등학교' }
```

```js
const child = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
    money: 2000,
    hobby: "수영"
};
const { school, ...rest } = child;
```

## 데이터 전송 방법에 대해
| Front  | <->  | Back   |
| ------ | ---- | ------ |
| FILE   | FTP  | FILE   |
| MAIL   | SMTP | MAIL   |
| HTML   | HTTP | HTML   |
| SOCKET | TCP  | SOCKET |

### HTTP
> Hyper Text Transfer Protocal

FRONT --(Request)-> BACK <br>
FRONT <-(Response)- BACK

#### STATUS CODE
* 1xx: 조건부 응답
* 2xx: 정상 응답
* 3xx: 리다이렉트
* 4xx: 클라이언트 오류
* 5xx: 서버 오류

### API
> Application Programming Interface

### REST
> Representational State Transfer

| Front |               <->                | Back                      |
| ----- | :------------------------------: | ------------------------- |
| axios |   ==  1번 게시글 가져다줘 ~ =>   | https://naver.com/board/1 |
| ajax  | <= 1번 게시글에 관한 jsonData == | DB                        |

### GraphQL
> API를 위한 쿼리 언어, 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임

* http://example.codebootcamp.co.kr/graphql
* http://backendclass.codebootcamp.co.kr/graphql

| Front  |                         <->                          | Back     |
| ------ | :--------------------------------------------------: | -------- |
| apollo |    ==  1번 게시글의 작성자, 제목만 가져다줘 ~ =>     | board(1) |
| client | <= 1번 게시글에 관한 작성자, 제목만 있는 jsonData == | DB       |

```GraphQL
// CREATE
mutation {
    createProduct(
        seller: "김회민",
        createProductInput: {
            name: "M1 맥북 Air",
            detail: "RAM: 16GB / SSD: 1TB",
            price: 2500000
        }
    ) {
        _id, number, message
    }
}

// UPDATE
mutation {
    updateProduct(
        productId: "cc2cb697-dc4f-472e-9480-ad7bf7ec4701",
        updateProductInput: {
            name: "M1 맥북 Air",
            detail: "RAM: 8GB / SSD: 1TB",
            price: 3000000
        }
    ) {
        _id, number, message
    }
}

// DELETE
mutation {
    deleteProduct(
        productId: "cc2cb697-dc4f-472e-9480-ad7bf7ec4701"
    ) {
        _id, number, message
    }
}

// READ
query {
    fetchProduct(productId: "cc2cb697-dc4f-472e-9480-ad7bf7ec4701") {
        _id, seller, name, price, detail, createdAt
    }
}
```

### REST vs GraphQL
|                             | REST API                       | GRAPH QL        |
| --------------------------- | ------------------------------ | --------------- |
| 네이버에서 1번 게시글 조회  | https://naver.com/board/1      | board(1)        |
| 네이버에서 철수 프로필 조회 | https://naver.com/profile/철수 | profile("철수") |

### JSON
> Javascript Object Notation

### CRUD
> Create Read Update Delete

|        | REST API   | GraphQL API |
| ------ | ---------- | ----------- |
| Create | POST       | MUTATION    |
| Update | PUT, FETCH | MUTATION    |
| Delete | DELETE     | MUTATION    |
| Read   | GET        | QUERY       |

## 데이터 전송 실습
### Postman
### Playground