

export let token = "000000";

function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomToken(digit) {
    if (digit === undefined) {
        console.error("Undefined Digit");
        return undefined;
    } else if (Number.isNaN(Number(digit))) {
        console.error("NaN Digit");
        return undefined;
    } else if (digit <= 0) {
        console.error("Minimum Digit is 1");
        return undefined;
    } else if (digit > 10) {
        console.error("Maximum Digit is 10");
        return undefined;
    }

    token = String(getRandomInterger(0, Math.pow(10, digit))).padStart(digit, "0"); 
    console.log(token);
    return token;
}


export const isValidToken = ( submitToken ) => {
    console.log(token, submitToken);
    return token === submitToken;
}