**목차**

# 1. Nest.js 프로젝트 생성 및 Graphql 연동하기

과제생성위치:

1. `homework/day13` 위치에서 새로운 `Nest.js` 프로젝트를 생성해 주세요.

1. `Nest.js` 프로젝트의 `app.module.ts` 부분에서 `GraphQLModule`을 연동해 주세요.
1. 서버의 포트는 3000번으로 해주셔야합니다.
1. `Nest.js`에서 `graphql`을 사용하는 경우, `code-first / schema-first` 두 가지 방법으로 셋팅할 수 있습니다.
1. `autoSchemaFile` 옵션을 사용하여 `code-first` 방법으로 셋팅해 주세요.

# 2. Starbucks 메뉴 등록 API 만들기

1. 위 `nest.js` 프로젝트에서 Starbucks 메뉴 등록 API를 만들어 주세요.
    1. module, resolver, service 파일을 각각 만들어주세요.
    2. API 이름은 `createStarbucks`로 만들어 주세요.
    3. 필수적으로 입력되어야 하는 값은 아래와 같습니다.
        - 음료명
        - 가격
        - 1회 제공량 (kcal)
        - 포화지방 (g)
        - 단백질 (g)
        - 나트륨 (mg)
        - 당류 (g)
        - 카페인 (mg)
    4. API에서 데이터를 받을 때는 dto에서 input 타입을 만들고, 해당 input 타입을 활용해서 받아옵니다.
    5. entities 폴더를 만들어 starbucks의 entity를 정의해주세요.
    6. DB에는 저장하지 않고, 해당 API에서 받아온 데이터를 `console.log`를 활용하여 출력합니다.
    7. 클라이언트에 `“등록에 성공하였습니다.”`를 응답합니다.
    8. 서버를 띄우고, 플레이그라운드에서 API를 테스트해보세요!

-   요청 결과 예시

-   테스트 결과 예시

# 3. Starbucks 메뉴 조회 API 만들기

1. 위 `nest.js` 프로젝트에서 Starbucks 조회 API를 만들어 주세요.
    1. API 이름은 `fetchStarbucks`로 만들어 주세요.
    2. 필수적으로 조회되어야 하는 값은 아래와 같습니다.
        - 음료명
        - 가격
        - 1회 제공량 (kcal)
        - 포화지방 (g)
        - 단백질 (g)
        - 나트륨 (mg)
        - 당류 (g)
        - 카페인 (mg)
    3. DB에서 꺼내오지 않고, 배열 안에 5개의 커피 데이터 객체를 하드코딩하여 전달합니다.
    4. 서버를 띄우고, 플레이그라운드에서 API를 테스트해보세요!

-   테스트 결과 예시

# 제출

1. `day13` 폴더를 압축해 클래스룸에 제출해주세요. (**node_modules** 제외)
2. Starbucks 메뉴 등록 API에서 받아온 데이터가 나온 콘솔 출력 화면 캡쳐본
3. Starbucks 메뉴 등록 API를 플레이그라운드에서 테스트 실행 후 나온 화면 캡쳐본
4. Starbucks 메뉴 조회 API를 플레이그라운드에서 테스트 실행 후 나온 화면 캡쳐본

# ✅ Self-Check

> 아래 체크 리스트를 복사해 스스로 점검해보고, 클래스룸에 댓글로 남겨주세요.

-   [x] 로컬호스트의 3000번 포트로 그래프큐엘 playground에 접속할 수 있다.
-   [x] 스타벅스의 entity에는 음료명, 가격, 1회 제공량, 포화지방, 단백질, 나트륨, 당류, 카페인이 포함된다.
-   Starbucks 메뉴 등록 API 생성 시,
    -   [x] API 이름을 `createStarbucks`로 지정하였다.
    -   [x] 클라이언트에서 개별 값이 아닌 inputType으로 묶어서 값을 받아온다.
    -   [x] 받아온 데이터가 콘솔에 출력된다.
    -   [x] 클라이언트에서는 `“등록에 성공하였습니다.”`를 응답 받는다.
-   Starbucks 메뉴 조회 API 생성 시,
    -   [x] API 이름을 `fetchStarbucks`로 지정하였다.
    -   [x] 클라이언트에서 스타벅스 데이터를 5개 응답받는다.
    -   [x] 스타벅스 데이터는 음료명, 가격, 1회 제공량, 포화지방, 단백질, 나트륨, 당류, 카페인을 포함한다.