// 개별 테스트
it("One Testing : Add", () => {
    const a = 1;
    const b = 2;
    expect(a + b).toEqual(3);
});

// 묶음 테스트
describe("Group Testing", () => {
    it("Test Add", () => {
        const a = 1;
        const b = 2;
        expect(a + b).toEqual(3);
    });

    it("Test Multiple", () => {
        const a = 1;
        const b = 2;
        expect(a * b).toEqual(2);
    });
});

// 상품 구매 테스트
describe("상품 구매 테스트", () => {
    /**
     * 모든 테스트 전에 실행
     */
    beforeAll(() => {});

    /**
     * 모든 테스트 후에 실행
     */
    afterAll(() => {});

    /**
     * 각 테스트 후에 실행
     */
    afterEach(() => {});

    /**
     * 각 테스트 전에 실행
     */
    beforeEach(() => {
        // 로그인 로직
    });

    it("돈 검증", async () => {
        const result = await (async () => {
            return true;
        })();

        expect(result).toEqual(true);
    });

    it("상품 구매", async () => {
        const result = await (async () => {
            return true;
        })();

        expect(result).toEqual(true);
    });
});
