import { CashService } from "./services/cash.service.js";

class CouponController {
    constructor() {}

    /**
     * 쿠폰 구매하기 API
     */
    static buy = (req, res) => {
        const body = req.body;

        // 가진 돈을 검증하는 코드
        const cashService = new CashService();
        const hasMoney = cashService.hasMoney();

        // 쿠폰을 구매하는 코드
        if (hasMoney) {
            res.send("쿠폰 구매가 완료되었습니다.");
        } else {
            res.send("쿠폰 구매를 실패하였습니다....");
        }
    };
}

export default CouponController;
