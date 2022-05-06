
const iframes = [
    "./home.html", "./music.html", "./game.html"
];

const itemClick = ( index ) => {
    const items = [...document.getElementsByClassName('menu__item')];
    const iframe = document.getElementById('iframe');

    items.forEach(item => {
        item.classList.remove("menu__select");
    });
    items[index].classList.add("menu__select");

    iframe.setAttribute("src", iframes[index]);
}