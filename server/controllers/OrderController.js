const asyncHandler = require("express-async-handler");
const OrderModel = require("../models/OrderModel");

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({});
  if (orders.length > 0) {
    res.json({
      success: true,
      body: {
        orders,
      },
    });
  } else {
    res.status(400).json({ success: false, body: { message: "Not Found" } });
  }
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id);
  if (order) {
    res.status(200).json({
      success: true,
      body: {
        order,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      body: {
        message: "Order not found",
      },
    });
  }
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { from, destination, distance, totalCost, user, phone,medium,totalPerson } = req.body;
  if(!from || !destination || !distance || !totalCost || !user || !phone || !medium || !totalPerson) {
      res.status(400).json({ success: false, message:'Please provide valid information'})
  }
  const order = await OrderModel.create(req.body);
  if (!order) {
    res.status(400).json({
      success: false,
      body: {
        message: "Order not created",
      },
    });
  } else {
    res.status(201).json({
      success: true,
      body: {
        message: "Order created",
        order,
      },
    });
  }
});

exports.deleteOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await OrderModel.findByIdAndDelete(id);

  if (order) {
    res.json({
      success: true,
    });
  } else {
    res.json({ success: false });
  }
});
