import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back! 🙏');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sacred flex items-center justify-center p-4">
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-saffron
                          flex items-center justify-center shadow-saffron animate-glow mb-4">
            <span className="text-4xl">🪔</span>
          </div>
          <h1 className="font-devanagari text-3xl text-orange-300 font-bold tracking-wide">
            पुरोहित दर्पण
          </h1>
          <p className="text-orange-200/60 text-sm mt-1">Your Digital Vedic Mentor</p>
        </div>

        {/* Card */}
        <div className="bg-stone-900/80 backdrop-blur-lg border border-orange-500/20
                        rounded-2xl p-8 shadow-sacred animate-slide-up">
          <h2 className="text-white text-xl font-semibold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-orange-200/80 text-sm mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="your_username"
                className="w-full bg-stone-800/80 border border-orange-500/20
                           text-orange-100 placeholder-orange-200/30
                           rounded-xl px-4 py-3 text-sm outline-none
                           focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                           transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-orange-200/80 text-sm mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-stone-800/80 border border-orange-500/20
                             text-orange-100 placeholder-orange-200/30
                             rounded-xl px-4 py-3 pr-12 text-sm outline-none
                             focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                             transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400/60 hover:text-orange-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-saffron text-white font-medium py-3
                         rounded-xl shadow-saffron hover:shadow-lg
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2
                         transition-all duration-200 hover:scale-[1.01] active:scale-100">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-orange-200/50 text-sm mt-6">
            New student?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 transition-colors">
              Create account
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-4 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <p className="text-orange-300/70 text-xs text-center">
              Demo: <span className="font-mono text-orange-300">admin</span> / <span className="font-mono text-orange-300">Admin@123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
