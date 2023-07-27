// Importing express router
const userRouter = require("express").Router();

//Importing controllers
const {
  registerUser,
  loginUser,
  getOrdersForAUser,
  getAllUser,
  stats
} = require("../controllers/UserController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/orders/:userId", getOrdersForAUser);
userRouter.get("/all-user", getAllUser);
userRouter.get("/statistics", stats);

module.exports = userRouter;
