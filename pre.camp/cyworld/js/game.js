
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
} 

function lotto_rand() {
    return rand(1, 45);
} 

function word_btn_click() {
    const word_input = document.getElementById('word_input');
    const word_result = document.getElementById('word__result');

    console.log(word_input.value);
    word_input.value = "";
}

function lotto_btn_click() {
    const lotto_texts = [...document.getElementsByClassName('lotto_item')];
    lotto_texts.forEach(l => {
        l.innerText = lotto_rand();
    });
}