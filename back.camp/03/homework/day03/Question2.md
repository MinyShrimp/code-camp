# graphql-API 문제 2
> http://backendclass.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.

## CHECK LIST
[X]  GRAPHQL 연습하기 Lv.2의 모든 문제를 직접 플레이그라운드에서 실행했다.

## QUESTIONS
1) createBoard를 활용해, 게시물을 하나 등록해 주세요.
```
<!- QUERY ---------------------------------------!>
mutation {
    createBoard(
        createBoardInput: {
            writer: "김회민",
            password: "qwer1234!",
            title: "코드캠프 3일차",
            contents: "모두들 화이팅입니다!",
            youtubeUrl: "",
            boardAddress: {
                zipcode: "11111", 
                address: "경기도 시흥시", 
                addressDetail: ""
            },
            images: ["codecamp.png"]
        }
    ) {
        _id, title, contents, likeCount, dislikeCount, images, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "createBoard": {
            "_id": "627b99757d035600293d9726",
            "title": "코드캠프 3일차",
            "contents": "모두들 화이팅입니다!",
            "likeCount": 0,
            "dislikeCount": 0,
            "images": [
                "codecamp.png"
            ],
            "createdAt": "2022-05-11T11:09:41.180Z",
            "updatedAt": "2022-05-11T11:09:41.180Z"
        }
    }
}
<!-----------------------------------------------!>
```

2) 등록한 게시글의 제목과 내용은 무엇인가요?
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoard(
        boardId: "627b99757d035600293d9726"
    ) {
        title, contents
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoard": {
            "title": "코드캠프 3일차",
            "contents": "모두들 화이팅입니다!"
        }
    }
}
<!-----------------------------------------------!>
```

3) 등록한 게시글에 좋아요를 1 올려주세요.
```
<!- QUERY ---------------------------------------!>
mutation {
    likeBoard(
        boardId: "627b99757d035600293d9726"
    )
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "likeBoard": 1
    }
}
<!-----------------------------------------------!>
```

4) 등록한 게시글에 싫어요도 1 올려주세요.
```
<!- QUERY ---------------------------------------!>
mutation {
    dislikeBoard(
        boardId: "627b99757d035600293d9726"
    )
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "dislikeBoard": 1
    }
}
<!-----------------------------------------------!>
```

5) 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? 
	(fetchBoard를 활용해서 확인해 보세요.)
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoard(
        boardId: "627b99757d035600293d9726"
    ) {
        likeCount, dislikeCount
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoard": {
            "likeCount": 1,
            "dislikeCount": 1
        }
    }
}
<!-----------------------------------------------!>
```

6) 현재 등록된 게시글의 총 갯수는 몇 개 인가요? 
	(어떤 API를 활용하면 좋을지 찾아보세요!)
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoardsCount(
        endDate: "2199-12-31",
        startDate: "1900-01-01"
    )
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoardsCount": 60
    }
}
<!-----------------------------------------------!>
```

7) 등록한 게시글의 제목을 수정해 보세요!
```
<!- QUERY ---------------------------------------!>
mutation {
    updateBoard(
        boardId: "627b99757d035600293d9726",
        password: "qwer1234!",
        updateBoardInput: {
            title: "모두들 화이팅!!!!!!!"
        }
    ) {
        _id, title, contents, likeCount, dislikeCount, images, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "updateBoard": {
            "_id": "627b99757d035600293d9726",
            "title": "모두들 화이팅!!!!!!!",
            "contents": "모두들 화이팅입니다!",
            "likeCount": 1,
            "dislikeCount": 1,
            "images": [
                "codecamp.png"
            ],
            "createdAt": "2022-05-11T11:09:41.180Z",
            "updatedAt": "2022-05-11T11:09:41.180Z"
        }
    }
}
<!-----------------------------------------------!>
```

8) fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.
	(search 변수를 활용해요!)
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoards(
        search: "모두들 화이팅!!!!!!!"
    ) {
        _id, title, contents, likeCount, dislikeCount, images, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoards": [
            {
                "_id": "627b99757d035600293d9726",
                "title": "모두들 화이팅!!!!!!!",
                "contents": "모두들 화이팅입니다!",
                "likeCount": 1,
                "dislikeCount": 1,
                "images": [
                    "codecamp.png"
                ],
                "createdAt": "2022-05-11T11:09:41.180Z",
                "updatedAt": "2022-05-11T11:09:41.180Z"
            }
        ]
    }
}
<!-----------------------------------------------!>
```

