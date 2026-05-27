import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Search,
  Download
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './CompanySetup.css';

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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
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
    className="mb-8"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] tracking-wide uppercase">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 mt-2 text-sm font-light">{subtitle}</p>}
  </motion.div>
);

const TableHeaderCell = ({ children, icon }) => (
  <TableHead className="px-4 py-3 text-gray-300 font-semibold border-b border-white/5">
    <div className="flex items-center gap-2">
      {icon && <span className="text-[#d4af37]">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </div>
  </TableHead>
);

const SearchBar = () => (
  <div className="relative w-full sm:w-80">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
    <input
      type="text"
      className="pl-10 pr-4 py-3 w-full admin-glass-input rounded-xl text-sm focus:outline-none"
      placeholder="Search applicants..."
    />
  </div>
);

const StatusButton = ({ status, onClick }) => {
  const isAccepted = status === "Accepted";
  
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg cursor-pointer transition-all duration-200 border ${
        isAccepted 
          ? "text-green-400 bg-green-500/10 border-green-500/25 hover:bg-green-500/20" 
          : "text-red-400 bg-red-500/10 border-red-500/25 hover:bg-red-500/20"
      }`}
    >
      {isAccepted ? <CheckCircle size={14} /> : <XCircle size={14} />}
      <span>{status}</span>
    </div>
  );
};

const ResumeLink = ({ resume, originalName }) => {
  if (!resume) return <span className="text-gray-500 font-light text-xs">N/A</span>;
  
  return (
    <a
      className="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#fbbf24] font-medium text-xs hover:underline transition-colors duration-200"
      href={resume}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Download size={13} />
      <span className="truncate max-w-[130px]">{originalName || "Download ID-Proof"}</span>
    </a>
  );
};

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan="6" className="px-6 py-16 text-center border-b-0">
      <div className="flex flex-col items-center justify-center">
        <User size={48} className="mb-3 text-gray-500" />
        <p className="text-lg font-semibold text-white">No applicants found</p>
        <p className="mt-1 text-xs text-gray-400 font-light max-w-xs mx-auto">When candidates apply for this project, they will appear in this tracking register.</p>
      </div>
    </TableCell>
  </TableRow>
);

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="admin-glass-card rounded-2xl border border-white/10 px-6 sm:px-8 py-8"
            style={{ marginBottom: "470px", paddingBottom: "50px" }}
        >
            <PageHeader 
                title="Recent Applicants" 
                subtitle="Review and manage job applications from candidates"
            />
            
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <SearchBar />
            </div>
            
            <div className="overflow-x-auto border border-white/5 rounded-xl bg-black/20">
                <Table className="text-white min-w-[700px]">
                    <TableCaption className="mt-4 text-xs text-gray-400 font-light mb-2">A list of candidate applicants</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-white/5 hover:bg-white/5 border-b border-white/5">
                            <TableHeaderCell icon={<User size={14} />}>Full Name</TableHeaderCell>
                            <TableHeaderCell icon={<Mail size={14} />}>Email</TableHeaderCell>
                            <TableHeaderCell icon={<Phone size={14} />}>Contact</TableHeaderCell>
                            <TableHeaderCell icon={<FileText size={14} />}>ID-Proof</TableHeaderCell>
                            <TableHeaderCell icon={<Calendar size={14} />}>Applied Date</TableHeaderCell>
                            <TableHead className="px-4 py-3 text-right text-gray-300 font-semibold border-b border-white/5">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {!applicants || !applicants?.applications || applicants.applications.length === 0 ? (
                                <EmptyState />
                            ) : (
                                applicants.applications.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        variants={itemVariants}
                                        className="admin-table-row"
                                    >
                                        <TableCell className="px-4 py-4 font-medium text-white">{item?.applicant?.fullname}</TableCell>
                                        <TableCell className="px-4 py-4 font-light text-gray-300">{item?.applicant?.email}</TableCell>
                                        <TableCell className="px-4 py-4 font-mono text-xs text-gray-300">{item?.applicant?.phoneNumber}</TableCell>
                                        <TableCell className="px-4 py-4">
                                            <ResumeLink 
                                                resume={item.applicant?.profile?.resume}
                                                originalName={item?.applicant?.profile?.resumeOriginalName}
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-4 font-mono text-xs text-gray-300">
                                            {item?.applicant?.createdAt ? item?.applicant?.createdAt.split("T")[0] : 'N/A'}
                                        </TableCell>
                                        <TableCell className="px-4 py-4 text-right">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className="p-2 text-gray-400 hover:text-[#d4af37] transition-all duration-200 rounded-full hover:bg-white/5">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-40 p-1.5 admin-glass-popover border border-white/10 text-white">
                                                    <div className="flex flex-col gap-1.5">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <StatusButton 
                                                                key={index}
                                                                status={status}
                                                                onClick={() => statusHandler(status, item?._id)}
                                                            />
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default ApplicantsTable;
