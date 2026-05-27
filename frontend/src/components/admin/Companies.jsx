import React from 'react'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import Footer from '../shared/Footer'
import { Plus } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { motion } from 'framer-motion'
import './CompanySetup.css'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();

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

                {/* Silver/White Blob */}
                <motion.div
                    animate={{
                        x: [0, 20, -20, 0],
                        y: [0, 20, -20, 0],
                        scale: [1, 1.04, 0.96, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[50%] left-[40%] w-[300px] h-[300px] bg-white/2 rounded-full blur-[100px]"
                />
            </div>

            <div className="flex-grow relative z-10 py-12">
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
                    {/* Header Section (Glassmorphism) */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 admin-glass-card p-8 rounded-2xl border border-white/10'
                    >
                        <div>
                            <h1 className="text-3xl font-bold tracking-wider uppercase text-white font-sans">
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fbbf24]">Companies</span>
                            </h1>
                            <p className="text-sm text-gray-400 mt-2 font-light">Manage and track your registered organizations.</p>
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="admin-gold-btn px-6 py-5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
                        >
                            <Plus size={16} />
                            <span>Add New Company</span>
                        </Button>
                    </motion.div>

                    {/* Table Section */}
                    <div className="relative">
                        <CompaniesTable />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Companies