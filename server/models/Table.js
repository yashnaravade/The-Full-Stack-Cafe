import { Schema, model } from "mongoose";

const tableSchema = new Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Boolean,
    required: true,
  },
  occupiedBy: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});

export default model("Table", tableSchema);