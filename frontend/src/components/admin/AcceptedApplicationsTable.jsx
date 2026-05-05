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

const stripePromise = loadStripe('pk_test_51RIEIQCoNnfZ861nUFSGFYWW74jN8GYloqImcbXsty8Pu5gyNQDdVZRokFSEBwgBztHO0ArIdCt7aV3N5wJVxsv100xStBhOd0');

// Animation variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

// Reusable components
const PageHeader = ({ title, subtitle }) => (
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 tracking-wide font-sans">
      {title}
    </h2>
    {subtitle && <p className="text-gray-300 mt-2 font-medium">{subtitle}</p>}
  </motion.div>
);

const TableHeaderCell = ({ children, icon }) => (
  <TableHead className="px-4 py-3 text-indigo-700 font-semibold text-center whitespace-nowrap">
    <div className="flex items-center justify-center gap-2">
      {icon && icon}
      <span>{children}</span>
    </div>
  </TableHead>
);

const PaymentButton = ({ status, onClick }) => {
  if (status === 'Paid') {
    return (
      <div className="flex items-center justify-center gap-1 text-green-400">
        <CheckCircle size={16} />
        <span className="font-medium">Paid</span>
      </div>
    );
  }
  return (
    <button onClick={onClick} className="flex items-center justify-center gap-1 px-3 py-1 text-sm text-white transition bg-indigo-500 rounded-full shadow hover:bg-indigo-600 w-full border border-indigo-400/30">
      <CreditCard size={16} />
      <span>Pay Now</span>
    </button>
  );
};

