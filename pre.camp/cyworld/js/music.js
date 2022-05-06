
// const bgms = [
//     { checked: false, index: 1, name: "눈의 꽃", artist: "박효신" },
//     { checked: false, index: 2, name: "사랑스러워", artist: "김종국" },
//     { checked: false, index: 3, name: "내사람: Partner For Life", artist: "SG 워너비" },
//     { checked: false, index: 4, name: "Love Love Love", artist: "에픽하이" },
//     { checked: false, index: 5, name: "애인_있어요", artist: "이은미" },
// ];

document.addEventListener('DOMContentLoaded', (e) => {
});

const allCheckClick = () => {
    const allCheckDom = document.getElementById('allCheck');
    const checkitems = [...document.getElementsByClassName('bgm_check')];

    allCheckDom.checked = !allCheckDom.checked;
    checkitems.forEach(item => {
        item.checked = allCheckDom.checked;
    });
}

const CheckClick = ( index ) => {
    const allCheckDom = document.getElementById('allCheck');
    const checkitems = [...document.getElementsByClassName('bgm_check')];
    
    checkitems[index - 1].checked = !checkitems[index - 1].checked;

    let count = 0, max_count = checkitems.length;
    checkitems.forEach(ci => {
        if( ci.checked ) { count += 1; }
    });
    allCheckDom.checked = count === max_count;
}