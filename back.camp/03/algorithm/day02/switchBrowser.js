const browser = "Chrome";

switch (browser) {
    case "Edge":
        console.log("Edge는 일부 기능이 지원되지 않습니다.");
        break;
    case "Chrome":
    case "Firefox":
    case "Safari":
    case "Opera":
        console.log("지원되는 브라우저입니다.");
        break;
    default:
        console.log("지원되지 않는 브라우저입니다.");
}

if( browser === "Edge" ) {
    console.log("Edge는 일부 기능이 지원되지 않습니다.");
} else if( browser === "Chrome" || browser === "Firefox" || browser === "Safari" || browser === "Opera" ) {
    console.log("지원되는 브라우저입니다.");
} else {
    console.log("지원되지 않는 브라우저입니다.");
}