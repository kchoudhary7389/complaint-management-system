const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectTodb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.route");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectTodb();

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
