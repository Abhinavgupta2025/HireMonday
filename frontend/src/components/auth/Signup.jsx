import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import './auth.css';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
    file: '',
  });
  const [previewImage, setPreviewImage] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#090a0c] relative">
      <Navbar />
      
      {/* Decorative Background Glows */}
      <div className="auth-glow-bg"></div>

      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-lg auth-glass-panel rounded-3xl overflow-hidden relative z-10"
        >
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#d4af37] tracking-wide">Create Account</h1>
              <p className="mt-2 text-sm text-gray-400 font-light">Join our community and start your journey</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              
              <div className="space-y-1.5">
                <Label className="text-sm font-light text-gray-300">Full Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <Input
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 auth-glass-input rounded-xl text-white placeholder-gray-500 focus:bg-[#16181d] transition-all font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-light text-gray-300">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 auth-glass-input rounded-xl text-white placeholder-gray-500 focus:bg-[#16181d] transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-light text-gray-300">Phone</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <Input
                      type="text"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2.5 auth-glass-input rounded-xl text-white placeholder-gray-500 focus:bg-[#16181d] transition-all font-light"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-light text-gray-300">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 auth-glass-input rounded-xl text-white placeholder-gray-500 focus:bg-[#16181d] transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label className="text-sm font-light text-gray-300">I am signing up as</Label>
                <div className="auth-segment-track rounded-xl p-1 relative h-12">
                  {/* Sliding background pill */}
                  <div 
                    className="auth-segment-pill absolute h-10 w-[calc(50%-4px)] rounded-lg transition-transform duration-300 ease-out z-0" 
                    style={{
                      transform: input.role === 'recruiter' ? 'translateX(100%)' : 'translateX(0)'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setInput({ ...input, role: 'student' })}
                    className={`flex-grow text-center font-medium text-xs tracking-wider z-10 py-2.5 transition-colors duration-300 flex items-center justify-center gap-2 ${input.role === 'student' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
                  >
                    <span>🔨</span>
                    <span>LABOUR</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setInput({ ...input, role: 'recruiter' })}
                    className={`flex-grow text-center font-medium text-xs tracking-wider z-10 py-2.5 transition-colors duration-300 flex items-center justify-center gap-2 ${input.role === 'recruiter' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
                  >
                    <span>🏢</span>
                    <span>RECRUITER</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label className="text-sm font-light text-gray-300">Profile Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="relative flex-grow">
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={changeFileHandler}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full pl-4 pr-4 py-3 auth-glass-input rounded-xl text-gray-300 flex items-center justify-between transition-colors hover:bg-white/10">
                      <span className="text-sm truncate mr-2 font-light">{input.file ? input.file.name : 'Upload photo...'}</span>
                      <Upload className="w-4 h-4 text-[#d4af37] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-6 auth-btn-primary hover:text-black rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-[15px] border-none"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : null}
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4 text-black" />}
              </Button>

              <p className="text-sm text-center text-gray-400 pt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#d4af37] hover:text-[#aa771c] transition-colors">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
