
import Starbucks from "../models/starbucks.model.js";

export const getAllMenu = async () => {
    const datas = await Starbucks.find();
    return datas;
}