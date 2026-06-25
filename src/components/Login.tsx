import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Cake, Cookie, Sparkles, Mail, Phone, Lock, Eye, EyeOff, Star, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useShop();
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to personalize your royal experience.');
      return;
    }
    if (loginMethod === 'email' && !email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (loginMethod === 'mobile' && !phone.trim()) {
      setError('Please enter your mobile number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    // Successful login simulation
    login(name, loginMethod === 'email' ? email : phone, phone);
  };

  // Drifting decorative background elements
  const floatingIcons = [
    { Icon: Cake, left: '10%', top: '15%', delay: 0, size: 36, speed: 6 },
    { Icon: Cookie, left: '85%', top: '20%', delay: 2, size: 28, speed: 8 },
    { Icon: Sparkles, left: '75%', top: '75%', delay: 1, size: 32, speed: 7 },
    { Icon: Star, left: '20%', top: '80%', delay: 3, size: 24, speed: 9 },
  ];

  return (
    <div id="login-container" className="relative min-h-screen flex items-center justify-center bg-chocolate-950 overflow-hidden px-4 py-12">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,24,16,0.8)_0%,rgba(17,17,17,1)_100%)] z-0" />
      
      {/* Decorative luxury arches/circles in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-rosegold/5 rounded-full pointer-events-none z-0" />

      {/* Floating drifting bakery icons */}
      {floatingIcons.map(({ Icon, left, top, delay, size, speed }, idx) => (
        <motion.div
          key={idx}
          className="absolute text-gold/15 hidden sm:block pointer-events-none z-0"
          style={{ left, top }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-md z-10"
      >
        <div className="glass-panel p-8 rounded-2xl shadow-2xl relative border border-gold/20 overflow-hidden">
          {/* Card subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          {/* SRM Branding */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-gold to-chocolate-900 border border-gold/40 shadow-lg shadow-gold/10 mb-4"
            >
              <Cake className="text-cream-100 animate-pulse" size={32} />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold tracking-wider gold-gradient-text">
              SRM
            </h1>
            <p className="font-serif text-sm text-rosegold tracking-widest uppercase mt-1">
              Sweets & Cakes
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-3" />
            <p className="text-xs text-cream-200/70 tracking-wide font-light">
              Enter the world of gourmet baking & traditional royalty
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input - Always required for personalization */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-rosegold mb-1">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Royal Guest Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-gold/20 rounded-lg py-2.5 pl-3 pr-10 text-cream-100 placeholder-cream-200/30 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                />
                <Star className="absolute right-3 top-3 text-gold/40" size={16} />
              </div>
            </div>

            {/* Email / Mobile Switcher Tab */}
            <div className="flex border-b border-gold/10 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setError('');
                }}
                className={`flex-1 pb-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  loginMethod === 'email' ? 'text-gold border-b-2 border-gold' : 'text-cream-200/40'
                }`}
              >
                Email Luxury login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('mobile');
                  setError('');
                }}
                className={`flex-1 pb-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  loginMethod === 'mobile' ? 'text-gold border-b-2 border-gold' : 'text-cream-200/40'
                }`}
              >
                Mobile / OTP
              </button>
            </div>

            {/* Dynamic Inputs based on choice */}
            <AnimatePresence mode="wait">
              {loginMethod === 'email' ? (
                <motion.div
                  key="email-field"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs font-medium uppercase tracking-wider text-rosegold mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="luxury@srmsweets.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-gold/20 rounded-lg py-2.5 pl-10 pr-3 text-cream-100 placeholder-cream-200/30 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                    />
                    <Mail className="absolute left-3 top-3 text-gold/40" size={16} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mobile-field"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs font-medium uppercase tracking-wider text-rosegold mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/40 border border-gold/20 rounded-lg py-2.5 pl-10 pr-3 text-cream-100 placeholder-cream-200/30 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                    />
                    <Phone className="absolute left-3 top-3 text-gold/40" size={16} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-medium uppercase tracking-wider text-rosegold">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); setError('Password reset code sent to your registered contact.'); }} className="text-[10px] text-gold/60 hover:text-gold transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-gold/20 rounded-lg py-2.5 pl-10 pr-10 text-cream-100 placeholder-cream-200/30 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                />
                <Lock className="absolute left-3 top-3 text-gold/40" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-cream-200/40 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error messaging */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-400 bg-red-950/40 border border-red-500/20 p-2.5 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative group cursor-pointer bg-gradient-to-r from-gold via-rosegold to-gold hover:from-gold-light hover:to-gold-light text-chocolate-950 font-bold text-sm tracking-widest py-3 rounded-lg shadow-lg shadow-gold/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              <span>ENTER THE SUITE</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social login UI */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-1/4 h-[1px] bg-gold/10" />
              <span className="text-[10px] uppercase tracking-widest text-cream-200/40 font-light">
                Secure Partner Access
              </span>
              <div className="w-1/4 h-[1px] bg-gold/10" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setName('Royal Google Guest');
                  login('Royal Google Guest', 'guest@gmail.com');
                }}
                className="flex items-center justify-center gap-2 bg-white/5 border border-gold/10 hover:bg-white/10 text-cream-100 py-2 rounded-lg text-xs tracking-wider font-light transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 15.02 1 12 1 7.24 1 3.21 3.82 1.39 7.92l3.85 2.99C6.12 7.42 8.84 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.47c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.36-4.88 3.36-8.5z" />
                  <path fill="#FBBC05" d="M5.24 10.91c-.24-.72-.38-1.49-.38-2.28 0-.79.14-1.56.38-2.28L1.39 3.36C.5 5.15 0 7.15 0 9.27c0 2.12.5 4.12 1.39 5.91l3.85-2.99z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.66-2.84c-1.01.68-2.3 1.09-4.3 1.09-3.16 0-5.88-2.38-6.76-5.87L1.39 15.45C3.21 19.55 7.24 23 12 23z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => {
                  setName('Royal Mobile User');
                  login('Royal Mobile User', '9999999999', '9999999999');
                }}
                className="flex items-center justify-center gap-2 bg-white/5 border border-gold/10 hover:bg-white/10 text-cream-100 py-2 rounded-lg text-xs tracking-wider font-light transition-all cursor-pointer"
              >
                <Phone size={14} className="text-gold" />
                Direct OTP
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
