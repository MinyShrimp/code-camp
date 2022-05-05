

document.addEventListener('DOMContentLoaded', (e) => {
    const allCheckDom = document.getElementById('allCheck');
    const checkitems = [...document.getElementsByClassName('bgm_check')];

    allCheckDom.addEventListener('change', (e) => {
        checkitems.forEach(item => {
            item.checked = allCheckDom.checked;
        });
    });

    checkitems.forEach(item => {
        item.addEventListener('change', (e) => {
            // TODO
        });
    });
})