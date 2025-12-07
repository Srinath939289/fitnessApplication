require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// ROUTES
const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plans");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const chatRoutes = require("./routes/chat");

// CORS CONFIG (IMPORTANT)
app.use(cors({
  origin: "https://YOUR-FRONTEND-RENDER-URL", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// BODY PARSER
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

// HEALTH CHECK
app.get("/", (req, res) => res.send("Fitness API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
