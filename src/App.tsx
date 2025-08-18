
import Login from "./pages/authPages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { Navigate, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
