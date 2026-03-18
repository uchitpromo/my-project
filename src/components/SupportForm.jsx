import { useState } from "react";
import { Send, User, Phone, ClipboardList, MessageSquare } from "lucide-react";

const SupportForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        service: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", msg: "" });

        try {
            const response = await fetch("http://localhost:5000/api/ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: "success", msg: "Ticket created successfully! Our team will contact you soon." });
                setFormData({ name: "", phone: "", service: "", message: "" });
            } else {
                setStatus({ type: "error", msg: data.error || "Something went wrong." });
            }
        } catch (err) {
            setStatus({ type: "error", msg: "Failed to connect to server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="ticket-form" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                    {/* Left Side Info */}
                    <div className="bg-blue-600 p-12 text-white md:w-1/3 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
                        <p className="text-blue-100 mb-8 leading-relaxed">
                            Fill out the form and our support agents will get back to you within 24 hours.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <div className="bg-blue-500/30 p-2 rounded-full"><Phone size={16} /></div>
                                +91 12345 67890
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <div className="bg-blue-500/30 p-2 rounded-full"><Globe size={16} /></div>
                                www.support4u.com
                            </li>
                        </ul>
                    </div>

                    {/* Right Side Form */}
                    <div className="p-12 md:w-2/3">
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
                            <MessageSquare className="text-blue-600" />
                            Create Support Ticket
                        </h3>

                        {status.msg && (
                            <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                <CheckCircle2 className="w-5 h-5" />
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Full Name"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="Phone Number"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                                    <ClipboardList size={18} />
                                </div>
                                <select
                                    name="service"
                                    value={formData.service}
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-600"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Service</option>
                                    <option>Admission Help</option>
                                    <option>Business Support</option>
                                    <option>Online Services</option>
                                </select>
                            </div>

                            <div className="relative group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    placeholder="How can we help you today?"
                                    rows="4"
                                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Submit Ticket"}
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportForm;
