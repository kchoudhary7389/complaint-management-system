const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectTodb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.route");

app.use(
  cors({
    origin: "*", // Add your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & authentication headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectTodb();
app.options("*", cors()); // Allows all preflight requests

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
