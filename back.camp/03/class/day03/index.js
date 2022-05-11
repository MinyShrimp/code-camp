import * as _ from "lodash";

const child1 = {
    name: "철수",
    age: 13,
    school: "다람쥐초등학교"
};

const child2 = {...child1};
child2.name = "영희";

console.log(child1, child2);

const child3 = {
    name: { first: "김", last: "철수" },
    age: 13,
    school: "다람쥐초등학교"
};


const child4 = _.cloneDeep(child3);
child4.name.first = "최";
child4.name.last  = "영희";

console.log(child3, child4);