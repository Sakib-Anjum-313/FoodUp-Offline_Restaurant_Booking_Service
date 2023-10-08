const mongoose = require("mongoose");


const newProductCategorySchema = mongoose.Schema(
  {
    ResEmail: {
      type: String,
      required: true,
      trim: true,
    },
    CategoryName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("ProductCategory", newProductCategorySchema);

module.exports = ProductCategory;
