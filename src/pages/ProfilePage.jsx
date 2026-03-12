import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, ChevronRight } from 'lucide-react';

const ProfilePage = () => {
  // This would come from your backend later
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+233 123 456 789",
    address: "123 Snack Street, Accra, Ghana",
    memberSince: "March 2026"
  };

  const recentOrders = [
    { id: 1, date: "March 10, 2026", items: 3, total: "GH₵ 85.00", status: "Delivered" },
    { id: 2, date: "March 5, 2026", items: 2, total: "GH₵ 45.00", status: "Shipped" },
    { id: 3, date: "February 28, 2026", items: 5, total: "GH₵ 120.00", status: "Delivered" }
  ];

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your orders</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
              </div>

              <nav className="space-y-2">
                <Link to="/profile" className="flex items-center space-x-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-semibold">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link to="/orders" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                  <Package size={18} />
                  <span>My Orders</span>
                </Link>
                <Link to="/wishlist" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition mt-6">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <User size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.phone}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Delivery Address</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-gray-400" />
                    <span className="text-gray-800">{user.address}</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 text-orange-500 font-semibold hover:text-orange-600 transition">
                Edit Profile
              </button>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                <Link to="/orders" className="text-orange-500 hover:text-orange-600 flex items-center text-sm">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-500">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
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