
/*
<button id="change" onclick="change();"> change </button>
1. input 태그에 담긴 값을 가져와서 변수에 할당
2. 변수에 담긴 내용을 greeting에 전달
*/
function change() {
    const hello = document.getElementById('greeting');
    const text  = document.getElementById('text');

    if( text.value !== "" ) {
        hello.innerText = text.value;
    }
    text.value = "";
}