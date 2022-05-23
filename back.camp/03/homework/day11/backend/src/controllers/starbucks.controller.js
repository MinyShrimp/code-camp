import StarbucksService from "./services/starbucks.service.js";

/**
 * Starbucks Controller
 */
class StarbucksContoller {
    starbucksService = new StarbucksService();

    constructor() {}
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // TO API
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 스타벅스 커피 목록 조회 API
     * GET /starbucks
     */
    getAllMenusAPI = async (req, res) => {
        const menus = await this.starbucksService.getAllMenu();
        res.send(menus);
    }
}

export default StarbucksContoller;