
function getRandomInterger( min, max ) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken( digit ) {
    return String( getRandomInterger(0, Math.pow(10, digit)) ).padStart(digit, "0");
}

function getBlank( len ) {
    let result = ' ' ** len;
    for(var i = 0; i < len; i++) { result += ' '; }
    return result;
}

function getRandomDiamond( count ) {
    let result = '';
    for(let i = 1; i <= count; i++) {
        result += getBlank(count - i) + getRandomToken(i * 2 - 1) + '\n';
    }
    
    for(let i = count - 1; i > 0; i--) {
        result += getBlank(count - i) + getRandomToken(i * 2 - 1) + '\n';
    }

    return result;
}

console.log( getRandomDiamond(10) );