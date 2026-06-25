import { TESTIMONIALS } from '../data';
import { Star, Quote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="py-20 bg-cream-100 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center justify-center gap-1.5 text-gold text-xs uppercase tracking-[0.2em] font-mono">
            <Sparkles size={12} />
            <span>Words of the Connoisseurs</span>
            <Sparkles size={12} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
            Patron Testimonials
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-chocolate-900/60 max-w-xl mx-auto font-light leading-relaxed">
            Discover what elite gourmands say about SRM Sweets & Cakes’ premium culinary artistry.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative bg-white border border-rosegold/20 hover:border-gold/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-lg"
            >
              {/* Background gradient blur glow on card hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              {/* Decorative Quote Icon */}
              <div className="absolute -top-4 -left-2 text-gold/5 pointer-events-none">
                <Quote size={80} />
              </div>

              {/* Stars Rating and quote */}
              <div className="space-y-4 relative z-10">
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="text-gold fill-gold" size={14} />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-chocolate-900/80 leading-relaxed font-light italic">
                  "{test.comment}"
                </p>
              </div>

              {/* User Avatar, Name and Designation */}
              <div className="flex items-center gap-4 mt-8 border-t border-chocolate-900/10 pt-4 relative z-10">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-11 h-11 object-cover rounded-full border border-gold/40 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-chocolate-900 group-hover:text-gold transition-colors">
                    {test.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-chocolate-800/70 font-mono">
                    {test.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
