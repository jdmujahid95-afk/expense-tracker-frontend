import { useEffect, useState } from "react";
import api from "../utils/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data } = await api.get("/expenses");
    setExpenses(data);
  };

  return (
    <div className="container mt-4">
      <ExpenseForm fetchExpenses={fetchExpenses} editExpense={editExpense} setEditExpense={setEditExpense} />
      <ExpenseChart />
      <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} setEditExpense={setEditExpense} />
    </div>
  );
};

export default Home;