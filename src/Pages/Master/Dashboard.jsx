import React, { useState } from "react";
import {
    Users,
    Calendar,
    DollarSign,
    Activity,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const monthlyData = [
    { name: "Jan", active: 55, customers: 42 },
    { name: "Feb", active: 48, customers: 38 },
    { name: "Mar", active: 62, customers: 45 },
    { name: "Apr", active: 58, customers: 40 },
    { name: "May", active: 65, customers: 50 },
    { name: "Jun", active: 72, customers: 58 },
    { name: "Jul", active: 78, customers: 62 },
];

const yearlyData = [
    { name: "2018", active: 45, customers: 35 },
    { name: "2019", active: 52, customers: 40 },
    { name: "2020", active: 68, customers: 55 },
    { name: "2021", active: 60, customers: 48 },
    { name: "2022", active: 75, customers: 62 },
    { name: "2023", active: 82, customers: 70 },
    { name: "2024", active: 88, customers: 75 },
];



const Dashboard = () => {
    const [timeRange, setTimeRange] = useState("monthly");
    const data = timeRange === "monthly" ? monthlyData : yearlyData;

    return (
        <div
            className="
        min-h-screen
        px-4 sm:px-6 lg:px-8
        pt-6
        md:ml-64 ml-12
      "
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                Dashboard
            </h1>

            {/* Top Cards */}
            <div
                className="
          grid
          grid-cols-4
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-6
        "
            >
                <StatCard title="Customers" value={680} icon={<Calendar />} />
                <StatCard title="Sales Facio" value={170} icon={<Activity />} />
                <StatCard title="Active Facio" value={280} icon={<Users />} />
                <StatCard title="Inactive Facio" value={1286} icon={<DollarSign />} />
            </div>

            {/* Chart Section */}
            <div className="mt-8 bg-white p-6 rounded-2xl shadow w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-800">
                        Analytics Overview
                    </h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setTimeRange("monthly")}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${timeRange === "monthly"
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setTimeRange("yearly")}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${timeRange === "yearly"
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="active"
                                stroke="#10b981"
                                name="Sales Facio"
                            />
                            <Line
                                type="monotone"
                                dataKey="customers"
                                stroke="#4f46e5"
                                name="Customers"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => {
    return (
        <div
            className="
        bg-white
        rounded-2xl
        shadow
        p-4 sm:p-5
        flex
        items-center
        justify-between
      "
        >
            <div>
                <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
                <h2 className="text-xl sm:text-2xl font-bold">{value}</h2>
            </div>

            <div className="text-indigo-600">
                {React.cloneElement(icon, {
                    size: 28,
                    className: "sm:size-[32]",
                })}
            </div>
        </div>
    );
};

export default Dashboard;
