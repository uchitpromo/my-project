import React from "react";
import { 
    ArrowRight, 
    Star, 
    ShieldCheck, 
    Zap, 
    MousePointer2, 
    Users, 
    Rocket, 
    BarChart3, 
    CheckCircle2, 
    Play,
    Sparkles,
    TrendingUp,
    Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -z-10 animate-glow"></div>
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200">New Era of Influence</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9]">
                            Premium <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient-x">Growth</span> <br />
                            For Brands.
                        </h1>
                        
                        <p className="max-w-xl text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                            India's first premium-only marketplace connecting elite brands with top-tier verified creators. Scale your impact with 100% transparency.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <Link to="/marketplace" className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all glow-indigo hover:-translate-y-1 active:scale-95">
                                Start Campaign
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-3 glass hover:bg-white/10 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 border border-white/5 active:scale-95">
                                <Play size={18} fill="currentColor" />
                                How it works
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-10 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex text-amber-400 gap-1 mb-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-sm font-bold text-slate-500 tracking-tight">Trusted by 500+ Premium Brands</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual Dashboard Preview */}
                    <div className="relative group lg:block hidden animate-in fade-in zoom-in duration-1000 delay-200">
                        {/* The "Dashboard" Glass Card */}
                        <div className="glass-card rounded-[3rem] p-8 border border-white/10 animate-float relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
                                        <BarChart3 className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg">Uchit Analytics</h4>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Live ROI Tracker</p>
                                    </div>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                                    Live
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Reach</p>
                                    <div className="text-3xl font-black">1.2M+</div>
                                    <div className="text-emerald-400 text-[10px] font-black mt-1 flex items-center gap-1">
                                        <TrendingUp size={10} /> +12%
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ROI</p>
                                    <div className="text-3xl font-black">4.8x</div>
                                    <div className="text-emerald-400 text-[10px] font-black mt-1 flex items-center gap-1">
                                        <TrendingUp size={10} /> +5%
                                    </div>
                                </div>
                            </div>

                            {/* Influencer Card Floating */}
                            <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-12 h-12 rounded-xl object-cover" alt="" />
                                <div>
                                    <h5 className="font-black text-sm">Aman Sharma</h5>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Tech Creator</p>
                                </div>
                                <div className="ml-auto bg-indigo-600 p-2 rounded-lg">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Floating Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 blur-[80px] rounded-full"></div>
                        
                        {/* Smaller floating glass cards */}
                        <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl border border-white/10 animate-float [animation-delay:2s] z-20">
                            <Shield className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="absolute top-1/2 -left-12 glass-card p-4 rounded-2xl border border-white/10 animate-float [animation-delay:4s] z-20">
                            <TrendingUp className="text-indigo-400 w-5 h-5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
                            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">The Power of Uchit</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tight leading-tight">Engineered for <br /> <span className="text-indigo-400">Superior Impact.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Users />, title: "Elite Network", desc: "Access to India's top 1% content creators verified across 50+ metrics." },
                            { icon: <ShieldCheck />, title: "Ironclad Security", desc: "Every transaction is protected. Payments are only released after campaign approval." },
                            { icon: <TrendingUp />, title: "Precision Analytics", desc: "Real-time tracking of reach, engagement, and conversion ROI for every campaign." }
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-10 rounded-[3rem] group hover:bg-white/10 transition-all duration-500 border border-white/5 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-32 bg-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1 space-y-10">
                            <h2 className="text-5xl font-black tracking-tight leading-tight">Launch in <br /> <span className="text-indigo-400">Four Simple Steps.</span></h2>
                            
                            <div className="space-y-8">
                                {[
                                    { title: "Discovery", desc: "Browse hand-picked creators that match your brand persona." },
                                    { title: "Connection", desc: "Directly chat and finalize creative briefs." },
                                    { title: "Launch", desc: "Watch your brand reach millions in real-time." },
                                    { title: "Optimization", desc: "Analyze performance and scale what works." }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center font-black text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            0{i+1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-1 tracking-tight">{s.title}</h4>
                                            <p className="text-slate-500 font-medium">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop" className="rounded-[4rem] shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
                                <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay rounded-[4rem]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
