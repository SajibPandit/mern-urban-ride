const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");

const generateToken = require("../helpers/generateToken");

// Registers a user
// route  : POST /api/user/register
// access : Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  console.log(name, email, phone, password);
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      body: {
        message: "Please provide valid credentials",
      },
    });
  }
  //Check for user with this email exists
  UserModel.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        success: false,
        body: {
          message: "Email already exists",
        },
      });
    } else {
      UserModel.create(req.body).then((user, err) => {
        if (err) {
          res.status(500).json({
            success: false,
            body: {
              message: err.message,
            },
          });
        }
        console.log(user);
        if (user) {
          res.status(201).json({
            success: true,
            body: {
              data: {
                name,
                email,
                phone,
              },
            },
          });
        } else {
          res.status(500).json({
            success: false,
            body: {
              message: "Error",
            },
          });
        }
      });

      //   const newUser = new UserModel({
      //     name,
      //     email,
      //     phone,
      //     password,
      //   })
    }
  });
});

// Login user
// route  : POST /api/user/login
// access : Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  let user = await UserModel.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      success: false,
      body: {
        message: "Invalid credentials",
      },
    });
  }
});

exports.getOrdersForAUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const orders = await OrderModel.find({ user: userId });
  if (!orders) {
    res.status(404).json({
      success: false,
      body: {
        message: "Orders not found",
      },
    });
  }
  res.json({
    success: true,
    body: {
      orders,
    },
  });
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({});

  if (!users) {
    res.status(404).json({
      succses: false,
      body: {
        message: "User not found",
      },
    });
  }
  res.json({
    succses: true,
    body: {
      users,
    },
  });
});

exports.stats = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  const orders = await OrderModel.find({});

  res.json({
    succses: true,
    body: {
      users: users.length,
      orders: orders.length,
    },
  });
});
