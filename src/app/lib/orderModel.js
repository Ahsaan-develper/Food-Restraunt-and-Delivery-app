const { default: mongoose } = require("mongoose");

const orderModel = new mongoose.Schema({
    user_id:mongoose.Schema.ObjectId,
    foodItemsId:String,
    foodie_id : mongoose.Schema.ObjectId,
    deliveryBoy_id : mongoose.Schema.ObjectId,
    status:String,
    amount:String,
})
export const orderSchema = mongoose.models.orders || mongoose.model("orders",orderModel);