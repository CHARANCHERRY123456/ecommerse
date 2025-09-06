import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    imageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
