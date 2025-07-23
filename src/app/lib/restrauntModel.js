const { Schema, default: mongoose } = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  email: String,
  password: String,
  Cpassword: String,
  name: String,
  city: String,
  address: String,
  contact: String
});

export const RestaurantModel =
  mongoose.models.Restaurants || mongoose.model("Restaurants", restaurantSchema);
