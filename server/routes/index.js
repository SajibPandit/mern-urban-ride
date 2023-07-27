// Importing all routes
const UserRoutes = require("./UserRoutes");
const OrderRoutes = require("./OrderRoutes");

// Importing express router
const router = require("express").Router();

// Registering all routers
router.use("/user", UserRoutes);
router.use("/order", OrderRoutes);

// The 404 route
router.all("*", (req, res, next) =>
  res.json({
    message: "No such endpoint found",
  })
);

module.exports = router;
