import { useEffect, useState } from "react";
import api from "../utils/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryTotals();
  }, [startDate, endDate]);

  const fetchCategoryTotals = async () => {
    try {
      let url = "/expenses/category-totals";

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const { data } = await api.get(url);

      const formattedData = data.map((item) => ({
        category: item._id,
        total: item.totalAmount,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Failed to load chart data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Expenses by Category</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;