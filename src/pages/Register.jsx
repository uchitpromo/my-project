import { useState } from "react";
import { Headphones, Mail, Lock, ArrowRight, User as UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api";

const Register = () => {
    const [role, setRole] = useState("brand");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
            const data = await apiCall("/auth/register", "POST", { ...formData, role });
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
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
                    {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                        <button onClick={() => setRole("brand")} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${role === "brand" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>I'm a Brand</button>
                        <button onClick={() => setRole("influencer")} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${role === "influencer" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>I'm an Influencer</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium" />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium" />
                        <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all">
                            {loading ? "Creating Account..." : "Register Now"}
                        </button>
                    </form>
                </div>
                <p className="text-center mt-10 font-bold text-sm text-slate-500">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
