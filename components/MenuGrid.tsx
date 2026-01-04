import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../constants';
import { MenuItem, MenuCategory } from '../types';
import { Star, Zap, Activity, ShoppingCart } from 'lucide-react';

interface MenuGridProps {
    onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: MenuCategory[] = ['Ayam Geprek', 'Paket', 'Menu Lain', 'Minuman'];

const MenuGrid: React.FC<MenuGridProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Ayam Geprek');
  const [selectedId, setSelectedId] = useState<string>('');

  // Filter items based on category
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  const selectedItem = MENU_ITEMS.find(item => item.id === selectedId) || filteredItems[0];

  // Reset selected ID when category changes to the first item of new category
  useEffect(() => {
    if (filteredItems.length > 0) {
        setSelectedId(filteredItems[0].id);
    }
  }, [activeCategory]);

  return (
    <section id="menu-section" className="py-12 md:py-20 px-4 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Film Grain/Noise effect simulated */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-8 border-b-2 border-[#333] pb-4 gap-4">
          <div>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase text-white leading-none">
              PILIH <span className="text-[#ccff00]">JAGOANMU</span>
            </h2>
            <p className="text-gray-400 font-mono mt-2 text-sm md:text-base">// DATABASE MAKANAN</p>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto md:block text-right">
             <div className="text-[#ccff00] text-2xl md:text-3xl font-black">
                {filteredItems.length.toString().padStart(2, '0')} / {MENU_ITEMS.length.toString().padStart(2, '0')}
             </div>
             <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Total Item</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 md:gap-4 mb-8 pb-2 custom-scrollbar no-scrollbar-mobile">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        relative px-6 py-3 min-w-[120px] transform -skew-x-12 font-black uppercase text-sm md:text-base transition-all duration-300
                        ${activeCategory === cat 
                            ? 'bg-[#ccff00] text-black scale-105 z-10' 
                            : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#333] border border-gray-700'}
                    `}
                >
                    <span className="transform skew-x-12 inline-block">{cat}</span>
                    {activeCategory === cat && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 w-full h-1 bg-black"
                        />
                    )}
                </button>
            ))}
        </div>

        {/* Layout: Mobile = Column (Detail Top), Desktop = Row (Detail Left) */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Detail Panel - First in DOM to appear at top on mobile */}
          <div className="w-full lg:w-1/3">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#18181b] p-4 md:p-6 border-l-4 border-[#ccff00] relative overflow-hidden rounded-r-lg lg:rounded-none"
              >
                {/* Element Icon */}
                <div className="absolute -right-6 -top-6 text-[#222]">
                  <Zap size={150} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-2 md:mb-4">
                     <span className="text-3xl md:text-4xl font-black italic text-[#ccff00]">{selectedItem.rank}</span>
                     <div className="h-6 md:h-8 w-[2px] bg-gray-600"></div>
                     <span className="text-lg md:text-xl font-bold uppercase">ELEMENT: {selectedItem.element}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-2 leading-none">{selectedItem.name}</h3>
                  <p className="text-xl md:text-2xl text-gray-300 font-teko mb-4 md:mb-6">{selectedItem.price}</p>
                  
                  <p className="text-gray-400 mb-6 md:mb-8 font-mono text-xs md:text-sm leading-relaxed min-h-[60px]">
                    {selectedItem.description}
                  </p>

                  {/* Stats Bars */}
                  <div className="space-y-3 md:space-y-4">
                    <StatBar label="Level Pedas" value={selectedItem.stats.spiciness} color="#ff4d00" />
                    <StatBar label="Level Krispi" value={selectedItem.stats.crunch} color="#ccff00" />
                    <StatBar label="Porsi" value={selectedItem.stats.portion} color="#ffffff" />
                  </div>

                  <button 
                    onClick={() => onAddToCart(selectedItem)}
                    className="w-full mt-6 md:mt-8 bg-white text-black font-black uppercase py-3 md:py-4 hover:bg-[#ccff00] transition-colors flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>TAMBAH KE ORDER</span>
                    <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid Selection - Second in DOM */}
          <div className="w-full lg:w-2/3">
             <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[400px] md:h-[600px] lg:h-[800px] overflow-y-auto pr-2 custom-scrollbar"
             >
                {filteredItems.map((item) => (
                <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedId(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer group h-48 md:h-64 overflow-hidden border-2 transition-all duration-300 ${selectedId === item.id ? 'border-[#ccff00] bg-[#1a1a1a]' : 'border-[#333] bg-black hover:border-gray-500'}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' }}
                >
                    {/* Image Background */}
                    <img 
                    src={item.image} 
                    alt={item.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${selectedId === item.id ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70'}`}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[#ccff00] font-black text-xs md:text-sm mb-1">NO. {item.id}</div>
                            <h4 className={`text-lg md:text-xl font-black uppercase italic leading-none ${selectedId === item.id ? 'text-white' : 'text-gray-400'}`}>
                            {item.name}
                            </h4>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${selectedId === item.id ? 'bg-[#ccff00] text-black' : 'bg-[#333] text-gray-500'}`}>
                            {item.rank}
                        </div>
                    </div>
                    </div>

                    {/* Selected Indicator */}
                    {selectedId === item.id && (
                    <motion.div 
                        layoutId="outline"
                        className="absolute inset-0 border-4 border-[#ccff00] pointer-events-none z-20"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' }}
                    />
                    )}
                </motion.div>
                ))}
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center gap-2 md:gap-4">
    <span className="w-16 md:w-20 text-[10px] md:text-xs font-bold uppercase text-gray-500">{label}</span>
    <div className="flex-1 h-2 bg-[#333] rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "circOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
    <span className="text-[10px] md:text-xs font-mono w-6 md:w-8 text-right">{value}</span>
  </div>
);

export default MenuGrid;