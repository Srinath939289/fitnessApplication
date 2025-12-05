require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plans");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const chatRoutes = require("./routes/chat");

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

// simple health
app.get("/", (req, res) => res.send("Fitness API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
