const { Schema, default: mongoose } = require("mongoose");

const usersModel = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cPassword:String,
    city:String,
    address:String,
    phone:String,
});
export const usersSchema = mongoose.models.Users || mongoose.model("Users",usersModel);