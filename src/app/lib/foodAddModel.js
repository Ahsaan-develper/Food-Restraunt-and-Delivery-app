const { default: mongoose } = require("mongoose");

const foodAddSchema = new mongoose.Schema({
    name:String,
    price:Number,
    img_Path:String,
    description:String,
    foodie_id:mongoose.Schema.Types.ObjectId
});
export const AddItemModel = mongoose.models.foodData || mongoose.model("foodData",foodAddSchema);