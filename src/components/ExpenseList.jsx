import api from "../utils/axios";

const ExpenseList = ({ expenses, fetchExpenses, setEditExpense }) => {
  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      alert("Failed to delete expense");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">All Expenses</h5>
        <ul className="list-group">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
            >
              <div>
                {expense.note} – ${expense.amount} – {expense.category} –{" "}
                {expense.date.split("T")[0]}
              </div>
              <div className="mt-2 mt-md-0">
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => setEditExpense(expense)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteHandler(expense._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;