import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { X, Star, Leaf, Sparkles, Scale, BookOpen, AlertCircle, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useShop();

  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [eggless, setEggless] = useState(false);
  const [sugarFree, setSugarFree] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients'>('details');

  // Simple price scaling: +50% for each size level above base
  const getSizeIndex = product.sizes.indexOf(selectedSize);
  const sizePriceMultiplier = 1 + getSizeIndex * 0.5;
  const finalSinglePrice = Math.round(product.price * sizePriceMultiplier);
  const finalTotalPrice = finalSinglePrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, {
      eggless: eggless || product.tags.some(t => t.toLowerCase() === 'eggless'),
      sugarFree: sugarFree || product.tags.some(t => t.toLowerCase() === 'sugar-free'),
      customMessage: product.category === 'Cakes' ? customMessage : '',
    });
    onClose();
  };

  return (
    <div id="quickview-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Semi-transparent outer click dismiss */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-chocolate-950 border border-gold/25 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-gold/20 text-cream-200 hover:text-gold flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left Side: Exquisite Image Gallery Frame */}
        <div className="md:w-1/2 relative bg-black/30 h-64 md:h-auto min-h-[300px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Saffron gradient glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-transparent to-black/20" />
          
          {/* Decorative Corner Filigrees */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest bg-gold/15 border border-gold/40 text-gold px-3 py-1 rounded-full font-mono font-medium backdrop-blur-sm">
              {product.category} Collection
            </span>
            <div className="flex items-center gap-1 bg-black/40 border border-gold/20 px-2 py-0.5 rounded text-[11px] text-gold">
              <Star size={11} className="fill-gold" />
              <span>{product.rating} Rating</span>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration Suite */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between h-[450px] md:h-auto">
          <div>
            {/* Header Product Details */}
            <div className="space-y-1.5 pr-6">
              <h3 className="font-serif text-2xl font-bold text-cream-100 leading-tight">
                {product.name}
              </h3>
              <p className="font-serif text-lg font-bold text-gold">
                ₹{finalSinglePrice} <span className="text-xs text-cream-200/40 font-mono font-light">({selectedSize})</span>
              </p>
            </div>

            {/* Config Sub-Tabs (Details vs Ingredients) */}
            <div className="flex border-b border-gold/10 mt-5 mb-4 p-0.5">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1.5 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === 'details' ? 'text-gold border-b-2 border-gold' : 'text-cream-200/40'
                }`}
              >
                Delicacy Info
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`ml-6 pb-1.5 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === 'ingredients' ? 'text-gold border-b-2 border-gold' : 'text-cream-200/40'
                }`}
              >
                Royal Ingredients
              </button>
            </div>

            {/* Tab Panels */}
            <div className="h-28 overflow-y-auto no-scrollbar mb-4 text-xs">
              {activeTab === 'details' ? (
                <div className="space-y-3">
                  <p className="text-cream-200/70 font-light leading-relaxed">
                    {product.description}
                  </p>
                  {product.nutritionalInfo && (
                    <div className="flex items-center gap-1.5 text-[10px] text-rosegold/70 bg-rosegold/5 border border-rosegold/10 p-2 rounded-lg">
                      <Scale size={12} className="text-gold" />
                      <span className="font-mono">{product.nutritionalInfo}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-cream-200/50 font-light italic mb-2">
                    Finest selection, quality checked by culinary masters:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients?.map((ing) => (
                      <span key={ing} className="bg-chocolate-900 border border-gold/10 text-cream-100 px-2 py-0.5 rounded text-[10px] font-mono">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customizer Controls Panel */}
            <div className="space-y-4 pt-2 border-t border-gold/10">
              
              {/* 1. Size selection */}
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold mb-2">
                  Select Size / Weight
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 border rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        selectedSize === size
                          ? 'bg-gold border-gold text-chocolate-950 font-semibold'
                          : 'bg-black/30 border-gold/15 text-cream-200 hover:border-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Special Dietary Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-1">
                {product.tags.some(t => t.toLowerCase() === 'eggless') ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-medium">
                    <Leaf size={14} className="fill-emerald-500/20 text-emerald-400" />
                    <span>100% Eggless by Recipe</span>
                  </div>
                ) : product.category === 'Cakes' ? (
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={eggless}
                      onChange={(e) => setEggless(e.target.checked)}
                      className="rounded border-gold/30 bg-black/40 text-gold focus:ring-gold focus:ring-0 cursor-pointer w-4 h-4"
                    />
                    <span className="text-xs text-cream-200/80 flex items-center gap-1">
                      <Leaf size={14} className="text-green-500 fill-green-500/20" />
                      Make Eggless (+₹50)
                    </span>
                  </label>
                ) : null}

                {product.tags.some(t => t.toLowerCase() === 'sugar-free') ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg font-medium">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>100% Sugar-free by Recipe</span>
                  </div>
                ) : product.category === 'Sweets' ? (
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sugarFree}
                      onChange={(e) => setSugarFree(e.target.checked)}
                      className="rounded border-gold/30 bg-black/40 text-gold focus:ring-gold focus:ring-0 cursor-pointer w-4 h-4"
                    />
                    <span className="text-xs text-cream-200/80 flex items-center gap-1">
                      <Sparkles size={14} className="text-gold" />
                      Sugar-free Option (+₹30)
                    </span>
                  </label>
                ) : null}
              </div>

              {/* 3. Cake custom writing message */}
              {product.category === 'Cakes' && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">
                      Message on Cake
                    </label>
                    <span className="text-[9px] text-cream-200/30 font-mono">
                      {customMessage.length}/25 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={25}
                    placeholder="E.g., Happy Birthday Chef! (Max 25)"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 placeholder-cream-200/25 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                </div>
              )}

            </div>
          </div>

          {/* Pricing Total & Add to cart button */}
          <div className="pt-4 mt-6 border-t border-gold/10 flex items-center justify-between gap-4">
            
            {/* Quantity Adjuster */}
            <div className="flex items-center bg-black/40 border border-gold/15 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-xs text-cream-200 hover:bg-gold/10 transition-colors"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-cream-100 font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-xs text-cream-200 hover:bg-gold/10 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add Action button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-gold via-rosegold to-gold hover:from-gold-light hover:to-gold-light text-chocolate-950 font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-lg shadow-gold/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <ShoppingCart size={14} />
              <span>Add to Suite • ₹{finalTotalPrice}</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
