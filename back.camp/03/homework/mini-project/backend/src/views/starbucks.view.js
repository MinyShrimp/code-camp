
import { getAllMenu } from "../controllers/starbucks.controller.js";

/**
 * 스타벅스 커피 목록 조회 API
 * GET /starbucks
 * 
 * CHECK LIST
 *  - [X] DB에 저장된 커피의 목록을 반환해주세요.
 *  - [X] 반환하는 커피 데이터에는 img, name, _id가 포함되어야합니다.
 */
export const getAllMenus = async (req, res) => {
    const menus = await getAllMenu();
    res.send(menus);
}