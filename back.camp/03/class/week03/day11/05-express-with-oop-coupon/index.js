import express from "express";

import ProductController from "./mvc/controllers/product.controller.js";
import CouponController from "./mvc/controllers/coupon.controller.js";

////////////////////////////////////////////////////////////////////////////////////////////////
/* express settings */
////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////
/* middleware */
////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());

////////////////////////////////////////////////////////////////////////////////////////////////
/* end-point */
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 상품 구매 API
 */
app.post("/products/buy", ProductController.buy);

/**
 * 상품 환불 API
 */
app.post("/products/refund", ProductController.refund);

////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 쿠폰 구매하기 API
 */
app.post("/coupons/buy", CouponController.buy);

////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, "0.0.0.0");
