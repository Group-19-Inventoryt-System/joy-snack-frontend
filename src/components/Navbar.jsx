import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get itemCount from cart context
  const { itemCount } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Joy Snack <span className="text-orange-500">E-Commerce</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-1 py-2 text-gray-700 hover:text-orange-600 transition group ${
                  location.pathname === item.path ? 'text-orange-600' : ''
                }`}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    location.pathname === item.path ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon with Count - UPDATED */}
            <Link to="/cart" className="relative p-2 hover:text-orange-500">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <Link to="/login" className="p-2 hover:text-orange-500">
              <User size={20} />
            </Link>

            {/* Mobile Hamburger Icon */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition ${
                      location.pathname === item.path 
                        ? 'text-orange-600 bg-orange-50 font-semibold' 
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;