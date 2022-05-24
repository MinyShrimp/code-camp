import PointService from "./services/point.service.js";

/**
 * Coupon Controller 
 */
class CouponController {
    /**
     * 생성자
     * @param {PointService} pointService 
     */
    constructor(pointService) {
        this.pointService = pointService;
    }

    /**
     * 쿠폰 구매하기 API
     */
    buy = (req, res) => {
        const body = req.body;

        // 가진 돈을 검증하는 코드
        const hasMoney = this.pointService.hasMoney();

        // 쿠폰을 구매하는 코드
        if (hasMoney) {
            res.send("쿠폰 구매가 완료되었습니다.");
        } else {
            res.send("쿠폰 구매를 실패하였습니다....");
        }
    };
}

export default CouponController;
