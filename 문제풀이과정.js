// 객체를 순회하여 | 순회 === for
// key가 title이거나 name일 경우 | 경우 === if
// value를 대문자로 바꿔주세요   | 대문자 === toUpperCase()

const obj = {
    title: "The Title",
    name: "Jane",
    contents: "Noting to say"
};

for( let key in obj ) {
    // 1. let key in obj 에서 key가 무엇을 뜻하는지 console.log를 통해 본다.
    // console.log( key );

    // 2. 그럼 key값이 무엇을 뜻하는지 알았으니까 (obj의 key값)
    // 2-1. key값이 title, name과 비교를 해야겠네.

    // 3. 근데 그러면, key를 뭐로 비교를 해야 title, name을 찾을 수 있지?
    // 3-1. typeof( key )를 출력해보자.
    // 3-2. 보니까 string이네?
    // console.log( typeof(key) )

    // 4. key === "" 비교를 해야함.
    // 4-1. "" 이 안에 무엇을 넣어야 비교가 될까?
    // 4-2. 아까 1번 과정에서 key를 출력해보니 "title", "name", "contents"가 나왔다.
    // 4-3. 그러면 key === "title" 이런식으로 비교를 할 수 있네?
    if( key === "title" || key === "name" ) {
        // 5. value를 대문자로 바꿔야함.
        // 5-1. 어? 어떻게 바꾸지?
        // 5-2. 지금 내가 보는 코드에 value가 어딨지? OK

        // 6. Object 에서 value를 가져오는 방법이 뭐가 있었지?
        //  i) obj.title     ii) obj["title"]
        
        // 7. 어? 첫번째 방법으로 가져오려고 했더니, undefined가 뜨네?
        // 7-1. 이유는 obj.key 라고 쓴거는 "key" 이라는 이름의 value를 가져오겠단 뜻.
        // 7-2. 근데 현재 obj에 "key"이라는 이름을 가진 key값이 없죠?
        // 7-3. 그래서 undefined가 뜬다.

        // 8. 두번째 방법으로 가져와야 겠네
        // 8-1. 대괄호안에 string값이 들어가야하니 "key"라는 이름을 가진 변수가 현재 string이니까 이걸 대괄호안에 넣어보자.
        // console.log( obj[ key ] );
        // 8-2. 출력해보니까 value값이 나와! 와!

        // 9. 일단 이렇게 힘들게 찾은 변수를 임시 저장소에 집어넣자.
        let value = obj[key];

        // 10. value 값을 대문자로 바꾸고,
        value = value.toUpperCase();

        // 11. value 값을 obj에 반영하자.
        obj[key] = value;
    }
}

console.log(obj);