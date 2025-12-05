// const express = require("express");
// const router = express.Router();
// const { chat } = require("../controllers/chatController");

// // Chat endpoint — keep public so unauthenticated visitors can use the AI chatbot.
// // If you prefer to require authentication, re-add the `auth` middleware here.
// router.post("/", chat);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/chatController");

// POST /api/chat
router.post("/", chat);

module.exports = router;




