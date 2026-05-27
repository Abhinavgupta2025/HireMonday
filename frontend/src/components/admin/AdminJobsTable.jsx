import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  Users, 
  FileText,
  Eye,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const JobCard = ({ job, index, onViewApplicants }) => {
  const applicantCount = job?.applicants?.length || job?.applications?.length || 0;
  
  return (
    <motion.div
      variants={itemVariants}
      className="admin-glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {job?.company?.logo ? (
              <img 
                src={job?.company?.logo} 
                alt={job?.company?.name} 
                className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/30 shadow-md bg-black/40"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center border border-white/10 shadow-md">
                <Building2 size={20} className="text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-[180px]">{job?.title || 'Untitled Job'}</h3>
              <p className="text-xs sm:text-sm text-[#d4af37] font-semibold tracking-wider uppercase mt-0.5">{job?.company?.name || 'Unknown Company'}</p>
            </div>
          </div>
        </div>
        
        {/* Metric Badges */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-xs">
            <Calendar size={13} className="text-[#d4af37]" />
            <span>{job?.createdAt ? job?.createdAt.split("T")[0] : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37] font-mono text-xs">
            <Users size={13} className="text-[#d4af37]" />
            <span>{applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}</span>
          </div>
          {job?.salary && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-xs">
              <Briefcase size={13} className="text-gray-400" />
              <span>₹{job?.salary.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5">
        <button 
          onClick={onViewApplicants}
          className="admin-gold-btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
        >
          <Eye size={14} />
          <span>View Applicants</span>
        </button>
      </div>
    </motion.div>
  );
};

const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-12 admin-glass-card rounded-2xl border border-white/10 text-center"
    >
      <FileText size={56} className="mb-4 text-gray-500" />
      <h3 className="text-lg font-semibold text-white mb-2">No posted jobs found</h3>
      <p className="text-gray-400 text-sm font-light max-w-sm mb-6 mx-auto">Publish your first executive job listing to connect with elite industry experts.</p>
      <button 
        onClick={() => navigate('/admin/jobs/create')}
        className="admin-gold-btn px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-lg"
      >
        <Plus size={16} />
        <span>Post a Job</span>
      </button>
    </motion.div>
  );
};

const AdminJobsTable = () => {
  const { allAdminJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="admin-glass-card rounded-2xl border border-white/10 px-6 sm:px-8 py-8"
      style={{ marginBottom: "370px" }}
    >
      <PageHeader 
        title="Your Job Posts" 
        subtitle="Manage and track active career opportunities"
      />

      <AnimatePresence>
        {allAdminJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {allAdminJobs.map((job, index) => (
              <JobCard 
                key={job._id}
                job={job}
                index={index}
                onViewApplicants={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminJobsTable;
