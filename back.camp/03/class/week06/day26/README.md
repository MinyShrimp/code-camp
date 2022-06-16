# Day 26

## Procedure

```sql
-- 프로시저 삭제
drop procedure ClassBoardDummyData;

-- 프로시저 목록
show procedure status;

-- 프로시저 생성
create procedure ClassBoardDummyData()
begin
	declare i int default 1;
	while i <= 5000000 do
		insert into board(writer, title, contents) values("철수", rand(), "설명입니다");
		set i = i + 1;
	end while;
end;

-- 프로시저
call ClassBoardDummyData();
```

## Index

### 옵티마이저

> 검색을 효율적으로 해주는 DB 내장 기능

<br>

### 실행계획

> 효율적인 검색 계획

-   1번부터 찾을까? 마지막부터 찾을까?

<br>

### Explain 명령어

> 옵티마이저가 결정한 실행계획 보여줘

<br>

### Code

```sql
explain
    select *
    from board
    where title = ""
;
```

| key  | value     |
| ---- | --------- |
| type | ALL       |
| rows | 5,000,000 |

```sql
explain
    select *
    from board
    where id = ""
;
```

| key           | value   |
| ------------- | ------- |
| type          | const   |
| rows          | 1       |
| possible_keys | PRIMARY |
| key           | PRIMARY |
| ref           | const   |

<br>

### 인덱싱

```sql
create index idx_title on board(title);
```

### type

| type  | description             |
| ----- | ----------------------- |
| ALL   | 하나하나 다 찾아볼 예정 |
| const | PK, FK, UNIQUE          |
| ref   | 내가 만든 인덱스        |
| range | 범위 검색               |
| ...   | ...                     |
