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
}) => (
  <div className="space-y-6">
    <div className="grid gap-4 grid-cols-1  lg:grid-cols-3">
      {metrics.map((metric) => (
        <DashboardCard key={metric.label} {...metric} />
      ))}
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
      <SectionCard title="Sales Trend" subtitle="Current year versus last year">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrendData}>
              <defs>
                <linearGradient id="currentSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="previousSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#ede9fe"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#8b5cf6"
                fill="url(#currentSales)"
                strokeWidth={3}
                name="Current year"
              />
              <Area
                type="monotone"
                dataKey="previous"
                stroke="#f97316"
                fill="url(#previousSales)"
                strokeWidth={3}
                name="Last year"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard
        title="Product Views"
        subtitle="This week compared with last week"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productViewsData}>
              <CartesianGrid
                stroke="#f1f5f9"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="thisWeek"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
                name="This week"
              />
              <Bar
                dataKey="lastWeek"
                fill="#fb7185"
                radius={[8, 8, 0, 0]}
                name="Last week"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <SectionCard
        title="All Orders"
        subtitle="Recent activity across the store"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Order ID</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="rounded-2xl bg-slate-50 text-slate-700"
                >
                  <td className="rounded-l-2xl px-3 py-3 font-semibold text-slate-900">
                    {order.product}
                  </td>
                  <td className="px-3 py-3">{order.id}</td>
                  <td className="px-3 py-3">{order.customer}</td>
                  <td className="px-3 py-3">{order.date}</td>
                  <td className="px-3 py-3">{formatCurrency(order.total)}</td>
                  <td className="rounded-r-2xl px-3 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Packing"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-violet-100 text-violet-700"
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
          title="Top Selling Items"
          subtitle="Performance across core products"
        >
          <div className="space-y-4">
            {topSellingData.map((item, index) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span className="font-medium text-slate-900">
                    {item.name}
                  </span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.progress}%`,
                      background: accentColors[index % accentColors.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Catalog Mix"
          subtitle="Products grouped by category"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={accentColors[index % accentColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  </div>
);

export default AdminDashboardView;
