import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import { motion } from 'framer-motion'
import './CompanySetup.css'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    const count = applicants?.applications?.length || 0;

    return (
        <div className="min-h-screen flex flex-col bg-[#090a0c] text-white relative overflow-hidden">
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

            <div className='flex-grow relative z-10 py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
                    {/* Header Section (Glassmorphism) */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex items-center justify-between mb-10 admin-glass-card p-8 rounded-2xl border border-white/10'
                    >
                        <div>
                            <h1 className="text-3xl font-bold tracking-wider uppercase text-white font-sans">
                                Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fbbf24]">Applicants</span>
                            </h1>
                            <p className="text-sm text-gray-400 mt-2 font-light">
                                Total applications received: <span className="text-[#d4af37] font-semibold font-mono">{count}</span>
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <ApplicantsTable />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Applicants