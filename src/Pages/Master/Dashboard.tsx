import React from "react";
import {
    Users,
    Calendar,
    DollarSign,
    Activity,
} from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactElement;
}

const Dashboard: React.FC = () => {
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
        </div>
    );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
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
                {React.cloneElement(icon as React.ReactElement<any>, {
                    size: 28,
                    className: "sm:size-[32]",
                })}
            </div>
        </div>
    );
};

export default Dashboard;
