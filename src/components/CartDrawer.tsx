import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Percent, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    clearCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Totals calculations
  const subtotal = cart.reduce((acc, item) => {
    // Basic price scaling for size index
    const sizeIndex = item.product.sizes.indexOf(item.selectedSize);
    const sizeMultiplier = 1 + (sizeIndex > -1 ? sizeIndex * 0.5 : 0);
    let itemPrice = Math.round(item.product.price * sizeMultiplier);
    
    // Extra additions
    if (item.eggless) itemPrice += 50;
    if (item.sugarFree) itemPrice += 30;

    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 1000 ? 0 : 99; // Complimentary above 1000
  
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  const grandTotal = subtotal + deliveryFee - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponError('');
    setCouponSuccess('');

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      {/* Outer Click Dismiss Backing */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={onClose} />

      {/* Cart Sheet Body */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
        className="relative w-full max-w-md h-full bg-chocolate-950 border-l border-gold/15 shadow-2xl flex flex-col justify-between z-10"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-gold" size={18} />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Shopping Suite
            </h3>
            <span className="bg-gold/10 text-gold text-[10px] px-2 py-0.5 rounded-full font-mono">
              {cart.length} delicacies
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-gold/15 text-cream-200 hover:text-gold flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Item Cards List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10 text-gold/40">
                <ShoppingBag size={28} />
              </div>
              <p className="font-serif text-sm text-cream-200/50">Your luxury suite is empty</p>
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-wider text-gold hover:underline"
              >
                Start Adding Delicacies
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const sizeIndex = item.product.sizes.indexOf(item.selectedSize);
              const sizeMultiplier = 1 + (sizeIndex > -1 ? sizeIndex * 0.5 : 0);
              let itemSinglePrice = Math.round(item.product.price * sizeMultiplier);
              if (item.eggless) itemSinglePrice += 50;
              if (item.sugarFree) itemSinglePrice += 30;

              return (
                <div
                  key={item.id}
                  className="bg-black/20 border border-gold/10 rounded-xl p-3.5 flex gap-3 hover:border-gold/20 transition-all"
                >
                  {/* Thumb image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gold/10"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-cream-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                      
                      {/* Configuration description text */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-[9px] bg-gold/5 text-rosegold border border-gold/10 px-1 py-0.2 rounded font-mono">
                          {item.selectedSize}
                        </span>
                        {item.eggless && (
                          <span className="text-[9px] bg-green-500/5 text-green-400 border border-green-500/20 px-1 py-0.2 rounded font-mono">
                            Eggless
                          </span>
                        )}
                        {item.sugarFree && (
                          <span className="text-[9px] bg-gold/5 text-gold border border-gold/15 px-1 py-0.2 rounded font-mono">
                            Sugar-Free
                          </span>
                        )}
                        {item.customMessage && (
                          <span className="text-[9px] bg-blue-500/5 text-blue-300 border border-blue-500/20 px-1 py-0.2 rounded italic line-clamp-1 max-w-[150px]">
                            "{item.customMessage}"
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Counter */}
                      <div className="flex items-center bg-black/40 border border-gold/10 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-cream-200 hover:bg-gold/10"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs text-cream-100 font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-cream-200 hover:bg-gold/10"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing / Delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gold font-mono">
                          ₹{itemSinglePrice * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-cream-200/40 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Calculations / Promotional coupon panel */}
        {cart.length > 0 && (
          <div className="p-6 bg-black/30 border-t border-gold/10 space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMOCODE"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-black/40 border border-gold/15 rounded-lg px-3 py-2 text-xs text-cream-100 uppercase tracking-widest placeholder-cream-200/20 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-chocolate-950 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Promo feedback */}
            {couponError && (
              <p className="text-[10px] text-red-400 bg-red-950/20 px-2.5 py-1.5 rounded border border-red-500/20">{couponError}</p>
            )}
            {couponSuccess && (
              <p className="text-[10px] text-green-400 bg-green-950/20 px-2.5 py-1.5 rounded border border-green-500/20 flex items-center justify-between">
                <span>{couponSuccess}</span>
                <button type="button" onClick={clearCoupon} className="text-xs hover:underline text-gold ml-2">Remove</button>
              </p>
            )}

            {/* Receipt Summary details */}
            <div className="space-y-2 pt-2 border-t border-gold/5 text-xs font-light">
              <div className="flex justify-between">
                <span className="text-cream-200/50">Subtotal</span>
                <span className="text-cream-100 font-mono">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-cream-200/50">Gourmet Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-gold font-mono text-[10px] uppercase font-semibold">Complimentary</span>
                ) : (
                  <span className="text-cream-100 font-mono">₹{deliveryFee}</span>
                )}
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Privilege Code ({appliedCoupon.code})</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-gold/10 font-bold text-sm">
                <span className="text-cream-100 font-serif">Grand Total</span>
                <span className="gold-gradient-text font-mono text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action button */}
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-gold via-rosegold to-gold hover:from-gold-light hover:to-gold-light text-chocolate-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-gold/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 group mt-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[9px] text-cream-200/35 uppercase tracking-widest mt-2">
              <ShieldCheck size={11} className="text-gold" />
              <span>Royal Secure Checkout Protocol</span>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
