# Day 12 Homework

# Typescript Quiz
## 1-1) 타입 지정하기
### 1. 각각의 상수에 아래 예시처럼 적절한 타입을 명시해 주세요.
```typescript
// a.
const myname: string = "철수";
// b.
const breadCount: number = 2;
// c.
const isActive: boolean = false;
```

## 1-2) 배열형 타입 지정하기
### 1. 아래 배열 상수가 선언되어 있습니다. 각각의 배열 상수에 적잘한 타입을 명시해 주세요.
```typescript
// a.
const classmates: Array<string> = ["철수", "영희", "훈이"];
// b.
const candyCounts: Array<number> = [2, 6, 4];
// c.
let moneyList: Array<number> | Array<string> = [1000, 2500, 4300];
moneyList = ["1000원", "2500원", "4300원"];
// d.
const isActiveList: Array<boolean | string> = [true, false, "false", "true", false];
```

## 1-3) 객체형 타입 지정하기

### a. 아래 createBoardInput에 들어갈 적절한 타입을 만들고 적용한 코드를 적어주세요.
```typescript
interface ICreateBoardInput {
    writer: string;
    title: string;
    contents: string;
}

const createBoardInput: ICreateBoardInput = {
    writer: "영희",
    title: "좋은 날씨 입니다~",
    contents: "오늘은 특히 더 날씨가 좋네요^^",
};
```

### b. 아래 updateBoardInput1, updateBoardInput2에 공통으로 들어갈 적절한 타입을 만들고 적용한 코드를 적어주세요.
```typescript
interface IUpdateBoardInput {
    writer: string;
    title?: string;
    contents: string;
}

const updateBoardInput1: IUpdateBoardInput = {
    writer: "영희",
    title: "좋은 날씨 입니다~",
    contents: "오늘은 특히 더 날씨가 좋네요^^",
};

const updateBoardInput2: IUpdateBoardInput = {
    writer: "훈이",
    contents: "기존에 작성한 글 내용 일부가 수정됐네요",
};
```

# DI / IOC Quiz
## 2-1) 아래 DI 퀴즈를 풀어주세요
### 1. DI는 무엇의 약자인가요?
Q. Dependency Injection - 의존성 주입

### 2. DI면 Singleton 패턴인가요?
Q. 아닙니다.

Singleton 패턴은 코드 상에서 단 하나만 존재(static)해야하는 Class를 위해 제작된 디자인 패턴입니다. 

DI는 단어를 나눠서 설명해야하는데, <br>
<b>Dependency(의존성)</b>는 두 객체간의 관계를 나타낼때, *A가 B를 의존한다* 라는 개념입니다. <br>
즉, B의 기능이 추가 또는 변경되거나 형식이 바뀌는 A도 변한다는 뜻이죠. <br>
또한, <b>Injection(주입)</b>은 말 그래도 외부의 어떤 요인이 어떤 특성(객체)에게 주입한다는 개념입니다.

이 두 단어를 합쳐서 만들어진 단어가 Dependency Injection 인것인데, <br>
말 그대로 두 객체간의 의존성을 Decorator나, 생성자의 인자나, 맴버 변수를 통해 프로그래머가 결정할 수 있도록 구현하는 방법론을 나타냅니다.

### 3. IoC는 무엇의 약자인가요?
Q. Inversion of Control - 통제의 역전

IoC란, 프로그램의 제어흐름을 미리 작성된 프레임워크에 의해 제어되도록 맡기고, <br>
프로그래머는 그 위에서 비즈니스 로직을 짜는데 더 집중할 수 있도록 도움을 주는 개념입니다.

### 4. Nest.js에서 IoC Container가 DI를 해주고 있나요?
Q. Provider를 통해 주입해주고 있습니다.

### 5. javascript 언어로 사용 가능한 Backend 프레임워크에 Nest.js 가 있습니다. java 언어로 사용 가능한 Backend 프레임워크에는 Spring 이 있습니다. 이 둘 모두 해당 프레임워크들에 IOC 컨테이너가 존재하며, DI를 지원하고 있나요?
Q. Nest.js는 4번에서 설명하였으며, Spring에서는 BeanDefinition이라는 인터페이스를 통해 메타정보를 설정하고 Spring에게 주입하는 방식으로 작동하며, 이렇게 만들어진 IoC Container를 Bean이라고 부릅니다.

## 2-2) 페어에게 설명하기
Q. 2-1번의 2번의 내용과 동일합니다.