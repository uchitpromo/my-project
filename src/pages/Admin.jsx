import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api";
import { 
    Users, 
    BarChart3, 
    TrendingUp, 
    ShieldCheck, 
    CheckCircle, 
    XCircle, 
    Clock, 
    Loader2, 
    Search,
    UserCheck,
    Briefcase
} from "lucide-react";

const Admin = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        if (token) fetchAdminData();
    }, [token]);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [statsData, usersData, campaignsData] = await Promise.all([
                apiCall("/admin/stats", "GET", null, token),
                apiCall("/admin/users", "GET", null, token),
                apiCall("/admin/campaigns", "GET", null, token)
            ]);
            setStats(statsData);
            setUsers(usersData);
            setCampaigns(campaignsData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        try {
            await apiCall(`/admin/verify/${id}`, "PUT", null, token);
            fetchAdminData();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Control.</h1>
                    <p className="text-slate-500 font-bold mt-2">Platform-wide overview and management.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <AdminStatCard title="Total Users" value={stats?.users} icon={<Users />} color="text-blue-600" bg="bg-blue-50" />
                    <AdminStatCard title="Total Creators" value={stats?.influencers} icon={<UserCheck />} color="text-indigo-600" bg="bg-indigo-50" />
                    <AdminStatCard title="Campaigns" value={stats?.campaigns} icon={<Briefcase />} color="text-amber-600" bg="bg-amber-50" />
                    <AdminStatCard title="Revenue" value={`₹${stats?.revenue}`} icon={<TrendingUp />} color="text-emerald-600" bg="bg-emerald-50" />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    {["users", "campaigns"].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                                activeTab === tab ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "bg-white text-slate-400 border border-slate-100"
                            }`}
                        >
                            Manage {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    {activeTab === "users" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {users.map(u => (
                                        <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-slate-900">{u.name}</td>
                                            <td className="px-8 py-5 text-slate-500 font-medium">{u.email}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                                    u.role === "admin" ? "bg-purple-100 text-purple-600" : 
                                                    u.role === "brand" ? "bg-blue-100 text-blue-600" : "bg-indigo-100 text-indigo-600"
                                                }`}>{u.role}</span>
                                            </td>
                                            <td className="px-8 py-5 text-slate-400 text-sm font-medium">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Influencer</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {campaigns.map(c => (
                                        <tr key={c._id}>
                                            <td className="px-8 py-5 font-bold text-slate-900">{c.brandId?.name}</td>
                                            <td className="px-8 py-5 font-bold text-slate-900">{c.influencerId?.name} <span className="text-[10px] text-slate-400 ml-2">({c.influencerId?.platform})</span></td>
                                            <td className="px-8 py-5 font-black text-indigo-600">{c.budget}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                                                    c.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" : 
                                                    c.status === "paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                                }`}>{c.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdminStatCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
        </div>
        <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
            {icon}
        </div>
    </div>
);

export default Admin;
