import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Star, MapPin, Calendar, Award, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

// Profile Header Component
const ProfileHeader = ({ user, setOpen }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-white shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
            <div className="relative flex flex-col md:flex-row items-start gap-6 z-10">
                <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-indigo-500/30 shadow-2xl transition-all duration-300 hover:scale-105">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white shadow-lg border-2 border-black">
                        <Star size={20} fill="currentColor" />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{user?.fullname}</h1>
                    <p className="mt-2 text-gray-300">{user?.profile?.bio || 'No bio available'}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Badge className="bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20">
                            <MapPin size={14} className="mr-1 text-indigo-400" /> Available for Work
                        </Badge>
                        <Badge className="bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20">
                            <Calendar size={14} className="mr-1 text-indigo-400" /> Member since {new Date().getFullYear()}
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 border border-indigo-500 shadow-lg shadow-indigo-500/30"
                >
                    <Pen className="mr-2 h-4 w-4" /> Edit Profile
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full border border-white/10">
                    <Mail className="text-indigo-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">{user?.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full border border-white/10">
                    <Contact className="text-indigo-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">{user?.phoneNumber}</p>
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
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-sm p-6"
        >
            <div className="flex items-center gap-2 mb-4">
                <Award className="text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length !== 0
                    ? user?.profile?.skills.map((item, index) => (
                        <Badge
                            key={index}
                            className="bg-white/10 text-gray-200 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            {item}
                        </Badge>
                    ))
                    : <span className="text-gray-400">No skills added yet</span>}
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
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-sm p-6"
        >
            <div className="flex items-center gap-2 mb-4">
                <FileText className="text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">ID Proof</h2>
            </div>
            {isResume ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="flex items-center gap-2 p-3 text-indigo-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors w-fit"
                >
                    <FileText size={18} />
                    <span className="font-medium">{user?.profile?.resumeOriginalName}</span>
                </a>
            ) : (
                <div className="p-4 text-center text-gray-400 bg-white/5 rounded-lg border border-white/10">
                    No ID proof uploaded yet
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
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-white mb-4">Applied Jobs</h2>
            <AppliedJobTable />
        </motion.div>
    )
}

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const bgImage = 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8MHwwfHx8MA%3D%3D';

    return (
        <div className="min-h-screen flex flex-col font-[Inter] bg-black">
            <Navbar />
            <div className="flex-grow relative py-8">
                {/* Background Image with Overlay */}
                <div className="fixed inset-0 w-full h-full bg-center bg-cover z-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0"></div>

                {/* Decorative Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-6">
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
