import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import models
import User from "./models/User.js";
import FoodItem from "./models/FoodItem.js";
import Table from "./models/Table.js";
import Order from "./models/Order.js";
import md5 from "md5";

dotenv.config();

const app = express();
app.use(express.json());

// connect to MongoDB and console log the status
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB");
});

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// API routes start here

// create a health check endpoint
app.get("/health", (req, res) => {
  res.send("OK");
});

app.post("/signup", async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  // Validation of empty fields start here
  //   if (!name || !phone || !email || !password) {
  //     return res.status(422).json({
  //       error: "Please add all the fields",
  //     });
  //   }

  //   checking empty fields individually
  //   if (!name) {
  //     return res.status(422).json({
  //       error: "Please add a name",
  //     });
  //   }

  //   if (!phone) {
  //     return res.status(422).json({
  //       error: "Please add a phone number",
  //     });
  //   }

  //   if (!email) {
  //     return res.status(422).json({
  //       error: "Please add an email",
  //     });
  //   }

  //   if (!password) {
  //     return res.status(422).json({
  //       error: "Please add a password",
  //     });
  //   }

  //  checking empty fields using array
  const emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!phone) {
    emptyFields.push("phone");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(422).json({
      error: `Please add ${emptyFields.join(", ")}`,
    });
  }
  // Validation of empty fields end here

  //   Validation of email start here
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      error: "Please enter a valid email",
    });
  }
  //   Validation exisiting email start here
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(422).json({
      error: "User already exists with that email",
    });
  }
  //   Validation of email end here

  //   Validation of phone start here
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(422).json({
      error: "Please enter a valid phone number",
    });
  }

  // check if phone number already exists
  const existingPhone = await User.findOne({ phone: phone });
  if (existingPhone) {
    return res.status(422).json({
      error: "User already exists with that phone number",
    });
  }
  //   Validation of phone end here

  //  Validation of password start here
  if (password.length < 6) {
    return res.status(422).json({
      error: "Password must be at least 6 characters long",
    });
  }
  //  Validation of password end here

  const user = new User({
    name: name,
    email: email,
    phone: phone,
    password: md5(password),
    role: role,
    timestamp: Date.now(),
  });

  const savedUser = await user.save();

  res.json({
    success: true,
    message: "User created successfully",
    user: savedUser,
  });
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation of empty fields start here
  const emptyFields = [];
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(422).json({
      error: `Please add ${emptyFields.join(", ")}`,
    });
  }
  // Validation of empty fields end here

  //   Validation of email start here
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      error: "Please enter a valid email",
    });
  }
  //   Validation of email end here

// convert password to md5 hash before comparing with the password in the database 
  const user = await User.findOne({
    email: email,
    password : md5(password)
  });
  

  if (!user) {
    return res.status(422).json({
      error: "Invalid email or password",
    });
  }

  res.json({
    success: true,
    message: "User logged in successfully",
    user: user,
  });
});

// get all users
app.get("/all-users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// get a user by id
app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// find user by name
app.get("/user", async (req, res) => {
  const user = await User.find({
    name: req.query.name,
  }).limit(1);
  res.send(user);
  // A - add a query string to the url like this: http://localhost:5000/user?name=Yash
});

// Add food item route
app.post("/add-food-item", async (req, res) => {
  const { title, price, description, category, imgURL } = req.body; // destructuring

  // validation of empty fields start here
  const emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!imgURL) {
    emptyFields.push("imgURL");
  }
  if (emptyFields.length > 0) {
    return res.status(422).json({
      error: `Please add ${emptyFields.join(", ")}`,
    });
  }

  const foodItem = new FoodItem({
    title: title,
    price: price,
    description: description,
    category: category,
    imgURL: imgURL,
    timestamp: Date.now(),
  });

  const savedFoodItem = await foodItem.save();

  res.json({
    success: true,
    message: "Food item added successfully",
    data: savedFoodItem,
  });
});

// get food items by category
app.get("/food-items/:category", async (req, res) => {
  // validation of category start here

  const validCategories = [
    "veg",
    "non-veg",
    "beverages",
    "desserts",
    "dinner",
    "breakfast",
    "lunch",
  ];

  if (!validCategories.includes(req.params.category)) {
    return res.status(422).json({
      error: "Invalid category",
    });
  }

  // validation of category end here

  const foodItems = await FoodItem.find({
    category: req.params.category,
  });

  if (foodItems.length === 0) {
    return res.status(422).json({
      error: "No food items found",
    });
  }

  res.json({
    success: true,
    message: "Food items fetched successfully",
    data: foodItems,
  });

  // How to use this route: http://localhost:5000/food-items/veg
});

// get food item by title with regex
app.get("/food-item", async (req, res) => {
  const foodItem = await FoodItem.find({
    title: { $regex: req.query.title, $options: "i" },
  });

  if (foodItem.length === 0) {
    return res.status(422).json({
      error: "No food items found",
    });
  }

  res.json({
    success: true,
    message: "Food item fetched successfully",
    data: foodItem,
  });

  // A - add a query string to the url like this: http://localhost:5000/food-item?title=chicken
});

