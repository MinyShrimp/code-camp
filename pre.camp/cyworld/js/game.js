
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function lotto_rand() {
    let result = [ ];
    for( let i = 1; i <= 45; i++ ) { result.push(i); }
    for( let i = 0; i < 1000; i++ ) {
        const x = rand(0, 45), y = rand(0, 45);
        if( x !== y ) {
            let tmp = result[y];
            result[y] = result[x];
            result[x] = tmp;
        }
    }

    return result.slice(0, 6).sort((a, b) => a - b);
} 

function word_btn_click() {
    const word_input = document.getElementById('word_input');
    const word_result = document.getElementById('word__result');

    if( word_input.value !== "" ) {
        word_result.innerText = word_input.value[0] === '드' ? "성공!" : "실패";
        word_input.value = "";
    }
}

function lotto_btn_click() {
    const lotto_texts = [...document.getElementsByClassName('lotto_item')];
    const lottos = lotto_rand();
    lotto_texts.forEach((l, i) => {
        l.innerHTML = lottos[i];
    });
}