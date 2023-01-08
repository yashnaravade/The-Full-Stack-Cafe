import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

// load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// connect to MongoDB and console log the status
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB");
});

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
    password: password, // TODO: hash the password
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

  const user = await User.findOne({ email: email, password: password });

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

// API routes end here

// start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
