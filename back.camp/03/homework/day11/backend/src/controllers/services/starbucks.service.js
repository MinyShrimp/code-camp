import Starbucks from "../../models/starbucks.model.js";

/**
 * Starbucks Service
 */
class StarbucksService {
    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Model => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * DB에 저장된 모든 Starbucks 데이터 가져오기
     * @returns 모든 Starbucks Data
     */
    getAllMenu = async () => {
        const datas = await Starbucks.find();
        return datas;
    };
}

export default StarbucksService;
