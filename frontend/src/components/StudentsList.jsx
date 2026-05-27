import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { FaUserTie, FaPhoneAlt, FaUserGraduate, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Sparkles, Star, MapPin, Calendar } from "lucide-react";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Student Card Component
const StudentCard = ({ student }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="premium-job-card rounded-2xl overflow-hidden group cursor-pointer w-full"
    >
      {/* Profile Image with Overlay */}
      <div className="relative h-40 overflow-hidden">
        <div
          className="w-full h-full bg-center bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${student.profile?.profilePhoto || "https://via.placeholder.com/150"})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c]/90 via-[#090a0c]/20 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-black bg-[#d4af37] rounded-full shadow-md">
          <Star size={12} fill="currentColor" />
          <span>4.8</span>
        </div>
        
        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 text-xs font-light text-gray-300 bg-black/60 backdrop-blur-sm rounded-full border border-white/5">
          <MapPin size={12} className="text-[#d4af37]" />
          <span>Available Now</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-5 space-y-4">
        {/* Name and Title */}
        <div>
          <h3 className="text-xl font-light text-gray-200 group-hover:text-[#d4af37] transition-colors duration-300">
            {student.fullname}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="premium-card-badge-gold">
              <FaUserGraduate className="mr-1" size={10} /> {student.profile?.skills?.[0] || "Student"}
            </span>
            <span className="premium-card-badge-silver">
              <Calendar className="mr-1" size={10} /> 2+ years
            </span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-3 text-sm text-gray-400 bg-white/5 rounded-xl border border-white/5">
          <p className="line-clamp-2 font-light">{student.profile?.bio || "Dream big. Hustle harder. 🚀"}</p>
        </div>

        {/* Contact and Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#aa771c] hover:to-[#8a5f14] rounded-xl shadow-lg shadow-amber-500/10 border-none">
            <FaPhoneAlt size={12} /> {student.phoneNumber || "Contact"}
          </button>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-light text-[#d4af37] border border-[#d4af37]/25 rounded-xl hover:bg-[#d4af37]/10 transition-all duration-300 bg-white/5">
            <FaCheckCircle size={12} /> View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-light text-[#d4af37] bg-[#d4af37]/10 rounded-full border border-[#d4af37]/20">
        <Sparkles size={16} />
        <span>Top Rated Workers</span>
      </div>
      <h2 className="text-4xl md:text-5xl text-gray-300 font-light tracking-wide mb-6">
        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#d4af37] font-normal">Expert Workers</span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400 font-light">
        Discover skilled professionals ready to help with your projects
      </p>
    </motion.div>
  );
};

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/students`, { withCredentials: true });
        setStudents(res.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <section className="w-full px-4 py-20 mx-auto bg-[#090a0c] sm:px-6 lg:px-8">
      <div className="px-4 mx-auto max-w-7xl">
        <SectionHeader />

        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {students.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </motion.div>
        
        {students.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 mb-4 text-[#d4af37] bg-[#d4af37]/10 rounded-full">
              <FaUserTie size={32} />
            </div>
            <h3 className="mb-2 text-xl font-light text-gray-300">No Workers Available</h3>
            <p className="text-gray-500">Check back later for new worker profiles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsList;
