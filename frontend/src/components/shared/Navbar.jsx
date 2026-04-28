import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Bell, Menu, X, Home, Briefcase, FolderTree, Building2, Users, UserCircle, Wrench, Hammer, Truck, ShieldCheck, HardHat, Pickaxe, ChefHat, Car, Zap, Sprout, Paintbrush, Wind, Box, Factory } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT, NOTIFICATION_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';
import UserProfileDialog from './UserProfileDialog';

// Color theme constants
const theme = {
  primary: {
    main: '#3B82F6', // Blue
    light: '#60A5FA',
    dark: '#2563EB',
    contrast: '#FFFFFF'
  },
  secondary: {
    main: '#10B981', // Green
    light: '#34D399',
    dark: '#059669',
    contrast: '#FFFFFF'
  },
  accent: {
    main: '#8B5CF6', // Purple
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF'
  },
  background: {
    default: '#FFFFFF',
    paper: '#F9FAFB',
    dark: '#F3F4F6'
  },
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    light: '#9CA3AF'
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB'
  }
};

// Import categories data from CategoryCarousel
const categories = [
  {
    groupName: 'Construction & Trades',
    categories: [
      { name: 'Construction', icon: <HardHat size={20} />, displayName: 'Construction', description: 'Site building & heavy construction' },
      { name: 'Electrical', icon: <Zap size={20} />, displayName: 'Electrical', description: 'Wiring, installation & repair' },
      { name: 'Plumbing', icon: <Wrench size={20} />, displayName: 'Plumbing', description: 'Pipe fitting & drainage solutions' },
      { name: 'Carpentry', icon: <Hammer size={20} />, displayName: 'Carpentry', description: 'Woodworking & structural framing' }
    ]
  },
  {
    groupName: 'Industrial & Workshop',
    categories: [
      { name: 'Welding', icon: <Pickaxe size={20} />, displayName: 'Welding', description: 'Metal fabrication & jointing' },
      { name: 'Warehouse', icon: <Box size={20} />, displayName: 'Warehouse', description: 'Inventory & loading/unloading' },
      { name: 'Factory', icon: <Factory size={20} />, displayName: 'Factory Labor', description: 'Assembly line & production' },
      { name: 'Logistics', icon: <Truck size={20} />, displayName: 'Logistics', description: 'Supply chain & material handling' }
    ]
  },
  {
    groupName: 'Facility & Maintenance',
    categories: [
      { name: 'HVAC', icon: <Wind size={20} />, displayName: 'HVAC', description: 'Heating, ventilation & cooling' },
      { name: 'Painting', icon: <Paintbrush size={20} />, displayName: 'Painting', description: 'Interior & exterior finishing' },
      { name: 'Landscaping', icon: <Sprout size={20} />, displayName: 'Landscaping', description: 'Groundskeeping & design' },
      { name: 'Cleaning', icon: <Home size={20} />, displayName: 'Cleaning', description: 'Commercial & residential cleaning' }
    ]
  },
  {
    groupName: 'Support Services',
    categories: [
      { name: 'Security', icon: <ShieldCheck size={20} />, displayName: 'Security', description: 'Guarding & monitoring services' },
      { name: 'Driving', icon: <Car size={20} />, displayName: 'Driving', description: 'Commercial & personal transport' },
      { name: 'Culinary', icon: <ChefHat size={20} />, displayName: 'Culinary Support', description: 'Kitchen assistance & prep' },
      { name: 'General', icon: <Users size={20} />, displayName: 'General Labor', description: 'Versatile unskilled assistance' }
    ]
  }
];

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To track current location for dynamic rendering

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showCategorySection, setShowCategorySection] = useState(false); // State for category section visibility
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const fetchNotifications = async () => {
        if (user?.role === 'student') {
            try {
                const res = await axios.get(`${NOTIFICATION_API_END_POINT}`, { withCredentials: true });
                setNotifications(res.data.notifications || []);
            } catch (error) {
                console.log('Notification Error:', error?.response?.data?.message || error.message);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    const handleNotificationClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/notifications/${id}/read`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setNotifications((prev) => prev.filter((notif) => notif._id !== id));
            } else {
                console.error('Failed to delete notification:', data.message);
            }
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    // Toggle category section visibility
    const toggleCategorySection = () => {
        setShowCategorySection(!showCategorySection);
    };

    // Handle category click
    const handleCategoryClick = (categoryName) => {
        dispatch(setSearchedQuery(categoryName));
        navigate("/browse");
        setShowCategorySection(false);
    };

    return (
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-950/60 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300"
        >
            {/* Subtle Gradient overlay for the border bottom effect */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            
            <div className="relative flex items-center justify-between h-20 px-6 mx-auto max-w-7xl">
                <div className="flex items-center gap-4">
                    <motion.h1 
                        className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:rotate-6">
                                <Briefcase className="text-white" size={24} strokeWidth={2.5} />
                            </div>
                            <span className="tracking-widest drop-shadow-sm">Hire</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 drop-shadow-sm ml-0.5">Smart</span>
                        </Link>
                    </motion.h1>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                    <Button 
                        variant="ghost" 
                        onClick={() => setShowMenu(!showMenu)} 
                        className="p-2 text-gray-700 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        {showMenu ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Overlay */}
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black bg-opacity-70"
                        onClick={() => setShowMenu(false)}
                    />
                )}

                {/* Side Navigation Menu for Mobile */}
                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 w-72 h-screen bg-white dark:bg-gray-950 z-50 shadow-2xl lg:hidden overflow-y-auto"
                        >
                            <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h1>
                                <Button variant="ghost" onClick={() => setShowMenu(false)} className="p-2 text-gray-700 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                                    <X size={24} />
                                </Button>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-3">
                                    {user && user.role === 'recruiter' ? (
                                        <>
                                            <li>
                                                <Link to="/admin/companies" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Building2 size={20} className="text-blue-500" />
                                                    <span>Companies</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/jobs" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Briefcase size={20} className="text-blue-500" />
                                                    <span>Jobs</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/jobs/accepted" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Users size={20} className="text-blue-500" />
                                                    <span>Applicants</span>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Home size={20} className="text-blue-500" />
                                                    <span>Home</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/jobs" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <Briefcase size={20} className="text-blue-500" />
                                                    <span>Work</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={toggleCategorySection} 
                                                    className="flex items-center gap-3 p-3 w-full text-left text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <FolderTree size={20} className="text-blue-500" />
                                                    <span>Categories</span>
                                                </button>
                                            </li>
                                        </>
                                    )}

                                    {/* Show Login/Signup in Hamburger Menu */}
                                    {!user && (
                                        <>
                                            <li>
                                                <Link to="/login" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <User2 size={20} className="text-blue-500" />
                                                    <span>Login</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/signup" className="flex items-center gap-3 p-3 text-gray-800 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    <UserCircle size={20} className="text-blue-500" />
                                                    <span>Signup</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                                
                                {/* User Profile Section in Mobile Menu */}
                                {user && (
                                    <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="border-2 border-blue-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <Link to="/profile" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">Profile</Link>
                                            <Button 
                                                variant="ghost" 
                                                className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors" 
                                                onClick={logoutHandler}
                                            >
                                                Logout <LogOut size={16} className="ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <div className="items-center hidden gap-8 lg:flex">
                    <ul className="flex items-center gap-6 font-medium text-gray-700 dark:text-gray-300">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/companies" className="flex items-center gap-1">
                                        <Building2 size={18} />
                                        <span>Companies</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/jobs" className="flex items-center gap-1">
                                        <Briefcase size={18} />
                                        <span>Jobs</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/admin/jobs/accepted" className="flex items-center gap-1">
                                        <Users size={18} />
                                        <span>Applicants</span>
                                    </Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="flex items-center gap-1">
                                        <Home size={18} />
                                        <span>Home</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/jobs" className="flex items-center gap-1">
                                        <Briefcase size={18} />
                                        <span>Work</span>
                                    </Link>
                                </motion.li>
                                <motion.li 
                                    className="hover:text-[#3B82F6] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <button 
                                        onClick={toggleCategorySection} 
                                        className="flex items-center gap-1"
                                    >
                                        <FolderTree size={18} />
                                        <span>Categories</span>
                                    </button>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {/* Category Section Dropdown */}
                    <AnimatePresence>
                        {showCategorySection && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute left-0 right-0 z-40 p-6 bg-white border-b border-gray-200 shadow-lg top-16 dark:bg-gray-950 dark:border-gray-800"
                            >
                                <div className="mx-auto max-w-7xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Browse by Category</h2>
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => setShowCategorySection(false)}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            <X size={20} />
                                        </Button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                        {categories.map((section, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200 border-l-4 border-blue-500 dark:border-indigo-500 pl-2">
                                                    {section.groupName}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {section.categories.map((cat, index) => (
                                                        <motion.button
                                                            key={index}
                                                            onClick={() => handleCategoryClick(cat.name)}
                                                            className="flex items-center gap-3 p-3 text-left transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-500 dark:hover:border-indigo-400 group"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <span className="flex items-center justify-center w-10 h-10 text-xl bg-blue-100 dark:bg-indigo-900/40 text-blue-600 dark:text-indigo-400 rounded-full group-hover:bg-blue-500 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                                                {cat.icon}
                                                            </span>
                                                            <div>
                                                                <h4 className="font-medium text-gray-800 dark:text-gray-200">{cat.displayName}</h4>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                                                            </div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notification Bell for Students */}
                    {user && user.role === 'student' && (
                        <div className="relative cursor-pointer">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bell
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="text-gray-700 transition-all hover:text-[#3B82F6] dark:text-gray-300"
                                    size={24}
                                />
                            </motion.div>
                            {notifications.length > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full -top-2 -right-2 shadow-md"
                                >
                                    {notifications.length}
                                </motion.span>
                            )}
                            {showNotifications && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xl w-80 max-h-96"
                                >
                                    <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                                    </div>
                                    
                                    {notifications.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-6 text-center">
                                            <Bell className="w-10 h-10 text-gray-300 mb-2" />
                                            <p className="text-sm text-gray-500">No new notifications</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-y-auto max-h-80">
                                            {notifications.map((notif) => (
                                                <motion.div
                                                    key={notif._id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    className="flex items-start p-4 transition-all duration-300 border-b hover:bg-gray-50 group"
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                                            <Bell size={16} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-700 group-hover:text-gray-900">{notif.message}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(notif.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationClick(notif._id)}
                                                        className="flex-shrink-0 ml-2 text-xs font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {notifications.length > 0 && (
                                        <div className="p-2 border-t border-gray-100 bg-gray-50">
                                            <button 
                                                onClick={() => {
                                                    notifications.forEach(notif => handleNotificationClick(notif._id));
                                                    setShowNotifications(false);
                                                }}
                                                className="w-full py-1.5 text-xs font-medium text-center text-blue-600 transition hover:text-blue-800 hover:underline"
                                            >
                                                Mark all as read
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* User Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400 font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 rounded-xl px-6">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Avatar 
                                className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                                onClick={() => setIsProfileOpen(true)}
                            >
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <UserProfileDialog 
                                open={isProfileOpen}
                                setOpen={setIsProfileOpen}
                                user={user}
                                onLogout={logoutHandler}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
