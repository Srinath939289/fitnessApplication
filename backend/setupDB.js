const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  let connection;
  try {
    // Connect without specifying a database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "mysql",
    });

    console.log("✅ Connected to MySQL");

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "fitness_db"}`);
    console.log("✅ Database created/verified");

    // Use database
    await connection.query(`USE ${process.env.DB_NAME || "fitness_db"}`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        weight FLOAT,
        height FLOAT,
        goal VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table created/verified");

    // Create other tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS workout_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        duration VARCHAR(50),
        difficulty VARCHAR(50),
        exercises TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Workout plans table created/verified");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        meals TEXT,
        calories INT,
        protein INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Diet plans table created/verified");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        description TEXT,
        category VARCHAR(100),
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Products table created/verified");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_price FLOAT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Orders table created/verified");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price FLOAT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);
    console.log("✅ Order items table created/verified");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        message TEXT NOT NULL,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log("✅ Chat messages table created/verified");

    // Insert sample products (without category column if it doesn't exist)
    try {
      await connection.query(`
        INSERT IGNORE INTO products (name, price, description, stock) VALUES
        ('Protein Powder', 29.99, 'Whey protein powder for muscle building', 50),
        ('Yoga Mat', 19.99, 'Non-slip yoga mat for flexibility training', 30),
        ('Dumbbells Set', 49.99, 'Adjustable dumbbells 5-25 lbs', 20),
        ('BCAAs', 24.99, 'Branched-chain amino acids for recovery', 40),
        ('Resistance Bands', 14.99, 'Set of 5 resistance bands', 60),
        ('Multivitamins', 19.99, 'Daily multivitamin capsules', 45)
      `);
      console.log("✅ Sample products inserted");
    } catch (err) {
      console.log("⚠️  Could not insert products (table structure may vary):", err.message);
    }

    console.log("\n✅ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup error:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
