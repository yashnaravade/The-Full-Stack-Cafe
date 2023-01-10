import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  items: [
    (title = {
      type: String,
      required: true,
    }),
    (price = {
      type: Number,
      required: true,
    }),
    (quantity = {
      type: Number,
      required: true,
    }),
  ],
  orderTotal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Order", orderSchema);
