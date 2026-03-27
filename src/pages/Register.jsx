import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', fullName: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.fullName) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Welcome to Purohit Darpan! 🙏');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sacred flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-saffron
                          flex items-center justify-center shadow-saffron animate-glow mb-4">
            <span className="text-4xl">🪔</span>
          </div>
          <h1 className="font-devanagari text-3xl text-orange-300 font-bold">पुरोहित दर्पण</h1>
          <p className="text-orange-200/60 text-sm mt-1">Begin Your Vedic Journey</p>
        </div>

        <div className="bg-stone-900/80 backdrop-blur-lg border border-orange-500/20
                        rounded-2xl p-8 shadow-sacred animate-slide-up">
          <h2 className="text-white text-xl font-semibold mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Rajesh Sharma' },
              { key: 'username', label: 'Username', type: 'text', placeholder: 'rajesh_sharma' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'rajesh@example.com' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-orange-200/80 text-sm mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-stone-800/80 border border-orange-500/20
                             text-orange-100 placeholder-orange-200/30
                             rounded-xl px-4 py-3 text-sm outline-none
                             focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30
                             transition-all duration-200"
                />
              </div>
            ))}

            <div>
              <label className="block text-orange-200/80 text-sm mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
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
                         disabled:opacity-70 flex items-center justify-center gap-2
                         transition-all duration-200 hover:scale-[1.01] active:scale-100">
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><UserPlus size={18} /> Create Account</>
              }
            </button>
          </form>

          <p className="text-center text-orange-200/50 text-sm mt-6">
            Already registered?{' '}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
