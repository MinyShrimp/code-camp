
function getRandomInterger( min, max ) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken( digit ) {
    return String( getRandomInterger(0, Math.pow(10, digit)) ).padStart(digit, "0");
}

console.log( getRandomToken(10) );