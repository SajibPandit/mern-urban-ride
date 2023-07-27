// Importing express router
const orderRouter = require("express").Router();
const {
  getOrderById,
  createOrder,
  getOrders,
  deleteOrderById,
} = require("../controllers/OrderController");

orderRouter.route("/").post(createOrder).get(getOrders);
orderRouter.route("/:id").get(getOrderById).delete(deleteOrderById);

module.exports = orderRouter;
