import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Mail, 
  Calendar, 
  Building, 
  Settings 
} from 'lucide-react';

export const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart
  },
];

export const accentColors = {
  violet: ['#8b5cf6', '#7c3aed'],
  amber: ['#f59e0b', '#ea580c'],
  rose: ['#f43f5e', '#dc2626'],
  emerald: ['#10b981', '#14b8a6'],
  blue: ['#3b82f6', '#2563eb'],
  green: ['#22c55e', '#16a34a'],
  orange: ['#fb923c', '#f97316'],
  purple: ['#a855f7', '#9333ea']
};
