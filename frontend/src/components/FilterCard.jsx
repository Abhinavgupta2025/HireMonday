import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { SlidersHorizontal, X } from 'lucide-react';
import './auth/auth.css';

const filterData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Lucknow"]
  },
  {
    fitlerType: "Industry",
    array: [
      "Construction Worker", "Electrician", "Plumber", "Carpenter", "Painter",
      "Welder", "Mason", "Driver", "Housekeeping Staff", "Security Guard",
      "Gardener", "AC Technician", "Tile Setter", "Heavy Vehicle Operator",
      "Warehouse Labour", "Packaging Staff", "Helper / General Labour",
      "Scaffolder", "Cleaning Staff", "Loader/Unloader"
    ]
  },
  {
    fitlerType: "Charge",
    array: ["0-400", "1k-2k", "3k to 5k"]
  },
];

const FilterCard = ({ isVisible, onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-5 w-64 auth-glass-panel rounded-2xl z-50 overflow-hidden shadow-2xl">
      <div className="bg-[#111317]/80 border-b border-white/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-4.5 w-4.5 text-[#d4af37]" />
            <h1 className="text-sm font-medium text-gray-200 tracking-wider uppercase">Filter Jobs</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      <div className="p-5 overflow-y-auto h-[calc(70vh-4rem)] scrollbar-none space-y-6">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest font-mono border-b border-white/5 pb-1">{data.fitlerType}</h2>
              <div className="space-y-1.5">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  const isSelected = selectedValue === item;
                  return (
                    <div
                      key={itemId}
                      onClick={() => changeHandler(item)}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 border cursor-pointer group ${isSelected ? 'bg-[#d4af37]/10 border-[#d4af37]/35 shadow-sm shadow-[#d4af37]/5' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'}`}
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className={`accent-[#d4af37] border-white/20 text-[#d4af37] focus:ring-0 focus:ring-offset-0 ${isSelected ? 'border-[#d4af37]' : ''}`}
                      />
                      <Label
                        htmlFor={itemId}
                        className={`text-sm cursor-pointer transition-colors duration-200 font-light ${isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
