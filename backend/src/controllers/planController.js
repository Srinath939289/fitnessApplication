const db = require("../config/db");

// utility: calculate BMI
function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  return +(weightKg / (h * h)).toFixed(1);
}

// simple caloric baseline using Mifflin-St Jeor (male/female not collected here -> use average)
function estimateBMR(weightKg, heightCm, age = 25) {
  // rough average: use male formula but it's fine as approximation
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
}

function generateWorkoutPlan({ weight, height, goal }) {
  // choose level based on BMI
  const bmi = calculateBMI(weight, height);
  let level = "beginner";
  if (bmi && bmi < 18.5) level = "beginner";
  else if (bmi && bmi < 25) level = "intermediate";
  else level = "beginner";

  // short sample plan
  let details = {};
  if (goal === "weightloss" || goal === "fatloss") {
    details = {
      weekly: [
        "3x 30-45 min moderate cardio (running, cycling)",
        "2x full-body circuit (bodyweight) 3 sets x 12-15 reps",
        "1x active recovery (yoga/walking)"
      ],
      notes: "Aim for calorie deficit of 300-500 kcal/day."
    };
  } else if (goal === "musclebuilding") {
    details = {
      weekly: [
        "4x strength training (split: push/pull/legs/upper)",
        "Compound lifts: squats, deadlifts, bench press, rows",
        "Progressive overload: increase weights gradually"
      ],
      notes: "Consume calorie surplus (~250-500 kcal/day) and 1.6-2.2g protein/kg"
    };
  } else {
    details = {
      weekly: [
        "3x mixed cardio/strength sessions",
        "Focus on full-body compound movements"
      ],
      notes: "Consistent training and sleep matter more than perfection."
    };
  }

  return {
    name: `${goal || "general"} plan`,
    goal,
    level,
    duration_weeks: 8,
    details,
  };
}

function generateDietPlan({ weight, height, goal }) {
  const bmr = estimateBMR(weight, height);
  let targetCalories = bmr;
  if (goal === "weightloss" || goal === "fatloss") targetCalories = Math.round(bmr - 500);
  else if (goal === "musclebuilding") targetCalories = Math.round(bmr + 300);
  else targetCalories = bmr;

  const meals = {
    breakfast: `Oats + milk + banana (approx ${Math.round(targetCalories * 0.25)} kcal)`,
    lunch: `Rice/roti + protein + veggies (approx ${Math.round(targetCalories * 0.35)} kcal)`,
    snack: `Fruit + nuts (approx ${Math.round(targetCalories * 0.15)} kcal)`,
    dinner: `Lean protein + salad/veggies (approx ${Math.round(targetCalories * 0.25)} kcal)`,
  };

  return {
    name: `${goal || "general"} diet`,
    goal,
    calories_per_day: targetCalories,
    details: meals,
  };
}

async function getWorkoutPlan(req, res) {
  try {
    // Accept either user profile or query params
    let { userId } = req.params;
    let user;
    if (userId) {
      const [rows] = await db.query("SELECT weight,height,goal FROM users WHERE id = ?", [userId]);
      user = rows[0];
    } else {
      user = req.body; // support passing weight/height/goal in body
    }
    const plan = generateWorkoutPlan(user || {});
    res.json(plan);
  } catch (err) {
    console.error("getWorkoutPlan err:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDietPlan(req, res) {
  try {
    const { userId } = req.params;
    let user;
    if (userId) {
      const [rows] = await db.query("SELECT weight,height,goal FROM users WHERE id = ?", [userId]);
      user = rows[0];
    } else {
      user = req.body;
    }
    const plan = generateDietPlan(user || {});
    res.json(plan);
  } catch (err) {
    console.error("getDietPlan err:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getWorkoutPlan, getDietPlan };
