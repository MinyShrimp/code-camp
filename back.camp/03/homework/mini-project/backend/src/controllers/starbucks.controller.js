
import Starbucks from "../models/starbucks.model.js";

/**
 * DB에 저장된 모든 Starbucks 데이터 가져오기
 * @returns 모든 Starbucks Schema
 */
export const getAllMenu = async () => {
    const datas = await Starbucks.find();
    return datas;
}