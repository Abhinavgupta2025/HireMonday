import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';
import Footer from '../shared/Footer';
import { 
  User, Mail, Phone, FileText, Calendar, Building2, 
  IndianRupee, CreditCard, Star, MessageSquare, X, 
  CheckCircle, AlertCircle 
} from 'lucide-react';
import Navbar from '../shared/Navbar';
import './CompanySetup.css';

const stripePromise = loadStripe('pk_test_51RIEIQCoNnfZ861nUFSGFYWW74jN8GYloqImcbXsty8Pu5gyNQDdVZRokFSEBwgBztHO0ArIdCt7aV3N5wJVxsv100xStBhOd0');

// Animation variants
const containerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 } 
  } 
};

const itemVariants = { 
  hidden: { y: 15, opacity: 0 }, 
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 150, damping: 18 } 
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
  <TableHead className="px-4 py-3 text-gray-300 font-semibold text-center whitespace-nowrap border-b border-white/5">
    <div className="flex items-center justify-center gap-2">
      {icon && <span className="text-[#d4af37]">{icon}</span>}
      <span>{children}</span>
    </div>
  </TableHead>
);

const PaymentButton = ({ status, onClick }) => {
  if (status === 'Paid') {
    return (
      <div className="flex items-center justify-center gap-1.5 text-green-400 font-semibold text-xs py-2 bg-green-500/10 border border-green-500/25 rounded-lg px-3">
        <CheckCircle size={13} />
        <span className="font-mono uppercase tracking-wide">Paid</span>
      </div>
    );
  }
  return (
    <button 
      onClick={onClick} 
      className="admin-gold-btn py-2 text-3xs sm:text-2xs px-3 rounded-lg flex items-center justify-center gap-1.5 w-full"
    >
      <CreditCard size={13} className="text-black" />
      <span className="text-black">Pay Now</span>
    </button>
  );
};

