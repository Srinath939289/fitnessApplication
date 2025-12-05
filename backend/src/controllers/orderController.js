const db = require("../config/db");

// Create order and order_items, then create mock payment record and mark paid
async function createOrder(req, res) {
  // expected body: { userId, items: [{ productId, quantity }] }
  const { userId, items } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // calculate total and check stock
    let total = 0;
    for (const it of items) {
      const [pRows] = await conn.query("SELECT price,stock FROM products WHERE id = ? FOR UPDATE", [it.productId]);
      if (!pRows.length) throw new Error("Product not found: " + it.productId);
      const product = pRows[0];
      if (product.stock < it.quantity) throw new Error("Insufficient stock for " + it.productId);
      total += parseFloat(product.price) * it.quantity;
    }

    const [orderResult] = await conn.query("INSERT INTO orders (user_id,total_amount,status) VALUES (?,?,?)", [userId, total.toFixed(2), "pending"]);
    const orderId = orderResult.insertId;

    for (const it of items) {
      const [pRows] = await conn.query("SELECT price FROM products WHERE id = ?", [it.productId]);
      const price = pRows[0].price;
      await conn.query("INSERT INTO order_items (order_id,product_id,quantity,price) VALUES (?,?,?,?)", [orderId, it.productId, it.quantity, price]);
      // decrement stock
      await conn.query("UPDATE products SET stock = stock - ? WHERE id = ?", [it.quantity, it.productId]);
    }

    // create a mock payment record (status initiated)
    const [payResult] = await conn.query("INSERT INTO payments (order_id,provider,amount,status) VALUES (?,?,?,?)", [orderId, "mock", total.toFixed(2), "initiated"]);

    // For demo: mark payment success immediately (replace with real provider flow)
    await conn.query("UPDATE payments SET status = ? WHERE id = ?", ["success", payResult.insertId]);
    await conn.query("UPDATE orders SET status = ? WHERE id = ?", ["paid", orderId]);

    await conn.commit();
    res.status(201).json({ orderId, total });
  } catch (err) {
    await conn.rollback();
    console.error("createOrder err:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  } finally {
    conn.release();
  }
}

module.exports = { createOrder };
