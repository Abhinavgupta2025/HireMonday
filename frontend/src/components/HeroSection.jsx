import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Globe, Shield } from 'lucide-react';
import './hero.css';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate('/browse');
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden hero-dark-bg text-gray-100 font-sans flex flex-col items-center pt-28 pb-20 px-4 md:px-16">
            
            <div className="relative z-10 flex flex-col items-center text-center mt-6 mb-16 w-full">
                <h1 className="text-4xl md:text-6xl text-gray-300 mb-6 max-w-4xl leading-tight font-light tracking-wide">
                    Curated Opportunities for <br/>
                    <span className="gold-text font-normal">Elite Professionals</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
                    Exclusive access to board-level and executive roles at the world's most prestigious organizations.
                </p>

                {/* Search Interface */}
                <div className="w-full max-w-3xl mb-16">
                    <div className="glass-input rounded-2xl p-2 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 py-3 bg-transparent">
                            <Search className="text-gray-500 mr-4" size={20} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent border-none text-gray-300 focus:ring-0 focus:outline-none placeholder-gray-500 text-lg p-0 font-light"
                                placeholder="Role, industry, or firm"
                            />
                        </div>
                        <div className="hidden md:block w-px h-10 bg-white/10 self-center"></div>
                        <div className="md:hidden h-[1px] w-[95%] mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="flex-1 flex items-center px-4 py-3 bg-transparent">
                            <MapPin className="text-gray-500 mr-4" size={20} />
                            <input
                                type="text"
                                className="w-full bg-transparent border-none text-gray-300 focus:ring-0 focus:outline-none placeholder-gray-500 text-lg p-0 font-light"
                                placeholder="Global or Remote"
                            />
                        </div>
                        <button
                            onClick={searchJobHandler}
                            className="premium-button text-gray-300 rounded-xl px-8 py-4 mt-2 md:mt-0 flex items-center justify-center gap-3 uppercase tracking-widest text-xs font-medium hover:text-white"
                        >
                            Initiate Search
                            <Search className="text-[#fbbf24]" size={16} />
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4">
                    {/* Card 1 */}
                    <div className="flex-1 stat-card rounded-2xl p-6 flex items-center justify-between group">
                        <div className="flex flex-col text-left">
                            <span className="text-2xl md:text-3xl text-gray-300 mb-1 font-light tracking-wide">$250k+</span>
                            <span className="text-xs text-gray-500 tracking-widest uppercase font-medium">Minimum Compensation</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#fbbf24]/30 transition-colors">
                            <Briefcase className="text-gray-400 group-hover:text-[#fbbf24] transition-colors" size={24} />
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex-1 stat-card rounded-2xl p-6 flex items-center justify-between group">
                        <div className="flex flex-col text-left">
                            <span className="text-2xl md:text-3xl text-gray-300 mb-1 font-light tracking-wide">Top 1%</span>
                            <span className="text-xs text-gray-500 tracking-widest uppercase font-medium">Global Network</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#fbbf24]/30 transition-colors">
                            <Globe className="text-gray-400 group-hover:text-[#fbbf24] transition-colors" size={24} />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex-1 stat-card rounded-2xl p-6 flex items-center justify-between group">
                        <div className="flex flex-col text-left">
                            <span className="text-2xl md:text-3xl text-gray-300 mb-1 font-light tracking-wide">Discrete</span>
                            <span className="text-xs text-gray-500 tracking-widest uppercase font-medium">Private Representation</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#fbbf24]/30 transition-colors">
                            <Shield className="text-gray-400 group-hover:text-[#fbbf24] transition-colors" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
