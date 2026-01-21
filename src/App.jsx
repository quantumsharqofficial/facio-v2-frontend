import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Login from "./Login";
import Master from "./Pages/Master/Master";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import AddCompany from "./component/AddCompany";
import Dashboard from "./Pages/Master/Dashboard";

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
            <Route path="/add-company" element={<AddCompany />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
