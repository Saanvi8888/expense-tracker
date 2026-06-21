const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAIInsights = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId });

    if (!expenses.length) {
      return res.status(200).json({
        insights: {
          insights: [
            "No expenses found yet. Start adding expenses to get insights."
          ],
          recommendations: [],
          warning: ""
        }
      });
    }

    const totalSpent = expenses.reduce((sum,e) =>sum+e.amount,0);

    const categoryTotals = {};
    expenses.forEach((e) => {
      categoryTotals[e.category]=(categoryTotals[e.category]||0)+e.amount;
    });

    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({category,amount}))
      .sort((a, b) =>b.amount-a.amount)
      .slice(0, 3); 
    const getMonthTotal = (offset) => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth() - offset, 1);

      return expenses.filter((e) => {
          const d = new Date(e.date);
          return (
            d.getMonth() === target.getMonth() &&
            d.getFullYear() === target.getFullYear()
          );
        }).reduce((sum, e) => sum + e.amount, 0);
    };

    const currentMonth = getMonthTotal(0);
    const lastMonth = getMonthTotal(1);

    const monthlyChange =lastMonth>0? Math.round(((currentMonth - lastMonth) / lastMonth)*100): 0;
    const currentMonthKey = new Date().toISOString().slice(0, 7);
    const budgets = await Budget.find({userId,month: currentMonthKey});

    const budgetAlerts = budgets.map((b) => {
        const spent = categoryTotals[b.category] || 0;
        const over = spent > b.amount;
        return over? `${b.category} exceeded budget by ₹${spent - b.amount}`:null;}).filter(Boolean);

const prompt = `
You are a personal finance coach.

Your job:
- Give insightful but simple financial advice
- Focus on spending habits and patterns
- Make insights feel personal and meaningful
- Do show basic calculations or percentages
- Avoid technical or analytical language
- Be natural, like a smart financial friend

Rules:
- Maximum 3 insights
- Maximum 3 recommendations
- Warning only if important

Focus on:
- Spending habits (not numbers)
- Lifestyle patterns (food, shopping, lifestyle, etc.)
- Risky behaviors (overspending, imbalance, impulse spending)
- Small improvements user can actually follow

Return ONLY valid JSON:

{
  "insights": [
    "insight about behavior/pattern",
    "insight about habit or trend",
    "optional deeper observation"
  ],
  "recommendations": [
    "practical action step",
    "simple habit change",
    "optional saving tip"
  ],
  "warning": "short important warning or empty string"
}

User data:
Total spent: ₹${totalSpent}
Monthly change: ${monthlyChange}%
Top spending categories: ${topCategories
  .map((c) => `${c.category}: ₹${c.amount}`)
  .join(", ")}

Budget issues:
${budgetAlerts.length ? budgetAlerts.join(", ") : "None"}
`;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    let parsedInsights;

    try {
      const cleaned = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedInsights = JSON.parse(cleaned);
    } catch (err) {
      parsedInsights = {
        insights: [aiText],
        recommendations: [],
        warning: "",
      };
    }

    res.status(200).json({
      insights: parsedInsights,
    });
  } catch (error) {
    console.error("AI Insight Error:", error);

    res.status(200).json({
      insights: {
        insights: [
          "AI insights are temporarily unavailable."
        ],
        recommendations: [],
        warning: ""
      }
    });
  }
};