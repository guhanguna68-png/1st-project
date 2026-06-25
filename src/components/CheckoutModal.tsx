import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CreditCard, Calendar, QrCode, ClipboardList, CheckCircle, RefreshCw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, appliedCoupon, placeOrder } = useShop();

  if (!isOpen || cart.length === 0) return null;

  // Shipping details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('4:00 PM - 7:00 PM (Premium Evening)');
  const [giftMessage, setGiftMessage] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Baking simulation steps loading state
  const [processing, setProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const processingSteps = [
    'Transmitting secure credentials...',
    'Polishing hand-crafted gold flakes...',
    'Injecting gourmet chocolate layers...',
    'Simmering saffron syrup strings...',
    'Generating royal seals & invoice...',
  ];

  // Price calculations
  const subtotal = cart.reduce((acc, item) => {
    const sizeIndex = item.product.sizes.indexOf(item.selectedSize);
    const sizeMultiplier = 1 + (sizeIndex > -1 ? sizeIndex * 0.5 : 0);
    let itemPrice = Math.round(item.product.price * sizeMultiplier);
    if (item.eggless) itemPrice += 50;
    if (item.sugarFree) itemPrice += 30;
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 1000 ? 0 : 99;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  const grandTotal = subtotal + deliveryFee - discountAmount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out all recipient details.');
      return;
    }

    // Trigger processing sequence
    setProcessing(true);
    setStepIndex(0);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          
          // Complete order
          const finalDetails = {
            name,
            phone,
            address,
            date,
            timeSlot,
            message: giftMessage,
          };
          const res = placeOrder(finalDetails);
          setCompletedOrder(res.order);
          setProcessing(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div id="checkout-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Semi-transparent outer click dismiss (only if not processing or completed) */}
      {!processing && !completedOrder && (
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-chocolate-950 border border-gold/25 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row h-auto max-h-[95vh] md:max-h-[90vh]"
      >
        {/* Close Button */}
        {!processing && !completedOrder && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-gold/20 text-cream-200 hover:text-gold flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: PROCESSING FLOW */}
          {processing && (
            <motion.div
              key="processing-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-chocolate-950 z-40 flex flex-col items-center justify-center p-8 space-y-6"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gold/10 border-t-gold rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="text-gold animate-spin-slow" size={24} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-cream-100 uppercase tracking-widest text-center animate-pulse">
                The Master Bakers are Preparing
              </h3>
              <p className="text-xs font-mono text-gold tracking-wide h-6 text-center">
                {processingSteps[stepIndex]}
              </p>
              <div className="w-64 h-1 bg-black/40 rounded-full overflow-hidden border border-gold/10">
                <div
                  className="h-full bg-gold transition-all duration-1000 ease-out"
                  style={{ width: `${((stepIndex + 1) / processingSteps.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: ORDER PLACED EXQUISITE SCREEN */}
          {completedOrder && (
            <motion.div
              key="completed-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-chocolate-950 z-40 flex flex-col items-center justify-center p-8 space-y-6 overflow-y-auto"
            >
              <div className="w-16 h-16 bg-gold/10 border border-gold text-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20">
                <CheckCircle size={36} className="animate-bounce" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-serif text-2xl font-bold gold-gradient-text uppercase tracking-widest">
                  Order Registered Successfully!
                </h3>
                <p className="text-xs text-cream-200/50 font-mono">
                  Receipt Code: {completedOrder.id} • Registered on {completedOrder.date}
                </p>
              </div>

              {/* Minimalist receipt card summary */}
              <div className="w-full max-w-md bg-black/40 border border-gold/15 p-5 rounded-xl space-y-4 text-xs font-light">
                <h4 className="font-serif text-xs font-bold text-gold border-b border-gold/10 pb-2 uppercase tracking-widest flex items-center gap-1.5">
                  <ClipboardList size={14} />
                  <span>Royal Deliveries Dispatch Sheet</span>
                </h4>
                
                <div className="space-y-1">
                  <p className="text-cream-200/70"><span className="font-semibold text-cream-100">Deliver To:</span> {completedOrder.deliveryDetails.name}</p>
                  <p className="text-cream-200/70"><span className="font-semibold text-cream-100">Contact:</span> {completedOrder.deliveryDetails.phone}</p>
                  <p className="text-cream-200/70"><span className="font-semibold text-cream-100">Address:</span> {completedOrder.deliveryDetails.address}</p>
                  <p className="text-cream-200/70"><span className="font-semibold text-cream-100">Schedule:</span> {completedOrder.deliveryDetails.date} ({completedOrder.deliveryDetails.timeSlot})</p>
                </div>

                <div className="border-t border-gold/10 pt-2 flex justify-between font-bold text-sm text-gold">
                  <span>Grand Total Paid</span>
                  <span className="font-mono font-extrabold">₹{completedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-gold to-rosegold text-chocolate-950 px-8 py-3 rounded-lg text-xs font-bold tracking-widest uppercase shadow shadow-gold/15 cursor-pointer"
                >
                  Return to Lounge
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REGULAR LAYOUT */}
        {/* Left Form Panel */}
        <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-full">
          <div className="space-y-1 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100">
              Checkout Dispatch
            </h3>
            <p className="text-xs text-cream-200/50">Provide recipient delivery schedules & contact details.</p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
            {/* Row 1: Name, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Recipient Name</label>
                <input
                  type="text"
                  required
                  placeholder="Royal Guest Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Contact Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Row 2: Address */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Full Delivery Address</label>
              <textarea
                required
                rows={3}
                placeholder="Exquisite apartment, street, landmark, city, pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Row 3: Date, TimeSlot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Delivery Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 pl-3 pr-8 text-xs text-cream-100 focus:outline-none focus:border-gold"
                  />
                  <Calendar className="absolute right-2.5 top-2.5 text-gold/50" size={14} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Time Window Selection</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="10:00 AM - 1:00 PM (Premium Morning)">10:00 AM - 1:00 PM (Premium Morning)</option>
                  <option value="1:00 PM - 4:00 PM (Luxe Afternoon)">1:00 PM - 4:00 PM (Luxe Afternoon)</option>
                  <option value="4:00 PM - 7:00 PM (Premium Evening)">4:00 PM - 7:00 PM (Premium Evening)</option>
                  <option value="7:00 PM - 10:00 PM (Midnight Feast)">7:00 PM - 10:00 PM (Midnight Feast)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Personalized message */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold">Complimentary Message Card (Optional)</label>
              <input
                type="text"
                placeholder="E.g., Wishing you a joyous year! - From SRM family"
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full bg-black/30 border border-gold/15 rounded-lg py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Submit Button Trigger */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold via-rosegold to-gold hover:from-gold-light hover:to-gold-light text-chocolate-950 py-3.5 rounded-xl font-bold tracking-widest uppercase transition-all shadow-lg shadow-gold/15 mt-6 cursor-pointer"
            >
              Order & Transmit Payment • ₹{grandTotal}
            </button>
          </form>
        </div>

        {/* Right Pricing Summary & Payment Simulation Panel */}
        <div className="md:w-2/5 bg-black/30 border-t md:border-t-0 md:border-l border-gold/15 p-6 md:p-8 flex flex-col justify-between max-h-[45vh] md:max-h-full overflow-y-auto">
          <div>
            <h4 className="font-serif text-sm font-bold text-gold border-b border-gold/10 pb-2 uppercase tracking-widest">
              Pricing Summary
            </h4>
            
            {/* Micro receipt items */}
            <div className="space-y-2 mt-4 max-h-32 overflow-y-auto no-scrollbar border-b border-gold/5 pb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-[10px] text-cream-200/70">
                  <span className="line-clamp-1 flex-1 pr-4">
                    {item.product.name} <span className="font-mono text-gold font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-mono text-cream-100">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 py-4 text-[11px] font-light border-b border-gold/10">
              <div className="flex justify-between text-cream-200/50">
                <span>Subtotal</span>
                <span className="font-mono text-cream-100">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-cream-200/50">
                <span>Delivery Charge</span>
                {deliveryFee === 0 ? (
                  <span className="text-gold font-mono uppercase text-[9px] font-semibold">Complimentary</span>
                ) : (
                  <span className="font-mono text-cream-100">₹{deliveryFee}</span>
                )}
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Promo Saved</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-gold pt-2 border-t border-gold/5">
                <span>Grand Total</span>
                <span className="font-mono font-extrabold text-base gold-gradient-text">₹{grandTotal}</span>
              </div>
            </div>

            {/* Simulated Payment Area */}
            <div className="mt-4">
              <h4 className="block text-[10px] uppercase font-semibold tracking-wider text-rosegold mb-2">Simulated Secure Payment</h4>
              
              <div className="flex border border-gold/10 rounded-lg overflow-hidden p-0.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi' ? 'bg-gold text-chocolate-950 font-bold' : 'text-cream-200/40 hover:text-cream-100'
                  }`}
                >
                  <QrCode size={12} />
                  <span>UPI Instant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card' ? 'bg-gold text-chocolate-950 font-bold' : 'text-cream-200/40 hover:text-cream-100'
                  }`}
                >
                  <CreditCard size={12} />
                  <span>Card Pay</span>
                </button>
              </div>

              {/* Dynamic Payment Field Options */}
              <div className="mt-3">
                {paymentMethod === 'upi' ? (
                  <div className="bg-black/40 border border-gold/10 p-3.5 rounded-lg flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-24 h-24 bg-white p-1 rounded-lg border border-gold shadow shadow-gold/20 flex items-center justify-center">
                      <QrCode className="text-black" size={80} />
                    </div>
                    <p className="text-[9px] uppercase tracking-wider text-gold font-bold">Scan with BHIM / GPay / PhonePe</p>
                    <p className="text-[8px] text-cream-200/30">Clicking 'Transmit Payment' auto-authorizes this payment transfer instantly.</p>
                  </div>
                ) : (
                  <div className="bg-black/40 border border-gold/10 p-3.5 rounded-lg space-y-2 text-[10px]">
                    <div className="space-y-0.5">
                      <label className="text-[9px] uppercase text-rosegold/50">Credit Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-black/40 border border-gold/10 rounded py-1 px-2 text-cream-100 focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        <label className="text-[9px] uppercase text-rosegold/50">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-black/40 border border-gold/10 rounded py-1 px-2 text-cream-100 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[9px] uppercase text-rosegold/50">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-black/40 border border-gold/10 rounded py-1 px-2 text-cream-100 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
