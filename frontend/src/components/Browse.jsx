import React, { useEffect, useMemo, useState } from 'react';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Clock, Building2, Sparkles } from 'lucide-react';
import Navbar from './shared/Navbar';
import './admin/CompanySetup.css';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchedQuery(value));
  };

  // Calculate unique companies, locations, and recent jobs
  const stats = useMemo(() => {
    if (!allJobs || allJobs.length === 0) {
      return { companies: 0, locations: 0, recentJobs: 0 };
    }

    // Get unique companies
    const uniqueCompanies = new Set(allJobs.map(job => job?.company?._id)).size;
    
    // Get unique locations
    const uniqueLocations = new Set(allJobs.map(job => job?.location)).size;
    
    // Count jobs posted today (within last 24 hours)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const recentJobs = allJobs.filter(job => {
      const jobDate = new Date(job?.createdAt);
      return jobDate >= today;
    }).length;

    return {
      companies: uniqueCompanies,
      locations: uniqueLocations,
      recentJobs
    };
  }, [allJobs]);

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    if (!searchedQuery) return allJobs;
    
    return allJobs.filter(job => {
      const searchLower = searchedQuery.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(searchLower) ||
        job?.description?.toLowerCase().includes(searchLower) ||
        job?.location?.toLowerCase().includes(searchLower) ||
        job?.company?.name?.toLowerCase().includes(searchLower)
      );
    });
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[#090a0c] text-white font-[Inter] relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Premium Ambient Background morphing light leaks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Amber/Gold Blob */}
        <motion.div
          animate={{
            x: [0, 45, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[10%] w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/5 to-transparent rounded-full blur-[120px]"
        />

        {/* Indigo/Violet Blob */}
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 35, -25, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[10%] w-[420px] h-[420px] bg-indigo-500/2 rounded-full blur-[130px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 w-full mt-10"
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-[#d4af37]/5 rounded-full border border-[#d4af37]/15"
          >
            <span className="flex items-center gap-1.5 text-[#d4af37] text-xs font-semibold uppercase tracking-widest font-mono">
              <Sparkles size={14} />
              <span>Discover Opportunities</span>
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] tracking-wider uppercase mb-4 font-sans"
          >
            {searchedQuery ? `Results for "${searchedQuery}"` : 'Browse All Jobs'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore {filteredJobs.length} active matching {filteredJobs.length === 1 ? 'career opportunity' : 'career opportunities'}
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#d4af37]" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search jobs by title, company, location or keyword..."
              className="w-full pl-12 pr-4 py-4 admin-glass-input rounded-xl text-white placeholder-gray-500 shadow-xl text-sm"
            />
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
        >
          <div className="admin-glass-card rounded-2xl border border-white/5 p-5 flex items-center gap-4 hover:border-[#d4af37]/20 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37]">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest font-mono">Companies</p>
              <p className="text-white font-bold font-mono text-lg mt-0.5">{stats.companies}</p>
            </div>
          </div>
          
          <div className="admin-glass-card rounded-2xl border border-white/5 p-5 flex items-center gap-4 hover:border-[#d4af37]/20 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest font-mono">Locations</p>
              <p className="text-white font-bold font-mono text-lg mt-0.5">{stats.locations}</p>
            </div>
          </div>

          <div className="admin-glass-card rounded-2xl border border-white/5 p-5 flex items-center gap-4 hover:border-[#d4af37]/20 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest font-mono">Posted Today</p>
              <p className="text-white font-bold font-mono text-lg mt-0.5">{stats.recentJobs}</p>
            </div>
          </div>
        </motion.div>

        {/* Job Results Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="admin-glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-12 p-6"
        >
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <Briefcase className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">No job opportunities found</h3>
              <p className="text-gray-400 text-sm font-light max-w-sm mx-auto">Try adjusting your search query or check back later for new professional listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => (
                <div
                  key={job._id}
                  className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <Job job={job} index={idx} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Browse;
