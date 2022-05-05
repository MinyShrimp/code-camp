
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken() {
    return String( rand(0, 1000000) ).padStart(6, "0");
}

function getRandomColor() {
    return [rand(0, 256), rand(0, 256), rand(0, 256)];
}

const createToken = () => {
    const tokenDom = document.getElementById('token');
    const token = getRandomToken();
    tokenDom.innerText = token;
};

const changeRandomColor = () => {
    const tokenDom = document.getElementById('token');
    const colors = getRandomColor();
    tokenDom.style.color = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
};

const clickBtn = () => {
    createToken();
    changeRandomColor();
};

document.addEventListener('DOMContentLoaded', () => {
    setInterval(clickBtn, 100);
});