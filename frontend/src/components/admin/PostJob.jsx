import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, MapPin, Clock, Award, Users, Building2, ArrowLeft, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import './CompanySetup.css'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
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

// Reusable components
const PageHeader = ({ title, subtitle, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5"
  >
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] tracking-wide uppercase">
        {title}
      </h2>
      {subtitle && <p className="text-gray-400 mt-1.5 text-xs font-light">{subtitle}</p>}
    </div>
    <Button 
      onClick={onBack} 
      variant="ghost" 
      className="admin-silver-btn px-4 py-2 text-xs rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
    >
      <ArrowLeft size={14} />
      <span>Back</span>
    </Button>
  </motion.div>
);

const FormField = ({ label, name, value, onChange, type = "text", placeholder, icon }) => (
  <motion.div 
    variants={itemVariants}
    className="mb-4 flex flex-col"
  >
    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2 mb-2.5">
      {icon && <span className="text-[#d4af37]">{icon}</span>}
      {label}
    </Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none shadow-inner"
    />
  </motion.div>
);

const CompanySelect = ({ companies, onSelect }) => (
  <motion.div 
    variants={itemVariants}
    className="col-span-1 md:col-span-2 mb-4 flex flex-col"
  >
    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2 mb-2.5">
      <Building2 size={16} className="text-[#d4af37]" />
      Select Company
    </Label>
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full admin-glass-input rounded-xl px-4 py-3 text-white border border-white/10 hover:border-[#d4af37]/35 focus:ring-0 focus:outline-none">
        <SelectValue placeholder="Choose one of your registered companies" className="text-gray-500 placeholder:text-gray-500" />
      </SelectTrigger>
      <SelectContent className="bg-[#0f1115] text-white border border-white/10 rounded-xl shadow-2xl p-1">
        <SelectGroup>
          {companies.map((company) => (
            <SelectItem 
              key={company._id} 
              value={company?.name?.toLowerCase()}
              className="text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg text-sm cursor-pointer py-2"
            >
              {company.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </motion.div>
);

const SubmitButton = ({ loading }) => (
  <motion.div
    variants={itemVariants}
    className="mt-8"
  >
    {loading ? (
      <Button className="w-full py-6 text-sm font-bold tracking-widest text-[#d4af37] bg-white/5 border border-[#d4af37]/25 rounded-xl uppercase flex items-center justify-center gap-2" disabled>
        <Loader2 className='h-4 w-4 animate-spin text-[#d4af37]' /> 
        <span>Publishing listing...</span>
      </Button>
    ) : (
      <Button type="submit" className="admin-gold-btn w-full py-6 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl">
        <Rocket size={16} />
        <span>Publish Executive Job Listing</span>
      </Button>
    )}
  </motion.div>
);

const WarningMessage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-center text-xs sm:text-sm text-red-400 font-light"
  >
    * Please register a company first in the dashboard before posting a job listing.
  </motion.div>
);

// Custom Rupee Icon component
const RupeeIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create job");
        } finally {
            setLoading(false);
        }
    };

    // Field configurations
    const fields = [
        { name: "title", label: "Job Title", icon: <Briefcase size={15} />, placeholder: "e.g. Lead Carpenter, Heavy Machine Operator" },
        { name: "salary", label: "Salary Rate", icon: <RupeeIcon size={15} />, placeholder: "e.g. ₹40,000 - ₹55,000" },
        { name: "location", label: "Location", icon: <MapPin size={15} />, placeholder: "e.g. Delhi NCR, Bangalore" },
        { name: "jobType", label: "Working Shift", icon: <Clock size={15} />, placeholder: "e.g. Full-time, Day Shift" },
        { name: "experience", label: "Experience Level", icon: <Award size={15} />, placeholder: "e.g. 2+ Years Required" },
        { name: "position", label: "Days Required", icon: <Users size={15} />, type: "number", placeholder: "e.g. 5" },
        { name: "description", label: "Job Description", icon: null, placeholder: "Describe core tasks and project overview" },
        { name: "requirements", label: "Key Requirements", icon: null, placeholder: "Skills, certifications, tools required" }
    ];

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
                        scale: [1, 1.06, 0.95, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-[#d4af37]/4 to-transparent rounded-full blur-[120px]"
                />

                {/* Indigo/Violet Blob */}
                <motion.div
                    animate={{
                        x: [0, -30, 20, 0],
                        y: [0, 30, -20, 0],
                        scale: [1, 0.96, 1.04, 1],
                    }}
                    transition={{
                        duration: 29,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] bg-indigo-500/2 rounded-full blur-[140px]"
                />
            </div>

            <div className="flex-grow flex items-center justify-center py-16 relative z-10 px-4">
                <motion.form 
                    onSubmit={submitHandler} 
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-5xl p-8 sm:p-10 rounded-2xl border border-white/10 admin-glass-card shadow-2xl"
                >
                    <PageHeader 
                        title="Post a New Job" 
                        subtitle="Fill in the project details to connect with elite industry experts"
                        onBack={() => navigate("/admin/jobs")}
                    />
                    
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {fields.map((field, index) => (
                            <FormField
                                key={index}
                                label={field.label}
                                name={field.name}
                                value={input[field.name]}
                                onChange={changeEventHandler}
                                type={field.type || "text"}
                                placeholder={field.placeholder}
                                icon={field.icon}
                            />
                        ))}
                        
                        {companies.length > 0 && (
                            <CompanySelect 
                                companies={companies} 
                                onSelect={selectChangeHandler} 
                            />
                        )}
                    </motion.div>
                    
                    <SubmitButton loading={loading} />
                    
                    {companies.length === 0 && <WarningMessage />}
                </motion.form>
            </div>
            
            <Footer />
        </div>
    )
}

export default PostJob