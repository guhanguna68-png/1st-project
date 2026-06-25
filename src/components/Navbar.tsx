import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, LogOut, User as UserIcon, Search, Menu, X, Star } from 'lucide-react';

interface NavbarProps {
  onCartToggle: () => void;
}

export default function Navbar({ onCartToggle }: NavbarProps) {
  const {
    user,
    logout,
    cart,
    wishlist,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'shop') {
      setActiveTab('shop');
    }
  };

  const navLinks: { id: typeof activeTab; label: string }[] = [
    { id: 'home', label: 'Home Suite' },
    { id: 'shop', label: 'The Boutique' },
    { id: 'orders', label: 'My Orders' },
    { id: 'wishlist', label: 'Wishlist' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-luxury/95 backdrop-blur-md border-b border-gold/15 shadow-xl py-3'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Menu Switcher (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream-100 hover:text-gold transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Luxury Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest gold-gradient-text uppercase">
                SRM
              </span>
              <span className="text-[10px] sm:text-xs text-rosegold/80 uppercase tracking-widest border border-gold/30 px-1 rounded font-mono">
                Luxe
              </span>
            </div>
            <span className="text-[9px] text-cream-200/50 uppercase tracking-[0.25em] -mt-0.5 font-light">
              Sweets & Cakes
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSearchQuery('');
                }}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 relative py-1 hover:text-gold ${
                  activeTab === link.id ? 'text-gold font-semibold' : 'text-cream-200/70'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Search, Cart, Wishlist, Profile Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Search Bar */}
            <div className="relative hidden sm:block w-40 md:w-56">
              <input
                type="text"
                placeholder="Search delicacies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-black/30 border border-gold/15 hover:border-gold/30 rounded-full py-1.5 pl-8 pr-3 text-xs text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
              />
              <Search className="absolute left-2.5 top-2 text-gold/50" size={14} />
            </div>

            {/* Mobile Search Button (Quick activation) */}
            <button
              onClick={() => {
                setActiveTab('shop');
                const element = document.getElementById('search-input');
                if (element) element.focus();
              }}
              className="sm:hidden text-cream-200/70 hover:text-gold transition-colors p-1"
              title="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setActiveTab('wishlist');
                setSearchQuery('');
              }}
              className="relative text-cream-200/70 hover:text-gold transition-colors p-1 cursor-pointer"
              title="Wishlist"
            >
              <Heart size={18} className={wishlist.length > 0 ? 'fill-gold text-gold' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-gold text-chocolate-950 font-mono font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="relative text-cream-200/70 hover:text-gold transition-colors p-1 cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-gradient-to-r from-gold to-rosegold text-chocolate-950 font-mono font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1 bg-gradient-to-b from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 px-2.5 py-1.5 rounded-full text-xs text-rosegold font-light transition-all cursor-pointer"
              >
                <UserIcon size={14} className="text-gold" />
                <span className="hidden lg:inline max-w-[80px] truncate">{user?.name}</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl bg-luxury border border-gold/20 shadow-2xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gold/10">
                    <p className="text-xs font-semibold text-cream-100 truncate">{user?.name}</p>
                    <p className="text-[10px] text-cream-200/50 truncate font-light mt-0.5">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-cream-200 hover:bg-white/5 hover:text-gold transition-all flex items-center gap-2"
                  >
                    <Star size={12} className="text-gold" />
                    My Order Suite
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-950/20 transition-all flex items-center gap-2 border-t border-gold/5 mt-1"
                  >
                    <LogOut size={12} />
                    Depart Lounge
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-luxury/98 backdrop-blur-lg border-b border-gold/15 py-4 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSearchQuery('');
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs uppercase tracking-widest font-medium py-1 ${
                  activeTab === link.id ? 'text-gold' : 'text-cream-200/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
