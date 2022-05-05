
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken() {
    return rand(100000, 1000000);
}

function createToken() {
    const tokenDom = document.getElementById('token');
    const token = getRandomToken();

    tokenDom.innerText = token;
}