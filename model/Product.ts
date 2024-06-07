import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: { type: String },
    condition: { type: String },
    description: { type: String },
    images: [{ type: String, required: true }],
    originalPrice: { type: Number },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
