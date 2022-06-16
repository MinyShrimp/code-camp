SELECT * 
FROM product p 
;

SELECT id, name, description, price, isSoldout, productSaleslocationId 
FROM product
;

INSERT 
INTO product(id, name, description, price, isSoldout) 
VALUES(uuid(), "마우스", "정말 좋은 마우스입니다!!", 15000, false)
;

INSERT 
INTO product(id, name, description, price, isSoldout)
VALUES(uuid(), "노트북", "최신 맥북!!!", 20000, false)
;

DELETE 
FROM product
;

select id, address, addressDetail, lat, lng, meetingTime
from product_sales_location
;

INSERT 
INTO product_sales_location(id, address, addressDetail, lat, lng, meetingTime)
VALUES(uuid(), "구로구", "지밸리 13층", 0, 0, now())
;

DELETE from product_sales_location;

UPDATE product as p
set p.productSaleslocationId = "e6b47ba2-dff5-11ec-81a5-5bc8dcf229f5"
WHERE id = "f2dabcb6-dff5-11ec-81a5-5bc8dcf229f5"
;

SELECT p.id, p.name, p.price, psl.address, psl.addressDetail, psl.meetingTime 
FROM product as p, product_sales_location as psl 
WHERE p.productSaleslocationId = psl.id
;

-- Group By
select name, SUM(price)
from product
group by name
;

-- Order by
SELECT id, name, description, price, isSoldout, productSaleslocationId 
FROM product
order by price desc -- 내림차순
;

SELECT id, name, description, price, isSoldout, productSaleslocationId 
FROM product
order by price asc -- 오름차순
;

-- Sub Query
select name,
       price,
       isSoldout,
       ( select max(price) from product ) as maxPrice
from product;