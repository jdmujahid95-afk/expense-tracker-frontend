import { useState, useEffect } from "react";
import api from "../utils/axios";

const ExpenseForm = ({ fetchExpenses, editExpense, setEditExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = { amount: Number(amount), category, note, date };

    if (editExpense) {
      await api.put(`/expenses/${editExpense._id}`, payload);
    } else {
      await api.post("/expenses", payload);
    }

    setAmount(""); setCategory(""); setNote(""); setDate("");
    setEditExpense(null);
    fetchExpenses();
  };

  useEffect(() => {
    if (editExpense) {
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
      setNote(editExpense.note);
      setDate(editExpense.date.split("T")[0]);
    }
  }, [editExpense]);

  return (
    <form onSubmit={submitHandler} className="card p-3 mb-3">
      <input className="form-control mb-2" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input className="form-control mb-2" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input className="form-control mb-2" placeholder="Note" value={note} onChange={e => setNote(e.target.value)} />
      <input type="date" className="form-control mb-2" value={date} onChange={e => setDate(e.target.value)} />
      <button className="btn btn-primary">{editExpense ? "Update" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;