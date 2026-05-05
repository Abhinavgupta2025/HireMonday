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

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
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

  const bgImage = 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8MHwwfHx8MA%3D%3D';

  return (
    <div className="min-h-screen flex flex-col font-[Inter] bg-black relative">
      <Navbar />
      
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 w-full h-full bg-center bg-cover z-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0"></div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/20 rounded-2xl overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 tracking-tight">Create Account</h1>
              <p className="mt-2 text-sm text-gray-400">Join our community and start your journey</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-300">Full Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-indigo-400" />
                  </div>
                  <Input
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-300">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-300">Phone</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <Input
                      type="text"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-300">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label className="text-sm font-medium text-gray-300">I am signing up as</Label>
                <div className="flex gap-4 p-1.5 bg-white/5 rounded-xl border border-white/10">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${input.role === 'student' ? 'bg-white/10 shadow-sm border border-white/20 ring-1 ring-indigo-500/50' : 'hover:bg-white/5 border border-transparent'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className="hidden"
                    />
                    <span className="text-lg">🔨</span>
                    <span className={`text-sm font-medium ${input.role === 'student' ? 'text-indigo-300' : 'text-gray-400'}`}>Labour</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${input.role === 'recruiter' ? 'bg-white/10 shadow-sm border border-white/20 ring-1 ring-indigo-500/50' : 'hover:bg-white/5 border border-transparent'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className="hidden"
                    />
                    <span className="text-lg">🏢</span>
                    <span className={`text-sm font-medium ${input.role === 'recruiter' ? 'text-indigo-300' : 'text-gray-400'}`}>Recruiter</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label className="text-sm font-medium text-gray-300">Profile Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
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
                    <div className="w-full pl-4 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 flex items-center justify-between transition-colors hover:bg-white/10">
                      <span className="text-sm truncate mr-2">{input.file ? input.file.name : 'Upload photo...'}</span>
                      <Upload className="w-4 h-4 text-indigo-400 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-[15px] border border-indigo-500"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>

              <p className="text-sm text-center text-gray-400 pt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
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
