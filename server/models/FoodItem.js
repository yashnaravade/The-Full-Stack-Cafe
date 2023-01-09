import { Schema, model } from "mongoose";

const foodItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default model("FoodItem", foodItemSchema);
