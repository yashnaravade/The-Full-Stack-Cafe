import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  OrderId: {
    type: String,
    required: false,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  foodItems: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  orderTotal: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
