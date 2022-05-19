import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    title:       String,
    nowPrice:    Number,
    prevPrice:   Number,
    marketPrice: Number,
    searchDate:  Date,
});

export const Stock = mongoose.model("Stock", StockSchema);