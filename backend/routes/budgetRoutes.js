const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {setBudget,getBudgets,getBudgetSummary,deleteBudget} = require("../controllers/budgetController");

router.post("/", protect, setBudget);
router.get("/summary/:month", protect, getBudgetSummary);
router.get("/:month", protect, getBudgets);
router.delete("/:id", protect, deleteBudget);

module.exports = router;