import React, { useMemo, useState } from "react";
import {
  Users,
  ShieldCheck,
  Zap,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  TrendingUp,
  Trash2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReChartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard, DashboardCard } from "./AdminCommon";
import { useAppData } from "../../context/AppDataContext";
import Button from "../common/Button";
import AlertDialog from "../common/AlertDialog";

const AdminCustomersView = () => {
  const { users, updateUser, deleteUser } = useAppData();
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // AlertDialog State
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {},
  });

  const showAlert = (title, message, type = 'warning', onConfirm = null) => {
    setAlertConfig({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: onConfirm ? () => { onConfirm(); closeAlert(); } : closeAlert,
    });
  };

  const closeAlert = () => setAlertConfig(curr => ({ ...curr, isOpen: false }));

  const stats = [
    {
      label: "Total Customers",
      value: users.length,
      icon: Users,
      tone: "bg-orange-500",
      detail: "Registered accounts",
    },
    {
      label: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      icon: Zap,
      tone: "bg-emerald-500",
      detail: "Currently engaged",
    },
    {
      label: "Administrators",
      value: users.filter((u) => u.role === "admin").length,
      icon: ShieldCheck,
      tone: "bg-amber-600",
      detail: "Privileged access",
    },
  ];

  const customerGrowthData = [
    { week: "W1", total: 40 },
    { week: "W2", total: 62 },
    { week: "W3", total: 78 },
    { week: "W4", total: 96 },
    { week: "W5", total: 124 },
  ];

  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "All" || user.role === roleFilter.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }, [users, userSearch, roleFilter]);

  const handleDeleteClick = (user) => {
    showAlert(
      'Remove Access?', 
      `Are you sure you want to delete ${user.fullName}? This user will lose all access to their account and order history.`, 
      'danger',
      () => deleteUser(user.id)
    );
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-orange-700 font-sulphur">
            Customer Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-bold">
            Browse, manage, and oversee your registered users.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="white" iconLeft={Filter}>Filters</Button>
          <Button iconLeft={TrendingUp} variant="secondary">Growth Report</Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        {/* Customer List Area */}
        <SectionCard
          title="User Directory"
          subtitle={`${filteredUsers.length} active directory entries`}
          actions={
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:max-w-xs">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none font-black"
                />
              </div>
              <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                {["All", "Customer", "Admin"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-4 py-1.5 text-xs font-black rounded-xl transition-all ${
                      roleFilter === role
                        ? "bg-white text-orange-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          }
        >
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar px-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="group relative bg-white hover:bg-orange-50/30 border border-slate-50 hover:border-orange-100 rounded-[32px] p-5 transition-all cursor-default"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative group-hover:scale-105 transition-transform duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/10 border-4 border-white">
                          {user.fullName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${user.status === "active" ? "bg-emerald-500" : "bg-slate-300"}`} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-slate-800 leading-none">
                            {user.fullName}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              user.role === "admin"
                                ? "bg-slate-900 text-white"
                                : "bg-orange-50 text-orange-600 border border-orange-100"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2.5 text-sm text-slate-500 font-bold">
                          <span className="flex items-center gap-2">
                            <Mail size={14} className="opacity-40" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <Phone size={14} className="opacity-40" />
                            {user.phone || "No phone provided"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <select
                          value={user.role}
                          onChange={(e) => updateUser(user.id, { role: e.target.value })}
                          className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-orange-500/40 transition-all cursor-pointer"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <select
                          value={user.status}
                          onChange={(e) => updateUser(user.id, { status: e.target.value })}
                          className={`bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer ${
                            user.status === "active" ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(user)}
                        className="p-3 bg-white hover:bg-rose-50 text-slate-300 hover:text-rose-600 border border-slate-100 rounded-2xl transition-all shadow-sm active:scale-95"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                            <Users size={40} className="opacity-20" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-400">No users found</h3>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                </div>
            )}
          </div>
        </SectionCard>

        {/* Growth Statistics */}
        <div className="space-y-6">
          <SectionCard
            title="Registration Flow"
            subtitle="Acquisition trends for the month"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerGrowthData}>
                  <defs>
                    <linearGradient
                      id="customerGrowth"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#fff7ed"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="week" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: 700 }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: 700 }}
                  />
                  <ReChartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#f59e0b"
                    fill="url(#customerGrowth)"
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 p-6 bg-orange-50/50 rounded-[32px] border border-orange-100 flex items-start gap-5 shadow-inner">
                <div className="w-12 h-12 rounded-[22px] bg-white flex items-center justify-center text-orange-500 shadow-sm border border-orange-100 transition-transform hover:scale-110">
                    <Zap size={22} />
                </div>
                <div>
                    <h5 className="text-sm font-black text-orange-900 uppercase tracking-widest leading-none">New Milestone</h5>
                    <p className="text-xs text-orange-600/80 leading-relaxed mt-2 font-bold">
                        Your customer base has grown by <span className="font-black underline decoration-2 underline-offset-4">12%</span> since last Monday. Keep it up!
                    </p>
                </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Global Alert Dialog */}
      <AlertDialog
        isOpen={alertConfig.isOpen}
        onClose={closeAlert}
        onConfirm={alertConfig.onConfirm}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default AdminCustomersView;


