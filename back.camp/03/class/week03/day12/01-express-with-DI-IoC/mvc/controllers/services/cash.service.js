/**
 * 가진 돈을 관리하는 Service Class
 */
export default class CashService {
    constructor() {}

    /**
     * 가진 돈을 검증
     * @returns 돈이 충분한지 여부
     */
    hasMoney = () => {
        console.log("현금이 있는지 검증합니다.");
        return true;
    };
}
