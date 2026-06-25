import { useShop } from '../context/ShopContext';
import { STATS_COUNTERS } from '../data';
import { ArrowRight, Star, Clock, Sparkles, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const { setActiveTab } = useShop();

  return (
    <div id="hero-section" className="relative min-h-screen flex items-center bg-chocolate-950 overflow-hidden pt-16">
      
      {/* Background elegant image with high dark overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1600&auto=format&fit=crop&q=80"
          alt="Premium Luxury Bakery Backdrop"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-chocolate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate-950 via-transparent to-chocolate-950" />
      </div>

      {/* Floating Sparkle and Gold-line aesthetics */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-rosegold/5 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Fine Crown Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/15 to-transparent border border-gold/30 px-3 py-1.5 rounded-full shadow-lg"
            >
              <Sparkles size={14} className="text-gold animate-spin-slow" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold">
                ESTABLISHED 1985 • ROYAL CONFECTIONERS
              </span>
            </motion.div>

            {/* Captivating Headers */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-100 leading-tight"
              >
                Gourmet Artistry, <br />
                <span className="gold-gradient-text">Royal Confections</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-base text-cream-200/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Indulge in a world of masterfully baked delicacies. SRM Sweets & Cakes brings together centuries-old royal Indian sweet traditions and modern luxury European baking. Every bite is hand-painted and curated to absolute perfection.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full sm:w-auto bg-gradient-to-r from-gold via-rosegold to-gold hover:from-gold-light hover:to-gold-light text-chocolate-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-gold/15 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Browse The Boutique</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('category-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-black/40 hover:bg-white/5 text-cream-100 border border-gold/30 hover:border-gold px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Our Heritage</span>
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-6 border-t border-gold/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left"
            >
              {STATS_COUNTERS.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text tracking-wide">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-cream-200/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Luxury Rotating Imagery Right Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              className="relative w-72 h-72 sm:w-96 sm:h-96"
            >
              {/* Outer spinning gold decorative ring */}
              <div className="absolute inset-0 border border-dashed border-gold/30 rounded-full animate-spin-slow pointer-events-none" />
              
              {/* Golden circular frame */}
              <div className="absolute inset-4 border border-gold/20 rounded-full p-2 bg-gradient-to-b from-gold/10 to-transparent">
                <div className="w-full h-full rounded-full overflow-hidden border border-gold/40 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
                    alt="Belgian Chocolate Truffle Cake"
                    className="w-full h-full object-cover filter brightness-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Image gold vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Float overlays */}
              <div className="absolute -top-4 -right-4 bg-chocolate-900 border border-gold/30 p-3 rounded-2xl shadow-xl animate-float flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gold/10 text-gold">
                  <Star size={16} className="fill-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream-200/50">Signature Selection</p>
                  <p className="font-serif text-xs font-bold text-gold">Belgian Truffle</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-chocolate-900 border border-gold/30 p-3 rounded-2xl shadow-xl animate-float-slow flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gold/10 text-gold">
                  <ChefHat size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream-200/50">Gold Medalist</p>
                  <p className="font-serif text-xs font-bold text-gold">Handmade Daily</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
