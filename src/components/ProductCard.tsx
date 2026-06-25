import React from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Heart, Star, Sparkles, MessageSquareCode } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const isStarred = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default values for quick-add
    const defaultOptions = {
      eggless: product.category === 'Cakes', // default cakes to eggless
      sugarFree: false,
      customMessage: '',
    };
    addToCart(product, 1, product.sizes[0], defaultOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white border border-rosegold/20 hover:border-gold/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-[480px]"
    >
      {/* Favorite wish-button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 hover:border-gold/30 text-cream-200 hover:text-gold flex items-center justify-center transition-all cursor-pointer"
        title={isStarred ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart size={16} className={isStarred ? 'fill-gold text-gold scale-110' : 'transition-transform hover:scale-110'} />
      </button>

      {/* Badges container */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.tags.map((tag) => {
          let badgeStyle = "bg-chocolate-950/90 border border-gold/25 text-gold";
          const lowerTag = tag.toLowerCase();
          if (lowerTag === 'eggless') {
            badgeStyle = "bg-emerald-950/95 border border-emerald-400/40 text-emerald-300";
          } else if (lowerTag === 'sugar-free') {
            badgeStyle = "bg-amber-950/95 border border-amber-400/40 text-amber-300";
          } else if (lowerTag === 'bestseller' || lowerTag === 'best seller') {
            badgeStyle = "bg-red-950/95 border border-red-500/40 text-red-300 font-extrabold tracking-wider";
          }
          return (
            <span
              key={tag}
              className={`text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-md ${badgeStyle}`}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => onQuickView(product)}
        className="relative h-60 w-full overflow-hidden bg-black/20 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.95] group-hover:brightness-[0.85]"
          referrerPolicy="no-referrer"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Description Content Card */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        
        <div className="space-y-2">
          {/* Rating, Category Info */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-chocolate-800/65 font-medium font-mono">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-gold/5 border border-gold/20 px-1.5 py-0.5 rounded text-[10px]">
              <Star className="text-gold fill-gold" size={10} />
              <span className="font-bold text-gold font-mono">{product.rating}</span>
              <span className="text-chocolate-900/40 font-light font-mono">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h4
            onClick={() => onQuickView(product)}
            className="font-serif text-base font-bold text-chocolate-900 hover:text-gold transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h4>

          {/* Description Snippet */}
          <p className="text-xs text-chocolate-900/60 font-light leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing / CTA Section */}
        <div className="space-y-4 pt-3">
          <div className="flex items-baseline justify-between border-t border-chocolate-900/10 pt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-chocolate-800/60">From</span>
              <span className="font-serif text-lg font-bold text-chocolate-900 tracking-wide">
                ₹{product.price}
              </span>
              <span className="text-[10px] text-chocolate-900/40 font-mono">
                / {product.sizes[0]}
              </span>
            </div>
            {product.customizable && (
              <span className="flex items-center gap-1 text-[9px] text-chocolate-800 font-mono bg-gold/10 border border-gold/20 px-1.5 py-0.5 rounded">
                <MessageSquareCode size={10} />
                <span>Custom</span>
              </span>
            )}
          </div>

          {/* Buy Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="w-full bg-transparent hover:bg-chocolate-900/5 text-chocolate-900 border border-chocolate-900/20 py-2 rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer text-center"
            >
              Configure
            </button>
            <button
              onClick={handleQuickAdd}
              className="w-full bg-chocolate-900 hover:bg-chocolate-800 text-white py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer text-center shadow-md shadow-chocolate-900/10"
            >
              Quick Add
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
