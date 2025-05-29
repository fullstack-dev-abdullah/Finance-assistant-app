const express = require("express");
const router = express.Router();

const { authProtect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

router.get("/get", authProtect, getDashboardData);

module.exports = router;
