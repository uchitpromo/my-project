import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api";
import { 
    Loader2, 
    Calendar, 
    DollarSign, 
    CheckCircle, 
    Clock, 
    TrendingUp, 
    Users, 
    BarChart3,
    ArrowUpRight,
    XCircle,
    ChevronDown,
    ChevronUp,
    Mail,
    User as UserIcon,
    AlertCircle
} from "lucide-react";

const Dashboard = () => {
    const { user, token } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [expandedCampaign, setExpandedCampaign] = useState(null);

    useEffect(() => {
        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const endpoint = user.role === "brand" ? "/campaigns/brand" : "/campaigns/influencer";
            const [campaignData, statsData] = await Promise.all([
                apiCall(endpoint, "GET", null, token),
                apiCall("/campaigns/stats", "GET", null, token)
            ]);
            setCampaigns(campaignData);
            setStats(statsData);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (campaignId, newStatus) => {
        setActionLoading(campaignId);
        try {
            await apiCall(`/campaigns/${campaignId}/status`, "PUT", { status: newStatus }, token);
            await fetchDashboardData(); // Refresh data to update stats and list
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const toggleExpand = (id) => {
        setExpandedCampaign(expandedCampaign === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Loading Dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Dashboard</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                            {user.role === "brand" ? "Brand" : "Influencer"} <span className="text-indigo-600">Overview.</span>
                        </h1>
                        <p className="text-slate-500 font-bold mt-3 text-lg">Manage your collaborations in real-time.</p>
                    </div>
                    
                    <button onClick={fetchDashboardData} className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
                        Refresh Stats
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard 
                        title="Total Campaigns" 
                        value={stats?.total || 0} 
                        icon={<BarChart3 size={24} />} 
                        color="text-indigo-600" 
                        bg="bg-indigo-50" 
                    />
                    <StatCard 
                        title="Pending Requests" 
                        value={stats?.pending || 0} 
                        icon={<Clock size={24} />} 
                        color="text-amber-600" 
                        bg="bg-amber-50" 
                    />
                    <StatCard 
                        title="Approved/Live" 
                        value={stats?.completed || 0} 
                        icon={<CheckCircle size={24} />} 
                        color="text-emerald-600" 
                        bg="bg-emerald-50" 
                    />
                    <StatCard 
                        title={user.role === "brand" ? "Total Invested" : "Total Revenue"} 
                        value={`₹${(user.role === "brand" ? stats?.totalSpent : stats?.earnings) || 0}`} 
                        icon={<TrendingUp size={24} />} 
                        color="text-indigo-600" 
                        bg="bg-indigo-50" 
                    />
                </div>

                {/* Recent Activity Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Activity Log</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                                {campaigns.length} total entries
                            </span>
                        </div>
                    </div>

                    {campaigns.length === 0 ? (
                        <div className="bg-white p-24 rounded-[3rem] text-center border border-slate-100 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                                <AlertCircle size={40} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No active records</h3>
                            <p className="text-slate-400 font-bold max-w-xs mx-auto">Start a collaboration from the marketplace to see data here.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {campaigns.map((c) => (
                                <div key={c._id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-6 w-full">
                                            {/* Avatar/Image */}
                                            <div className="relative flex-shrink-0">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white overflow-hidden shadow-lg border-2 border-white">
                                                    {user.role === "brand" ? (
                                                        <img src={c.influencerId?.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="text-2xl font-black uppercase">{c.brandId?.name?.[0]}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-black text-xl text-slate-900 tracking-tight">
                                                        {user.role === "brand" ? c.influencerId?.name : c.brandId?.name}
                                                    </h3>
                                                    <StatusBadge status={c.status} />
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                        <DollarSign size={14} className="text-emerald-500" />
                                                        <span className="text-slate-900">{c.budget}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                        <Calendar size={14} className="text-indigo-500" />
                                                        {new Date(c.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            {user.role === "influencer" && c.status === "pending" && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(c._id, "approved")}
                                                        disabled={actionLoading === c._id}
                                                        className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(c._id, "rejected")}
                                                        disabled={actionLoading === c._id}
                                                        className="flex-1 md:flex-none bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {user.role === "brand" && c.status === "approved" && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(c._id, "paid")}
                                                    disabled={actionLoading === c._id}
                                                    className="flex-1 md:flex-none bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
                                                >
                                                    {actionLoading === c._id ? "..." : "Pay Now"}
                                                </button>
                                            )}
                                            
                                            <button 
                                                onClick={() => toggleExpand(c._id)}
                                                className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all"
                                                title="View Details"
                                            >
                                                {expandedCampaign === c._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Details Section */}
                                    {expandedCampaign === c._id && (
                                        <div className="bg-slate-50/50 border-t border-slate-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top duration-300">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Contact Details</h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 text-slate-600">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100"><UserIcon size={14} /></div>
                                                        <span className="font-bold text-sm">{user.role === "brand" ? c.influencerId?.name : c.brandId?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-600">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100"><Mail size={14} /></div>
                                                        <span className="font-bold text-sm">{user.role === "brand" ? "Profile verified" : (c.brandId?.email || "Email hidden")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Campaign Info</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white p-4 rounded-2xl border border-slate-100">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                                                        <p className="font-black text-indigo-600">{c.budget}</p>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-2xl border border-slate-100">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Platform</p>
                                                        <p className="font-black text-slate-900">{c.influencerId?.platform || "Instagram"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all duration-500">
        <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
            {icon}
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</div>
        <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        approved: "bg-indigo-50 text-indigo-600 border-indigo-100",
        paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
        rejected: "bg-red-50 text-red-600 border-red-100",
    };
    
    return (
        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${styles[status] || styles.pending}`}>
            {status}
        </span>
    );
};

export default Dashboard;
