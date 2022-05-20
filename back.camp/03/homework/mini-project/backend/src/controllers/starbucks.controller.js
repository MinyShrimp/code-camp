
import Starbucks from "../models/starbucks.model.js";

// 모두 찾기
export const getAllMenu = async () => {
    const datas = await Starbucks.find();
    return datas;
}