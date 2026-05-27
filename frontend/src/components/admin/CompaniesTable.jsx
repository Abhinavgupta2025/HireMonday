import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Edit2, Search, Building2, Calendar } from 'lucide-react';
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
    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] mb-2 tracking-wide uppercase">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 font-light text-sm">{subtitle}</p>}
  </motion.div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full sm:w-80 mb-2">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
    <Input
      type="text"
      placeholder="Search companies..."
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 w-full admin-glass-input rounded-xl text-sm"
    />
  </div>
);

const CompanyRow = ({ company, index, onEdit }) => (
  <motion.tr
    key={company._id}
    variants={itemVariants}
    className="admin-table-row"
  >
    <td className="px-6 py-4">
      <Avatar className="w-10 h-10 border border-[#d4af37]/30 shadow-lg rounded-full overflow-hidden bg-black/40">
        <AvatarImage src={company.logo} className="object-cover w-full h-full" />
      </Avatar>
    </td>
    <td className="px-6 py-4">
      <div>
        <div className="text-base font-semibold tracking-wide text-white">{company.name}</div>
        <div className="text-xs text-gray-400 font-light">{company.email || "No email registered"}</div>
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
        <PopoverContent className="w-40 admin-glass-popover p-1 border border-white/10 text-slate-200">
          <button
            onClick={() => onEdit(company._id)}
            className="flex items-center gap-2.5 px-3 py-2.5 w-full text-left admin-popover-item rounded-lg text-xs font-medium"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Company</span>
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
  const [filterCompany, setFilterCompany] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = companies.filter(company =>
        company?.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilterCompany(filtered);
    } else {
      setFilterCompany(companies);
    }
  };

  const handleEdit = (companyId) => {
    navigate(`/admin/companies/${companyId}`);
  };

  return (
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-black/20 border border-white/5 overflow-hidden"
      >
        {filterCompany.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white min-w-[500px]">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Logo</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Date Registered</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filterCompany.map((company, index) => (
                    <CompanyRow 
                      key={company._id} 
                      company={company} 
                      index={index} 
                      onEdit={handleEdit} 
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompaniesTable;
