import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Star, MapPin, Calendar, Award, FileText } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import './admin/CompanySetup.css'

// Profile Header Component
const ProfileHeader = ({ user, setOpen }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl admin-glass-card p-8 border border-white/10 shadow-2xl"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/3 to-transparent pointer-events-none z-0" />
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 z-10 text-center md:text-left">
                <div className="relative">
                    <Avatar className="h-32 w-32 border border-[#d4af37]/30 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#d4af37]/60 rounded-full overflow-hidden bg-black/40">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" className="object-cover w-full h-full" />
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-[#d4af37] to-[#fbbf24] rounded-full text-black shadow-lg border border-black/80">
                        <Star size={16} fill="currentColor" />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-wider text-white uppercase font-sans">{user?.fullname}</h1>
                    <p className="mt-2 text-gray-400 font-light text-sm max-w-xl leading-relaxed">{user?.profile?.bio || 'No bio description provided.'}</p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/15 text-[#d4af37] font-mono text-2xs uppercase tracking-wider">
                            <MapPin size={12} />
                            <span>Available for Work</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-2xs uppercase tracking-wider">
                            <Calendar size={12} className="text-[#d4af37]" />
                            <span>Member since {new Date().getFullYear()}</span>
                        </span>
                    </div>
                </div>
                
                <Button
                    onClick={() => setOpen(true)}
                    className="admin-gold-btn px-6 py-5 rounded-xl text-xs flex items-center gap-1.5 md:self-start mt-4 md:mt-0"
                >
                    <Pen size={14} />
                    <span>Edit Profile</span>
                </Button>
            </div>
        </motion.div>
    )
}

// Contact Info Component
const ContactInfo = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-white/5 rounded-xl border border-white/5 text-[#d4af37]">
                    <Mail size={20} />
                </div>
                <div>
                    <p className="text-2xs text-gray-500 uppercase tracking-widest font-mono">Email Address</p>
                    <p className="font-semibold text-white text-sm mt-0.5 break-all">{user?.email}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-white/5 rounded-xl border border-white/5 text-[#d4af37]">
                    <Contact size={20} />
                </div>
                <div>
                    <p className="text-2xs text-gray-500 uppercase tracking-widest font-mono">Phone Number</p>
                    <p className="font-semibold text-white text-sm mt-0.5 font-mono">{user?.phoneNumber || 'N/A'}</p>
                </div>
            </div>
        </motion.div>
    )
}

// Skills Component
const SkillsSection = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/20 rounded-2xl border border-white/5 p-6 shadow-lg"
        >
            <div className="flex items-center gap-2 mb-5">
                <Award className="text-[#d4af37]" size={18} />
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest font-sans">Professional Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
                {user?.profile?.skills?.length !== 0
                    ? user?.profile?.skills.map((item, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono text-2xs hover:bg-[#d4af37]/5 hover:border-[#d4af37]/15 hover:text-[#d4af37] transition-all duration-300"
                        >
                            {item}
                        </span>
                    ))
                    : <span className="text-gray-500 font-light text-sm">No skills added yet</span>}
            </div>
        </motion.div>
    )
}

// ID Proof Component
const IDProofSection = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 rounded-2xl border border-white/5 p-6 shadow-lg"
        >
            <div className="flex items-center gap-2 mb-5">
                <FileText className="text-[#d4af37]" size={18} />
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest font-sans">Identification Document</h2>
            </div>
            {user?.profile?.resume ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-[#d4af37] hover:text-[#fbbf24] bg-white/5 border border-[#d4af37]/25 hover:border-[#d4af37]/45 rounded-xl transition-all duration-300 group"
                >
                    <FileText size={16} />
                    <span className="truncate max-w-[200px]">{user?.profile?.resumeOriginalName || "View ID Document"}</span>
                </a>
            ) : (
                <div className="p-5 text-center text-gray-500 rounded-xl border border-dashed border-white/5 bg-black/10 text-xs font-light">
                    No identification proof uploaded yet
                </div>
            )}
        </motion.div>
    )
}

// Applied Jobs Component
const AppliedJobsSection = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="admin-glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl"
        >
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-sans">Applied Listings Activity</h2>
            <AppliedJobTable />
        </motion.div>
    )
}

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

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

            <div className="flex-grow relative z-10 py-12">
                <div className="max-w-5xl mx-auto px-4 mt-10 space-y-6">
                    <ProfileHeader user={user} setOpen={setOpen} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactInfo user={user} />
                        <SkillsSection user={user} />
                    </div>
                    <IDProofSection user={user} />
                    <AppliedJobsSection />
                </div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile
