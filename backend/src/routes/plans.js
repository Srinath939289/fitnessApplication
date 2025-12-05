const express = require("express");
const router = express.Router();
const { getWorkoutPlan, getDietPlan } = require("../controllers/planController");
const auth = require("../middleware/auth");

// generate plan by user id (protected)
router.get("/workout/:userId", getWorkoutPlan);
router.post("/workout", getWorkoutPlan); // pass weight,height,goal in body

router.get("/diet/:userId", getDietPlan);
router.post("/diet", getDietPlan);

module.exports = router;
