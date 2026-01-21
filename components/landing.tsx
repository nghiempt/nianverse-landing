import React from 'react';
import { Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from './loading-gif.json';
import ResourcesSection from './card-customer';

const GitcoinLanding = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Stats Section */}
            <section className="bg-gray-100">
                <div className="w-full px-4 sm:px-6 lg:px-60 py-8 hidden lg:block">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className='bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl py-6'>
                            <div className="text-2xl font-bold mb-1">$67m+</div>
                            <div className="text-sm text-gray-600">Distributed</div>
                        </div>
                        <div className='bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl py-6'>
                            <div className="text-2xl font-bold mb-1">27B+</div>
                            <div className="text-sm text-gray-600">Rounds Launched</div>
                        </div>
                        <div className='bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl py-6'>
                            <div className="text-2xl font-bold mb-1">3.8K</div>
                            <div className="text-sm text-gray-600">Donated</div>
                        </div>
                        <div className='bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl py-6'>
                            <div className="text-2xl font-bold mb-1">5,000+</div>
                            <div className="text-sm text-gray-600">Projects Funded</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="w-full px-8 sm:px-6 lg:px-60 lg:py-28 py-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl font-bold mb-6">NIANVERSE</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Quantangle is a self-management system based on states, energies, and observation, in which aspects of life exist in a state of tangled connections and only “collapse” into action when intentionally observed.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition">
                                Learn more
                            </button>
                            <button className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                                Get involved
                            </button>
                        </div>
                    </div>
                    <div className="relative lg:border-r-10 border-dashed border-gray-900">
                        <Lottie animationData={animationData} className="w-full h-64" />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            {/* <section className="bg-gray-100 py-20">
                <div className="w-full px-4 sm:px-6 lg:px-60 text-center">
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">OUR MISSION</div>
                    <h2 className="text-5xl font-bold mb-6">
                        To empower communites to fund what matters to them
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Since 2017, Gitcoin has empowered communities to build, fund and protect what
                        matters to them through innovating funding tools and solutions.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                            About us
                        </button>
                        <button className="px-6 py-3 border border-gray-300 bg-white rounded hover:bg-gray-50 transition">
                            Our Program
                        </button>
                    </div>
                </div>
            </section> */}

            <ResourcesSection />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6">
                <div className="w-full px-4 sm:px-6 lg:px-60">
                    

                    

                    {/* Bottom Footer */}
                    <div className="flex justify-center lg:justify-between items-center text-sm text-gray-400">
                        <div className=''>Nianverse © 2026</div>
                        <div className="hidden lg:flex gap-6 justify-center items-center">
                            <a href="#" className="hover:text-gray-300">Terms of Use</a>
                            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                            <div>
                            <div className="flex gap-3">
                                <a href="#" className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gray-500">
                                    <Twitter size={16} />
                                </a>
                                <a href="#" className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gray-500">
                                    <Linkedin size={16} />
                                </a>
                                <a href="#" className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gray-500">
                                    <Github size={16} />
                                </a>
                                <a href="#" className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gray-500">
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GitcoinLanding;