import { useState } from "react";
import { Headphones, Mail, Lock, ArrowRight, Github, User as UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api";

const Login = () => {
    const [role, setRole] = useState("brand");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await apiCall("/auth/login", "POST", formData);
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200 rounded-full blur-[100px] opacity-30"></div>
            </div>

            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl">
                            <Headphones className="text-white w-6 h-6" />
                        </div>
                        <span className="font-black text-3xl tracking-tighter text-slate-900">UchitPromo</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back!</h2>
                    {error && <p className="text-red-500 font-bold mt-2 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50">
                            {loading ? "Signing In..." : "Sign In to Dashboard"}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-10 font-bold text-sm text-slate-500">
                    Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
