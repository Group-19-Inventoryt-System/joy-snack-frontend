import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Menu, Shield, ShoppingCart, User, UserPlus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks';
import Logo from '../assets/joySnacky-logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    closeMenus();
    navigate('/signin', { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Joy Snacky" className="h-10 w-10 object-contain" />
              <p>
                Joy <span className="text-orange-500">Snacky</span>
              </p>
            </div>
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative px-1 py-2 text-gray-700 transition hover:text-orange-600 ${
                  location.pathname === item.path ? 'text-orange-600' : ''
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-orange-500 transition-transform group-hover:scale-x-100 ${
                    location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 hover:text-orange-500">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen((currentValue) => !currentValue)}
                className="p-2 hover:text-orange-500 focus:outline-none"
                aria-label="Open account menu"
              >
                <User size={20} />
              </button>

              {isUserMenuOpen ? (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  {isAuthenticated ? (
                    <>
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="font-semibold text-slate-800">{user.fullName}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                      {isAdmin ? (
                        <Link
                          to="/admin"
                          onClick={closeMenus}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Shield size={16} />
                          <span>Admin Portal</span>
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-left text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              ) : null}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
              className="p-2 text-gray-700 transition hover:text-orange-600 focus:outline-none lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="absolute left-0 right-0 border-t border-gray-100 bg-white shadow-lg lg:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className={`rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600 ${
                      location.pathname === item.path ? 'bg-orange-50 font-semibold text-orange-600' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mt-3 border-t border-gray-200 pt-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                      {isAdmin ? (
                        <Link
                          to="/admin"
                          onClick={closeMenus}
                          className="flex items-center space-x-2 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Shield size={18} />
                          <span>Admin Portal</span>
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center space-x-2 rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeMenus}
                        className="flex items-center space-x-2 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
