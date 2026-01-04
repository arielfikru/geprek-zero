import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between overflow-hidden gap-8 md:gap-0">

      {/* Background Graphic Lines */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1a1a1a] transform skew-x-12 translate-x-32 -z-10 border-l-4 border-[#ccff00]" />

      {/* Left Content - Typography heavy */}
      <motion.div
        className="w-full md:w-1/2 z-10 flex flex-col gap-4 md:gap-6 mt-4 md:mt-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="bg-[#ccff00] text-black font-black px-2 py-1 text-xs md:text-sm transform -skew-x-12">AGEN BARU DIPERLUKAN</span>
          <span className="text-gray-400 font-mono text-[10px] md:text-xs tracking-widest">VERSI 1.0 // ONLINE</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic uppercase leading-[0.85] tracking-tighter">
          <span className="text-white">KRISPI</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-yellow-400">TANPA AMPUN</span>
        </h1>

        <p className="text-gray-300 max-w-md text-sm md:text-lg border-l-2 border-[#ccff00] pl-4 font-mono leading-relaxed">
          Siap-siap lidahmu meledak. Ayam Geprek Rank-S kini hadir di New Eridu (dan daerah sekitarmu). Level pedasnya bukan simulasi!
        </p>

        <div className="flex gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToMenu}
            className="group relative bg-[#ccff00] text-black font-black text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 clip-path-slant flex items-center gap-2 overflow-hidden cursor-pointer"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            <span>PESAN SEKARANG</span>
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>

          <button
            onClick={scrollToMenu}
            className="border-2 border-white text-white font-bold px-6 md:px-8 py-3 md:py-4 uppercase tracking-wider hover:bg-white hover:text-black transition-colors clip-path-slant cursor-pointer text-sm md:text-base"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}>
            LIHAT MENU
          </button>
        </div>
      </motion.div>

      {/* Right Content - Visual */}
      <motion.div
        className="w-full md:w-1/2 relative h-[40vh] md:h-[80vh] flex items-center justify-center mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        {/* Decorative Circle behind image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[250px] h-[250px] md:w-[500px] md:h-[500px] border-2 border-dashed border-[#ccff00] rounded-full opacity-30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[230px] h-[230px] md:w-[460px] md:h-[460px] border border-white rounded-full opacity-10"
          />
        </div>

        {/* Main Image */}
        <div className="relative z-10 w-full h-full max-w-[300px] md:max-w-none mx-auto">
          <img
            src="./sambal_matah.jpg"
            alt="Ayam Geprek Hero"
            className="w-full h-full object-cover rounded-lg transform -skew-x-6 border-4 border-white shadow-[10px_10px_0px_#ccff00]"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)' }}
          />
          {/* Floating Badge */}
          <motion.div
            className="absolute bottom-4 -left-4 md:bottom-10 md:-left-10 bg-black text-white p-2 md:p-4 border-2 border-[#ff4d00] z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              <Flame className="text-[#ff4d00] fill-current w-4 h-4 md:w-6 md:h-6" />
              <span className="font-black text-lg md:text-2xl italic">PEDAS MAX</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative vertical text */}
      <div className="absolute left-2 bottom-4 hidden md:block">
        <p className="writing-vertical-rl text-gray-500 font-mono text-xs tracking-[0.5em] transform rotate-180">
          SYSTEM_READY // EAT_OR_BE_EATEN // GZ0
        </p>
      </div>
    </section>
  );
};

export default HeroSection;