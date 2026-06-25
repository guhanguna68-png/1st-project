import { useState } from 'react';
import { FESTIVAL_OFFERS } from '../data';
import { Gift, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FestivalOffers() {
  const [unveiledCode, setUnveiledCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleUnveil = (code: string) => {
    setUnveiledCode(unveiledCode === code ? null : code);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers-section" className="py-20 bg-cream-100 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center justify-center gap-1.5 text-gold text-xs uppercase tracking-[0.2em] font-mono">
            <Gift size={12} className="animate-bounce" />
            <span>Exclusive Festive Privileges</span>
            <Gift size={12} className="animate-bounce" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
            Royal Festival Offers
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-chocolate-900/60 max-w-xl mx-auto font-light leading-relaxed">
            Unveil our special festive credentials to unlock royal discounts during checkout.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FESTIVAL_OFFERS.map((offer) => {
            const isUnveiled = unveiledCode === offer.code;
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="relative bg-white border border-rosegold/20 rounded-2xl p-6 md:p-8 overflow-hidden flex flex-col justify-between h-72 transition-all duration-300 hover:border-gold/40 group shadow-sm hover:shadow-lg"
              >
                {/* Background ambient gold shine */}
                <div className="absolute -right-20 -top-20 w-44 h-44 bg-gold/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-gold/10 transition-all duration-500" />
                <div className="absolute -left-20 -bottom-20 w-44 h-44 bg-rosegold/5 rounded-full filter blur-3xl pointer-events-none" />

                {/* Card Title Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold">
                      <Sparkles size={16} />
                    </span>
                    <h3 className="font-serif text-base font-bold text-chocolate-900 group-hover:text-gold transition-colors">
                      {offer.title}
                    </h3>
                  </div>
                  <p className="text-xs text-chocolate-900/70 font-light leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Flip Interaction Area */}
                <div className="pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                  
                  {/* Status Indicator Info */}
                  <div className="flex items-center gap-1.5 text-[10px] text-rosegold/70 font-mono">
                    <AlertCircle size={12} className="text-gold" />
                    <span>Min. Purchase ₹{offer.minAmount}</span>
                  </div>

                  {/* Envelope Unveil Action */}
                  <AnimatePresence mode="wait">
                    {!isUnveiled ? (
                      <motion.button
                        key="seal-button"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => handleUnveil(offer.code)}
                        className="bg-gradient-to-r from-gold to-rosegold text-chocolate-950 font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-lg shadow cursor-pointer transition-all active:scale-95 flex items-center gap-1"
                      >
                        <Gift size={12} />
                        <span>Break Seal</span>
                      </motion.button>
                    ) : (
                      <motion.div
                        key="coupon-revealed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 bg-black/40 border border-gold/30 rounded-lg p-1.5"
                      >
                        <span className="font-mono text-xs font-bold text-gold tracking-widest px-3 uppercase">
                          {offer.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(offer.code)}
                          className="bg-gold/10 hover:bg-gold/20 text-gold p-2 rounded-md border border-gold/20 cursor-pointer transition-all flex items-center gap-1 text-[9px] uppercase tracking-widest font-semibold"
                          title="Copy Code"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} className="text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
