
-- 데이터 전제 갯수 확인
--   5,000,000 개
select COUNT(*) 
from board
;

-- 인덱싱이 안된 쿼리문
--   11.795s
-- 인덱싱이 되었다면
--   8ms
select * 
from board
where title="0.9938477631601018"
;

-- 옵티마이저 실행계획 확인
-- 인덱싱이 안된 쿼리문
--   type: ALL
--   rows: 4,979,463
-- 인덱싱이 되었다면
--   type: ref
--   rows: 1
explain 
	select *
	from board b
	where title="0.9938477631601018"
;

-- 인덱싱이 된 쿼리문
--   8ms
select * 
from board b 
where id=2500000
;

-- 옵티마이저 실행계획 확인
-- 인덱싱이 된 쿼리
--   type: const
--   rows: 1
explain
	select * 
	from board b 
	where id=2500000
;

-- board 테이블의 인덱스 확인
show index 
from board
;

-- 인덱스 생성
create index idx_title 
on board(title)
;
