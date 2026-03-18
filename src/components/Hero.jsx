import React from "react";
import { MessageSquarePlus, ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white py-24 sm:py-32">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-widest">
                        Support Simplified
                    </h2>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                        Expert Support for your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Growth & Success</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Get help for admission, business, and online services easily. We are dedicated to providing fast and reliable solutions for your needs.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#ticket-form"
                            className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:scale-105"
                        >
                            <MessageSquarePlus className="w-5 h-5" />
                            Create Support Ticket
                        </a>
                        <a href="#services" className="text-sm font-semibold leading-6 text-gray-900 group">
                            Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
