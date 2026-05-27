import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  MoreHorizontal, Edit2, Search, Building2, Calendar, 
  Briefcase, Users, PlusCircle, LayoutDashboard, Plus, ArrowRight 
} from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
const TableHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] mb-2 tracking-wide uppercase font-sans">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 font-light text-sm">{subtitle}</p>}
  </motion.div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full sm:w-80">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
    <Input
      type="text"
      placeholder="Search companies..."
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2.5 w-full admin-glass-input rounded-xl text-sm"
    />
  </div>
);

const SortDropdown = ({ value, onChange }) => (
  <div className="relative w-full sm:w-52">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 pr-8 text-white bg-black/40 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#d4af37]/35 font-medium text-xs shadow-inner cursor-pointer"
    >
      <option value="newest" className="bg-[#111317] text-white">Newest Registered</option>
      <option value="oldest" className="bg-[#111317] text-white">Oldest Registered</option>
      <option value="az" className="bg-[#111317] text-white">Alphabetical (A - Z)</option>
      <option value="za" className="bg-[#111317] text-white">Alphabetical (Z - A)</option>
    </select>
  </div>
);

const KPIIndicator = ({ title, value, subtitle, icon }) => (
  <motion.div 
    variants={itemVariants}
    className="admin-glass-card rounded-2xl border border-white/5 p-6 flex flex-col justify-between hover:border-[#d4af37]/20 transition-all duration-300 group"
  >
    <div className="flex items-center justify-between gap-4 mb-4">
      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</span>
      <div className="w-10 h-10 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/15 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-colors">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-white tracking-tight font-mono mb-1">{value}</h3>
      <p className="text-gray-500 font-light text-2xs uppercase tracking-widest truncate">{subtitle}</p>
    </div>
  </motion.div>
);

const CompanyRow = ({ company, index, activeJobsCount, onEdit, onPostJob, onViewJobs }) => (
  <motion.tr
    key={company._id}
    variants={itemVariants}
    className="admin-table-row"
  >
    <td className="px-6 py-4">
      <Avatar className="w-10 h-10 border border-[#d4af37]/30 shadow-lg rounded-full overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-[#d4af37]/60">
        <AvatarImage src={company.logo} className="object-cover w-full h-full" />
      </Avatar>
    </td>
    <td className="px-6 py-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-wide text-white">{company.name}</span>
          <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-3xs font-semibold tracking-widest uppercase font-mono">
            Verified
          </span>
        </div>
        <div className="text-xs text-gray-400 font-light mt-0.5">{company.email || "No email registered"}</div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-1.5">
        <button 
          onClick={onViewJobs}
          className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/20 text-gray-300 hover:text-[#d4af37] font-mono text-2xs transition-all duration-300 cursor-pointer group"
        >
          <Briefcase size={11} />
          <span>{activeJobsCount} Active Job{activeJobsCount !== 1 ? 's' : ''}</span>
          <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Calendar size={14} className="text-[#d4af37]" />
        <span className="text-xs font-mono">{company.createdAt ? company.createdAt.split('T')[0] : "N/A"}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5">
            <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-[#d4af37] transition-colors" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 admin-glass-popover p-1.5 border border-white/10 text-slate-200 flex flex-col gap-1 z-50">
          <button
            onClick={() => onEdit(company._id)}
            className="flex items-center gap-2.5 px-3 py-2 w-full text-left admin-popover-item rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          
          <button
            onClick={onPostJob}
            className="flex items-center gap-2.5 px-3 py-2 w-full text-left admin-popover-item rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post New Job</span>
          </button>

          <button
            onClick={onViewJobs}
            className="flex items-center gap-2.5 px-3 py-2 w-full text-left admin-popover-item rounded-lg text-xs font-semibold uppercase tracking-wider border-t border-white/5 mt-1 pt-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>View Active Jobs</span>
          </button>
        </PopoverContent>
      </Popover>
    </td>
  </motion.tr>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-16 text-center"
  >
    <div className="flex justify-center mb-4">
      <Building2 size={44} className="text-gray-500" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-1">No companies registered</h3>
    <p className="text-sm text-gray-400 font-light max-w-sm mx-auto">Please add a company to start publishing executive job listings.</p>
  </motion.div>
);

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const { allAdminJobs } = useSelector((store) => store.job);
  
  const [filterCompany, setFilterCompany] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  // Dynamic calculations for KPI cards
  const totalCompanies = companies.length;
  const totalActiveJobs = allAdminJobs.length;
  const totalApplicants = allAdminJobs.reduce((acc, job) => acc + (job?.applicants?.length || job?.applications?.length || 0), 0);
  const latestCompany = companies.length > 0 
    ? [...companies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.name 
    : "None";

  useEffect(() => {
    // Search filter
    let result = companies.filter(company =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );

    if (searchTerm) {
      result = result.filter(company =>
        company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort options
    if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilterCompany(result);
  }, [companies, searchCompanyByText, searchTerm, sortOption]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (companyId) => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handlePostJob = (companyId) => {
    navigate('/admin/jobs/create', { state: { preSelectedCompanyId: companyId } });
  };

  const handleViewJobs = (companyName) => {
    navigate('/admin/jobs', { state: { filterByCompany: companyName } });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Executive Admin KPI Dashboard */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        <KPIIndicator 
          title="Enterprises" 
          value={totalCompanies} 
          subtitle="Registered organizations"
          icon={<Building2 size={20} />}
        />
        <KPIIndicator 
          title="Active Openings" 
          value={totalActiveJobs} 
          subtitle="Published job listings"
          icon={<Briefcase size={20} />}
        />
        <KPIIndicator 
          title="Talent Pool" 
          value={totalApplicants} 
          subtitle="Received candidate application(s)"
          icon={<Users size={20} />}
        />
        <KPIIndicator 
          title="Latest Registry" 
          value={latestCompany} 
          subtitle="Most recently added company"
          icon={<PlusCircle size={20} />}
        />
      </motion.div>

      {/* Main Companies Glass Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full admin-glass-card rounded-2xl border border-white/10 px-6 sm:px-8 py-8"
      >
        <TableHeader 
          title="Registered Companies" 
          subtitle="Manage and view your organizations listed on HireMonday"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <SearchBar value={searchTerm} onChange={handleSearch} />
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>

        {/* Reactive Search Indicators */}
        <div className="text-2xs font-mono text-gray-500 uppercase tracking-widest mb-4">
          Showing {filterCompany.length} organization{filterCompany.length !== 1 ? 's' : ''} matching criteria
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-black/20 border border-white/5 overflow-hidden"
        >
          {filterCompany.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white min-w-[650px]">
                <thead className="text-xs text-gray-400 uppercase bg-white/5 tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Logo</th>
                    <th className="px-6 py-4 font-semibold">Company Name</th>
                    <th className="px-6 py-4 font-semibold">Postings</th>
                    <th className="px-6 py-4 font-semibold">Date Registered</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filterCompany.map((company, index) => {
                      const companyJobsCount = allAdminJobs.filter(job => job?.company?._id === company._id).length;
                      return (
                        <CompanyRow 
                          key={company._id} 
                          company={company} 
                          index={index} 
                          activeJobsCount={companyJobsCount}
                          onEdit={handleEdit} 
                          onPostJob={() => handlePostJob(company._id)}
                          onViewJobs={() => handleViewJobs(company.name)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompaniesTable;
