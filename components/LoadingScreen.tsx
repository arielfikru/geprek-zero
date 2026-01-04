import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-white overflow-hidden p-4">
      {/* Background Texture - Halftone dots */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* The "Bangboo" Yellow Circle */}
      <motion.div
        className="relative w-32 h-28 md:w-48 md:h-40 bg-[#ccff00] rounded-[40%] flex items-center justify-center mb-8"
        animate={{
          scale: [1, 1.1, 1, 1.05, 1],
          rotate: [0, -5, 5, -2, 0],
          borderRadius: ["40%", "45%", "40%", "42%", "40%"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-2 h-3 md:w-3 md:h-4 bg-black rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-2 h-3 md:w-3 md:h-4 bg-black rounded-full" />
        
        {/* Little Antenna/Ears */}
        <motion.div 
          className="absolute -top-4 md:-top-6 left-1/3 w-3 h-6 md:w-4 md:h-8 bg-[#ccff00] rounded-full"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -top-4 md:-top-6 right-1/3 w-3 h-6 md:w-4 md:h-8 bg-[#ccff00] rounded-full"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading Text */}
      <div className="relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-black italic tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(204,255,0,0.5)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          LOADING
        </motion.h1>
        <motion.div 
          className="mt-2 text-[#ccff00] font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          CONNECTING TO SERVER...
        </motion.div>
      </div>

      {/* Scrolling Text Ribbon at bottom */}
      <div className="absolute bottom-10 left-0 w-full bg-[#ccff00] text-black overflow-hidden py-2 transform -rotate-1">
        <motion.div
          className="whitespace-nowrap font-black text-sm md:text-xl flex gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array(10).fill("MAKAN GEPREK // ISI TENAGA // RASA RANK-S // ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;