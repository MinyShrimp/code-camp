
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken() {
    return String( rand(0, 1000000) ).padStart(6, "0");
}

function getRandomColor() {
    return [rand(0, 256), rand(0, 256), rand(0, 256)];
}

function getStringZero( value ) {
    return String(value).padStart(2, "0");
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

class Timer {
    constructor( tickCallback, endCallback, startSec = 180 ) {
        this.tickCallback = tickCallback;
        this.endCallback = endCallback;
        this.time = startSec; this.startTime = startSec;
        this.intervalID = undefined;
    }

    __endTimer = () => {
        clearInterval(this.intervalID);
        this.intervalID = undefined;
        if(this.endCallback !== undefined) {
            this.endCallback();
        }
    }

    __getTime = () => {
        const min = getStringZero( Math.floor(this.time / 60) );
        const sec = getStringZero( this.time % 60 );
        return `${min}:${sec}`;
    }

    __timerReduce = () => {
        if(this.time <= 1) {
            this.__endTimer();
        }
        this.time -= 1;
        if( this.tickCallback !== undefined ) {
            this.tickCallback( this.__getTime() );
        }
    }

    start = () => {
        if(this.intervalID === undefined) {
            this.time = this.startTime;
            this.intervalID = setInterval(this.__timerReduce, 1000);
        }
    }

    stop = () => {
        if(this.intervalID !== undefined) {
            this.__endTimer();
        }
    }

    getStartTime = () => {
        const min = getStringZero( Math.floor(this.startTime / 60) );
        const sec = getStringZero( this.startTime % 60 );
        return `${min}:${sec}`;
    }

    isRun = () => {
        return this.intervalID !== undefined;
    }
};

class TimerManager {
    constructor( timerDom, authBtnDom, startSec ) {
        this.timerDom = timerDom;
        this.authBtnDom = authBtnDom;
        this.timer = new Timer( this.__update, this.__end, startSec );
    }

    __update = ( time ) => {
        this.timerDom.innerText = time;
    }

    __end = () => {
        this.authBtnDom.disabled = true;
        this.timerDom.innerText = this.timer.getStartTime();
    }

    start = () => {
        this.authBtnDom.disabled = false;
        if( !this.timer.isRun() ) {
            this.timerDom.innerText = this.timer.getStartTime();
        }
        
        this.timer.start();
    }

    stop = () => {
        this.timer.stop();
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const timerManager = new TimerManager( 
        document.getElementById('timer'),
        document.getElementById('auth_ok'),
        10
    );

    document.getElementById('start_btn').addEventListener('click', () => {
        createToken();
        changeRandomColor();
        timerManager.start();
    });

    document.getElementById('end_btn').addEventListener('click', () => {
        timerManager.stop();
    });
});