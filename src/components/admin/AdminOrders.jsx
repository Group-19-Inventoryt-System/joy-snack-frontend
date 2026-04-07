import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Package,
  Clock,
  AlertCircle,
  TrendingUp,
  CreditCard,
  ChevronDown,
  Download,
  Receipt,
  Truck,
  User,
} from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { formatCurrency } from "../../data/catalog";
import { SectionCard, DashboardCard } from "./AdminCommon";
import Modal from "../common/Modal";
import Button from "../common/Button";

const AdminOrders = () => {
  const { hydratedProducts, users } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Simulated orders generation logic (based on users to keep it dynamic)
  const orders = useMemo(() => {
    return users.slice(0, 15).map((user, index) => {
      const product =
        hydratedProducts[index % Math.max(hydratedProducts.length, 1)];
      const quantity = (index % 3) + 1;
      const total = (product?.sizes[0]?.price ?? 25) * quantity;

      const statuses = [
        {
          label: "Completed",
          icon: CheckCircle,
          tone: "bg-emerald-50 text-emerald-600 border-emerald-100",
        },
        {
          label: "Packing",
          icon: Package,
          tone: "bg-orange-50 text-orange-600 border-orange-100",
        },
        {
          label: "Pending",
          icon: Clock,
          tone: "bg-amber-50 text-amber-600 border-amber-100",
        },
        {
          label: "Cancelled",
          icon: AlertCircle,
          tone: "bg-rose-50 text-rose-600 border-rose-100",
        },
      ];

      const statusIdx = index % 4;
      const randomDays = Math.floor(Math.random() * 5);
      const date = new Date();
      date.setDate(date.getDate() - randomDays);

      return {
        id: `#ORD-202${index + 1042}`,
        customer: user.fullName,
        email: user.email,
        product: product?.name ?? "Assorted Snacks",
        items: quantity,
        total,
        status: statuses[statusIdx],
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        payment: index % 2 === 0 ? "Card" : "Momo",
      };
    });
  }, [users, hydratedProducts]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || order.status.label === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(2840.5),
      icon: TrendingUp,
      tone: "bg-orange-500",
      detail: "+12.5% from last week",
    },
    {
      label: "Active Orders",
      value: "24",
      icon: Package,
      tone: "bg-amber-500",
      detail: "8 pending shipment",
    },
    {
      label: "Fulfilled",
      value: "142",
      icon: CheckCircle,
      tone: "bg-emerald-500",
      detail: "98.2% success rate",
    },
  ];

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-orange-700 font-sulphur">
            Order Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage customer fulfillment workflows.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Orders Table Container */}
      <SectionCard
        title="Order Queue"
        subtitle={`${filteredOrders.length} active orders pending`}
        actions={
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none"
              />
            </div>
            <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
              {["All", "Pending", "Packing", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    statusFilter === status
                      ? "bg-white text-orange-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-spacing-y-4 border-separate">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-widest font-black">
                <th className="px-4 pb-2">Order ID</th>
                <th className="px-4 pb-2">Customer</th>
                <th className="px-4 pb-2">Date</th>
                <th className="px-4 pb-2">Amount</th>
                <th className="px-4 pb-2">Payment</th>
                <th className="px-4 pb-2 text-center">Status</th>
                <th className="px-4 pb-2 text-right tracking-normal font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="group bg-white hover:bg-orange-50/20 transition-all cursor-pointer"
                  >
                    <td className="px-4 py-5 rounded-l-[28px] border-y border-l border-slate-100 group-hover:border-orange-100">
                      <span className="font-mono text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-5 border-y border-slate-100 group-hover:border-orange-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-[10px] ring-4 ring-white shadow-lg shadow-orange-500/10">
                          {order.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm leading-none">
                            {order.customer}
                          </p>
                          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                             <User size={10} className="opacity-40" />
                             {order.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 border-y border-slate-100 group-hover:border-orange-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} className="opacity-40" />
                        <span className="text-xs font-bold">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 border-y border-slate-100 group-hover:border-orange-100">
                      <div>
                        <p className="font-black text-orange-700 text-sm leading-none">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-black uppercase tracking-wider">
                          {order.items} items
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-5 border-y border-slate-100 group-hover:border-orange-100">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${order.payment === "Card" ? "bg-orange-400" : "bg-emerald-400"}`}
                        />
                        <span className="text-xs font-bold text-slate-600">
                          {order.payment}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5 border-y border-slate-100 group-hover:border-orange-100 text-center">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider shadow-sm ${order.status.tone} ${order.status.label === "Pending" || order.status.label === "Packing" ? "animate-pulse-subtle" : ""}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${order.status.label === "Completed" ? "bg-emerald-500" : order.status.label === "Cancelled" ? "bg-rose-500" : "bg-current"}`}
                        />
                        {order.status.label}
                      </div>
                    </td>
                    <td className="px-4 py-5 rounded-r-[28px] border-y border-r border-slate-100 group-hover:border-orange-100 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(order);
                          }}
                          className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-orange-100 transition-all text-slate-400 hover:text-orange-600 shadow-sm group/btn"
                        >
                          <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-orange-100 transition-all text-slate-400 hover:text-slate-600 shadow-sm">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                        <Search size={40} className="opacity-20" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-400">
                        No orders found
                      </h3>
                      <p className="text-sm">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-8 px-2">
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
            Showing <span className="text-orange-600 font-black underline decoration-2 underline-offset-4">1-{filteredOrders.length}</span> of{" "}
            <span className="text-slate-900">42</span> Entries
          </p>
          <div className="flex items-center gap-2">
            <Button variant="white" size="sm" disabled>Previous</Button>
            <Button variant="soft" size="sm">Next Result</Button>
          </div>
        </div>
      </SectionCard>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Order: ${selectedOrder?.id}`}
        maxWidth="max-w-4xl"
      >
        {selectedOrder && (
          <div className="space-y-8 animate-in fade-in duration-500 pb-2">
            {/* Status & Summary */}
            <div className="flex items-center justify-between p-6 bg-orange-50/50 rounded-[32px] border border-orange-100 shadow-inner">
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-[22px] flex items-center justify-center text-white shadow-lg ${selectedOrder.status.tone.split(" ")[1].replace("text-", "bg-")}`}
                >
                  <Package size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/60">
                    Order Lifecycle
                  </p>
                  <h4 className="text-xl font-black text-slate-800 font-sulphur">
                    Status: {selectedOrder.status.label}
                  </h4>
                </div>
              </div>
              <div
                className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm ${selectedOrder.status.tone}`}
              >
                {selectedOrder.status.label}
              </div>
            </div>

            {/* Content Groups */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 pl-2">
                    Customer Information
                  </label>
                  <div className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-110" />
                    <div className="relative">
                        <p className="font-black text-lg text-slate-800">
                        {selectedOrder.customer}
                        </p>
                        <p className="text-sm text-slate-500 mt-1 font-bold">
                        {selectedOrder.email}
                        </p>
                        <div className="mt-5 flex items-center gap-3 text-xs font-black text-orange-600 uppercase tracking-wider">
                        <CreditCard size={16} className="opacity-60" />
                        <span>Checkout via {selectedOrder.payment}</span>
                        </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 pl-2">
                    Delivery Logistics
                  </label>
                  <div className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Truck size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-700 leading-relaxed font-bold">
                        Joy Snacky Plaza, 4th Floor
                        <br />
                        123 Snacky Ave, Accra.
                        </p>
                        <p className="text-[10px] text-emerald-600 mt-3 font-black uppercase tracking-widest">
                        Standard Shipping (2-3 Days)
                        </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 pl-2">
                    Product Breakdown
                  </label>
                  <div className="bg-slate-50/50 rounded-[32px] border border-slate-100 overflow-hidden shadow-inner">
                    <div className="p-6 border-b border-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-orange-500 shadow-sm relative">
                          <Receipt size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">
                            {selectedOrder.product}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            Quantity: {selectedOrder.items}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-orange-700">
                        {formatCurrency(selectedOrder.total)}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
                        <span>Unit Total</span>
                        <span className="text-slate-800">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
                        <span>Shipping Cost</span>
                        <span className="text-emerald-500">FREE</span>
                      </div>
                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-sm font-black text-slate-800 uppercase tracking-[0.1em]">
                          Order Net Amount
                        </span>
                        <span className="text-2xl font-black text-orange-700 font-sulphur">
                          {formatCurrency(selectedOrder.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-50">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="px-8"
              >
                Cancel
              </Button>
              <Button iconLeft={Download} className="px-10" variant="secondary">
                Generate Invoices
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;

