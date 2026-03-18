import React from "react";
import { Headphones, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#010413] text-slate-400 pt-32 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/10">
                                <Headphones className="text-white w-5 h-5" />
                            </div>
                            <span className="font-black text-2xl tracking-tighter text-white">
                                Uchit<span className="text-indigo-500">Promo.</span>
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                            India's first premium-only marketplace connecting elite brands with top-tier content creators. 
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Platform</h4>
                        <ul className="space-y-5 font-bold text-sm">
                            <li><Link to="/marketplace" className="hover:text-indigo-400 transition-colors">Influencer Marketplace</Link></li>
                            <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Join as Creator</Link></li>
                            <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Brand Dashboard</Link></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Live Analytics</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Company</h4>
                        <ul className="space-y-5 font-bold text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Our Vision</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Join the Circle</h4>
                        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Exclusive insights for the top 1% of brands and creators.</p>
                        <form className="relative group">
                            <input 
                                type="email" 
                                placeholder="elite@brand.com" 
                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-5 pr-14 focus:ring-2 focus:ring-indigo-600/50 outline-none font-bold text-sm text-white transition-all group-hover:bg-white/[0.08]"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 p-2.5 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                                <Mail size={18} className="text-white" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        © 2026 UchitPromo. All Rights Reserved.
                    </p>
                    <div className="flex gap-10 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                        <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
                        <a href="#" className="hover:text-white transition-colors">API Docs</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
