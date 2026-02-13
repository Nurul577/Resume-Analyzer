const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const analyzerRoute = require("./routes/analyzer");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/analyze", analyzerRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log("Server running")
);
