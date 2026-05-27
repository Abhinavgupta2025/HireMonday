import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Clock, Shield } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import './AboutUs.css';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "With over 15 years in the construction industry, Sarah founded Hire Smart to revolutionize how homeowners connect with skilled professionals."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Michael brings his tech expertise to ensure Hire Smart's platform is cutting-edge and user-friendly."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      bio: "Emily oversees the day-to-day operations, ensuring smooth service delivery and customer satisfaction."
    },
    {
      name: "David Kim",
      role: "Head of Marketing",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "David leads our marketing efforts to connect with homeowners and professionals across the country."
    }
  ];

  // Values data
  const values = [
    {
      icon: <Users size={28} className="text-[#d4af37]" />,
      title: "Community First",
      description: "We believe in building a strong community of trusted professionals and satisfied homeowners."
    },
    {
      icon: <Target size={28} className="text-[#d4af37]" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from platform design to customer support."
    },
    {
      icon: <Award size={28} className="text-[#d4af37]" />,
      title: "Quality",
      description: "We maintain high standards for all professionals on our platform to ensure top-notch service."
    },
    {
      icon: <Heart size={28} className="text-[#d4af37]" />,
      title: "Integrity",
      description: "We operate with transparency and honesty in all our business dealings."
    },
    {
      icon: <Clock size={28} className="text-[#d4af37]" />,
      title: "Efficiency",
      description: "We value your time and work to make the hiring process as quick and easy as possible."
    },
    {
      icon: <Shield size={28} className="text-[#d4af37]" />,
      title: "Trust",
      description: "We build trust through verified reviews, background checks, and secure payment systems."
    }
  ];

  return (
    <div className="about-us-page min-h-screen relative overflow-hidden bg-[#090a0c]">
      <Navbar />

      {/* Premium Ambient Background morphing light leaks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Amber/Gold Blob */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[8%] w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/5 to-[#aa771c]/1 rounded-full blur-[110px]"
        />

        {/* Indigo/Violet Blob */}
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 35, -25, 0],
            scale: [1, 0.96, 1.04, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[25%] right-[8%] w-[420px] h-[420px] bg-indigo-500/2 rounded-full blur-[130px]"
        />

        {/* Silver/White Blob */}
        <motion.div
          animate={{
            x: [0, 20, -20, 0],
            y: [0, 20, -20, 0],
            scale: [1, 1.04, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[55%] left-[45%] w-[280px] h-[280px] bg-white/2 rounded-full blur-[90px]"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="about-hero flex items-center justify-center min-h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#090a0c]/20 via-[#090a0c]/80 to-[#090a0c] z-0" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              className="about-title text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] tracking-wider mb-4"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              About Hire Smart
            </motion.h1>
            <motion.p 
              className="about-subtitle text-xs sm:text-sm md:text-base text-gray-400 font-light tracking-[0.25em] max-w-2xl mx-auto uppercase"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Connecting homeowners with skilled professionals since 2020
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section py-20">
          <div className="container">
            <motion.div 
              className="mission-content flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="mission-text flex-1" variants={itemVariants}>
                <h2 className="text-3xl font-semibold text-white mb-6 tracking-wide">Our Mission</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                  At Hire Smart, our mission is to simplify the process of finding reliable home improvement and maintenance professionals. 
                  We believe that everyone deserves access to quality home services without the hassle of endless searching and uncertainty.
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  By creating a trusted platform that connects homeowners with verified professionals, we're transforming the way people 
                  approach home projects, big and small.
                </p>
              </motion.div>
              <motion.div className="mission-image flex-1 w-full max-w-xl" variants={itemVariants}>
                <div className="relative rounded-2xl overflow-hidden premium-job-card p-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/15 to-transparent pointer-events-none z-10 rounded-2xl" />
                  <img 
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-auto rounded-xl object-cover hover:scale-105 transition-transform duration-700 ease-in-out relative z-0"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section py-20">
          <div className="container">
            <motion.h2 
              className="section-title text-3xl font-semibold text-center text-white mb-16 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>
            <motion.div 
              className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="value-card premium-job-card p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300"
                  variants={itemVariants}
                >
                  <div className="value-icon text-[#d4af37] bg-[#d4af37]/5 p-4 rounded-full border border-[#d4af37]/15 mb-6 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">{value.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section py-20">
          <div className="container">
            <motion.h2 
              className="section-title text-3xl font-semibold text-center text-white mb-16 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <motion.div 
              className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="team-card premium-job-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
                  variants={itemVariants}
                >
                  <div className="team-image-container relative aspect-square overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="team-info p-6 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1 tracking-wide">{member.name}</h3>
                      <p className="team-role text-xs text-[#d4af37] font-semibold tracking-widest uppercase mb-4">{member.role}</p>
                    </div>
                    <p className="team-bio text-gray-400 text-xs md:text-sm leading-relaxed mt-2">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section py-16">
          <div className="container">
            <motion.div 
              className="stats-grid-container grid grid-cols-2 lg:grid-cols-4 gap-8 p-10 rounded-3xl premium-job-card text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="stat-card" variants={itemVariants}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#d4af37] tracking-wider mb-2 font-mono">10,000+</h3>
                <p className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-light">Verified Professionals</p>
              </motion.div>
              <motion.div className="stat-card" variants={itemVariants}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#d4af37] tracking-wider mb-2 font-mono">50,000+</h3>
                <p className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-light">Completed Projects</p>
              </motion.div>
              <motion.div className="stat-card" variants={itemVariants}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#d4af37] tracking-wider mb-2 font-mono">4.8/5</h3>
                <p className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-light">Average Rating</p>
              </motion.div>
              <motion.div className="stat-card" variants={itemVariants}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#d4af37] tracking-wider mb-2 font-mono">100+</h3>
                <p className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-light">Cities Served</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta-section py-20 border-t border-white/5">
          <div className="container">
            <motion.div 
              className="about-cta-content max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-wide">Ready to get started?</h2>
              <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of homeowners who trust Hire Smart for their home improvement needs.
              </p>
              <div className="about-cta-buttons flex flex-col sm:flex-row justify-center items-center gap-6">
                <button className="px-8 py-3 rounded-xl font-semibold text-sm tracking-wider uppercase bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/10 transition-all duration-300 hover:-translate-y-0.5">
                  Find a Professional
                </button>
                <button className="px-8 py-3 rounded-xl font-semibold text-sm tracking-wider uppercase bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/25 hover:border-[#d4af37]/45 transition-all duration-300 hover:-translate-y-0.5">
                  Join as a Professional
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;