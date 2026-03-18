import React from "react";
import { GraduationCap, Briefcase, Globe, CheckCircle2 } from "lucide-react";

const services = [
    {
        title: "Admission Help",
        description: "Comprehensive guidance for college and university admissions worldwide.",
        icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
        color: "bg-blue-50"
    },
    {
        title: "Business Support",
        description: "Strategic advice and technical support to help your business scale and thrive.",
        icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
        color: "bg-indigo-50"
    },
    {
        title: "Service Assistance",
        description: "Expert help for all online government and private service applications.",
        icon: <Globe className="w-8 h-8 text-purple-600" />,
        color: "bg-purple-50"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Our Premium Services
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        We offer a wide range of specialized services to ensure your journey is smooth and successful.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <div className="flex items-center text-blue-600 font-semibold text-sm">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Verified Service
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
