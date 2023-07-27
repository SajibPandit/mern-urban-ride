const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    from: {
      type: String,
      required: [true, "From is required"],
    },
    destination: {
      type: String,
      required: [true, "To is required"],
    },
    distance: {
      type: Number,
      required: [true, "Distance is required"],
    },
    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
    },
    phone: {
      type: String,
    },
    medium: {
      type: String,
    },
    totalPerson: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Creating model from a Schema
const OrderModel = model("Order", orderSchema);

module.exports = OrderModel;
