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

// API routes
// create a health check endpoint
app.get("/health", (req, res) => {
  res.send("OK");
});

app.post("/signup", async (req, res) => {
  const { name, phone, email, password, role } = req.body;

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
});
// A - add a query string to the url like this: http://localhost:5000/user?name=Yash

// start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
