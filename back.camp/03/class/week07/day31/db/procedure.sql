select * 
from board
;

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