//
//
// 1. Object => { ..., writable: true, configurable: true } // 수정 가능(+ 추가 가능), 삭제 가능
const profile1 = { age: 13 };

const res1 = Object.getOwnPropertyDescriptor(profile1, "age");
console.log(res1);

//
//
// 2. Object.preventExtensions => { ..., writable: true, configurable: true } // 수정 가능(+ 추가 불가능), 삭제 가능
const profile2 = { age: 13 };
Object.preventExtensions(profile2);

const res2 = Object.getOwnPropertyDescriptor(profile2, "age");
console.log(res2);

//
//
// 3. Object.seal => => { ..., writable: true, configurable: false } // 수정 가능(+ 추가 불가능), 삭제 불가능
const profile3 = { age: 13 };
Object.seal(profile3);

const res3 = Object.getOwnPropertyDescriptor(profile3, "age");
console.log(res3);

//
//
// 4. Object.freeze => { ..., writable: false, configurable: false } // 수정 불가능(+ 추가 불가능), 삭제 불가능
const profile4 = { age: 13 };
Object.freeze(profile4);

const res4 = Object.getOwnPropertyDescriptor(profile4, "age");
console.log(res4);
