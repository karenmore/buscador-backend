import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    activeIngredient: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    active: {
      type: Number,
      default: 1
    },
    item: {
      type: Number,
      required: true,
      unique: true
    },
    upc: {
      type: Number,
      required: true,
      unique: true
    },
    categorId: { 
      type: Number, 
      required: true 
    }
  }, {
    timestamps: true
  });
  

const Product = mongoose.model("Product", productSchema);
export default Product;