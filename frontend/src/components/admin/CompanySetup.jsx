import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage, Save, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'
import './CompanySetup.css'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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
const PageHeader = ({ title, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5"
  >
    <h1 className='text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] uppercase'>
      {title}
    </h1>
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

const FormField = ({ label, name, value, onChange, type = "text", placeholder, icon, accept, className = "" }) => (
  <motion.div 
    variants={itemVariants}
    className={`flex flex-col ${className}`}
  >
    <Label className="mb-2.5 text-sm font-medium text-gray-300 flex items-center gap-2">
      {icon && <span className="text-[#d4af37]">{icon}</span>}
      {label}
    </Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      accept={accept}
      className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none shadow-inner"
      placeholder={placeholder}
    />
  </motion.div>
);

const FileUploadField = ({ label, onChange, accept = "image/*" }) => {
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(e);
    }
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      className="col-span-full mb-2"
    >
      <Label className="mb-2.5 text-sm font-medium text-gray-300 flex items-center gap-2">
        <FileImage size={16} className="text-[#d4af37]" />
        {label}
      </Label>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-2xl bg-black/20 hover:bg-black/35 transition-all duration-300">
        {preview ? (
          <div className="relative w-28 h-28 mb-4 border border-[#d4af37]/35 rounded-full overflow-hidden p-0.5 shadow-lg bg-black/40">
            <img 
              src={preview} 
              alt="Logo preview" 
              className="w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors duration-200"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37]">
              <FileImage size={24} />
            </div>
            <p className="mb-1 text-sm font-medium text-white">Upload company logo</p>
            <p className="text-xs text-gray-400 mb-4 font-light">SVG, PNG, JPG or GIF (max. 2MB)</p>
          </div>
        )}
        <label className="cursor-pointer admin-silver-btn px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300">
          {preview ? "Change logo" : "Select logo"}
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </motion.div>
  );
};

const SubmitButton = ({ loading, text }) => (
  <motion.div
    variants={itemVariants}
    className="mt-8"
  >
    {loading ? (
      <Button 
        className="flex items-center justify-center w-full gap-3 py-6 text-sm font-bold tracking-widest text-[#d4af37] bg-white/5 border border-[#d4af37]/25 rounded-xl uppercase"
        disabled
      >
        <Loader2 className='animate-spin text-[#d4af37]' size={16} /> 
        <span>Updating profile...</span>
      </Button>
    ) : (
      <Button 
        type="submit" 
        className="admin-gold-btn w-full py-6 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl"
      >
        <Save size={16} />
        <span>{text}</span>
      </Button>
    )}
  </motion.div>
);

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to update company")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    // Field configurations
    const fields = [
        { name: "name", label: "Company Name", icon: <Building2 size={15} />, placeholder: "e.g. HireMonday Inc." },
        { name: "description", label: "Description", icon: null, placeholder: "Describe your organization's focus" },
        { name: "website", label: "Website", icon: <Globe size={15} />, placeholder: "e.g. https://hiremonday.com" },
        { name: "location", label: "Location", icon: <MapPin size={15} />, placeholder: "e.g. Bangalore, IN" }
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
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl p-8 sm:p-10 rounded-2xl border border-white/10 admin-glass-card shadow-2xl"
                >
                    <form onSubmit={submitHandler}>
                        <PageHeader 
                            title="Company Setup" 
                            onBack={() => navigate("/admin/companies")} 
                        />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            {fields.map((field, index) => (
                                <FormField
                                    key={index}
                                    label={field.label}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    placeholder={field.placeholder}
                                    icon={field.icon}
                                />
                            ))}
                            
                            <FileUploadField
                                label="Company Logo"
                                onChange={changeFileHandler}
                            />
                        </motion.div>

                        <SubmitButton 
                            loading={loading} 
                            text="Update Company Details" 
                        />
                    </form>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    )
}

export default CompanySetup
