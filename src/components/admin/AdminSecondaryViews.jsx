import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SectionCard } from './AdminCommon';

export const PaymentsView = ({ productBaseValue, formatCurrency }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <SectionCard title="Payment Overview" subtitle="Tracked payment channels for the week">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: 'Mobile Money', value: formatCurrency(productBaseValue * 2.6), tone: 'from-violet-500 to-violet-600' },
          { label: 'Card Payments', value: formatCurrency(productBaseValue * 1.8), tone: 'from-emerald-500 to-teal-500' },
          { label: 'Bank Transfer', value: formatCurrency(productBaseValue * 1.1), tone: 'from-orange-500 to-amber-500' },
          { label: 'Pending Settlements', value: formatCurrency(productBaseValue * 0.5), tone: 'from-rose-500 to-pink-500' },
        ].map((item) => (
          <div key={item.label} className={`rounded-[28px] bg-gradient-to-br ${item.tone} p-5 text-white`}>
            <p className="text-sm opacity-80">{item.label}</p>
            <p className="mt-3 text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard title="Collections by Channel" subtitle="Sample distribution of payment volume">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: 'Mon', momo: 1200, card: 900, bank: 480 },
              { name: 'Tue', momo: 1600, card: 1150, bank: 550 },
              { name: 'Wed', momo: 1800, card: 1320, bank: 620 },
              { name: 'Thu', momo: 1700, card: 1260, bank: 600 },
              { name: 'Fri', momo: 2100, card: 1580, bank: 760 },
              { name: 'Sat', momo: 2500, card: 1700, bank: 910 },
            ]}
          >
            <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="momo" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="card" fill="#fb7185" radius={[8, 8, 0, 0]} />
            <Bar dataKey="bank" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  </div>
);

export const OrdersView = ({ recentOrders, formatCurrency }) => (
  <SectionCard title="Order Queue" subtitle="A fuller look at order fulfillment status.">
    <div className="grid gap-4 lg:grid-cols-3">
      {[
        { label: 'Pending', value: '18', tone: 'bg-amber-100 text-amber-700' },
        { label: 'Packing', value: '11', tone: 'bg-violet-100 text-violet-700' },
        { label: 'Completed', value: '42', tone: 'bg-emerald-100 text-emerald-700' },
      ].map((item) => (
        <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.label}</span>
          <p className="mt-4 text-4xl font-bold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="pb-3 font-medium">Order</th>
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Items</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-t border-slate-100 text-slate-700">
              <td className="py-4 font-semibold text-slate-900">{order.id}</td>
              <td className="py-4">{order.customer}</td>
              <td className="py-4">{order.product}</td>
              <td className="py-4">{formatCurrency(order.total)}</td>
              <td className="py-4">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SectionCard>
);

export const SimplePanelGrid = ({ items, columns = 'lg:grid-cols-2' }) => (
  <div className={`grid gap-6 ${columns}`}>
    {items.map((item) => (
      <SectionCard key={item.title} title={item.title} subtitle={item.subtitle}>
        <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">{item.body}</div>
      </SectionCard>
    ))}
  </div>
);
