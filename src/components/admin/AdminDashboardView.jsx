import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardCard, SectionCard } from "./AdminCommon";
import { accentColors } from "./AdminConstants";

const AdminDashboardView = ({
  metrics,
  salesTrendData,
  productViewsData,
  recentOrders,
  topSellingData,
  categoryBreakdown,
  formatCurrency,
}) => {
  // Brand colors extracted from constants or defined for charts
  const brandOrange = "#f97316";
  const brandAmber = "#f59e0b";
  const brandYellow = "#fbbf24";

  return (
    <div className="space-y-6 animate-in fade-in duration-1000">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {metrics.map((metric) => (
          <DashboardCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <SectionCard title="Revenue Growth" subtitle="Performance analytics for the current cycle">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="currentSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={brandOrange} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={brandOrange} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="previousSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="#fff7ed"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke={brandOrange}
                  fill="url(#currentSales)"
                  strokeWidth={4}
                  name="Current Period"
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#94a3b8"
                  fill="url(#previousSales)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Last Period"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Daily Engagement"
          subtitle="Customer interaction frequency"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productViewsData}>
                <CartesianGrid
                  stroke="#f8fafc"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar
                  dataKey="thisWeek"
                  fill={brandAmber}
                  radius={[6, 6, 0, 0]}
                  name="Active"
                />
                <Bar
                  dataKey="lastWeek"
                  fill="#e2e8f0"
                  radius={[6, 6, 0, 0]}
                  name="Idle"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <SectionCard
          title="Recent Store Activity"
          subtitle="Real-time transaction log"
        >
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
              <thead>
                <tr className="text-slate-400">
                  <th className="pb-2 font-black uppercase tracking-widest text-[10px] px-4">Product</th>
                  <th className="pb-2 font-black uppercase tracking-widest text-[10px] px-4">Order ID</th>
                  <th className="pb-2 font-black uppercase tracking-widest text-[10px] px-4">Customer</th>
                  <th className="pb-2 font-black uppercase tracking-widest text-[10px] px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="group bg-white hover:bg-orange-50/30 transition-all border border-slate-50 shadow-sm"
                  >
                    <td className="rounded-l-[20px] px-4 py-4 font-black text-slate-800">
                      {order.product}
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-500 font-bold">{order.id}</td>
                    <td className="px-4 py-4 text-slate-600 font-bold">{order.customer}</td>
                    <td className="rounded-r-[20px] px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter ${
                          order.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : order.status === "Packing"
                              ? "bg-orange-50 text-orange-600 border border-orange-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Leaderboard"
            subtitle="Top performing snack variants"
          >
            <div className="space-y-6 mt-4">
              {topSellingData.map((item, index) => (
                <div key={item.name} className="group">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-400">{item.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-50 overflow-hidden border border-slate-100 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-1000 ease-out"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Distribution"
            subtitle="Category-wise inventory split"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={[brandOrange, brandAmber, brandYellow][index % 3]}
                        className="hover:opacity-80 transition-opacity cursor-pointer shadow-lg"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
