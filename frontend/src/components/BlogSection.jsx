import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, TrendingUp, Cpu } from 'lucide-react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import './BlogSection.css';

const BlogSection = () => {
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  return (
    <>
      {!isOnHomePage && <Navbar />}
      <div className={!isOnHomePage ? 'blog-page relative' : 'relative'}>
        {/* Decorative Background Flares */}
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <section className="blog-section relative overflow-hidden z-10">
          <div className="blog-container">
            <motion.div 
              className="blog-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-semibold border border-indigo-500/20">
                <BookOpen size={16} />
                <span>Knowledge Hub</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight">Latest from Our Blog</h2>
              <p className="text-lg">Discover insights, tips, and industry news to help you succeed in your professional journey.</p>
            </motion.div>

            <div className="blog-grid">
              {/* Blog Card 1 */}
              <motion.article 
                className="blog-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Career Development" 
                    className="blog-card-image transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                </div>
                <div className="blog-card-content relative">
                  <div className="blog-card-meta mb-3 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20"><BookOpen size={14}/> Career Development</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-indigo-400" /> 5 min read</span>
                  </div>
                  <h3 className="blog-card-title text-xl mb-3 group-hover:text-indigo-400 transition-colors duration-300">10 Tips for Career Advancement in 2026</h3>
                  <p className="blog-card-excerpt text-gray-400 mb-4 line-clamp-3">
                    Learn the essential strategies to accelerate your career growth and achieve your professional goals in the modern landscape.
                  </p>
                  <Link to="/blog/career-tips" className="blog-card-link inline-flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>

              {/* Blog Card 2 */}
              <motion.article 
                className="blog-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Industry Trends" 
                    className="blog-card-image transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                </div>
                <div className="blog-card-content relative">
                  <div className="blog-card-meta mb-3 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"><TrendingUp size={14}/> Industry Trends</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-blue-400" /> 7 min read</span>
                  </div>
                  <h3 className="blog-card-title text-xl mb-3 group-hover:text-blue-400 transition-colors duration-300">Emerging Job Market Trends</h3>
                  <p className="blog-card-excerpt text-gray-400 mb-4 line-clamp-3">
                    Stay ahead of the curve with our analysis of the latest job market trends, salaries, and remote work opportunities.
                  </p>
                  <Link to="/blog/market-trends" className="blog-card-link inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>

              {/* Blog Card 3 */}
              <motion.article 
                className="blog-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Professional Skills" 
                    className="blog-card-image transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                </div>
                <div className="blog-card-content relative">
                  <div className="blog-card-meta mb-3 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20"><Cpu size={14}/> Tech Skills</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-purple-400" /> 6 min read</span>
                  </div>
                  <h3 className="blog-card-title text-xl mb-3 group-hover:text-purple-400 transition-colors duration-300">Essential Skills for the Digital Age</h3>
                  <p className="blog-card-excerpt text-gray-400 mb-4 line-clamp-3">
                    Discover the must-have skills that will help you thrive in today's digital workplace and secure better opportunities.
                  </p>
                  <Link to="/blog/digital-skills" className="blog-card-link inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            </div>

            <motion.div 
              className="blog-cta mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium rounded-full shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-1">
                Explore Full Blog <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      {!isOnHomePage && <Footer />}
    </>
  );
};

export default BlogSection; 