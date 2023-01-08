import express from "express";  
import axios from "axios";

const app = express();

// create a health check endpoint
app.get("/health", (req, res) => {
    res.send("OK");
    });

// start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
    });