import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, IndianRupee, Briefcase, FileText } from 'lucide-react';
import './admin/CompanySetup.css'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            } finally {
                // Add a small delay to ensure smooth animation
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 18
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#090a0c] text-white font-[Inter] relative overflow-hidden flex flex-col justify-between">
            <Navbar/>

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

            <div className="flex-grow relative z-10 py-12 px-4 sm:px-6 lg:px-8 mt-10">
                {isLoading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <motion.div 
                            className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                ) : (
                    <motion.div 
                        className='max-w-4xl mx-auto admin-glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Header Section */}
                        <motion.div 
                            className="p-8 border-b border-white/10 bg-gradient-to-r from-black/40 via-transparent to-transparent"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div className="space-y-3 flex-1">
                                    <h1 className='font-bold text-2xl sm:text-3xl tracking-wide text-white uppercase font-sans'>
                                        {singleJob?.title}
                                    </h1>
                                    
                                    <div className='flex flex-wrap items-center gap-2.5 mt-2'>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-2xs uppercase tracking-wider">
                                            <Clock size={12} className="text-[#d4af37]" />
                                            <span>{singleJob?.applications?.length} Days Ago</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37] font-mono text-2xs uppercase tracking-wider">
                                            <Briefcase size={12} />
                                            <span>{singleJob?.jobType}</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-2xs uppercase tracking-wider">
                                            <IndianRupee size={12} className="text-gray-400" />
                                            <span>₹{singleJob?.salary} Per/Hr</span>
                                        </span>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    className="self-start md:self-auto"
                                >
                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        className={`px-8 py-6 rounded-xl text-xs tracking-widest font-bold uppercase transition-all duration-300 ${
                                            isApplied 
                                                ? 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed' 
                                                : 'admin-gold-btn shadow-lg'
                                        }`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div 
                            className="p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="mb-4">
                                <h2 className="text-sm font-semibold text-white uppercase tracking-widest font-sans mb-6 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-[#d4af37]" />
                                    <span>Specification & Details</span>
                                </h2>
                                
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <Briefcase size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Role title</h3>
                                            <p className="text-white text-sm font-medium mt-1">{singleJob?.title}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Location</h3>
                                            <p className="text-white text-sm font-medium mt-1">{singleJob?.location}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors col-span-1 md:col-span-2" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Job Description</h3>
                                            <p className="text-gray-300 text-sm font-light leading-relaxed mt-1">{singleJob?.description}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <IndianRupee size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Rate Charge</h3>
                                            <p className="text-white text-sm font-medium mt-1">₹{singleJob?.salary} Per/Hr</p>
                                        </div>
                                    </motion.div>

                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Applications Deadline</h3>
                                            <p className="text-white text-sm font-medium mt-1">{singleJob?.applications?.length} days remaining</p>
                                        </div>
                                    </motion.div>

                                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-black/25 border border-white/5 hover:border-white/10 transition-colors col-span-1 md:col-span-2" variants={itemVariants}>
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/5 text-[#d4af37] flex-shrink-0">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Published Date</h3>
                                            <p className="text-white text-sm font-medium mt-1 font-mono">{singleJob?.createdAt ? singleJob?.createdAt.split("T")[0] : 'N/A'}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default JobDescription;