// get all food items
app.get("/all-food-items", async (req, res) => {
  const foodItems = await FoodItem.find({});

  if (foodItems.length === 0) {
    return res.status(422).json({
      error: "No food items found",
    });
  }

  res.json({
    success: true,
    message: "Food items fetched successfully",
    data: foodItems,
  });
});

// Create table route
app.post("/create-table", async (req, res) => {
  const { tableNumber } = req.body;

  const exisitingTable = await Table.findOne({ tableNumber: tableNumber });

  if (exisitingTable) {
    return res.status(422).json({
      success: false,
      error: "Table already exists",
    });
  }

  if (!tableNumber) {
    return res.status(422).json({
      error: "Please add table number",
    });
  }

  const table = new Table({
    tableNumber: tableNumber,
    occupied: false,
  });

  res.json({
    success: true,
    message: "Table created successfully",
    data: table,
  });

  const savedTable = await table.save();
});

// Table booking route
app.post("/book-table", async (req, res) => {
  const { tableNumber, userId } = req.body;

  // validation of empty fields start here
  if (!tableNumber) {
    return res.status(422).json({
      error: "Please add table number",
    });
  }
  // check if table exists
  if (!(await Table.findOne({ tableNumber: tableNumber }))) {
    return res.status(422).json({
      error: "Table does not exist",
    });
  }
  // validation of empty fields end here

  const exisitingTable = await Table.findOne({ tableNumber: tableNumber });

  if (exisitingTable && exisitingTable.occupied) {
    return res.status(422).json({
      success: false,
      error: "Table already occupied",
    });
  }

  if (exisitingTable && !exisitingTable.occupied) {
    exisitingTable.occupied = true;
    exisitingTable.occupiedBy = userId;
    await exisitingTable.save();
  }

  res.json({
    success: true,
    message: "Table booked successfully",
    data: exisitingTable,
  });
});

// Table unbooking route
app.post("/unbook-table", async (req, res) => {
  const { tableNumber } = req.body;

  const exisitingTable = await Table.findOne({ tableNumber: tableNumber });

  if (exisitingTable && !exisitingTable.occupied) {
    return res.status(422).json({
      success: false,
      error: "Table already unoccupied",
    });
  }

  if (exisitingTable && exisitingTable.occupied) {
    exisitingTable.occupied = false;
    exisitingTable.occupiedBy = null;
    await exisitingTable.save();
  }

  res.json({
    success: true,
    message: "Table unbooked successfully",
    data: exisitingTable,
  });
});

// get all the available tables
app.get("/available-tables", async (req, res) => {
  const availableTables = await Table.find({ occupied: false });

  res.json({
    success: true,
    message: "Available tables fetched successfully",
    data: availableTables,
  });
});

// order food route
app.post("/order-food", async (req, res) => {
  const { userId, foodItems, tableNumber } = req.body;

  // validation of empty fields start here
  if (!userId) {
    return res.status(422).json({
      error: "Please add user id",
    });
  }
  if (!foodItems || foodItems.length === 0) {
    return res.status(422).json({
      error: "Please add food items",
    });
  }
  if (!tableNumber) {
    return res.status(422).json({
      error: "Please add table number",
    });
  }
  // validation of empty fields end here

  //check if table exists and is occupied by the user
  // const table = await Table.findOne({ tableNumber: tableNumber });
  // if (!table) {
  //   return res.status(422).json({
  //     error: "Table does not exist",
  //   });
  // }
  // if (table.occupiedBy !== userId) {
  //   return res.status(422).json({
  //     error: "Table is not occupied by you",
  //   });
  // }

  // TODO: feature to add food items //to the cart and then place the order

  // const orderId = uuidv4(); // npm i uuid
  const orderId = "ORDER-" + Date.now();

  // count the number of orders
  const count = await Order.countDocuments();

  const order = new Order({
    userId: userId,
    foodItems: foodItems,
    tableNumber: tableNumber,
    orderId: orderId,
    orderNumber: count + 1,
  });

  const savedOrder = await order.save();

  res.json({
    success: true,
    message: "Order placed successfully",
    data: savedOrder,
  });
});

// get the orders of a user
app.get("/user-orders", async (req, res) => {
  const { userId } = req.query;

  const userOrders = await Order.findOne({ userId: userId });

  res.json({
    success: true,
    message: "User orders fetched successfully",
    data: userOrders,
  });
  // add a query string to the url like this: http://localhost:5000/user-orders?userId=60e1b1b0b0b5a8a0f4b0b0a1
});

// get the orders of a table
app.get("/table-orders", async (req, res) => {
  const { tableNumber } = req.query;

  const tableOrders = await Order.findOne({ tableNumber: tableNumber });

  res.json({
    success: true,
    message: "Table orders fetched successfully",
    data: tableOrders,
  });
  // add a query string to the url like this: http://localhost:5000/table-orders?tableNumber=1
});

// API routes end here

// start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
