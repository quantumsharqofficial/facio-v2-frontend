import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Login from "./Login";
import Master from "./Pages/Master/Master";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import AddCompany from "./component/AddCompany";

function AppLayout() {
  const location = useLocation();

  const hiddenRoutePatterns = ["/"];

  const isHiddenRoute = hiddenRoutePatterns.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  return (
    <div className="w-full min-h-screen bg-slate-200">
      {/* Navbar */}
      {!isHiddenRoute && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {!isHiddenRoute && (
          <div className="fixed top-[64px] left-0 h-[calc(100%-64px)] shadow-md w-64">
            <Sidebar />
          </div>
        )}

        {/* Content */}
        <div
          className={`w-full min-h-screen overflow-y-auto
          ${isHiddenRoute ? "pt-0" : "pt-[64px]"}
          ${!isHiddenRoute ? "pl-64 max-sm:pl-16" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/master" element={<Master />} />
            <Route path="/add-company" element={<AddCompany />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
