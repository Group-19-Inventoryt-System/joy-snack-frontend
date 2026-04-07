import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Mail, MapPin, Package, Phone, Shield, User } from 'lucide-react';
import { useAuth } from '../hooks';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const recentOrders = [
    { id: 1, date: 'April 2, 2026', items: 3, total: 'GH₵ 85.00', status: 'Delivered' },
    { id: 2, date: 'March 26, 2026', items: 2, total: 'GH₵ 45.00', status: 'Shipped' },
    { id: 3, date: 'March 18, 2026', items: 5, total: 'GH₵ 120.00', status: 'Delivered' },
  ];

  const handleSignOut = () => {
    signOut();
    navigate('/signin', { replace: true });
  };

  const deniedFrom = location.state?.deniedFrom;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 lg:text-4xl">My Profile</h1>
          <p className="text-gray-600">Manage your account and review your latest activity.</p>
        </div>

        {deniedFrom ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            You&apos;re signed in, but only admin accounts can open {deniedFrom}.
          </div>
        ) : null}

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-1/4">
            <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                  <User size={48} className="text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-sm text-gray-500">Member since {user.joinedAt}</p>
              </div>

              <nav className="space-y-2">
                <Link to="/profile" className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-3 font-semibold text-orange-600">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link to="/orders" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600">
                  <Package size={18} />
                  <span>My Orders</span>
                </Link>
                <Link to="/wishlist" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>
                {isAdmin ? (
                  <Link to="/admin" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600">
                    <Shield size={18} />
                    <span>Admin Portal</span>
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-6 flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Profile Information</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-500">Full Name</label>
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-50 p-3">
                    <User size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.fullName}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-500">Email Address</label>
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-50 p-3">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-500">Phone Number</label>
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-50 p-3">
                    <Phone size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.phone || 'Not added yet'}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-500">Delivery Address</label>
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-50 p-3">
                    <MapPin size={18} className="text-gray-400" />
                    <span className="text-gray-800">Add an address during checkout.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                <Link to="/orders" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-500">{order.total}</p>
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
