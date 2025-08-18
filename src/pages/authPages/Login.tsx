import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loginSuccess } from "../../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // API_key: 'tes',
        body: JSON.stringify({ email, password }),
      });

      // if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      dispatch(loginSuccess(data.token || "token"));
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
          placeholder="Password"
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Loging..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
