
function getRandomInterger( min, max ) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken( digit ) {
    if( digit === undefined ) {
        console.error( "Error! Undefined Digit" );
        return undefined;
    } else if( Number.isNaN( Number(digit) ) ) {
        console.error( "Error! NaN Digit" );
        return undefined;
    } else if( digit <= 0 ) {
        console.error( "Error! Minimum Digit is 1" );
        return undefined;
    } else if( digit > 10 ) {
        console.error( "Error! Maximum Digit is 10" );
        return undefined;
    }

    return String( getRandomInterger(0, Math.pow(10, digit)) ).padStart(digit, "0");
}

console.log( getRandomToken() );
console.log( getRandomToken("1a") );
console.log( getRandomToken(0) );
console.log( getRandomToken(11) );