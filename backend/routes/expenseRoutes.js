

const express = require("express")

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    getExpenseInsights,
    getCategoryWiseExpenses,
} =require("../controllers/expenseController");
const {protect} =require("../middleware/authMiddleware")

const router=express.Router();

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpense);
router.get("/downloadexcel",protect,downloadExpenseExcel);
router.delete("/:id",protect,deleteExpense);
router.get("/insights", protect, getExpenseInsights);
router.get("/category-wise", protect, getCategoryWiseExpenses)
module.exports = router;