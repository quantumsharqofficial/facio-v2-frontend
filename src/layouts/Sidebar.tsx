import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Package,
  Settings,
  UserCircle,
  BarChart2,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";

/* ================= TYPES ================= */

type UserRole = "master" | "admin" | "customer";

interface User {
  role: UserRole;
}

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

/* ================= COMPONENT ================= */

const Sidebar: React.FC = () => {
  const location = useLocation();

  // ✅ sessionStorage null-safe parsing
  const user: User | null = (() => {
    try {
      const stored = sessionStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const userRole = user?.role;

  /* ================= LINKS ================= */

  const linksByRole: Record<UserRole, SidebarLink[]> = {
    master: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Customer Management", path: "/master", icon: Users },
      // { name: "Settings", path: "/settings", icon: Settings },
    ],

    admin: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Patients", path: "/patients", icon: UserCircle },
      { name: "Appointments", path: "/appointments", icon: CalendarClock },
      { name: "Inventory", path: "/inventory", icon: Package },
      { name: "Reports", path: "/admin/reports", icon: BarChart2 },
    ],

    customer: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "My Profile", path: "/profile", icon: UserCircle },
      { name: "History", path: "/history", icon: CalendarClock },
    ]
  };

  // Default fallback (e.g., if no role or dev mode, show Master view)
  const defaultLinks: SidebarLink[] = linksByRole.master;

  const sidebarLinks: SidebarLink[] =
    userRole && linksByRole[userRole] ? linksByRole[userRole] : defaultLinks;

  /* ================= UI ================= */

  return (
    <aside className="bg-white h-full border-r border-slate-200 flex flex-col justify-between w-full transition-all duration-300">
      <div>
        <ul className="space-y-1 p-4">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + "/");

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group
                    ${isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                >
                  <link.icon
                    size={20}
                    className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`}
                  />
                  <span className="text-sm">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 ">
        {/* Logo */}
        <div className=" flex items-center justify-center bor der-b border-slate-800 p-2">
          <img src={logo} alt="facio" className="h-16 object-contain" />
        </div>
        <button className="flex items-center border border-slate-200 gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
