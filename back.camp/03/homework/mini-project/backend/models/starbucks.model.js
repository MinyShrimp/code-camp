import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    name: String,
    img: String,
});

const Starbucks = mongoose.model(
    "Starbucks", StarbucksSchema
);

export const getAllMenu = async () => {
    const datas = await Starbucks.find();
    return datas;
}
