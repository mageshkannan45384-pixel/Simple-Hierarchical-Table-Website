import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "./dashboardSlice";
import Loader from "../../components/Loader";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#f59e0b"];

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const campaigns = useSelector(
    (state) => state.campaigns.list
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const pieData = useMemo(() => {
    const active = campaigns.filter(c => c.status === "Active").length;
    const paused = campaigns.length - active;

    return [
      { name: "Active", value: active },
      { name: "Paused", value: paused },
    ];
  }, [campaigns]);

  const barData = useMemo(() => {
    return campaigns.map((c) => ({
      name: c.name,
      leads: Math.floor(Math.random() * 500) + 50,
    }));
  }, [campaigns]);

  if (loading) return <Loader text="Loading dashboard..." />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Campaigns" value={campaigns.length} />
        <StatCard
          title="Active Campaigns"
          value={campaigns.filter(c => c.status === "Active").length}
        />
        <StatCard title="Total Leads" value={1260} />
        <StatCard title="Conversion Rate" value="4.8%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-medium mb-4">Campaign Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-medium mb-4">Leads by Campaign</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
