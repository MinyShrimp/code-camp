
document.addEventListener('DOMContentLoaded', (e) => {
    const phone = [...document.getElementsByClassName('phone')];
    const submitBtn = document.getElementById('submit');

    const checkBtnEnable = () => {
        submitBtn.disabled = !(phone[0].value.length >= 3 && phone[1].value.length >= 4 && phone[2].value.length >= 4);
    }

    phone[0].addEventListener('input', () => {
        if( phone[0].value.length >= 3 ) { phone[1].focus(); }
        checkBtnEnable();
    });

    phone[1].addEventListener('input', () => {
        if( phone[1].value.length >= 4 ) { phone[2].focus(); }
        checkBtnEnable();
    });

    phone[2].addEventListener('input', () => {
        checkBtnEnable();
        if( phone[2].value.length >= 4 ) { submitBtn.focus(); }
    });
});