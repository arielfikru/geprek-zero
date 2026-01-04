import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuGrid from './components/MenuGrid';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import CartSystem from './components/CartSystem';
import AuthSidebar from './components/AuthSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds loading for effect

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
        const existing = prev.find(i => i.id === item.id);
        const priceNum = parseInt(item.price.replace(/\D/g,''));
        
        if (existing) {
            return prev.map(i => i.id === item.id 
                ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * priceNum }
                : i
            );
        }
        return [...prev, { ...item, quantity: 1, totalPrice: priceNum }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
        return prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                const unitPrice = item.totalPrice / item.quantity;
                return { ...item, quantity: newQty, totalPrice: newQty * unitPrice };
            }
            return item;
        }).filter(item => item.quantity > 0);
    });
  };

  const handleClearCart = () => {
      setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black font-kanit">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Main Content */}
          <Navbar 
            cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
          
          <main>
             <HeroSection />
             {/* Diagonal Divider */}
             <div className="relative h-24 bg-[#09090b] overflow-hidden -mt-10 z-20 pointer-events-none">
                 <div className="absolute inset-0 bg-[#ccff00] transform -skew-y-3 origin-top-right border-b-8 border-white"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black text-white font-black px-6 py-2 transform -skew-x-12 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                        GULIR KE BAWAH
                    </div>
                 </div>
             </div>
             <MenuGrid onAddToCart={handleAddToCart} />
          </main>
          <Footer />

          {/* Cart System Overlay */}
          <CartSystem 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
          />

          {/* Sidebar Login Overlay */}
          <AuthSidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

        </motion.div>
      )}
    </div>
  );
};

export default App;