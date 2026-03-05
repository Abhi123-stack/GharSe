const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

// Test Route
app.get("/", (req,res)=>{
    res.send("Backend Running Successfully");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});