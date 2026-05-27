import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const LatestJobCards = ({ job, index }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (user) {
      navigate(`/description/${job._id}`);
    } else {
      navigate('/login');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleCardClick}
      className="premium-job-card p-6 rounded-2xl cursor-pointer group"
    >
      {/* Animated gradient background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-tl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-br-full opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.p 
            variants={badgeVariants}
            className="text-xs font-light text-gray-400 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-xl border border-white/5"
          >
            {new Date(job?.createdAt).toLocaleDateString()}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" className="text-gray-400 hover:text-[#d4af37] hover:bg-white/5 rounded-xl" size="icon">
              <Bookmark size={18} />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={badgeVariants}
          className="mb-5"
        >
          <h1 className="text-xl font-light text-gray-200 group-hover:text-[#d4af37] mb-2 transition-colors duration-300">{job?.title}</h1>
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed font-light">{job?.description}</p>
        </motion.div>

        {/* Dynamic sliding footer panel */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 transition-all duration-300 relative min-h-[44px]">
          {/* Default state shows tags */}
          <div className="flex flex-wrap items-center gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 pointer-events-none group-hover:absolute">
            <span className="premium-card-badge-gold">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {job?.position} days
            </span>
            <span className="premium-card-badge-silver">
              {job?.jobType}
            </span>
            <span className="premium-card-badge-gold">
              <IndianRupee className="w-3 h-3 mr-0.5" />
              {job?.salary}/hr
            </span>
          </div>

          {/* Hover state slides in the golden view specs CTA */}
          <div className="w-full opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center">
            <button className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#aa771c] hover:to-[#8a5f14] text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all duration-300 border-none">
              View Specifications
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
