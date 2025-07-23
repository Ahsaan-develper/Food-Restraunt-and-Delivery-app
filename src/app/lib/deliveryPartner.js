const { Schema, default: mongoose } = require("mongoose");

const deliveryPartnerModel = new mongoose.Schema({
    name:String,
    phone:String,
    password:String,
    city:String,
    address:String, 
});
export const deliveryPartnerSchema = mongoose.models.deliveryPartner || mongoose.model("deliveryPartner",deliveryPartnerModel);