import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthSidebar: React.FC<AuthSidebarProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar Container */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[85%] md:w-[400px] bg-[#09090b] border-r-4 border-[#ccff00] z-[60] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ff4d00] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="p-8 border-b border-[#333] relative">
               <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                 <X size={24} />
               </button>
               <h2 className="text-4xl font-black italic text-white mb-1">LOGIN <span className="text-[#ccff00]">AGEN</span></h2>
               <p className="text-gray-500 font-mono text-xs tracking-widest">AKSES MEMBER AREA</p>
            </div>

            {/* Form Area */}
            <div className="flex-1 p-8 flex flex-col justify-center space-y-6">
                
                <div className="space-y-2 group">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 group-focus-within:text-[#ccff00] transition-colors">
                        <User size={14} /> Username / ID
                    </label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan Username..."
                            className="w-full bg-[#1a1a1a] border-2 border-[#333] p-4 text-white focus:border-[#ccff00] outline-none font-mono clip-path-slant transition-all"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
                        />
                        <div className="absolute right-0 bottom-0 w-4 h-4 bg-[#ccff00] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 group-focus-within:text-[#ccff00] transition-colors">
                        <Lock size={14} /> Password
                    </label>
                    <div className="relative">
                        <input 
                            type="password" 
                            placeholder="••••••"
                            className="w-full bg-[#1a1a1a] border-2 border-[#333] p-4 text-white focus:border-[#ccff00] outline-none font-mono clip-path-slant transition-all"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
                        />
                    </div>
                </div>

                <button className="w-full bg-[#ccff00] text-black font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors mt-4 group">
                    <span>LOGIN SEKARANG</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center pt-4">
                    <span className="text-gray-500 text-xs">Lupa password? </span>
                    <span className="text-[#ccff00] text-xs font-bold cursor-pointer hover:underline">Reset di sini</span>
                </div>

            </div>

            {/* Footer Status */}
            <div className="p-6 bg-[#111] border-t border-[#333]">
                <div className="flex items-center gap-4 text-gray-500">
                    <ShieldCheck size={20} className="text-[#ccff00]" />
                    <div className="text-[10px] font-mono leading-tight">
                        SECURE CONNECTION<br/>
                        SERVER: NEW ERIDU-01
                    </div>
                </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthSidebar;