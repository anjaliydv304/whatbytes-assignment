'use client';

import { useState } from 'react';

const Sidebar = ({ 
  categories, 
  brands = [], 
  selectedCategory, 
  selectedBrands = [],
  onCategoryChange, 
  onBrandChange,
  priceRange, 
  onPriceChange 
}) => {
  const [currentMin, setCurrentMin] = useState(priceRange[0]);
  const [currentMax, setCurrentMax] = useState(priceRange[1]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), currentMax - 10); 
    setCurrentMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), currentMin + 10); 
    setCurrentMax(value);
  };
  
  const applyPriceChange = () => {
    onPriceChange([currentMin, currentMax]);
  };

  const handleBrandToggle = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(updatedBrands);
  };

  return (
    <aside className="w-full lg:w-1/4 bg-[#0859A8] text-white p-6 rounded-lg shadow-lg self-start">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer hover:bg-blue-900 p-2 rounded transition-colors">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="form-radio h-4 w-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex justify-between items-center mb-3 text-sm">
          <span>${currentMin}</span>
          <span>${currentMax}</span>
        </div>
       
        <div className="space-y-3">
          <div>
            <label htmlFor="minPrice" className="block text-xs mb-1">Min Price</label>
            <input
              type="range"
              id="minPrice"
              min="0"
              max="1000" 
              value={currentMin}
              onChange={handleMinChange}
              onMouseUp={applyPriceChange} 
              onTouchEnd={applyPriceChange} 
              className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-xs mb-1">Max Price</label>
            <input
              type="range"
              id="maxPrice"
              min="0" 
              max="1000"
              value={currentMax}
              onChange={handleMaxChange}
              onMouseUp={applyPriceChange}
              onTouchEnd={applyPriceChange}
              className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
        
        <div className="mt-3 flex items-center space-x-2">
          <input 
            type="number" 
            value={currentMin} 
            onChange={handleMinChange} 
            onBlur={applyPriceChange} 
            className="w-full p-2 border rounded text-gray-900 text-sm" 
            min="0"
            max="1000"
          />
          <span className="text-xs">to</span>
          <input 
            type="number" 
            value={currentMax} 
            onChange={handleMaxChange} 
            onBlur={applyPriceChange} 
            className="w-full p-2 border rounded text-gray-900 text-sm"
            min="0"
            max="1000"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;