const RatingSelector = ({ value, onChange, onSubmit }) => (
  <div className="flex items-center justify-center gap-2">
    <div className="relative">
      <select
        value={value || 0}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm"
      >
        <option value="0" disabled className="text-gray-900">Rate</option>
        {[1, 2, 3, 4, 5].map((score) => (
          <option key={score} value={score} className="text-gray-900">
            {score}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <Star size={16} className="text-indigo-400" />
      </div>
    </div>
    <button onClick={onSubmit} className="px-3 py-1 text-white transition bg-indigo-500 rounded-md hover:bg-indigo-600 font-medium border border-indigo-400/30">
      Submit
    </button>
  </div>
);

const FeedbackButton = ({ onClick }) => (
  <button className="flex items-center justify-center gap-1 px-3 py-1 text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700 w-full font-medium border border-indigo-500/30" onClick={onClick}>
    <MessageSquare size={16} />
    <span>Feedback</span>
  </button>
);

const FeedbackModal = ({ isOpen, onClose, feedback }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl text-white w-[90%] max-w-lg shadow-[0_0_40px_rgba(99,102,241,0.2)] border border-white/20 relative">
          <button onClick={onClose} className="absolute flex items-center justify-center w-8 h-8 text-2xl text-gray-400 transition-all rounded-full top-4 right-4 hover:bg-white/10 hover:text-white">
            <X size={20} />
          </button>
          <h3 className="flex items-center gap-2 mb-4 text-2xl font-semibold tracking-tight text-indigo-400">
            <MessageSquare size={24} />
            Feedback
          </h3>
          {feedback === 'No feedback provided' ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle size={48} className="mb-4 text-gray-500" />
              <p className="text-gray-400 font-medium">No feedback has been provided for this application.</p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base font-medium">{feedback}</p>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan="10" className="py-12 text-center border-b-0 hover:bg-transparent">
      <div className="flex flex-col items-center justify-center">
        <AlertCircle size={48} className="mb-4 text-gray-400" />
        <p className="text-xl font-medium text-gray-700">No accepted applicants yet</p>
        <p className="mt-2 text-sm text-gray-500">When you accept applications, they will appear here</p>
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

    const bgImage = 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8MHwwfHx8MA%3D%3D';

    return (
        <div className="min-h-screen flex flex-col font-[Inter] bg-black">
            <Navbar />
            <div className="flex-grow relative py-12">
                {/* Background Image with Overlay */}
                <div className="fixed inset-0 w-full h-full bg-center bg-cover z-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0"></div>

                {/* Decorative Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative z-10 px-6 py-8 mx-auto mt-6 text-white transition-all duration-500 bg-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/20 rounded-2xl max-w-7xl"
                >
                    <PageHeader 
                        title="🔥 Accepted Applicants" 
                        subtitle="Manage and review your accepted job applications"
                    />

                    <div className="relative mt-8">
                        {/* Subtle glow behind table */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-3xl blur-md opacity-30 z-0"></div>
                        <div className="relative z-10 overflow-x-auto border border-gray-200 shadow-xl rounded-xl bg-white/95 backdrop-blur-md">
                            <Table>
                                <TableCaption className="text-gray-500 font-medium mb-4 mt-2">List of all accepted candidates</TableCaption>
                                <TableHeader>
                                    <TableRow className="text-gray-700 bg-indigo-50/50 hover:bg-indigo-50/80 border-b border-gray-200">
                                        <TableHeaderCell icon={<User size={16} />}>Full Name</TableHeaderCell>
                                        <TableHeaderCell icon={<Mail size={16} />}>Email</TableHeaderCell>
                                        <TableHeaderCell icon={<Phone size={16} />}>Contact</TableHeaderCell>
                                        <TableHeaderCell icon={<FileText size={16} />}>ID-Proof</TableHeaderCell>
                                        <TableHeaderCell icon={<Calendar size={16} />}>Applied On</TableHeaderCell>
                                        <TableHeaderCell icon={<Building2 size={16} />}>Company</TableHeaderCell>
                                        <TableHeaderCell icon={<IndianRupee size={16} />}>Charge</TableHeaderCell>
                                        <TableHeaderCell icon={<CreditCard size={16} />}>Payment</TableHeaderCell>
                                        <TableHeaderCell icon={<Star size={16} />}>Rating</TableHeaderCell>
                                        <TableHeaderCell icon={<MessageSquare size={16} />}>Feedback</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100">
                                    {accepted.length === 0 ? (
                                        <EmptyState />
                                    ) : (
                                        accepted.map((item, index) => (
                                            <motion.tr
                                                key={item._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="transition-all duration-300 hover:bg-gray-50/80 border-b border-gray-100"
                                            >
                                                <TableCell className="px-4 py-3 text-center font-medium text-gray-900">{item?.applicant?.fullname}</TableCell>
                                                <TableCell className="px-4 py-3 text-center font-medium text-gray-600">{item?.applicant?.email}</TableCell>
                                                <TableCell className="px-4 py-3 text-center font-medium text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                                                <TableCell className="px-4 py-3 text-center">
                                                    {item?.applicant?.profile?.resume ? (
                                                        <a
                                                            className="flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                                                            href={item?.applicant?.profile?.resume}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <FileText size={16} />
                                                            <span>{item?.applicant?.profile?.resumeOriginalName}</span>
                                                        </a>
                                                    ) : (
                                                        <span className="font-medium text-gray-400">NA</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-center font-medium text-gray-600">{item?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="px-4 py-3 text-center font-medium text-gray-900">{item?.job?.company?.name || 'N/A'}</TableCell>
                                                <TableCell className="px-4 py-3 text-center">
                                                    {item?.job?.salary ? (
                                                        <div className="flex items-center justify-center gap-1 text-gray-900">
                                                            <IndianRupee size={16} className="text-indigo-600" />
                                                            <span className="font-medium">{item?.job?.salary.toLocaleString()}</span>
                                                        </div>
                                                    ) : <span className="font-medium text-gray-400">N/A</span>}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <PaymentButton status={item.paymentStatus} onClick={() => handlePayment(item._id)} />
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <RatingSelector value={rating[item._id]} onChange={(value) => handleRatingChange(item._id, value)} onSubmit={() => submitRating(item._id)} />
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <FeedbackButton onClick={() => openFeedbackModal(item.feedback || 'No feedback provided')} />
                                                </TableCell>
                                            </motion.tr>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <FeedbackModal isOpen={isModalOpen} onClose={closeModal} feedback={selectedFeedback} />
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AcceptedApplicants;
