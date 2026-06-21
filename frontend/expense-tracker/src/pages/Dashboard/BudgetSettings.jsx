import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import dayjs from "dayjs";
import { LuTrash } from "react-icons/lu";

const CATEGORIES = [
  "Food", "Rent", "Transport", "Shopping","Utilities", "Entertainment", "Other"
];

const BudgetSettings = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: "Food", amount: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentMonth = dayjs().format("YYYY-MM");

 const fetchBudgets = async () => {
  setLoading(true);

  try {
    const res = await axiosInstance.get(
      API_PATHS.BUDGET.GET_ALL(currentMonth)
    );
    // console.log("API RESPONSE:", res.data);
    setBudgets(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchBudgets();
}, []);

  const handleSave = async () => {
    if (!form.amount || isNaN(form.amount)) return;
    setSaving(true);
    try {
      await axiosInstance.post(API_PATHS.BUDGET.SET, {
        category: form.category,
        amount: Number(form.amount),
        month: currentMonth,
      });
      setForm({ category: "Food", amount: "" });
      fetchBudgets();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.BUDGET.DELETE(id));
      fetchBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="px-4 md:px-6 py-6 bg-slate-50 min-h-screen space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Budget Settings</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {dayjs().format("MMMM YYYY")} · SET LIMITS PER CATEGORY
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
            Set Budget
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 bg-slate-50 focus:outline-none focus:border-emerald-400"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Budget amount (₹)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 bg-slate-50 focus:outline-none focus:border-emerald-400"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
            Current Budgets
          </h3>

          {loading ? (
            <p className="text-xs text-slate-400 font-mono">Loading...</p>
          ) : budgets.length === 0 ? (
            <p className="text-xs text-slate-400 font-mono">
              No budgets set for {dayjs().format("MMMM YYYY")} yet.
            </p>
          ) : (
            <div className="space-y-2">
              {budgets.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{b.category}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      ₹{b.amount.toLocaleString()} / month
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <LuTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default BudgetSettings;