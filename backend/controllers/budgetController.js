const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const mongoose = require("mongoose")

exports.setBudget = async (req, res) => {
  const userId = req.user.id;
  const { category, amount, month } = req.body;

  if (!category || !amount || !month) {
    return res.status(400).json({ message: "category, amount and month are required" });
  }

  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, category, month },
      { amount },
      { upsert: true, new: true }
    );
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBudgets = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.params;

  try {
    const budgets = await Budget.find({ userId, month });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getBudgetSummary = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.params; 
  try {
    const [year, mon] = month.split("-").map(Number);
    const startDate = new Date(year, mon - 1, 1);
    const endDate = new Date(year, mon, 1);

    const budgets = await Budget.find({ userId, month });

    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" },
        },
      },
    ]);

    const spendMap = {};
    expenses.forEach((e) => {
      spendMap[e._id] = e.spent;
    });

    const summary = budgets.map((b) => {
      const spent = spendMap[b.category] || 0;
      const remaining = b.amount - spent;
      const percentage = Math.round((spent / b.amount) * 100);

      return {
        category: b.category,
        budgeted: b.amount,
        spent,
        remaining,
        percentage,
        status:
          percentage >= 100 ? "over" :
          percentage >= 80  ? "warning" :
          "ok",
      };
    });

    const unbudgeted = expenses
      .filter((e) => !budgets.find((b) => b.category === e._id))
      .map((e) => ({
        category: e._id,
        budgeted: null,
        spent: e.spent,
        remaining: null,
        percentage: null,
        status: "unbudgeted",
      }));

    res.status(200).json({ summary: [...summary, ...unbudgeted] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const budget = await Budget.findOneAndDelete({ _id: id, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

