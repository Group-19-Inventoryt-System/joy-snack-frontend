import React, { useMemo } from "react";
import { Shield, Sparkles } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../hooks";
import { formatCurrency } from "../data/catalog";
import { sidebarItems } from "../components/admin/AdminConstants";
import AdminDashboardView from "../components/admin/AdminDashboardView";

const AdminPortalPage = () => {
  const { hydratedProducts, users } = useAppData();
  const { user } = useAuth();

  const productBaseValue = useMemo(
    () =>
      hydratedProducts.reduce(
        (sum, product) => sum + (product.sizes[0]?.price ?? 0),
        0,
      ),
    [hydratedProducts],
  );

  const totalStockKeepingUnits = useMemo(
    () =>
      hydratedProducts.reduce((sum, product) => sum + product.sizes.length, 0),
    [hydratedProducts],
  );

  const salesTrendData = [
    { month: "Jan", current: 12000, previous: 8500 },
    { month: "Feb", current: 16400, previous: 11200 },
    { month: "Mar", current: 14800, previous: 13600 },
    { month: "Apr", current: 18800, previous: 15400 },
    { month: "May", current: 21400, previous: 17600 },
    { month: "Jun", current: 24800, previous: 19900 },
    { month: "Jul", current: 30600, previous: 22100 },
    { month: "Aug", current: 33200, previous: 24600 },
    { month: "Sep", current: 29800, previous: 27200 },
    { month: "Oct", current: 35200, previous: 29100 },
    { month: "Nov", current: 37800, previous: 31400 },
    { month: "Dec", current: 40100, previous: 33600 },
  ];

  const productViewsData = hydratedProducts
    .slice(0, 6)
    .map((product, index) => ({
      name: product.name.split(" ")[0],
      thisWeek: 420 + index * 110,
      lastWeek: 310 + index * 90,
    }));

  const recentOrders = users.slice(0, 6).map((user, index) => {
    const product =
      hydratedProducts[index % Math.max(hydratedProducts.length, 1)];
    const total = (product?.sizes[0]?.price ?? 25) * (index + 1);
    const status = ["Completed", "Packing", "Pending"][index % 3];

    return {
      id: `#202${index + 14}`,
      customer: user.fullName,
      product: product?.name ?? "Store Item",
      date: `2026-03-${String(10 + index).padStart(2, "0")}`,
      total,
      status,
    };
  });

  const topSellingData = hydratedProducts.slice(0, 5).map((product, index) => ({
    name: product.name,
    progress: 92 - index * 8,
  }));

  const categoryBreakdown = [
    {
      name: "Juice",
      value: hydratedProducts.filter((product) => product.category === "juice")
        .length,
    },
    {
      name: "Chips",
      value: hydratedProducts.filter((product) => product.category === "chips")
        .length,
    },
    {
      name: "Pastries",
      value: hydratedProducts.filter((product) =>
        ["pie", "samosa", "springroll", "sausage"].includes(product.category),
      ).length,
    },
  ].filter((item) => item.value > 0);

  const metrics = [
    {
      label: "Total Customers",
      value: `${users.length}+`,
      detail: "Active shoppers directory",
      icon: sidebarItems[1].icon,
      tone: "bg-gradient-to-br from-orange-500 to-amber-600",
    },
    {
      label: "Inventory Items",
      value: `${hydratedProducts.length}+`,
      detail: `${totalStockKeepingUnits} product SKUs live`,
      icon: sidebarItems[2].icon,
      tone: "bg-gradient-to-br from-orange-600 to-orange-700",
    },
    {
      label: "Store Valuation",
      value: formatCurrency(productBaseValue),
      detail: "Entry pricing net worth",
      icon: sidebarItems[3].icon,
      tone: "bg-gradient-to-br from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="flex-1 lg:px-6">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between px-2">
        <div>
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-2">
            <Sparkles size={14} className="animate-pulse" />
            Control Center
          </span>
          <h2 className="text-4xl font-black text-slate-800 font-sulphur tracking-tight">
            Hello, {"Admin"}
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-bold">
            Here's what's happening in your snack empire today.
          </p>
        </div>
      </div>

      <AdminDashboardView
        metrics={metrics}
        salesTrendData={salesTrendData}
        productViewsData={productViewsData}
        recentOrders={recentOrders}
        topSellingData={topSellingData}
        categoryBreakdown={categoryBreakdown}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default AdminPortalPage;

