import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { 
  Wrench, Hammer, Truck, ShieldCheck, 
  HardHat, Pickaxe, ChefHat, Car, 
  Zap, Sprout, Paintbrush, Wind, 
  Box, Users, Home, Factory 
} from 'lucide-react';

const categories = [
  {
    groupName: 'Construction & Trades',
    categories: [
      { name: 'Construction', icon: <HardHat size={32} />, displayName: 'Construction', description: 'Site building & heavy construction' },
      { name: 'Electrical', icon: <Zap size={32} />, displayName: 'Electrical', description: 'Wiring, installation & repair' },
      { name: 'Plumbing', icon: <Wrench size={32} />, displayName: 'Plumbing', description: 'Pipe fitting & drainage solutions' },
      { name: 'Carpentry', icon: <Hammer size={32} />, displayName: 'Carpentry', description: 'Woodworking & structural framing' }
    ]
  },
  {
    groupName: 'Industrial & Workshop',
    categories: [
      { name: 'Welding', icon: <Pickaxe size={32} />, displayName: 'Welding', description: 'Metal fabrication & jointing' },
      { name: 'Warehouse', icon: <Box size={32} />, displayName: 'Warehouse', description: 'Inventory & loading/unloading' },
      { name: 'Factory', icon: <Factory size={32} />, displayName: 'Factory Labor', description: 'Assembly line & production' },
      { name: 'Logistics', icon: <Truck size={32} />, displayName: 'Logistics', description: 'Supply chain & material handling' }
    ]
  },
  {
    groupName: 'Facility & Maintenance',
    categories: [
      { name: 'HVAC', icon: <Wind size={32} />, displayName: 'HVAC', description: 'Heating, ventilation & cooling' },
      { name: 'Painting', icon: <Paintbrush size={32} />, displayName: 'Painting', description: 'Interior & exterior finishing' },
      { name: 'Landscaping', icon: <Sprout size={32} />, displayName: 'Landscaping', description: 'Groundskeeping & design' },
      { name: 'Cleaning', icon: <Home size={32} />, displayName: 'Cleaning', description: 'Commercial & residential cleaning' }
    ]
  },
  {
    groupName: 'Support Services',
    categories: [
      { name: 'Security', icon: <ShieldCheck size={32} />, displayName: 'Security', description: 'Guarding & monitoring services' },
      { name: 'Driving', icon: <Car size={32} />, displayName: 'Driving', description: 'Commercial & personal transport' },
      { name: 'Culinary', icon: <ChefHat size={32} />, displayName: 'Culinary Support', description: 'Kitchen assistance & prep' },
      { name: 'General', icon: <Users size={32} />, displayName: 'General Labor', description: 'Versatile unskilled assistance' }
    ]
  }
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Category Card Component
const CategoryCard = ({ category, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgb(99, 102, 241)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center p-6 text-center transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-lg snap-start min-w-[250px] md:min-w-0 group dark:bg-gray-900 dark:border-gray-800"
    >
      <div className="relative">
        <div className="flex items-center justify-center w-20 h-20 mb-4 transition-all duration-300 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full group-hover:from-indigo-500 group-hover:to-blue-600 text-indigo-600 group-hover:text-white shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-500/30 dark:from-gray-800 dark:to-gray-800 border border-gray-100 dark:border-gray-700 dark:group-hover:border-transparent dark:text-indigo-400 group-hover:scale-110">
          {category.icon}
        </div>
      </div>
      <h4 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 dark:text-gray-100 dark:group-hover:text-indigo-400">{category.displayName}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
    </motion.div>
  );
};

// Category Section Component
const CategoryGroup = ({ section, index, onCategoryClick }) => {
  return (
    <motion.div 
      key={index} 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section Header */}
      <div className="hidden md:block">
        <h3 className="pl-4 mb-8 text-2xl font-semibold text-gray-800 border-l-4 border-indigo-500 dark:text-white">
          {section.groupName}
        </h3>
      </div>
      <div className="relative md:hidden">
        <h3 className="pl-4 mb-8 text-2xl font-semibold text-gray-800 border-l-4 border-indigo-500 dark:text-white">
          {section.groupName}
        </h3>
      </div>

      {/* Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-6 overflow-x-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 md:overflow-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scroll-smooth scroll-px-2 snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {section.categories.map((cat, index) => (
          <CategoryCard 
            key={index} 
            category={cat} 
            onClick={() => onCategoryClick(cat.name)} 
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full min-h-screen px-6 py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[300px] overflow-hidden z-0">
        <motion.div 
          className="absolute w-[300px] h-[300px] top-[-150px] left-[-100px] bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute w-[200px] h-[200px] top-[50px] right-[-50px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-[300px] overflow-hidden z-0">
        <motion.div 
          className="absolute w-[250px] h-[250px] bottom-[-100px] right-[100px] bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute w-[150px] h-[150px] bottom-[50px] left-[100px] bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        ></motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="relative mb-4 text-4xl font-bold tracking-wide text-gray-800 md:text-5xl dark:text-white">
            Browse by Category
          </h2>
          <motion.span 
            className="block w-20 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.span>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 dark:text-gray-300">
            Explore our wide range of job categories and find the perfect opportunity for your skills
          </p>
        </motion.div>

        <div className="mx-auto space-y-16 max-w-7xl mt-16">
          {categories.map((section, idx) => (
            <CategoryGroup 
              key={idx} 
              section={section} 
              index={idx} 
              onCategoryClick={searchJobHandler} 
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-600 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 dark:text-gray-300">
            <span>Explore</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">all categories</span>
            <span>and find the perfect job for you!</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
