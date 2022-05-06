
const checkValidation = () => {
    const emailDom    = document.getElementById('email');
    const pwdDom      = document.getElementById('pwd');
    const pwdAgainDom = document.getElementById('pwd_again');
    const submitBtn   = document.getElementById('submit');

    submitBtn.disabled = emailDom.value === '' || pwdAgainDom.value === '' || pwdDom.value === '';
}

const emailCheck = ( ) => {
    checkValidation();

    const emailDom      = document.getElementById('email');
    const emailCheckDom = document.getElementById('email_check');

    emailCheckDom.style.display = emailDom.value === '' ? 'block' : 'none';
}

const pwdCheck = () => {
    checkValidation();

    const pwdDom      = document.getElementById('pwd');
    const pwdCheckDom = document.getElementById('pwd_check');

    pwdCheckDom.style.display = pwdDom.value === '' ? 'block' : 'none';
}

const pwdAgainCheck = () => {
    checkValidation();

    const pwdDom      = document.getElementById('pwd');
    const pwdAgainDom = document.getElementById('pwd_again');
    const pwdCheckDom = document.getElementById('pwd_again_check');

    pwdCheckDom.style.display = pwdDom.value !== pwdAgainDom.value ? 'block' : 'none';
}