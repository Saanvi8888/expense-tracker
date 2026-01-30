import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../inputs/Input';

const AddExpenseForm = ({onAddExpense}) => {
    const CATEGORIES = [
      "Food",
      "Rent",
      "Transport",
      "Shopping",
      "Utilities",
      "Entertainment",
      "Other",
    ];

    const [income,setIncome] = useState({
        category:"Other",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange=(key,value)=>setIncome({...income,[key]:value})


  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}

      />

      {/* <Input
        value={income.category}
        onChange={({target})=>handleChange("category",target.value)}
        label="Category"
        placeholder="Rent,Groceries,etc"
        type="text"
      /> */}
      <div className='mb-5'>
        <label className="text-xs  text-gray-700">Category</label>

      <select
        value={income.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="w-full border-1 rounded-lg p-2 text-sm mt-1"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      </div>

      <Input
        value={income.amount}
        onChange={({target})=>handleChange("amount",target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({target})=>handleChange("date",target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div>
        <button
        type='button'
        className='add-btn add-btn-fill'
        onClick={()=>onAddExpense(income)}>
            Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
