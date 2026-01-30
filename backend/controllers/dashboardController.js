const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userObjectId = new Types.ObjectId(req.user.id);

    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);


    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;

   
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const last60daysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: sixtyDaysAgo }
    }).sort({ date: -1 });

    const incomeLast60Days = last60daysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

   
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30daysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    const expenseLast30Days = last30daysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

   
    const recentIncome = await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpense = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const recentTransactions = [
      ...recentIncome.map(txn => ({
        ...txn.toObject(),
        type: "income"
      })),
      ...recentExpense.map(txn => ({
        ...txn.toObject(),
        type: "expense"
      }))
    ].sort((a, b) => b.date - a.date).slice(0, 5);

    
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpenses: totalExpense,
      last30daysExpenses: {
        total: expenseLast30Days,
        transactions: last30daysExpenseTransactions
      },
      last60daysIncome: {
        total: incomeLast60Days,
        transactions: last60daysIncomeTransactions
      },
      recentTransactions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