9) 등록한 게시글에 댓글을 3개 추가해 보세요.
```
<!- QUERY ---------------------------------------!>
mutation {
    createBoardComment(
        boardId: "627b99757d035600293d9726",
        createBoardCommentInput: {
            writer: "고래잡는새우",
            password: "qwer1234!",
            contents: "내가 더 화이팅!",
            rating: 0.5
        }
    ) {
        _id, writer, contents, rating, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "createBoardComment": {
            "_id": "627b9e377d035600293d972f",
            "writer": "고래잡는새우",
            "contents": "내가 더 화이팅!",
            "rating": 0.5,
            "createdAt": "2022-05-11T11:29:59.952Z",
            "updatedAt": "2022-05-11T11:29:59.952Z"
        }
    }
}
<!-----------------------------------------------!>
```

10) 첫번째 댓글의 내용을 수정해 보세요!
```
<!- QUERY ---------------------------------------!>
mutation {
    updateBoardComment(
        boardCommentId: "627b9de67d035600293d972d",
        password: "qwer1234!",
        updateBoardCommentInput: {
            contents: "취소!",
            rating: 0.5
        }
    ) {
        _id, writer, contents, rating, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "updateBoardComment": {
            "_id": "627b9de67d035600293d972d",
            "writer": "고래잡는새우",
            "contents": "취소!",
            "rating": 0.5,
            "createdAt": "2022-05-11T11:28:38.328Z",
            "updatedAt": "2022-05-11T11:28:38.328Z"
        }
    }
}
<!-----------------------------------------------!>
```

11) 두번째 댓글을 삭제해 보세요!
```
<!- QUERY ---------------------------------------!>
mutation {
    deleteBoardComment(
        boardCommentId: "627b9e327d035600293d972e",
        password: "qwer1234!"
    )
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "deleteBoardComment": "627b9e327d035600293d972e"
    }
}
<!-----------------------------------------------!>
```

12) 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoardComments(
        boardId: "627b99757d035600293d9726"
    ) {
        writer, contents
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoardComments": [
            {
                "writer": "고래잡는새우",
                "contents": "내가 더 화이팅!3"
            },
            {
                "writer": "고래잡는새우",
                "contents": "취소!"
            }
        ]
    }
}
<!-----------------------------------------------!>
```

13) BEST 게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)
```
<!- QUERY ---------------------------------------!>
query {
    fetchBoardsOfTheBest {
        _id, writer, title, contents, likeCount, dislikeCount, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "fetchBoardsOfTheBest": [
            {
                "_id": "6231b55c7d035600293d9636",
                "writer": "백2기",
                "title": "이렇게 많이 누를 생각 없었는데",
                "contents": "안돼",
                "likeCount": 34,
                "dislikeCount": 6,
                "createdAt": "2022-03-16T10:01:00.865Z",
                "updatedAt": "2022-03-16T10:01:00.865Z"
            },
            {
                "_id": "6231bb5d7d035600293d9652",
                "writer": "신홍석",
                "title": "몰라",
                "contents": "신홍석의 작품 내용",
                "likeCount": 20,
                "dislikeCount": 3,
                "createdAt": "2022-03-16T10:26:37.629Z",
                "updatedAt": "2022-03-16T10:26:37.629Z"
            },
            {
                "_id": "6231df487d035600293d969d",
                "writer": "재형",
                "title": "코드캠프 정복하기",
                "contents": "멘토를 이기려면 어떻게 해야 할까? 아는 사람 손!",
                "likeCount": 15,
                "dislikeCount": 1,
                "createdAt": "2022-03-16T12:59:52.227Z",
                "updatedAt": "2022-03-16T12:59:52.227Z"
            },
            {
                "_id": "6231ca327d035600293d968d",
                "writer": "김태영",
                "title": "집에 아주 가고싶다",
                "contents": "운동가고싶다",
                "likeCount": 10,
                "dislikeCount": 6,
                "createdAt": "2022-03-16T11:29:54.378Z",
                "updatedAt": "2022-03-16T11:29:54.378Z"
            }
        ]
    }
}
<!-----------------------------------------------!>
```

14) 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!
```
<!- QUERY ---------------------------------------!>
mutation {
    createUser(
        createUserInput: {
            email: "ksk75844@gmail.com",
            password: "qwer1234!"
            name: "김회민"
        }
    ) {
        _id, email, name, createdAt, updatedAt
    }
}
<!-----------------------------------------------!>
<!- RESULT --------------------------------------!>
{
    "data": {
        "createUser": {
            "_id": "627ba6077d035600293d9758",
            "email": "ksk75844@gmail.com",
            "name": "김회민",
            "createdAt": "2022-05-11T12:03:19.111Z",
            "updatedAt": "2022-05-11T12:03:19.111Z"
        }
    }
}
-----
{
    "errors": [
        {
            "message": "이미 존재하는 이메일입니다.",
            ...
        }
    ],
    "data": null
}
<!-----------------------------------------------!>
```