// 타입 추론
let typeInference = "안녕하세요";

// 타입 명시
let typeAnnotation: string = "반갑습니다";

// 타입 명시는 여러 개를 할 수 있다.
let typeAnnotations: string | number = "Hello world";
typeAnnotations = 10;

// 숫자 타입
let numberType: number = 10;

// Boolean type
let booleanType: boolean = true;
booleanType = false;

// 배열 타입
let arrayType: number[] | string[] = [1000, 2000, 3000];
arrayType = ["asd", "vxc", "casd"];

let arrayType2: Array<boolean | string> = [true, false, "false", "true", false];

