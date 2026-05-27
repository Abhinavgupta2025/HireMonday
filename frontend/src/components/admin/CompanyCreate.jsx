import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import Footer from '../shared/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ArrowLeft, Rocket, Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import './CompanySetup.css'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

// Reusable components
const PageHeader = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10 text-center"
  >
    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#d4af37] text-transparent bg-clip-text tracking-wider uppercase mb-2">
      {title}
    </h1>
    {subtitle && <p className="text-gray-400 mt-2 text-xs font-light tracking-wide">{subtitle}</p>}
  </motion.div>
);

const FormField = ({ label, value, onChange, placeholder, icon }) => (
  <motion.div 
    variants={itemVariants}
    className="mb-6"
  >
    <Label className="text-sm text-gray-300 font-medium flex items-center gap-2 mb-2.5">
      {icon && <span className="text-[#d4af37]">{icon}</span>}
      {label}
    </Label>
    <Input
      type="text"
      className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </motion.div>
);

const ActionButton = ({ icon, label, onClick, variant = "primary", loading = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
      variant === "primary" 
        ? "admin-gold-btn flex-1" 
        : "admin-silver-btn flex-1"
    }`}
    onClick={onClick}
    disabled={loading}
  >
    {loading ? (
      <Loader2 className="animate-spin text-black" size={16} />
    ) : (
      <>
        {icon}
        {label}
      </>
    )}
  </motion.button>
);

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to create company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090a0c] text-white font-[Inter] relative overflow-hidden flex flex-col justify-between">
            <Navbar />

            {/* Premium Ambient Background morphing light leaks */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Amber/Gold Blob */}
                <motion.div
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.08, 0.95, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[15%] left-[8%] w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/4 to-transparent rounded-full blur-[110px]"
                />

                {/* Indigo/Violet Blob */}
                <motion.div
                    animate={{
                        x: [0, -35, 25, 0],
                        y: [0, 35, -25, 0],
                        scale: [1, 0.95, 1.04, 1],
                    }}
                    transition={{
                        duration: 26,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[25%] right-[8%] w-[420px] h-[420px] bg-indigo-500/2 rounded-full blur-[130px]"
                />
            </div>

            <div className="flex-grow flex items-center justify-center py-16 relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg p-8 sm:p-10 rounded-2xl border border-white/10 admin-glass-card shadow-2xl"
                >
                    <PageHeader 
                        title="Register Company" 
                        subtitle="Give your organization a name — you can always change it later."
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col"
                    >
                        <FormField 
                            label="Company Name" 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. HireMonday, Microsoft"
                            icon={<Building2 size={16} />}
                        />

                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center gap-4 mt-6 justify-center w-full"
                        >
                            <ActionButton 
                                icon={<ArrowLeft size={14} />}
                                label="Cancel"
                                variant="secondary"
                                onClick={() => navigate("/admin/companies")}
                            />
                            <ActionButton 
                                icon={<Rocket size={14} />}
                                label="Continue"
                                loading={loading}
                                onClick={registerNewCompany}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    );
};

export default CompanyCreate;
