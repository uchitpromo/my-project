import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import InfluencerCard from "../components/InfluencerCard";
import { Search, Filter, Loader2, ShieldCheck, Zap, SlidersHorizontal, ChevronDown, CheckCircle2 } from "lucide-react";
import { apiCall } from "../services/api";
import { useAuth } from "../context/AuthContext";

const categories = ["All", "Tech & Gadgets", "Lifestyle & Fashion", "Fitness & Health", "Finance & Crypto", "Travel & Food", "Gaming"];
const platforms = ["All", "Instagram", "YouTube", "Twitter"];

const Marketplace = () => {
    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPlatform, setSelectedPlatform] = useState("All");
    const [priceRange, setPriceRange] = useState(50000);
    const [minRating, setMinRating] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(null);
    const { token, user } = useAuth();

    useEffect(() => { fetchInfluencers(); }, []);

    const fetchInfluencers = async () => {
        try {
            const data = await apiCall("/influencers");
            setInfluencers(data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleBook = async (influencerId, price) => {
        if (!token) { alert("Login as Brand to book"); return; }
        setBookingLoading(influencerId);
        try {
            await apiCall("/campaigns", "POST", { influencerId, budget: price }, token);
            alert("Booking request sent!");
        } catch (err) { alert(err.message); }
        finally { setBookingLoading(null); }
    };

    const filtered = influencers.filter(inf => {
        const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === "All" || inf.niche === selectedCategory;
        const matchesPlatform = selectedPlatform === "All" || inf.platform === selectedPlatform;
        const matchesPrice = (inf.priceNumeric || 0) <= priceRange;
        const matchesRating = inf.rating >= minRating;
        return matchesSearch && matchesCat && matchesPlatform && matchesPrice && matchesRating;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="pt-28 flex">
                {/* Left Sidebar - Flipkart Style */}
                <aside className="hidden lg:block w-80 h-[calc(100vh-112px)] sticky top-28 bg-white border-r border-slate-100 overflow-y-auto p-8 scrollbar-hide">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <SlidersHorizontal size={20} className="text-indigo-600" />
                            Filters
                        </h2>
                        <button onClick={() => {
                            setSelectedCategory("All");
                            setSelectedPlatform("All");
                            setPriceRange(50000);
                            setMinRating(0);
                        }} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Reset All</button>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Search Creator</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text"
                                placeholder="e.g. Aman Sharma"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price (Max: ₹{priceRange})</label>
                        </div>
                        <input 
                            type="range" 
                            min="1000" 
                            max="50000" 
                            step="1000"
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                        />
                    </div>

                    {/* Platform */}
                    <div className="mb-8">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Platform</label>
                        <div className="space-y-2">
                            {platforms.map(p => (
                                <button 
                                    key={p}
                                    onClick={() => setSelectedPlatform(p)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                        selectedPlatform === p ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "text-slate-500 hover:bg-slate-50"
                                    }`}
                                >
                                    {p}
                                    {selectedPlatform === p && <CheckCircle2 size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Min Rating */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Min Rating ({minRating}+)</label>
                        <div className="flex gap-2">
                            {[3, 4, 4.5].map(r => (
                                <button 
                                    key={r}
                                    onClick={() => setMinRating(r)}
                                    className={`flex-1 py-2 rounded-xl font-black text-xs border transition-all ${
                                        minRating === r ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white border-slate-100 text-slate-500"
                                    }`}
                                >
                                    {r}★
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Grid Area */}
                <main className="flex-1 p-8 lg:p-12">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={16} className="text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Result</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{filtered.length} Creators Found</h1>
                        </div>
                        
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar max-w-md pb-2">
                            {categories.map(c => (
                                <button 
                                    key={c}
                                    onClick={() => setSelectedCategory(c)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                        selectedCategory === c ? "bg-slate-900 text-white" : "bg-white text-slate-400 hover:text-slate-600 border border-slate-100"
                                    }`}
                                >{c}</button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-[2rem] h-[500px] animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filtered.map((inf, idx) => (
                                <div key={inf._id} className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <InfluencerCard inf={inf} onBook={handleBook} bookingLoading={bookingLoading} />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Marketplace;
