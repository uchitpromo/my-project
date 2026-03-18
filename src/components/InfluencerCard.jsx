import React from "react";
import { Instagram, Youtube, Twitter, Star, Loader2, ShieldCheck, CheckCircle2, TrendingUp, Users } from "lucide-react";

const InfluencerCard = ({ inf, onBook, bookingLoading }) => {
    return (
        <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full relative">
            
            {/* Live Indicator */}
            {inf.isOnline && (
                <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg animate-pulse">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Live Now
                </div>
            )}

            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img 
                    src={inf.image} 
                    alt={inf.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-slate-900">{inf.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {inf.niche}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-black text-xl text-slate-900 leading-tight">{inf.name}</h3>
                            {inf.verified && <ShieldCheck size={18} className="text-blue-500 fill-blue-50" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                            {inf.platform === "Instagram" && <Instagram size={14} />}
                            {inf.platform === "YouTube" && <Youtube size={14} />}
                            {inf.platform === "Twitter" && <Twitter size={14} />}
                            <span className="text-xs font-bold uppercase tracking-widest">{inf.platform}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-black text-indigo-600 text-lg leading-none">{inf.followers}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Followers</div>
                    </div>
                </div>

                {/* Trust Stats Bar */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-1.5 text-green-600 mb-1">
                            <CheckCircle2 size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Orders Done</span>
                        </div>
                        <div className="text-lg font-black text-slate-900">{inf.ordersDone}+</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-1.5 text-amber-600 mb-1">
                            <TrendingUp size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">In Queue</span>
                        </div>
                        <div className="text-lg font-black text-slate-900">{inf.ordersPending}</div>
                    </div>
                </div>

                {/* Top Clients */}
                <div className="mb-6">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Users size={12} /> Top Clients
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {inf.topClients?.map(client => (
                            <span key={client} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                                {client}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Starting from</div>
                        <div className="font-black text-slate-900 text-xl">{inf.price}</div>
                    </div>
                    <button 
                        onClick={() => onBook(inf._id, inf.price)}
                        disabled={bookingLoading === inf._id}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                        {bookingLoading === inf._id ? <Loader2 size={14} className="animate-spin" /> : "Book Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfluencerCard;
