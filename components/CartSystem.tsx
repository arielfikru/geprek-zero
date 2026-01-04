import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, CreditCard, ShoppingBag, UtensilsCrossed, Store, CheckCircle, Smartphone } from 'lucide-react';
import { CartItem, OrderType } from '../types';

interface CartSystemProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

const OUTLETS = [
    "Jakarta - South Quarter",
    "Bandung - Dago Atas",
    "Surabaya - Tunjungan",
    "Yogyakarta - Malioboro",
    "Tangerang - BSD City"
];

const CartSystem: React.FC<CartSystemProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onClearCart }) => {
  const [step, setStep] = useState<'cart' | 'details' | 'qris' | 'success'>('cart');
  const [orderType, setOrderType] = useState<OrderType>('DINE_IN');
  const [selectedOutlet, setSelectedOutlet] = useState(OUTLETS[0]);
  const [customerName, setCustomerName] = useState('');

  // Reset step when closed
  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => setStep('cart'), 500);
    }
  }, [isOpen]);

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  }

  const handleCheckoutStart = () => {
    if (cart.length === 0) return;
    setStep('details');
  }

  const handlePaymentStart = () => {
    if (!customerName.trim()) {
        alert("Mohon masukkan namamu Agen!");
        return;
    }
    setStep('qris');
    // Simulate payment success
    setTimeout(() => {
        setStep('success');
    }, 5000);
  }

  const handleFinish = () => {
    onClearCart();
    onClose();
    setStep('cart');
    setCustomerName('');
  }

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer / Modal Container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#09090b] border-l-4 border-[#ccff00] z-50 flex flex-col shadow-2xl"
          >
             {/* Header */}
            <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#1a1a1a]">
                <div>
                    <h2 className="text-2xl font-black italic text-white flex items-center gap-2">
                        {step === 'cart' && <><ShoppingBag className="text-[#ccff00]" /> LIST PESANAN</>}
                        {step === 'details' && <><UtensilsCrossed className="text-[#ccff00]" /> DATA PEMESAN</>}
                        {step === 'qris' && <><Smartphone className="text-[#ccff00]" /> PEMBAYARAN</>}
                        {step === 'success' && <><CheckCircle className="text-[#ccff00]" /> SUKSES</>}
                    </h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white hover:text-black rounded-full transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                {/* Step 1: Cart Items */}
                {step === 'cart' && (
                    <div className="space-y-4">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500 font-mono">
                                <ShoppingBag size={48} className="mb-4 opacity-50" />
                                <p>KERANJANG MASIH KOSONG</p>
                                <button onClick={onClose} className="mt-4 text-[#ccff00] underline">CARI MAKANAN DULU</button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <motion.div 
                                    layout
                                    key={item.id} 
                                    className="bg-[#18181b] p-4 border border-[#333] flex gap-4 items-center group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-gray-800" />
                                    <div className="flex-1">
                                        <div className="text-[#ccff00] text-xs font-bold">{item.id}</div>
                                        <h3 className="font-bold uppercase text-white leading-tight">{item.name}</h3>
                                        <div className="text-gray-400 text-sm font-mono">{formatPrice(parseInt(item.price.replace(/\D/g,'')))}</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="font-bold text-[#ccff00]">{formatPrice(item.totalPrice)}</div>
                                        <div className="flex items-center gap-3 bg-black p-1 rounded">
                                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-[#ff4d00]"><Minus size={14} /></button>
                                            <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-[#ccff00]"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {/* Step 2: Checkout Details */}
                {step === 'details' && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase">Nama Pemesan</label>
                            <input 
                                type="text" 
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Masukkan namamu..."
                                className="w-full bg-black border-2 border-[#333] p-4 text-white focus:border-[#ccff00] outline-none font-mono placeholder:text-gray-700"
                            />
                        </div>

                        {/* Outlet Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase">Pilih Outlet</label>
                            <div className="relative">
                                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <select 
                                    value={selectedOutlet}
                                    onChange={(e) => setSelectedOutlet(e.target.value)}
                                    className="w-full bg-black border-2 border-[#333] p-4 pl-12 text-white focus:border-[#ccff00] outline-none appearance-none"
                                >
                                    {OUTLETS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Order Type */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase">Jenis Pesanan</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setOrderType('DINE_IN')}
                                    className={`p-4 border-2 font-black uppercase text-center transition-all ${orderType === 'DINE_IN' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'bg-transparent text-gray-500 border-[#333]'}`}
                                >
                                    Makan Di Sini
                                </button>
                                <button 
                                    onClick={() => setOrderType('TAKEAWAY')}
                                    className={`p-4 border-2 font-black uppercase text-center transition-all ${orderType === 'TAKEAWAY' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'bg-transparent text-gray-500 border-[#333]'}`}
                                >
                                    Bungkus (Takeaway)
                                </button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-[#1a1a1a] p-4 border border-dashed border-gray-600 mt-8">
                             <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>TOTAL ITEM</span>
                                <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
                             </div>
                             <div className="flex justify-between text-xl font-black text-white">
                                <span>TOTAL HARGA</span>
                                <span className="text-[#ccff00]">{formatPrice(totalAmount)}</span>
                             </div>
                        </div>
                    </div>
                )}

                {/* Step 3: QRIS */}
                {step === 'qris' && (
                    <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-300">
                        <div className="bg-white p-4 rounded-lg mb-6 relative">
                            {/* Scanning Line Animation */}
                            <motion.div 
                                className="absolute left-0 right-0 h-1 bg-[#ff4d00] shadow-[0_0_10px_#ff4d00]"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Placeholder QR */}
                            <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GeprekZeroPayment" 
                                alt="QRIS" 
                                className="w-48 h-48 mix-blend-multiply"
                            />
                        </div>
                        <p className="text-center font-mono text-sm text-gray-400 mb-2">SCAN QRIS UNTUK MEMBAYAR</p>
                        <h3 className="text-3xl font-black text-white mb-8">{formatPrice(totalAmount)}</h3>
                        
                        <div className="flex items-center gap-2 text-[#ccff00] animate-pulse">
                            <div className="w-2 h-2 bg-[#ccff00] rounded-full" />
                            <span className="font-bold tracking-widest text-xs">MENUNGGU KONFIRMASI...</span>
                        </div>

                        <div className="mt-8 text-xs text-gray-600 text-center max-w-[200px]">
                            * Ini hanya simulasi. Otomatis lunas dalam 5 detik.
                        </div>
                    </div>
                )}

                 {/* Step 4: Success */}
                 {step === 'success' && (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-500">
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-24 h-24 bg-[#ccff00] rounded-full flex items-center justify-center mb-6 text-black"
                        >
                            <CheckCircle size={48} strokeWidth={3} />
                        </motion.div>
                        <h2 className="text-4xl font-black italic text-white mb-2">ORDER DITERIMA</h2>
                        <p className="text-gray-400 font-mono mb-8">No. Order: #{Math.floor(Math.random() * 99999)}</p>
                        
                        <div className="bg-[#1a1a1a] p-6 w-full text-left border-l-4 border-[#ccff00]">
                            <p className="text-xs text-gray-500 uppercase">Pemesan</p>
                            <p className="font-bold text-lg mb-4">{customerName}</p>
                            
                            <p className="text-xs text-gray-500 uppercase">Status</p>
                            <p className="font-bold text-[#ccff00] mb-4">SEDANG DISIAPKAN</p>

                            <p className="text-xs text-gray-500 uppercase">Lokasi</p>
                            <p className="font-bold text-sm">{selectedOutlet}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#333] bg-black">
                {step === 'cart' && (
                    <button 
                        onClick={handleCheckoutStart}
                        disabled={cart.length === 0}
                        className="w-full bg-[#ccff00] text-black font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>LANJUT KE PEMBAYARAN</span>
                        <div className="bg-black text-[#ccff00] text-xs px-2 py-0.5 font-mono">{formatPrice(totalAmount)}</div>
                    </button>
                )}
                
                {step === 'details' && (
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setStep('cart')}
                            className="w-1/3 border-2 border-[#333] text-gray-400 font-bold uppercase hover:bg-[#333] transition-colors"
                        >
                            KEMBALI
                        </button>
                        <button 
                            onClick={handlePaymentStart}
                            className="w-2/3 bg-[#ff4d00] text-white font-black uppercase py-4 hover:bg-red-500 transition-colors"
                        >
                            BAYAR
                        </button>
                    </div>
                )}

                {step === 'success' && (
                     <button 
                        onClick={handleFinish}
                        className="w-full bg-white text-black font-black uppercase py-4 hover:bg-[#ccff00] transition-colors"
                    >
                        TUTUP
                    </button>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSystem;