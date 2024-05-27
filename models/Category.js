import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categorId: {
    type: Number,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    default: true
  }
}, {
  timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

export default Category;