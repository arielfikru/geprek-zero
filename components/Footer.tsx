import React from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ccff00] text-black py-8 md:py-12 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
            <div>
                <h2 className="text-5xl md:text-6xl font-black italic opacity-20 select-none absolute -top-4 -left-4 md:-top-20 md:left-0 pointer-events-none">GEPREK</h2>
                <div className="text-xl md:text-2xl font-black mb-4 relative z-10">HUBUNGI KAMI</div>
                <div className="flex gap-4">
                    <SocialIcon icon={<Twitter size={20} />} />
                    <SocialIcon icon={<Instagram size={20} />} />
                    <SocialIcon icon={<Facebook size={20} />} />
                </div>
            </div>
            
            <div className="text-left md:text-right font-mono text-xs md:text-sm font-bold w-full md:w-auto">
                <div className="h-[2px] w-full bg-black mb-4 md:hidden opacity-20"></div>
                <p>GEPREK ZONE ZERO © 2024</p>
                <p>DIRANCANG UNTUK PROXY YANG LAPAR</p>
                <div className="mt-4 md:mt-2 flex gap-2 justify-start md:justify-end">
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] md:text-xs">PRIVASI</span>
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] md:text-xs">SYARAT</span>
                </div>
            </div>
        </div>

        {/* Decorative Patterns */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none"></div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <div className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-[#ccff00] transition-colors cursor-pointer rounded-full bg-white/50 backdrop-blur-sm">
        {icon}
    </div>
);

export default Footer;