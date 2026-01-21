import React from 'react';
import { ChevronRight, User, Target, Leaf, Wrench } from 'lucide-react';

const ResourcesSection = () => {
    return (
        <section className="lg:py-20 bg-gray-50">
            <div className="w-full sm:px-6 lg:px-60">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {/* Our Blog Card */}
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 lg:rounded-2xl p-8 text-white flex flex-col justify-between min-h-[300px]">
                        <div>
                            <h3 className="text-3xl font-bold mb-3">Our Blog</h3>
                            <p className="text-purple-100 text-lg">
                                Get news, updates and education
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all">
                            Explore <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Grantee Showcase Card */}
                    <div className="bg-white lg:rounded-2xl p-8 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="text-2xl font-bold mb-3">Grantee Showcase</h3>
                            <p className="text-gray-600 text-lg">
                                Discover how we help ecosystems grow
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all">
                            Read <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Grants Canvas Card */}
                    <div className="bg-gradient-to-br from-teal-700 to-slate-900 lg:rounded-2xl p-8 text-white flex flex-col justify-between min-h-[300px] relative overflow-hidden">
                        {/* Grid background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full" style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '30px 30px'
                            }}></div>
                        </div>

                        {/* Content with canvas preview */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3">Grants Canvas</h3>
                            <p className="text-teal-100 text-lg mb-6">
                                Our step-by-step framework
                            </p>

                            {/* Canvas preview mockup */}
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex gap-2 mb-3 text-xs text-gray-600">
                                    <span className="font-semibold">Define</span>
                                    <span>Design</span>
                                    <span>Execute</span>
                                    <span>Learn</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-orange-200 rounded h-12"></div>
                                    <div className="bg-yellow-100 rounded h-12"></div>
                                    <div className="bg-blue-200 rounded h-12"></div>
                                    <div className="bg-orange-300 rounded h-12"></div>
                                </div>
                            </div>

                            {/* <div className="bg-teal-800 rounded px-3 py-2 text-xs font-semibold inline-block">
                                Grants Program Design
                            </div> */}
                        </div>

                        <button className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all relative z-10">
                            Download <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Grants Maturity Framework Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 lg:rounded-2xl p-8 text-white flex flex-col justify-between min-h-[300px]">
                        <div>
                            <h3 className="text-2xl font-bold mb-3">Grants Maturity Framework</h3>
                            <p className="text-gray-300 text-lg">
                                Get started with our simple framework
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all">
                            Get the Book <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Grants Maturity Framework Visual Card */}
                    <div className="bg-white lg:rounded-2xl p-8 flex flex-col justify-center items-center min-h-[300px] shadow-sm hover:shadow-md transition-shadow relative">
                        {/* Corner icons */}
                        {/* <div className="absolute top-6 left-6 text-teal-600">
                            <User size={24} />
                        </div>
                        <div className="absolute top-6 right-6 text-teal-600">
                            <Target size={24} />
                        </div>
                        <div className="absolute bottom-6 left-6 text-teal-600">
                            <Leaf size={24} />
                        </div>
                        <div className="absolute bottom-6 right-6 text-teal-600">
                            <Wrench size={24} />
                        </div> */}

                        {/* Center content */}
                        <div className="text-center mb-6">
                            <div className="text-sm text-teal-600 font-semibold mb-2">NIANVERSE</div>
                            <h3 className="text-2xl font-bold mb-4">
                                GRANTS MATURITY<br />FRAMEWORK
                            </h3>
                        </div>

                        {/* Framework stages */}
                        <div className="grid grid-cols-4 gap-3 w-full max-w-md">
                            <div className="text-center">
                                <div className="bg-green-300 rounded-lg h-32 mb-2"></div>
                                <div className="text-xs font-semibold">Stage 1: Initial</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-orange-400 rounded-lg h-32 mb-2"></div>
                                <div className="text-xs font-semibold">Stage 2: Developing</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-400 rounded-lg h-32 mb-2"></div>
                                <div className="text-xs font-semibold">Stage 3: Advanced</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-400 rounded-lg h-32 mb-2"></div>
                                <div className="text-xs font-semibold">Stage 4: Optimized</div>
                            </div>
                        </div>
                    </div>

                    {/* Our Impact Card */}
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 lg:rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
                        <div>
                            <h3 className="text-3xl font-bold mb-3">Our Impact</h3>
                            <p className="text-gray-700 text-lg">
                                Read about our Impact
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all">
                            Read <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;