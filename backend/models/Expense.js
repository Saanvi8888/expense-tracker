const mongoose = require("mongoose")

const ExpenseSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    icon:{type:String},
    category: {
      type: String,
      enum: [
        "Food",
        "Rent",
        "Transport",
        "Shopping",
        "Utilities",
        "Entertainment",
        "Other",
      ],
      required: true,
      default: "Other",
    },
    amount: {type:Number,required:true},
    date:{type:Date,default:Date.now},
},{timestamps:true});


module.exports = mongoose.model("Expense",ExpenseSchema);