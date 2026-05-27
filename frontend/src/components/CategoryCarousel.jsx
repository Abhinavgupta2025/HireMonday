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
        borderColor: "rgba(212, 175, 55, 0.4)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center p-6 text-center transition-all duration-300 stat-card rounded-2xl cursor-pointer snap-start min-w-[250px] md:min-w-0 group"
    >
      <div className="relative">
        <div className="flex items-center justify-center w-20 h-20 mb-4 transition-all duration-300 bg-white/5 border border-white/10 rounded-full group-hover:border-[#d4af37]/30 text-gray-400 group-hover:text-[#d4af37] shadow-sm group-hover:scale-110">
          {category.icon}
        </div>
      </div>
      <h4 className="mb-2 text-lg font-light text-gray-300 group-hover:text-[#d4af37] transition-colors duration-300">{category.displayName}</h4>
      <p className="text-sm text-gray-500">{category.description}</p>
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
      <div>
        <h3 className="pl-4 mb-8 text-2xl font-light text-gray-200 border-l-4 border-[#d4af37]">
          {section.groupName}
        </h3>
      </div>

      {/* Cards */}
      <motion.div 
        className="flex overflow-x-auto gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 scrollbar-none snap-x snap-mandatory pb-4 w-full"
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
    <div className="relative w-full min-h-screen px-6 py-20 overflow-hidden bg-[#090a0c]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[300px] overflow-hidden z-0">
        <motion.div 
          className="absolute w-[300px] h-[300px] top-[-150px] left-[-100px] bg-gradient-to-br from-[#d4af37] to-[#aa771c] rounded-full opacity-[0.02]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute w-[200px] h-[200px] top-[50px] right-[-50px] bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-[0.02]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.04, 0.02]
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
          className="absolute w-[250px] h-[250px] bottom-[-100px] right-[100px] bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-[0.02]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute w-[150px] h-[150px] bottom-[50px] left-[100px] bg-gradient-to-br from-[#d4af37] to-[#aa771c] rounded-full opacity-[0.02]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.04, 0.02]
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
          <h2 className="relative mb-4 text-4xl md:text-5xl text-gray-300 font-light tracking-wide">
            Browse by Category
          </h2>
          <motion.span 
            className="block w-20 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-[#fcd34d] to-[#d4af37]"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.span>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-400 font-light">
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
          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-400 rounded-xl bg-[#111317]/50 border border-white/5 backdrop-blur-md">
            <span>Explore</span>
            <span className="font-medium text-[#d4af37]">all categories</span>
            <span>and find the perfect job for you!</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
