import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Package,
  UserCircle,
  BarChart2,
  LogOut,
  Menu,
  X,
  Smartphone,
  Clock,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import logo from "../assets/logo.png";



/* ================= COMPONENT ================= */
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const user = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const userRole = user?.role ?? "SUPER_ADMIN";

  const linksByRole = {
    SUPER_ADMIN: [
      // { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Customer", path: "/customer", icon: Users },
      { name: "Facio", path: "/facio", icon: Smartphone },
    ],
    COMPANY_ADMIN: [
      // { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Employee", path: "/employee", icon: Users },
      { name: "Attendance", path: "/attendance", icon: Clock },
      { name: "Leave", path: "/leave", icon: CalendarCheck },
      { name: "Expenses", path: "/expense", icon: Wallet },
    ], HR: [
      // { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Employee", path: "/employee", icon: Users },
      { name: "Attendance", path: "/attendance", icon: Clock },
      { name: "Leave", path: "/leave", icon: CalendarCheck },
      { name: "Expenses", path: "/expense", icon: Wallet },
    ], MANAGER: [
     // { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Employee", path: "/employee", icon: Users },
      { name: "Attendance", path: "/attendance", icon: Clock },
      { name: "Leave", path: "/leave", icon: CalendarCheck },
      { name: "Expenses", path: "/expense", icon: Wallet },
   ],
    EMPLOYEE: [
    // { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Employee", path: "/employee", icon: Users },
      { name: "Attendance", path: "/attendance", icon: Clock },
      { name: "Leave", path: "/leave", icon: CalendarCheck },
      { name: "Expenses", path: "/expense", icon: Wallet },
    ],
  };

  const sidebarLinks = linksByRole[userRole];

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center px-4 py-3 border-b bg-white sticky top-0 z-40">
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          w-20 md:w-64
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-center md:justify-between px-4 py-5 border-b">
          <img src={logo} alt="logo" className="h-10 hidden md:block" />
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col items-center md:items-stretch px-2 md:px-3 py-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/customer");

            return (
              <li key={link.path} className="w-full">
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center justify-center md:justify-start
                    gap-3 py-3 px-3 rounded-xl text-sm font-medium transition
                    ${isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                  `}
                >
                  <link.icon size={20} />
                  {/* Desktop text only */}
                  <span className="hidden md:block">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom */}
        <div className="absolute bottom-0 w-full p-2 md:p-4 border-t bg-white">
          <button
            onClick={handleLogout}
            className="
              flex items-center justify-center md:justify-start
              gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium
              text-red-600 hover:bg-red-50 transition
            "
          >
            <LogOut size={20} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
