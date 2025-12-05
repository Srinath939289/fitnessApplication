const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT_ROUNDS = 10;

async function signup(req, res) {
  const { name, email, password, weight, height, goal } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password required" });
  }
  try {
    console.log('Signup attempt for email:', email);
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      console.log('Email already in use');
      return res.status(409).json({ error: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await db.query(
      `INSERT INTO users (name,email,password,weight,height,goal) VALUES (?,?,?,?,?,?)`,
      [name, email, hash, weight || null, height || null, goal || null]
    );

    const userId = result.insertId;
    console.log('User created with ID:', userId);
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ id: userId, name, email, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  try {
    console.log('Login attempt for email:', email);
    const [rows] = await db.query("SELECT id, name, email, password FROM users WHERE email = ?", [email]);
    console.log('Query result:', rows);
    
    if (!rows.length) {
      console.log('User not found');
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    console.log('User found:', { id: user.id, name: user.name, email: user.email });
    
    const match = await bcrypt.compare(password, user.password);
    console.log('Password match:', match);
    
    if (!match) {
      console.log('Password mismatch');
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log('Token generated, sending response');
    res.json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { signup, login };
