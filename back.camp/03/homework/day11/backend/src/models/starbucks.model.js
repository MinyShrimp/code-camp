import mongoose from "mongoose";

/**
 * Starbucks Schema
 */
export const StarbucksSchema = new mongoose.Schema({
    name: String,
    img: String,
});

/**
 * Starbucks Schema DB와 연결
 */
const Starbucks = mongoose.model(
    "Starbucks", StarbucksSchema
);

export default Starbucks;