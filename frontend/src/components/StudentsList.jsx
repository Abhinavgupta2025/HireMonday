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
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(99, 102, 241, 0.5)"
      }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl group dark:bg-gray-900 dark:border-gray-800"
    >
      {/* Profile Image with Overlay */}
      <div className="relative h-40 overflow-hidden">
        <div
          className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${student.profile?.profilePhoto || "https://via.placeholder.com/150"})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full">
          <Star size={12} fill="currentColor" />
          <span>4.8</span>
        </div>
        
        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
          <MapPin size={12} />
          <span>Available Now</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-5 space-y-4">
        {/* Name and Title */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400">
            {student.fullname}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 px-2 py-0.5 text-xs text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
              <FaUserGraduate size={12} /> {student.profile?.skills?.[0] || "Student"}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
              <Calendar size={12} /> 2+ years
            </span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-3 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
          <p className="line-clamp-2">{student.profile?.bio || "Dream big. Hustle harder. 🚀"}</p>
        </div>

        {/* Contact and Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg hover:from-indigo-600 hover:to-blue-700 hover:shadow-lg hover:shadow-indigo-500/25">
            <FaPhoneAlt size={14} /> {student.phoneNumber || "Contact"}
          </button>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 transition-all duration-300 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:text-indigo-400">
            <FaCheckCircle size={14} /> View Profile
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
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100/80 rounded-full dark:bg-indigo-900/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
        <Sparkles size={16} />
        <span>Top Rated Workers</span>
      </div>
      <h2 className="text-4xl font-bold tracking-tight text-gray-800 md:text-5xl dark:text-gray-100">
        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Expert Workers</span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
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
    <section className="w-full px-4 py-20 mx-auto bg-gradient-to-b from-gray-50 to-white sm:px-6 lg:px-8 dark:from-gray-950 dark:to-gray-900">
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
            <div className="p-4 mb-4 text-indigo-500 bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              <FaUserTie size={32} />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">No Workers Available</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new worker profiles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsList;
