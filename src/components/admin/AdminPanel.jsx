import { LogOut, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { sidebarItems } from "./AdminConstants";
import AlertDialog from "../common/AlertDialog";

const AdminPanel = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate("/signin", { replace: true });
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="h-full flex flex-col relative border-white/60 bg-orange-900 px-4 py-8 backdrop-blur w-64 border-r overflow-y-auto">
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="w-full flex flex-col items-center justify-center mb-8">
        <img src="/logo.png" alt="" className="w-16 h-16 object-contain mb-3 drop-shadow-xl" />
        <p className="text-2xl font-display text-white tracking-wide">Joy Snacky</p>
      </div>

      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const to = item.id === "dashboard" ? "/admin" : `/admin/${item.id}`;
          const isActive =
            item.id === "dashboard"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(to);

          return (
            <Link
              key={item.id}
              to={to}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "bg-white text-orange-900 shadow-lg shadow-black/10 scale-[1.02]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => setIsLogoutAlertOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-[24px] border border-white/20 px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95 shadow-sm"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <AlertDialog
        isOpen={isLogoutAlertOpen}
        onClose={() => setIsLogoutAlertOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out?"
        message="Are you sure you want to end your current session? You will need to sign in again to access the admin portal."
        type="warning"
        confirmText="Yes, Log Out"
        cancelText="Stay Signed In"
      />
    </aside>
  );
};

export default AdminPanel;

