import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchTodos } from "../store/slices/todosSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/Navbar";

const COLORS = ["#00C49F", "#FF8042"];

const Analytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    if (todos.length === 0) dispatch(fetchTodos());
  }, [dispatch, todos.length]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading todos...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  const pieData = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  const userTodoCount = Object.values(
    todos.reduce((acc: any, todo) => {
      acc[todo.userId] = acc[todo.userId] || { userId: todo.userId, count: 0 };
      acc[todo.userId].count++;
      return acc;
    }, {})
  );

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Todos Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Todos Per User</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userTodoCount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userId" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8"  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
