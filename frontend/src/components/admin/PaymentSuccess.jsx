import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Check, ShieldCheck, Calendar, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../admin/CompanySetup.css';

const PaymentSuccess = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const res = await axios.put(`${APPLICATION_API_END_POINT}/applications/mark-paid/${applicationId}`);
        if (res.data.success) {
          toast.success("Payment successful and status updated!");
        }
      } catch (err) {
        toast.error("Failed to update payment status.");
      }
    };

    if (applicationId) {
      updatePaymentStatus();
    }
  }, [applicationId]);

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

      <div className="flex-grow flex items-center justify-center py-16 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg p-8 sm:p-10 rounded-2xl border border-white/10 admin-glass-card shadow-2xl text-center relative"
        >
          {/* Sparkly Accents */}
          <div className="absolute top-6 right-6 text-[#d4af37]/40 animate-pulse">
            <Sparkles size={20} />
          </div>

          {/* Success Check Shield */}
          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0.8, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.15 }}
              className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            >
              <ShieldCheck size={32} />
            </motion.div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] uppercase tracking-wider mb-2 font-sans">
            Payment Completed
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xs mx-auto leading-relaxed">
            Your transaction has been processed successfully. Candidate status has been updated in real-time.
          </p>

          {/* Receipt Info Panel */}
          <div className="mt-8 p-5 rounded-xl border border-white/5 bg-black/25 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-3xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Invoice Date</span>
              <span className="text-xs text-white font-mono flex items-center gap-1">
                <Calendar size={12} className="text-[#d4af37]" />
                <span>{new Date().toLocaleDateString()}</span>
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-3xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Reference ID</span>
              <span className="text-xs text-white font-mono flex items-center gap-1 truncate max-w-[200px]">
                <FileText size={12} className="text-gray-400" />
                <span>{applicationId}</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xs font-semibold text-gray-500 uppercase tracking-widest font-mono">Status</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/25 text-green-400 text-3xs font-semibold uppercase tracking-wider font-mono">
                Approved & Paid
              </span>
            </div>
          </div>

          {/* Back Action Trigger */}
          <div className="mt-8 pt-2">
            <button
              onClick={() => navigate('/admin/jobs/accepted')}
              className="admin-gold-btn w-full py-4 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
            >
              <span>Back to Accepted Directory</span>
              <ArrowRight size={14} className="text-black" />
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
   </div>
  );
};

export default PaymentSuccess;
