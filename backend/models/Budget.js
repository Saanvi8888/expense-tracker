const mongoose = require("mongoose")

const BudgetSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
  },
  category: {
    type: String,
    enum: ["Food", "Rent", "Transport", "Shopping", "Utilities", "Entertainment", "Other"],
    required: true,
  },
  amount: {
    type: Number,
    required: true 
  },
  month: { 
    type: String, 
    required: true 
  }, 
}, { timestamps: true })

BudgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true })

module.exports = mongoose.model("Budget", BudgetSchema)