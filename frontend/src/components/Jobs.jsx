import { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from './shared/Footer'
import { SlidersHorizontal } from 'lucide-react'
import Navbar from './shared/Navbar'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#090a0c] relative overflow-hidden"
        >
            <Navbar />

            {/* Premium Ambient Background morphing light leaks */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Amber/Gold Blob */}
                <motion.div
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -60, 40, 0],
                        scale: [1, 1.12, 0.95, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-[15%] w-[400px] h-[400px] bg-gradient-to-tr from-[#d4af37]/4 to-[#aa771c]/1 rounded-full blur-[120px]"
                />

                {/* Indigo/Violet Blob */}
                <motion.div
                    animate={{
                        x: [0, -80, 50, 0],
                        y: [0, 40, -60, 0],
                        scale: [1, 0.95, 1.12, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/3 to-purple-500/1 rounded-full blur-[140px]"
                />
            </div>

            <div className='px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8 relative z-10'>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-light text-gray-200 tracking-wide">Available Jobs</h1>
                        <button 
                            onClick={toggleFilter}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl shadow-md hover:bg-white/10 text-gray-300 hover:text-white transition-all hover:border-[#d4af37]/40"
                        >
                            <SlidersHorizontal className="h-5 w-5 text-[#d4af37]" />
                            <span className="font-medium text-sm tracking-wider uppercase">Filter</span>
                        </button>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-8'>
                        <AnimatePresence>
                            {isFilterVisible && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className='md:w-1/4 relative z-50'
                                >
                                    <FilterCard isVisible={isFilterVisible} onClose={toggleFilter} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <div className={`flex-grow ${isFilterVisible ? 'md:w-3/4' : 'w-full'}`}>
                            {filterJobs.length <= 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-20 text-center"
                                >
                                    <div className="inline-block p-6 rounded-full bg-white/5 border border-white/5 mb-4 text-[#d4af37]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-light text-gray-300">No jobs found</h3>
                                    <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters</p>
                                </motion.div>
                            ) : (
                                <div className='h-[88vh] overflow-y-auto pb-24 pr-2 scrollbar-none'>
                                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr'>
                                        {filterJobs.map((job, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                key={job?._id}
                                                className="h-full flex"
                                            >
                                                <div className="w-full">
                                                    <Job job={job} index={index} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    )
}

export default Jobs
