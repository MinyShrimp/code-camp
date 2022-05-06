
function getRandomToken() {
    const min = 100000, max = 1000000;
    return Math.floor( Math.random() * ( max - min ) + min ).toString();
}

function onetotwo( num ) {
    return num >= 10 ? num.toString() : "0" + num;
}

var token = "000000";
var timer = 180;

var signup_value = {
    email: "", name: "", password: "",
    phone: "", country: "", sex: ""
};

window.addEventListener('DOMContentLoaded', (event) => {
    const auth_send  = document.getElementById('auth-btn');
    const auth_input = document.getElementById('auth-input');
    const auth_timer = document.getElementById('auth-timer');
    const auth_ok    = document.getElementById('auth-ok');
    const submit     = document.getElementById('submit');

    const phone1     = document.getElementById('phone1');
    const phone2     = document.getElementById('phone2');
    const phone3     = document.getElementById('phone3');
    const email      = document.getElementById('email');
    const name       = document.getElementById('name');
    const pwd        = document.getElementById('pwd');
    const pwd_again  = document.getElementById('pwd-again');
    const country    = document.getElementById('country');
    const sex        = document.getElementById('sex');

    const email_label     = document.getElementById('email-label');
    const name_label      = document.getElementById('name-label');
    const pwd_label       = document.getElementById('pwd-label');
    const pwd_again_label = document.getElementById('pwd-again-label');
    const country_label   = document.getElementById('country-label');
    const sex_label       = document.getElementById('sex-label');

    var phone_number = ["", "", ""];
    var input_value = "";
    var auth_success = false;
    var interval = undefined;
    
    email.addEventListener('input', (e) => {
        signup_value.email = e.target.value;
        email_label.style.display = 
            (/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i).test(e.target.value) ? "none" : "block";
    });

    name.addEventListener('input', (e) => {
        signup_value.name = e.target.value;
        name_label.style.display = e.target.value === "" ? "block" : "none";
    });

    pwd.addEventListener('input', (e) => {
        signup_value.password = e.target.value;
        pwd_label.style.display = e.target.value === "" ? "block" : "none";

        const pwd_again_value = document.getElementById('pwd-again').value;
        pwd_again_label.style.display = pwd_again_value != signup_value.password ? "block" : "none";
    });

    pwd_again.addEventListener('input', (e) => {
        const pwd_again_value = e.target.value;
        pwd_again_label.style.display = pwd_again_value != signup_value.password ? "block" : "none";
    });

    country.addEventListener('change', (e) => {
        signup_value.country = e.target.value;
        country_label.style.display = e.target.value === 'none' ? "block" : "none";
    });

    sex.addEventListener('change', (e) => {
        signup_value.sex = e.target.value;
        sex_label.style.display = "none";
    });

    phone1.addEventListener('input', (e) => {
        const value = e.target.value;
        phone_number[0] = value;
        if( phone_number[0].length === 3 && phone_number[1].length === 4 && phone_number[2].length === 4 && !auth_success ) {
            auth_send.disabled = false;
        }
        if( value.length >= 3 ) { 
            phone2.focus(); 
        }
    });

    phone2.addEventListener('input', (e) => {
        const value = e.target.value;
        phone_number[1] = value;
        if( phone_number[0].length === 3 && phone_number[1].length === 4 && phone_number[2].length === 4 && !auth_success ) {
            auth_send.disabled = false;
        }
        if( value.length >= 4 ) {
            phone3.focus(); 
        }
    });

    phone3.addEventListener('input', (e) => {
        const value = e.target.value;
        phone_number[2] = value;
        if( phone_number[0].length === 3 && phone_number[1].length === 4 && phone_number[2].length === 4 && !auth_success ) {
            auth_send.disabled = false;
        }
        if( value.length >= 4 ) { 
            auth_send.focus(); 
        }
    });

    auth_send.addEventListener('click', (e) => {
        signup_value.phone = phone_number.join('');

        token = getRandomToken();
        alert(token);
        auth_input.focus();
        auth_ok.disabled = false;

        if(interval === undefined) {
            timer = 180;
            auth_timer.innerText = "3:00";
            interval = window.setInterval(() => {
                timer -= 1;
                if(timer < 0) {
                    window.clearInterval( interval );
                    interval = undefined;
                    alert('인증 시간이 다 되었습니다.');
                    auth_ok.disabled = true;
                    phone1.disabled = false;
                    phone2.disabled = false;
                    phone3.disabled = false;
                    auth_timer.innerText = `0:00`;
                } else {
                    auth_timer.innerText = `${Math.floor(timer / 60)}:${onetotwo(timer % 60)}`;
                }
            }, 1000);
        }
    });

    auth_input.addEventListener('input', (e) => {
        const value = e.target.value;
        input_value = value;
        if( value.length >= 6 ) { auth_ok.focus(); }
    });

    auth_ok.addEventListener('click', (e) => {
        if( input_value === token.toString() ) {
            window.clearInterval( interval );
            interval = undefined;

            alert("인증이 완료되었습니다.");
            auth_ok.disabled = true;
            auth_input.disabled = true;
            auth_send.disabled = true;
            submit.disabled = false;
            phone1.disabled = true;
            phone2.disabled = true;
            phone3.disabled = true;
            auth_timer.innerText = "3:00";
            auth_ok.innerText = "인증 완료";
            auth_success = true;
        } else {
            alert("인증에 실패했습니다.");
            phone1.disabled = false;
            phone2.disabled = false;
            phone3.disabled = false;
        }
    });

    submit.addEventListener('click', (e) => {
        console.log(signup_value);

        if( email_label.style.display != "none" ) {
            alert("이메일이 올바르지 않습니다.");
            email.focus();
            return false;
        }

        if( name_label.style.display != "none" ) {
            alert("이름이 올바르지 않습니다.");
            name.focus();
            return false;
        }

        if( pwd_label.style.display != "none" ) {
            alert("비밀번호가 올바르지 않습니다.");
            pwd.focus();
            return false;
        }

        if( pwd_again_label.style.display != "none" ) {
            alert("비밀번호가 올바르지 않습니다.");
            pwd_again.focus();
            return false;
        }

        if( country_label.style.display != "none" ) {
            alert("지역을 선택해주세요.");
            country.focus();
            return false;
        }

        if( sex_label.style.display != "none" ) {
            alert("성별을 선택해주세요.");
            return false;
        }

        if( !auth_success ) {
            alert("휴대폰 인증을 완료해주세요.");
            phone1.focus();
            return false;
        }

        alert("코드캠프 가입을 축하합니다.");
        return true;
    });
})

