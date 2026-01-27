import React from "react";
import SuperDashboard from "./SuperDashboard";
import CompanyDashboard from "./CompanyDashboard";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const roles = ["SUPER_ADMIN", "COMPANY_ADMIN", "HR", "MANAGER", "EMPLOYEE"];

    return (
        <>
            {user?.role === roles[0] ? (
                <SuperDashboard />
            ) : (
                <CompanyDashboard />
            )}
        </>
    );
}

export default Dashboard;
