import { Routes, Route, useLocation, matchPath, useNavigate } from "react-router-dom";
import Login from "./Login";
import Master from "./Pages/Master/Master";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import AddCompany from "./component/Customer/AddCompany";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Customer from "./Pages/Master/Customer";
import ViewCompany from "./component/Customer/ViewCompany";
import EditCompany from "./component/Customer/EditCompany";
import Employee from "./Pages/Companys/Employee";
import Attendance from "./Pages/Companys/Attendance";
import Leave from "./Pages/Companys/Leave";
import Expenses from "./Pages/Companys/Expenses";
import AddEmployee from "./component/Employee/AddEmployee";
import ViewEmployee from "./component/Employee/ViewEmployee";
import EditEmployee from "./component/Employee/EditEmployee";
import AddUser from "./component/Customer/AddUser";
import RoleRoute from "./component/RoleRoute";
import User from "./component/Customer/User";
import { ArrowLeft } from "lucide-react";


function AppLayout() {
  const navigate = useNavigate();

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
          <div className="w-full p-4 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 right-4 z-50 inline-flex items-center gap-2 
               bg-slate-800 text-white px-4 py-2 rounded-lg 
               hover:bg-slate-900 shadow-lg"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <Routes>
            {/* gentral Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* protected Routes - Super Admin */}
            <Route path="/master" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <Master />
              </RoleRoute>
            } />
            <Route path="/customer" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <Customer />
              </RoleRoute>}
            />
            <Route path="/add-company" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <AddCompany />
              </RoleRoute>
            } />
            <Route path="/view-company/:id" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <ViewCompany />
              </RoleRoute>
            } />
            <Route path="/edit-company/:id" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <EditCompany />
              </RoleRoute>
            } />
            <Route path="/user/:id" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <User />
              </RoleRoute>
            } />
            <Route path="/add-user/:id" element={
              <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
                <AddUser />
              </RoleRoute>
            } />


            {/* protected Routes - Company Admin, HR, Manager */}
            <Route path="/employee" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <Employee />
              </RoleRoute>
            } />
            <Route path="/add-employee" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <AddEmployee />
              </RoleRoute>
            } />
            <Route path="/view-employee/:id" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <ViewEmployee />
              </RoleRoute>
            } />
            <Route path="/edit-employee/:id" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <EditEmployee />
              </RoleRoute>
            } />
            <Route path="/attendance" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <Attendance />
              </RoleRoute>
            } />
            <Route path="/leave" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <Leave />
              </RoleRoute>
            } />
            <Route path="/expense" element={
              <RoleRoute allowedRoles={["COMPANY_ADMIN"]}>
                <Expenses />
              </RoleRoute>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
