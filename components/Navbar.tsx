import React, { useEffect } from 'react';
import { Home, ShoppingBag, Music, Menu, CornerUpLeft } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenSidebar }) => {
  const controls = useAnimation();

  // Trigger animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      controls.start({
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, -5, 5, -2, 0],
        transition: { duration: 0.4 }
      });
    }
  }, [cartCount, controls]);

  return (
    <nav className="fixed top-2 md:top-6 left-0 right-0 z-40 px-2 md:px-8 flex justify-center pointer-events-none">
      <div className="w-full max-w-7xl bg-[#09090b]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
        
        {/* Brand & ESC Area */}
        <div className="flex items-center gap-4">
            {/* ESC Button - Desktop Only */}
            <div className="hidden md:flex items-center justify-center bg-[#1a1a1a] text-gray-400 w-10 h-10 rounded border border-gray-700 hover:bg-[#ccff00] hover:text-black hover:border-black transition-colors cursor-pointer group">
                <CornerUpLeft size={16} />
            </div>

            {/* Brand Logo */}
            <div className="flex flex-col cursor-pointer group select-none">
                <h1 className="text-xl md:text-2xl font-black italic tracking-tighter leading-none group-hover:text-[#ccff00] transition-colors">
                    GEPREK<span className="text-[#ccff00] group-hover:text-white transition-colors">ZERO</span>
                </h1>
            </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-2">
                <NavButton icon={<Home size={18} />} label="BERANDA" active />
                
                {/* Order Button with Animation Controls */}
                <NavButton 
                    icon={<ShoppingBag size={18} />} 
                    label="PESAN" 
                    count={cartCount} 
                    onClick={onOpenCart}
                    animateControl={controls}
                />
                
                <NavButton icon={<Music size={18} />} label="BGM" />
            </div>

            {/* Mobile Cart Button */}
            <div className="md:hidden">
                <NavButton 
                    icon={<ShoppingBag size={18} />} 
                    label="KERANJANG" 
                    count={cartCount} 
                    onClick={onOpenCart}
                    active={cartCount > 0}
                    animateControl={controls}
                />
            </div>
            
            {/* Hamburger / Sidebar Trigger */}
            <motion.button 
                onClick={onOpenSidebar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ccff00] w-10 h-10 md:w-12 md:h-10 rounded flex items-center justify-center text-black hover:bg-white transition-colors"
            >
                <Menu size={20} />
            </motion.button>
        </div>
      </div>
    </nav>
  );
};

interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    count?: number;
    onClick?: () => void;
    animateControl?: any;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, count, onClick, animateControl }) => (
    <motion.button
        animate={animateControl}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-3 py-2 rounded font-black italic border ${active ? 'bg-white text-black border-white' : 'bg-black/50 text-white border-gray-700 hover:border-[#ccff00] hover:text-[#ccff00]'} transition-all`}
    >
        <span className="flex items-center gap-2">
            {icon}
            <span className="text-xs md:text-sm hidden sm:inline">{label}</span>
        </span>
        
        {/* Cart Count Badge */}
        <AnimatePresence>
            {count !== undefined && count > 0 && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#ff4d00] text-white flex items-center justify-center rounded-full text-[10px] font-bold border-2 border-[#09090b] z-10"
                >
                    {count}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
)

export default Navbar;