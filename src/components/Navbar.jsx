import React, { useState, useEffect } from "react";
import { Headphones, User, LogOut, Menu, X, LayoutDashboard, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = location.pathname === "/";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? "py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                        <Headphones className="text-white w-5 h-5" />
                    </div>
                    <Link to="/" className="font-black text-2xl tracking-tighter text-white">
                        Uchit<span className="text-indigo-500">Promo.</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link to="/" className="text-slate-400 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors">Home</Link>
                    <Link to="/marketplace" className="text-slate-400 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors">Marketplace</Link>
                    {user && (
                        <Link to="/dashboard" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-[0.2em] transition-colors">
                            <LayoutDashboard size={14} />
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "admin" && (
                        <Link to="/admin" className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-bold text-xs uppercase tracking-[0.2em] transition-colors">
                            <Shield size={14} />
                            Admin
                        </Link>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logged in as</span>
                                <span className="font-bold text-white text-sm">{user.name.split(" ")[0]}</span>
                            </div>
                            <button onClick={logout} className="p-3 glass rounded-xl text-slate-400 hover:text-red-400 hover:border-red-400/20 transition-all">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="group flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-sm transition-all hover:bg-slate-100 active:scale-95 shadow-lg shadow-white/5">
                            <User size={16} />
                            Login
                            <div className="w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                <ArrowRight size={12} />
                            </div>
                        </Link>
                    )}
                    
                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-3 glass rounded-xl text-white">
                        {mobileMenu ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#020617] border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top duration-300">
                    <Link to="/" className="block text-slate-400 font-bold text-xs uppercase tracking-widest">Home</Link>
                    <Link to="/marketplace" className="block text-slate-400 font-bold text-xs uppercase tracking-widest">Marketplace</Link>
                    {user && <Link to="/dashboard" className="block text-indigo-400 font-bold text-xs uppercase tracking-widest">Dashboard</Link>}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
