-- Create database
CREATE DATABASE IF NOT EXISTS fitness_db;
USE fitness_db;

-- Create users table
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
);

-- Create workout_plans table
CREATE TABLE IF NOT EXISTS workout_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  duration VARCHAR(50),
  difficulty VARCHAR(50),
  exercises TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create diet_plans table
CREATE TABLE IF NOT EXISTS diet_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meals TEXT,
  calories INT,
  protein INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  description TEXT,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price FLOAT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price FLOAT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample products
INSERT INTO products (name, price, description, category, stock) VALUES
('Protein Powder', 29.99, 'Whey protein powder for muscle building', 'Supplements', 50),
('Yoga Mat', 19.99, 'Non-slip yoga mat for flexibility training', 'Equipment', 30),
('Dumbbells Set', 49.99, 'Adjustable dumbbells 5-25 lbs', 'Equipment', 20),
('BCAAs', 24.99, 'Branched-chain amino acids for recovery', 'Supplements', 40),
('Resistance Bands', 14.99, 'Set of 5 resistance bands', 'Equipment', 60),
('Multivitamins', 19.99, 'Daily multivitamin capsules', 'Supplements', 45)
ON DUPLICATE KEY UPDATE stock = stock;

-- Create a test user (optional)
INSERT INTO users (name, email, password, weight, height, goal) VALUES
('Test User', 'test@example.com', '$2b$10$YourHashedPasswordHere', 75, 180, 'weightloss')
ON DUPLICATE KEY UPDATE name = name;
