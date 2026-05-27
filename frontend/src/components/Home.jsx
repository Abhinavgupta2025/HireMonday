import { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudentsList from './StudentsList'
import "./home.css"
import Chatbot from './Chatbot'
import SuccessStories from './SuccessStories'
import BlogSection from './BlogSection'
import Contact from './Contact'
import Navbar from './shared/Navbar'
import { motion } from 'framer-motion'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090a0c]">
      {/* Premium Ambient Background morphing light leaks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Amber/Gold Blob */}
        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#d4af37]/4 to-[#aa771c]/1 rounded-full blur-[100px] sm:blur-[130px]"
        />

        {/* Indigo/Violet Blob */}
        <motion.div
          animate={{
            x: [0, -100, 70, 0],
            y: [0, 50, -80, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-[15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-indigo-500/3 to-purple-500/1 rounded-full blur-[120px] sm:blur-[150px]"
        />

        {/* Silver/White Blob */}
        <motion.div
          animate={{
            x: [0, 40, -50, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.1, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-[5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-white/2 to-transparent rounded-full blur-[80px] sm:blur-[100px]"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className='homeDiv bg-transparent'>
          <HeroSection />
          <Chatbot />

          {/* Staggered Apple-style Viewport Reveals */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CategoryCarousel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <StudentsList />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SuccessStories />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <BlogSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <LatestJobs />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Contact />
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Home