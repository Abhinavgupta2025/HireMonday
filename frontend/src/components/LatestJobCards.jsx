import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
      className="relative p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-800 shadow-lg rounded-xl backdrop-blur-md overflow-hidden hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-900/20 to-transparent rounded-tl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-br-full opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.p 
            variants={badgeVariants}
            className="text-xs font-medium text-gray-400 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700"
          >
            {new Date(job?.createdAt).toLocaleDateString()}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" className="text-gray-400 hover:text-indigo-400 hover:bg-gray-800/80 rounded-full" size="icon">
              <Bookmark size={18} />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={badgeVariants}
          className="mb-5"
        >
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">{job?.title}</h1>
          <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">{job?.description}</p>
        </motion.div>

        <motion.div 
          variants={badgeVariants}
          className="flex flex-wrap items-center gap-2"
        >
          <Badge className="text-xs font-medium text-indigo-400 border border-indigo-900/50 bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1" variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {job?.position} days
          </Badge>
          <Badge className="text-xs font-medium text-pink-400 border border-pink-900/50 bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1" variant="outline">
            {job?.jobType}
          </Badge>
          <Badge className="text-xs font-medium text-blue-400 border border-blue-900/50 bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1" variant="outline">
            <IndianRupee className="w-3 h-3 mr-1" />
            {job?.salary}/hr
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
