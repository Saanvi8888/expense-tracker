const User = require("../models/User")
const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const path = require("path");
const CATEGORIES = [
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Other",
];

exports.addExpense = async(req,res)=>{
    const userId = req.user.id;

    try {
        const{icon,category,amount,date} =req.body;
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }
        const finalCategory = CATEGORIES.includes(category)
        ? category
        : "Other";
        const newExpense = new Expense({
            userId,
            category: finalCategory,
            icon,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);



    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

exports.getAllExpense = async(req,res)=>{
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    } catch (error) {
        res.status(500).json({message:"server error"})
    }

}

exports.deleteExpense = async(req,res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map(item => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    
    const filePath = path.join(__dirname, "../expense_details.xlsx");

    
    xlsx.writeFile(wb, filePath);

    res.download(filePath, "expense_details.xlsx");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpenseInsights = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId });

    if (!expenses.length) {
      return res.json({ message: "No expenses yet" });
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = {};
    expenses.forEach(e => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + e.amount;
    });

    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

   
    const dailyAverage = Math.round(total / 30);

    
    const insights = [];

    
    const top = topCategories[0];
    insights.push({
      type: "info",
      message: `You spent the most on ${top.category}.`
    });

    
    const topShare = top.amount / total;
    if (topShare > 0.4) {
      insights.push({
        type: "warning",
        message: `${top.category} is ${Math.round(topShare * 100)}% of your total spending.`
      });
    }

    
    insights.push({
      type: "info",
      message: `Your average daily spending is ₹${dailyAverage}.`
    });

  
    const getMonthTotal = (monthIndex) => {
      
      const now = new Date();
      const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthIndex, 1);

      const monthExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === targetMonth.getMonth() &&
               expDate.getFullYear() === targetMonth.getFullYear();
      });

      return monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    };

    const currentMonthTotal = getMonthTotal(0);
    const lastMonthTotal = getMonthTotal(1);

    if (lastMonthTotal > 0) {
      const changePercent = Math.round(((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);

      if (changePercent >= 20) {
        insights.push({
          type: "warning",
          message: `Expense spike! Your spending increased by ${changePercent}% compared to last month.`
        });
      } else if (changePercent <= -20) {
        insights.push({
          type: "success",
          message: `Great job! Your spending dropped by ${Math.abs(changePercent)}% compared to last month.`
        });
      }
    }

    

    res.json({
      total,
      topCategories,
      dailyAverage,
      insights
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCategoryWiseExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId });

    const categoryTotals = {
      Food: 0,
      Rent: 0,
      Transport: 0,
      Shopping: 0,
      Utilities: 0,
      Entertainment: 0,
      Other: 0,
    };

    expenses.forEach(exp => {
      categoryTotals[exp.category] += exp.amount;
    });

    res.json(categoryTotals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
