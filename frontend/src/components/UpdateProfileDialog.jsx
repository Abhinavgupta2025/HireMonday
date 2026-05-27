import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, X, User, Mail, Phone, FileText, Award, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import './admin/CompanySetup.css'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                handleClose();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] bg-[#0c0d10] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50">
                <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                    <DialogTitle className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#d4af37] uppercase flex items-center gap-2">
                        <Edit2 size={18} className="text-[#d4af37]" />
                        <span>Update Profile</span>
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={submitHandler} className="mt-6 space-y-5">
                    <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none'>
                        
                        {/* Name Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="fullname" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <User size={12} className="text-[#d4af37]" />
                                <span>Full Name</span>
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
                                placeholder="Your full name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <Mail size={12} className="text-[#d4af37]" />
                                <span>Email Address</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <Phone size={12} className="text-[#d4af37]" />
                                <span>Contact Number</span>
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
                                placeholder="Your phone number"
                            />
                        </div>

                        {/* Bio Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="bio" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <FileText size={12} className="text-[#d4af37]" />
                                <span>Profile Bio</span>
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        {/* Skills Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="skills" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <Award size={12} className="text-[#d4af37]" />
                                <span>Skills (Comma separated)</span>
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:ring-0 focus:outline-none"
                                placeholder="e.g. Masonry, Plumbing, Carpentry"
                            />
                        </div>

                        {/* ID Proof Field */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="file" className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                <FileText size={12} className="text-[#d4af37]" />
                                <span>Identification Document (PDF)</span>
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="admin-glass-input rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-xs focus:ring-0 focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37]/10 file:text-[#d4af37] file:cursor-pointer"
                            />
                        </div>

                    </div>

                    <DialogFooter className="pt-4 border-t border-white/5 mt-6">
                        {loading ? (
                            <Button className="w-full py-6 text-sm font-bold tracking-widest text-[#d4af37] bg-white/5 border border-[#d4af37]/25 rounded-xl uppercase flex items-center justify-center gap-2" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin text-[#d4af37]' /> 
                                <span>Updating Profile...</span>
                            </Button>
                        ) : (
                            <Button type="submit" className="admin-gold-btn w-full py-6 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl">
                                Save Profile Changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog