import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, MapPin, Clock, Phone, Mail, Send, Check } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer id="footer" className="bg-luxury border-t border-gold/15 py-16 text-xs text-cream-200/60 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Information Column */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-widest gold-gradient-text uppercase">
              SRM
            </span>
            <span className="text-[10px] text-rosegold uppercase tracking-[0.2em] -mt-0.5">
              Sweets & Cakes
            </span>
          </div>
          <p className="leading-relaxed text-cream-200/50">
            For over four decades, crafting absolute perfection for royal celebrations, festivals, and elegant daily gatherings across Chennai.
          </p>
          <div className="flex gap-2.5 pt-2">
            <span className="text-[10px] text-gold uppercase tracking-widest border border-gold/20 px-2 py-0.5 rounded font-mono">
              ★ Edible Gold Certified
            </span>
            <span className="text-[10px] text-gold uppercase tracking-widest border border-gold/20 px-2 py-0.5 rounded font-mono">
              ★ Desi Ghee Pure A2
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold text-cream-100 uppercase tracking-wider">
            Discover
          </h4>
          <ul className="space-y-2 font-mono text-[11px]">
            {['home', 'shop', 'orders', 'wishlist'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    setActiveTab(tab as any);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold uppercase tracking-wider transition-colors cursor-pointer text-left"
                >
                  • {tab === 'shop' ? 'The Boutique' : tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Flagship Boutique Contact Info Column */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold text-cream-100 uppercase tracking-wider">
            Flagship Lounge
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <span>
                SRM Luxury Arcade, <br />
                Cathedral Road, Chennai - 600086
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-gold shrink-0" />
              <span>9:00 AM - 10:00 PM Daily</span>
            </li>
            <li className="flex items-center gap-2.5 font-mono">
              <Phone size={16} className="text-gold shrink-0" />
              <span>+91 44 2828 2828</span>
            </li>
            <li className="flex items-center gap-2.5 font-mono">
              <Mail size={16} className="text-gold shrink-0" />
              <span>luxury@srmsweets.com</span>
            </li>
          </ul>
        </div>

        {/* Elegant newsletter subscribe simulation column */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold text-cream-100 uppercase tracking-wider">
            Join the Elite Circle
          </h4>
          <p className="leading-relaxed text-cream-200/50">
            Subscribe to our private register to receive invitations to seasonal tasting menus, secret recipe notes, and limited festival reserves.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="patron@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-gold/15 hover:border-gold/30 rounded-lg py-2.5 pl-3 pr-10 text-xs text-cream-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/25"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 text-gold hover:text-gold-light transition-colors cursor-pointer"
                title="Subscribe"
              >
                <Send size={14} />
              </button>
            </div>

            {subscribed && (
              <p className="text-[10px] text-green-400 bg-green-950/20 px-2.5 py-1.5 rounded border border-green-500/15 flex items-center gap-1">
                <Check size={12} />
                <span>Welcome. Elite ledger updated.</span>
              </p>
            )}
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-cream-200/30 font-mono">
        <p>© 2026 SRM Sweets & Cakes. All Heritage Rights Reserved.</p>
        <p className="flex items-center gap-1 uppercase tracking-widest">
          <Sparkles size={10} className="text-gold" />
          <span>Crafted in Luxury Confectionery Standard</span>
        </p>
      </div>
    </footer>
  );
}
