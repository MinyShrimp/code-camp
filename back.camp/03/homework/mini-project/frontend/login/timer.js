
const START_TIME = 60;
let time = START_TIME;
let timer = null;

const timerInit = () => {
    if(timer !== null) {
        window.clearInterval( timer );
    }

    timer = null; time = START_TIME;
    document.querySelector("#ValidationInputWrapper").style.display = "none";
    document.getElementById(`LimitTime`).innerText = "1:00";

    document.getElementById("goSubmitBtn").disabeld = false;
    document.getElementById("okSubmitBtn").disabeld = false;

    document.getElementById("TokenInput").disabled = false;
    document.getElementById("TokenInput").value = "";
    for( let i = 2; i <= 3; i++ ) {
        document.getElementById(`PhoneNumber0${i}`).disabled = false;
        document.getElementById(`PhoneNumber0${i}`).value = "";
    }

    phoneAuthOk = false;
}

const timerOk = () => {
    if(timer !== null) {
        window.clearInterval( timer );
    }
    
    timer = null; time = START_TIME;

    document.getElementById("goSubmitBtn").disabeld = true;
    document.getElementById("okSubmitBtn").disabeld = true;
    
    document.getElementById("TokenInput").disabled = true;
    for( let i = 2; i <= 3; i++ ) {
        document.getElementById(`PhoneNumber0${i}`).disabled = true;
    }

    phoneAuthOk = true;
}