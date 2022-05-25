// 1. public
class Aaa1 {
    constructor(public mypower) {
        // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
    ggg2() {
        console.log(this.mypower); // 안에서 접근 가능
        this.mypower = 10; // 안에서 수정 가능
    }
}
class Aaa2 extends Aaa1 {
    ggg2() {
        console.log(this.mypower); // 자식이 접근 가능
        this.mypower = 10; // 자식이 수정 가능
    }
}
const aaa = new Aaa2(50);
console.log(aaa.mypower); // 밖에서 접근 가능
aaa.mypower = 5; // 밖에서 수정 가능

//
//
// 2. protected
class Bbb1 {
    constructor(protected mypower) {
        // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
    ggg1() {
        console.log(this.mypower); // 안에서 접근 가능
        this.mypower = 10; // 안에서 수정 가능
    }
}
class Bbb2 extends Bbb1 {
    ggg2() {
        console.log(this.mypower); // 자식이 접근 가능
        this.mypower = 10; // 자식이 수정 가능
    }
}
const bbb = new Bbb2(50);
console.log(bbb.mypower); // 밖에서 접근 불가
bbb.mypower = 10; // 밖에서 수정 불가

//
//
// 3. private
class Ccc1 {
    constructor(private mypower) {
        // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
    ggg1() {
        console.log(this.mypower); // 안에서 접근 가능
        this.mypower = 10; // 안에서 수정 가능
    }
}
class Ccc2 extends Ccc1 {
    ggg2() {
        console.log(this.mypower); // 자식이 접근 불가
        this.mypower = 10; // 자식이 수정 불가
    }
}
const ccc = new Ccc2(50);
console.log(ccc.mypower); // 밖에서 접근 불가
ccc.mypower = 10; // 밖에서 수정 불가

//
//
// 4. readonly
class Ddd1 {
    constructor(readonly mypower) {
        // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
    ggg1() {
        console.log(this.mypower); // 안에서 접근 가능
        this.mypower = 10; // 안에서 수정 불가
    }
}
class Ddd2 extends Ddd1 {
    ggg2() {
        console.log(this.mypower); // 자식이 접근 가능
        this.mypower = 10; // 자식이 수정 불가
    }
}
const ddd = new Ddd2(50);
console.log(ddd.mypower); // 밖에서 접근 가능
ddd.mypower = 10; // 밖에서 수정 불가

//
//
// 5. private readonly
class Eee1 {
    constructor(private readonly mypower) {
        // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
    ggg1() {
        console.log(this.mypower); // 안에서 접근 가능
        this.mypower = 10; // 안에서 수정 불가
    }
}
class Eee2 extends Eee1 {
    ggg2() {
        console.log(this.mypower); // 자식이 접근 불가
        this.mypower = 10; // 자식이 수정 불가
    }
}
const eee = new Eee2(50);
console.log(eee.mypower); // 밖에서 접근 불가
eee.mypower = 10; // 밖에서 수정 불가
