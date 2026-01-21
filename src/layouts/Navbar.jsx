import React from "react";
import { LogOut, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner"; // Commented out standard toast for now if not installed, or assume installed. Kept safe.



const Navbar = () => {
  const navigate = useNavigate();
  // Safe parsing
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (e) {
    user = {};
  }

  const handleLogout = () => {
    localStorage.clear();
    // toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white px-6 py-3 border-b border-slate-200 h-[64px] shadow-sm">
      {/* Search or Title Area (Placeholder) */}
      <div className="flex items-center gap-4">
        {/* <h2 className="text-lg font-semibold text-slate-800">Overview</h2> */}
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-700 leading-none">
              {user?.name || "Admin User"}
            </span>
            <span className="text-xs text-slate-400 mt-1 capitalize">
              {user?.role || "Administrator"}
            </span>
          </div>
          <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
        </div>

        {/* Logout */}
        {/* Using generic logout for now */}
        {/* <button onClick={handleLogout}>Log Out</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
