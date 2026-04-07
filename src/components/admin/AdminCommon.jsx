import React from 'react';

export const DashboardCard = ({ icon: Icon, label, value, tone, detail }) => (
  <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_24px_70px_rgba(90,57,184,0.09)] backdrop-blur">
    <div className="flex items-center justify-between">
      <div className={`rounded-2xl p-3 ${tone}`}>
        <Icon size={20} className="text-white" />
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">{label}</span>
    </div>
    <p className="mt-5 text-3xl font-bold text-slate-900">{value}</p>
    <p className="mt-2 text-sm text-slate-500">{detail}</p>
  </div>
);

export const SectionCard = ({ title, subtitle, children, actions }) => (
  <section className="rounded-[30px] border border-white/75 bg-white/90 p-6 shadow-[0_30px_90px_rgba(91,64,181,0.08)] backdrop-blur">
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {actions}
    </div>
    {children}
  </section>
);
