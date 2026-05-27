import { Button } from './ui/button';
import { Bookmark, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job, index }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    // Enhanced animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95,
            filter: "blur(10px)"
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: index * 0.1 + 0.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="premium-job-card p-6 rounded-2xl cursor-pointer group flex flex-col h-full w-full justify-between"
        >
            {/* Enhanced gradient background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Modern decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#d4af37]/3 via-transparent to-transparent rounded-tl-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/3 via-transparent to-transparent rounded-br-full opacity-50 blur-xl"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                <div>
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-5">
                        <motion.p 
                            variants={badgeVariants}
                            className="text-xs font-light text-gray-400 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5"
                        >
                            {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                        </motion.p>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="ghost" className="text-gray-400 hover:text-[#d4af37] hover:bg-white/5 rounded-full transition-colors duration-300" size="icon">
                                <Bookmark size={18} />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Company Info Section */}
                    <motion.div 
                        variants={badgeVariants}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="p-1 border border-white/5 rounded-full bg-white/5 backdrop-blur-sm group-hover:border-[#d4af37]/25 transition-colors duration-300">
                            <Avatar className="w-12 h-12 ring-2 ring-white/5 group-hover:ring-[#d4af37]/15 transition-all duration-300">
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                        </div>
                        <div>
                            <h1 className="text-lg font-light text-gray-200 group-hover:text-[#d4af37] transition-all duration-300">{job?.company?.name}</h1>
                            <p className="text-sm text-gray-400 flex items-center mt-0.5">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-[#d4af37]" />
                                India
                            </p>
                        </div>
                    </motion.div>

                    {/* Job Details Section */}
                    <motion.div 
                        variants={badgeVariants}
                        className="mb-6"
                    >
                        <h1 className="text-xl font-light text-gray-200 group-hover:text-[#d4af37] mb-3 transition-colors duration-300">{job?.title}</h1>
                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed font-light">{job?.description}</p>
                    </motion.div>
                </div>

                <div>
                    {/* Badges Section */}
                    <motion.div 
                        variants={badgeVariants}
                        className="flex flex-wrap items-center gap-2 mb-6"
                    >
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
                    </motion.div>

                    {/* Action Buttons Section */}
                    <motion.div 
                        variants={badgeVariants}
                        className="flex gap-3"
                    >
                        <button
                            onClick={() => navigate(`/description/${job?._id}`)}
                            className="flex-1 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#aa771c] hover:to-[#8a5f14] text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all duration-300 border-none"
                        >
                            <span>Details</span>
                            <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-[#d4af37] font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border border-[#d4af37]/25"
                        >
                            Apply
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Job;