const RatingSelector = ({ value, onChange, onSubmit }) => (
  <div className="flex items-center justify-center gap-2 min-w-[130px]">
    <div className="relative flex-1">
      <select
        value={value || 0}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pr-8 text-white bg-black/40 border border-white/10 rounded-lg appearance-none focus:outline-none focus:border-[#d4af37]/35 font-medium text-xs shadow-inner"
      >
        <option value="0" disabled className="bg-[#111317] text-gray-500">Rate</option>
        {[1, 2, 3, 4, 5].map((score) => (
          <option key={score} value={score} className="bg-[#111317] text-white">
            {score}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <Star size={13} className="text-[#d4af37]" />
      </div>
    </div>
    <button 
      onClick={onSubmit} 
      className="admin-silver-btn px-2.5 py-2 text-2xs rounded-lg font-bold"
    >
      Go
    </button>
  </div>
);

const FeedbackButton = ({ onClick }) => (
  <button 
    className="admin-silver-btn py-2 text-2xs px-3 rounded-lg flex items-center justify-center gap-1.5 w-full" 
    onClick={onClick}
  >
    <MessageSquare size={13} />
    <span>Review</span>
  </button>
);

const FeedbackModal = ({ isOpen, onClose, feedback }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      >
        <motion.div 
          initial={{ y: -30, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          exit={{ y: 30, opacity: 0, scale: 0.95 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} 
          className="admin-glass-card p-8 rounded-2xl text-white w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 relative"
        >
          <button 
            onClick={onClose} 
            className="absolute flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-all rounded-full top-4 right-4 hover:bg-white/5"
          >
            <X size={18} />
          </button>
          <h3 className="flex items-center gap-2.5 mb-4 text-xl font-bold tracking-wider text-[#d4af37] uppercase">
            <MessageSquare size={20} className="text-[#d4af37]" />
            Application Feedback
          </h3>
          <div className="mt-6 border-t border-white/5 pt-4">
            {feedback === 'No feedback provided' ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle size={40} className="mb-3 text-gray-500" />
                <p className="text-gray-400 font-light text-sm">No feedback has been recorded for this application.</p>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-gray-300 font-light italic">"{feedback}"</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan="10" className="py-16 text-center border-b-0">
      <div className="flex flex-col items-center justify-center">
        <AlertCircle size={48} className="mb-4 text-gray-500" />
        <p className="text-lg font-semibold text-white">No accepted candidates yet</p>
        <p className="mt-1 text-xs text-gray-400 font-light max-w-sm mx-auto">When applicants are accepted, their profiles will populate in this executive directory.</p>
      </div>
    </TableCell>
  </TableRow>
);

const AcceptedApplicants = () => {
    const [accepted, setAccepted] = useState([]);
    const [rating, setRating] = useState({});  
    const [selectedFeedback, setSelectedFeedback] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchAccepted = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${APPLICATION_API_END_POINT}/applications/accepted`);
                if (res.data.success) {
                    setAccepted(res.data.applications);
                }
            } catch (err) {
                console.error(err.response?.data?.message || "Error fetching accepted applicants");
            }
        };
        fetchAccepted();
    }, []);

    const handlePayment = async (applicationId) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/create-checkout-session/${applicationId}`);
            if (res.data && res.data.success && res.data.url) {
                window.location.href = res.data.url; 
            } else {
                toast.error("Unable to initiate payment.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong with the payment.");
        }
    };

    const handleRatingChange = (applicationId, score) => {
        setRating(prevState => ({ ...prevState, [applicationId]: score }));
    };

    const submitRating = async (applicationId) => {
        const score = rating[applicationId];
        if (!score || score < 1 || score > 5) {
            toast.error('Rating must be between 1 and 5');
            return;
        }
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/rate/${applicationId}`, {
                score, review: ''
            });
            if (res.data.success) {
                toast.success('Rating submitted successfully');
            } else {
                toast.error('Failed to submit rating');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error submitting rating');
        }
    };

    const openFeedbackModal = (feedback) => {
        setSelectedFeedback(feedback);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFeedback(null);
    };

    return (
        <div className="min-h-screen flex flex-col font-[Inter] bg-[#090a0c] text-white relative overflow-hidden">
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

            <div className="flex-grow relative z-10 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="px-6 py-8 mx-auto mt-10 admin-glass-card border border-white/10 rounded-2xl max-w-7xl"
                >
                    <PageHeader 
                        title="Accepted Applicants" 
                        subtitle="Review profiles, manage payments, and provide feedback for accepted candidates"
                    />

                    <div className="relative mt-8 overflow-x-auto border border-white/5 rounded-xl bg-black/20">
                        <Table className="text-white min-w-[1000px]">
                            <TableCaption className="text-gray-400 font-light text-xs mb-3 mt-2">List of all accepted candidates</TableCaption>
                            <TableHeader>
                                <TableRow className="bg-white/5 hover:bg-white/5 border-b border-white/5">
                                    <TableHeaderCell icon={<User size={14} />}>Full Name</TableHeaderCell>
                                    <TableHeaderCell icon={<Mail size={14} />}>Email</TableHeaderCell>
                                    <TableHeaderCell icon={<Phone size={14} />}>Contact</TableHeaderCell>
                                    <TableHeaderCell icon={<FileText size={14} />}>ID-Proof</TableHeaderCell>
                                    <TableHeaderCell icon={<Calendar size={14} />}>Applied On</TableHeaderCell>
                                    <TableHeaderCell icon={<Building2 size={14} />}>Company</TableHeaderCell>
                                    <TableHeaderCell icon={<IndianRupee size={14} />}>Charge</TableHeaderCell>
                                    <TableHeaderCell icon={<CreditCard size={14} />}>Payment</TableHeaderCell>
                                    <TableHeaderCell icon={<Star size={14} />}>Rating</TableHeaderCell>
                                    <TableHeaderCell icon={<MessageSquare size={14} />}>Feedback</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-white/5">
                                {accepted.length === 0 ? (
                                    <EmptyState />
                                ) : (
                                    accepted.map((item, index) => (
                                        <motion.tr
                                            key={item._id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            className="admin-table-row"
                                        >
                                            <TableCell className="px-4 py-4 text-center font-bold text-white">{item?.applicant?.fullname}</TableCell>
                                            <TableCell className="px-4 py-4 text-center font-light text-gray-300 text-xs">{item?.applicant?.email}</TableCell>
                                            <TableCell className="px-4 py-4 text-center font-mono text-xs text-gray-300">{item?.applicant?.phoneNumber}</TableCell>
                                            <TableCell className="px-4 py-4 text-center">
                                                {item?.applicant?.profile?.resume ? (
                                                    <a
                                                        className="inline-flex items-center justify-center gap-1.5 text-[#d4af37] hover:text-[#fbbf24] hover:underline font-medium text-xs transition-colors duration-200"
                                                        href={item?.applicant?.profile?.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FileText size={13} />
                                                        <span className="truncate max-w-[120px]">{item?.applicant?.profile?.resumeOriginalName || "Download ID-Proof"}</span>
                                                    </a>
                                                ) : (
                                                    <span className="font-light text-xs text-gray-500">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-center font-mono text-xs text-gray-300">{item?.createdAt ? item?.createdAt.split("T")[0] : "N/A"}</TableCell>
                                            <TableCell className="px-4 py-4 text-center font-semibold text-[#d4af37] text-xs uppercase tracking-wider">{item?.job?.company?.name || 'N/A'}</TableCell>
                                            <TableCell className="px-4 py-4 text-center">
                                                {item?.job?.salary ? (
                                                    <div className="flex items-center justify-center gap-0.5 text-white font-mono text-xs">
                                                        <IndianRupee size={12} className="text-[#d4af37]" />
                                                        <span className="font-bold">{item?.job?.salary.toLocaleString()}</span>
                                                    </div>
                                                ) : <span className="font-light text-xs text-gray-500">N/A</span>}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <PaymentButton status={item.paymentStatus} onClick={() => handlePayment(item._id)} />
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <RatingSelector value={rating[item._id]} onChange={(value) => handleRatingChange(item._id, value)} onSubmit={() => submitRating(item._id)} />
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <FeedbackButton onClick={() => openFeedbackModal(item.feedback || 'No feedback provided')} />
                                            </TableCell>
                                        </motion.tr>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <FeedbackModal isOpen={isModalOpen} onClose={closeModal} feedback={selectedFeedback} />
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AcceptedApplicants;
