import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Login from "./Login";
import Master from "./Pages/Master/Master";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import AddCompany from "./component/Customer/AddCompany";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Customer from "./Pages/Master/Customer";
import ViewCompany from "./component/Customer/ViewCompany";
import EditCompany from "./component/Customer/EditCompany";
import Employee from "./Pages/Customer/Employee";
import Attendance from "./Pages/Customer/Attendance";
import Leave from "./Pages/Customer/Leave";
import Expenses from "./Pages/Customer/Expenses";
import AddEmployee from "./component/Employee/AddEmployee";
import ViewEmployee from "./component/Employee/ViewEmployee";
import EditEmployee from "./component/Employee/EditEmployee";

function AppLayout() {
  const location = useLocation();

  const hiddenRoutePatterns = ["/"];

  const isHiddenRoute = hiddenRoutePatterns.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  return (
    <div className="w-full min-h-screen bg-slate-100">
      {/* Navbar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed left-0 h-[calc(100%)] shadow-md w -64">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="w-full min-h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/master" element={<Master />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/view-company/:id" element={<ViewCompany />} />
            <Route path="/edit-company/:id" element={<EditCompany />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/view-employee/:id" element={<ViewEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/expense" element={<Expenses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
