import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function CategoryShowcase() {
  const { setActiveTab } = useShop();

  const categories = [
    {
      name: 'Cakes',
      description: 'Handcrafted premium layers of bliss and celebration.',
      count: '10 Signature Delights',
      image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=600&auto=format&fit=crop&q=80',
      badge: 'Luxe Range',
    },
    {
      name: 'Sweets',
      description: 'Traditional royal Indian sweets crafted in A2 Desi Ghee.',
      count: '10 Saffron Confections',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      badge: 'Traditional Royales',
    },
    {
      name: 'Gift Boxes',
      description: 'Velvet-lined hampers, perfect for elite corporate & home gifting.',
      count: '3 Masterpiece Collections',
      image: 'https://images.unsplash.com/photo-1549007994-cb92ca0a7a02?w=600&auto=format&fit=crop&q=80',
      badge: 'Gifting Elite',
    },
    {
      name: 'Festival Specials',
      description: 'Time-honored delicacies reserved for divine moments and seasons.',
      count: 'Seasonal Curations',
      image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
      badge: 'Limited Series',
    },
  ];

  const handleCategoryClick = () => {
    setActiveTab('shop');
  };

  return (
    <section id="category-section" className="py-20 bg-cream-100 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center justify-center gap-1.5 text-gold text-xs uppercase tracking-[0.2em] font-mono">
            <Sparkles size={12} />
            <span>Select Your Delicacy Category</span>
            <Sparkles size={12} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
            The Collections
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-chocolate-900/60 max-w-xl mx-auto font-light leading-relaxed">
            Every category represents a unique suite of baking and sweet-making expertise.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={handleCategoryClick}
              className="relative group cursor-pointer h-96 rounded-2xl overflow-hidden border border-gold/15 shadow-2xl flex flex-col justify-end"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover filter brightness-[0.6] group-hover:brightness-[0.45]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative top gold frame line */}
              <div className="absolute inset-4 border border-transparent group-hover:border-gold/20 transition-all duration-500 rounded-xl pointer-events-none z-10" />

              {/* Floating category badges */}
              <div className="absolute top-5 left-5 z-20">
                <span className="text-[9px] uppercase font-bold tracking-widest bg-chocolate-900/90 border border-gold/30 text-gold px-2.5 py-1 rounded-full shadow">
                  {cat.badge}
                </span>
              </div>

              {/* Arrow hover indicator */}
              <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-gold text-chocolate-950 flex items-center justify-center shadow-lg">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Info text box */}
              <div className="p-6 relative z-20 space-y-2 bg-gradient-to-t from-chocolate-950 via-chocolate-950/75 to-transparent">
                <h3 className="font-serif text-xl font-bold text-cream-100 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-cream-200/70 font-light leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span className="text-[10px] text-rosegold tracking-wider font-mono">
                    {cat.count}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
