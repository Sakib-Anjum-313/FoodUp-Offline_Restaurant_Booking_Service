const { default: mongoose } = require("mongoose");



const productDetailsSchema = mongoose.Schema({
  ResEmail: {
    type: String,
    required: true,
    trim: true,
  },
  FoodName: {
    type: String,
    required: true,
    trim: true,
  },
  FoodImg: {
    type: String,
    required: true,
    trim: true,
  },
  FoodPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  FoodQuantity: {
    type: Number,
    required: true,
    trim: true,
  },
  WhichCategory: {
    type: String,
    required: true,
    trim: true,
  },
  Availability: {
    type: String,
    required: true,
  },
  // Restaurant: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "NewRestaurant",
  // },
});

const Product = mongoose.model("ProductDetail", productDetailsSchema);

module.exports = Product;