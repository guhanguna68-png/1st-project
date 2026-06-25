import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Product } from './types';
import { PRODUCTS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Testimonials from './components/Testimonials';
import FestivalOffers from './components/FestivalOffers';
import Footer from './components/Footer';
import Login from './components/Login';
import { Sparkles, ArrowRight, Heart, ShoppingBag, Eye, Star, SlidersHorizontal, CheckCircle, Flame, Truck, ChefHat, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function MainAppContent() {
  const {
    user,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    wishlist,
    cart,
    orders,
  } = useShop();

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Shop state (Filters & Sorting)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Order status simulator state
  const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: string }>({});

  // Sync active categories when category changes
  const handleCategoryPill = (cat: string) => {
    setSelectedCategory(cat);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Filter & Sort Products
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category check
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    // 2. Tag check (Eggless, Sugar-Free, Bestseller)
    const matchesTag =
      selectedTag === 'All' ||
      (selectedTag === 'Eggless' && (product.tags.includes('Eggless') || product.category === 'Cakes')) ||
      (selectedTag === 'Sugar-Free' && product.tags.includes('Sugar-Free')) ||
      (selectedTag === 'Bestseller' && (product.tags.includes('Bestseller') || product.tags.includes('Best Seller')));

    // 3. Search query check
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTag && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default (Featured)
  });

  // Automatically switch tab when search is fired
  useEffect(() => {
    if (searchQuery.trim() && activeTab !== 'shop') {
      setActiveTab('shop');
    }
  }, [searchQuery]);

  // Order status progression simulation
  const advanceOrderStatus = (orderId: string) => {
    const currentStatus = orderStatuses[orderId] || 'Pending';
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'Baking';
    else if (currentStatus === 'Baking') nextStatus = 'Out for Delivery';
    else if (currentStatus === 'Out for Delivery') nextStatus = 'Delivered';
    else nextStatus = 'Pending';

    setOrderStatuses((prev) => ({ ...prev, [orderId]: nextStatus }));
  };

  // If user is not logged in, render the animated premium login screen
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-cream-100 text-chocolate-900 flex flex-col font-sans select-none">
      
      {/* 1. Navigations */}
      <Navbar onCartToggle={() => setCartOpen(true)} />

      {/* 2. Main Views Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* --- HOMEPAGE VIEW --- */}
          {activeTab === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Fullscreen Hero Banner */}
              <Hero />

              {/* Collections Categories */}
              <CategoryShowcase />

              {/* Bestselling Delicacies Grid */}
              <section className="py-20 bg-cream-100 border-t border-gold/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.2em] font-mono">
                        <Sparkles size={12} />
                        <span>Curated Selections</span>
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-chocolate-900">
                        Bestselling Masterpieces
                      </h3>
                      <p className="text-xs text-chocolate-900/60 font-light">
                        Our highest rated cakes and sweets, hand-finished with luxury detailing.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('shop')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-light transition-colors group cursor-pointer"
                    >
                      <span>Explore Boutique</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* 4 bestselling items showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter((p) => p.tags.includes('Bestseller'))
                      .slice(0, 4)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onQuickView={(p) => setQuickViewProduct(p)}
                        />
                      ))}
                  </div>

                </div>
              </section>

              {/* Interactive Festival Promotions */}
              <FestivalOffers />

              {/* Testimonials */}
              <Testimonials />

              {/* Footer */}
              <Footer />
            </motion.div>
          )}

          {/* --- SHOP/BOUTIQUE VIEW --- */}
          {activeTab === 'shop' && (
            <motion.div
              key="shop-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-28 pb-16"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Titles */}
                <div className="text-center space-y-3 mb-12">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold font-mono bg-gold/5 border border-gold/20 px-3 py-1 rounded-full">
                    Sweets & Cakes Boutique
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                    The Gourmet Register
                  </h2>
                  <p className="text-xs sm:text-sm text-chocolate-900/60 max-w-xl mx-auto font-light leading-relaxed">
                    Filter through our collection of premium cakes, pure ghee confections, corporate gift packs, and limited reserves.
                  </p>
                </div>

                {/* Filters & Control Panel bar */}
                <div className="bg-white border border-rosegold/20 p-5 rounded-2xl mb-8 space-y-4 shadow-sm">
                  
                  {/* Category Pills Scroller */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['All', 'Cakes', 'Sweets', 'Gift Boxes', 'Bakery Items', 'Festival Specials'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-chocolate-900 text-white font-bold'
                            : 'bg-cream-100/60 border border-rosegold/15 text-chocolate-900 hover:border-rosegold/30 hover:bg-cream-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Detail Tag Selectors and Search input details */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-rosegold/10">
                    
                    {/* Tag selectors */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <span className="text-[10px] uppercase tracking-wider text-rosegold font-mono flex items-center gap-1">
                        <SlidersHorizontal size={12} />
                        <span>Filter:</span>
                      </span>
                      <div className="flex gap-1.5">
                        {['All', 'Bestseller', 'Eggless', 'Sugar-Free'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                              selectedTag === tag
                                ? 'bg-gold/15 border border-gold text-chocolate-900 font-bold'
                                : 'bg-cream-100/40 border border-rosegold/10 text-chocolate-900/60 hover:border-rosegold/25'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sorting and Search Fields */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      
                      {/* Search for Mobile/Standard */}
                      <input
                        id="search-input"
                        type="text"
                        placeholder="Type to filter..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-cream-100/30 border border-rosegold/25 rounded-lg py-1.5 px-3 text-xs text-chocolate-900 placeholder-chocolate-900/40 focus:outline-none focus:border-gold w-full md:w-44"
                      />

                      {/* Sort Dropdown */}
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-cream-100/30 border border-rosegold/25 rounded-lg py-1.5 px-3 text-xs text-chocolate-900 cursor-pointer focus:outline-none focus:border-gold"
                      >
                        <option value="featured">Sort: Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating: Highest</option>
                      </select>
                    </div>

                  </div>

                </div>

                 {/* Complete Products Dynamic Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-gold/5 rounded-full border border-gold/15 flex items-center justify-center mx-auto text-gold/40">
                      <Sparkles size={24} />
                    </div>
                    <p className="font-serif text-base text-chocolate-900">No delicacies found in search</p>
                    <p className="text-xs text-chocolate-900/60">Try adjusting your category pills or search keyword.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={(p) => setQuickViewProduct(p)}
                      />
                    ))}
                  </div>
                )}

              </div>
              <Footer />
            </motion.div>
          )}

          {/* --- MY ORDERS SUITE VIEW --- */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-28 pb-16"
            >
              <div className="max-w-3xl mx-auto px-4">
                
                {/* Header Titles */}
                <div className="text-center space-y-2 mb-12">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold font-mono">
                    Past & Active Transactions
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-chocolate-900">
                    My Order Suite
                  </h2>
                  <p className="text-xs text-chocolate-900/60">Trace your premium baking orders and simulated dispatch logs in real-time.</p>
                </div>

                {/* Past Orders cards */}
                {orders.length === 0 ? (
                  <div className="bg-white border border-rosegold/20 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 bg-gold/5 rounded-full border border-gold/15 flex items-center justify-center mx-auto text-gold/40">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="font-serif text-base text-chocolate-900">No Orders Registered Yet</p>
                    <p className="text-xs text-chocolate-900/60 font-light">Fill up your shopping suite with SRM delicacies to trace order progress.</p>
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="inline-flex bg-chocolate-900 hover:bg-chocolate-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-md cursor-pointer transition-all"
                    >
                      Browse Boutique
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const currentStatus = orderStatuses[order.id] || order.status;

                      return (
                        <div
                          key={order.id}
                          className="bg-white border border-rosegold/25 rounded-2xl p-6 relative overflow-hidden shadow-sm"
                        >
                          {/* Top bar */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-chocolate-900/10 pb-4 mb-4 gap-2">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-rosegold font-mono">Order Reference</p>
                              <p className="text-xs font-bold text-chocolate-900 font-mono">{order.id}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-rosegold font-mono text-left sm:text-right">Placed On</p>
                              <p className="text-xs text-chocolate-900/75 font-mono">{order.date}</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-[10px] uppercase tracking-wider text-rosegold font-mono">Grand Total Paid</p>
                              <p className="text-sm font-bold text-chocolate-900 font-mono">₹{order.totalAmount}</p>
                            </div>
                          </div>

                          {/* Ordered Items summary details */}
                          <div className="space-y-2.5 mb-6 bg-cream-100/50 p-4 rounded-xl">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-xs font-light text-chocolate-900/80">
                                <div>
                                  <span className="font-semibold text-chocolate-900 pr-1">{item.product.name}</span>
                                  <span className="text-[10px] bg-gold/15 text-chocolate-950 px-1 rounded font-mono font-bold">{item.selectedSize}</span>
                                  {item.eggless && <span className="text-[9px] text-green-600 pl-1.5 font-mono font-medium">• Eggless</span>}
                                  {item.sugarFree && <span className="text-[9px] text-gold-dark pl-1.5 font-mono font-medium">• Sugar-free</span>}
                                </div>
                                <span className="font-mono text-chocolate-900 font-semibold">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {/* Real-time Order Status Progress bar */}
                          <div className="space-y-4 mb-4">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-chocolate-800/75">
                              <span>Active Baking Progress Tracker</span>
                              <span className="text-gold-dark font-bold">{currentStatus}</span>
                            </div>

                            <div className="grid grid-cols-4 gap-1">
                              {/* 1. Pending */}
                              <div className="space-y-1.5 text-center">
                                <div className={`h-1.5 rounded-full ${['Pending', 'Baking', 'Out for Delivery', 'Delivered'].includes(currentStatus) ? 'bg-gold' : 'bg-chocolate-900/10'}`} />
                                <span className="text-[8px] uppercase tracking-wider block text-chocolate-900/50">Received</span>
                              </div>
                              {/* 2. Baking */}
                              <div className="space-y-1.5 text-center">
                                <div className={`h-1.5 rounded-full ${['Baking', 'Out for Delivery', 'Delivered'].includes(currentStatus) ? 'bg-gold' : 'bg-chocolate-900/10'}`} />
                                <span className="text-[8px] uppercase tracking-wider block text-chocolate-900/50">Baking Suite</span>
                              </div>
                              {/* 3. Out for delivery */}
                              <div className="space-y-1.5 text-center">
                                <div className={`h-1.5 rounded-full ${['Out for Delivery', 'Delivered'].includes(currentStatus) ? 'bg-gold' : 'bg-chocolate-900/10'}`} />
                                <span className="text-[8px] uppercase tracking-wider block text-chocolate-900/50">Dispatched</span>
                              </div>
                              {/* 4. Delivered */}
                              <div className="space-y-1.5 text-center">
                                <div className={`h-1.5 rounded-full ${currentStatus === 'Delivered' ? 'bg-gold' : 'bg-chocolate-900/10'}`} />
                                <span className="text-[8px] uppercase tracking-wider block text-chocolate-900/50">Delivered</span>
                              </div>
                            </div>
                          </div>

                          {/* Simulation Control tool */}
                          <div className="pt-4 border-t border-chocolate-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-[9px] text-chocolate-900/50 uppercase tracking-wider font-light flex items-center gap-1">
                              <CheckCircle size={10} className="text-gold" />
                              <span>Gourmet Delivery Code Certified Secure</span>
                            </p>
                            
                            <button
                              type="button"
                              onClick={() => advanceOrderStatus(order.id)}
                              className="bg-chocolate-900/5 hover:bg-chocolate-900/10 text-chocolate-900 border border-chocolate-900/20 px-4 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              {currentStatus === 'Pending' && <><ChefHat size={12} /><span>Simulate Baking</span></>}
                              {currentStatus === 'Baking' && <><Truck size={12} /><span>Simulate Dispatch</span></>}
                              {currentStatus === 'Out for Delivery' && <><CheckCircle size={12} /><span>Simulate Arrival</span></>}
                              {currentStatus === 'Delivered' && <><Timer size={12} /><span>Reset Status</span></>}
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
              <Footer />
            </motion.div>
          )}

          {/* --- WISHLIST VIEW --- */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-28 pb-16"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Titles */}
                <div className="text-center space-y-2 mb-12">
                   <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold font-mono">
                     My Saved Secrets
                   </span>
                   <h2 className="font-serif text-3xl font-bold text-chocolate-900">
                     Sweets Wishlist
                   </h2>
                   <p className="text-xs text-chocolate-900/60 font-light">Delicacies earmarked for your future royal feasts and celebration menus.</p>
                </div>

                {/* Wishlist grid items */}
                {wishlist.length === 0 ? (
                  <div className="bg-white border border-rosegold/20 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                    <div className="w-16 h-16 bg-gold/5 rounded-full border border-gold/15 flex items-center justify-center mx-auto text-gold/40">
                      <Heart size={24} />
                    </div>
                    <p className="font-serif text-base text-chocolate-900">Wishlist is empty</p>
                    <p className="text-xs text-chocolate-900/60 font-light">Earmark delicacies with the heart icon to save them here.</p>
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="inline-flex bg-chocolate-900 hover:bg-chocolate-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow shadow-chocolate-900/10 cursor-pointer transition-all"
                    >
                      Browse Boutique
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter((product) => wishlist.includes(product.id)).map(
                      (product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onQuickView={(p) => setQuickViewProduct(p)}
                        />
                      )
                    )}
                  </div>
                )}

              </div>
              <Footer />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Floating sheets, drawers and checkout controls */}
      {/* Shopping Cart Slider Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={() => setCheckoutOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Checkout details Invoicing form */}
      <AnimatePresence>
        {checkoutOpen && (
          <CheckoutModal
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Quick View Customization Sheet */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
