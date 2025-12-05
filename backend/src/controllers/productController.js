const db = require("../config/db");

async function listProducts(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("listProducts err:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("getProduct err:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { listProducts, getProduct };
