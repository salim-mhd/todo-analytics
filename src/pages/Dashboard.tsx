import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome User 🎉</h1>
        <p className="mt-2 text-gray-600">You are logged in successfully.</p>
      </div>
    </div>
  );
};

export default Dashboard;
