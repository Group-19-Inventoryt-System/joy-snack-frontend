import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks';

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const destination = location.state?.from?.pathname ?? '/profile';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const user = await signIn(formData);
      navigate(user.role === 'admin' ? '/admin' : destination, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || 'We could not sign you in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="mb-6 inline-block">
              <span className="text-4xl font-bold text-orange-500">Joy Snacky</span>
            </Link>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">Sign in to your account</h1>
            <p className="text-gray-600">Access your profile, orders, and saved details.</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none"
                    placeholder="abena@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 focus:border-orange-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full items-center justify-center rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 ${
                  isLoading ? 'cursor-not-allowed opacity-70' : ''
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-slate-900 px-4 py-4 text-sm text-slate-100">
              <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                <ShieldCheck size={16} />
                <span>Demo admin access</span>
              </div>
              <p>
                Email: <code className="rounded bg-slate-800 px-1.5 py-0.5">ama@joysnack.com</code>
              </p>
              <p>
                Password: <code className="rounded bg-slate-800 px-1.5 py-0.5">JoySnackAdmin123!</code>
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-semibold text-orange-500 hover:text-orange-600">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
