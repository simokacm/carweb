import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Clock, Shield, CreditCard, CheckCircle2, Info, ArrowLeft, Car, Store, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CARS } from '../data/cars';
import { useBookings } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

export default function Checkout() {
  const { t } = useTranslation();
  const { id } = useParams();
  const locationState = useLocation().state;
  const navigate = useNavigate();
  const car = CARS.find(c => c.id === id) || CARS[0];
  const { addBooking } = useBookings();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [rentalType, setRentalType] = useState<'agency' | 'delivery'>('agency');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pickupDate = locationState?.pickupDate || '';
  const returnDate = locationState?.returnDate || '';
  const pickupLocation = locationState?.location || car.city;

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const days = calculateDays();
  const totalRental = car.price * days;
  const grandTotal = totalRental;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const bookingData = {
        carId: car.id,
        carName: car.name,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        pickupDate,
        returnDate,
        pickupLocation,
        rentalType,
        deliveryAddress: rentalType === 'delivery' ? formData.deliveryAddress : undefined,
        paymentMethod,
        totalPrice: grandTotal,
      };

      addBooking(bookingData);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-slate-100"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('checkout.confirmed')}</h1>
          <p className="text-slate-500 mb-8">{t('checkout.confirmedDesc', { car: car.name })}</p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left rtl:text-right">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">{t('checkout.status')}:</span>
              <span className="font-bold text-emerald-600">{t('checkout.pending')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t('common.total')}:</span>
              <span className="font-bold text-[#0D3512]">{grandTotal} {t('common.mad')}</span>
            </div>
          </div>
          <Link
            to="/"
            className="block w-full bg-[#0D3512] text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all"
          >
            {t('nav.home')}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-500 hover:text-[#0D3512] transition-colors font-medium rtl:flex-row-reverse"
          >
            <ArrowLeft className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
            {t('common.viewDetails')}
          </button>
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse text-sm text-slate-400">
            <span className="text-[#0D3512] font-bold">1. {t('details.summary')}</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            <span className="text-slate-900 font-bold">2. {t('listings.title')}</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            <span>3. {t('checkout.confirmed')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-[#0D3512] text-white rounded-full flex items-center justify-center text-sm mr-3 rtl:ml-3 rtl:mr-0">1</span>
                  {t('checkout.personalInfo')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('checkout.firstName')}</label>
                    <input 
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none transition-all"
                      placeholder={t('checkout.firstName')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('checkout.lastName')}</label>
                    <input 
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none transition-all"
                      placeholder={t('checkout.lastName')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('checkout.email')}</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('checkout.phone')}</label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none transition-all"
                      placeholder="+212 600 000 000"
                    />
                  </div>
                </div>
              </section>

              {/* Rental Type */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                  <div className="bg-[#0D3512] p-2 rounded-lg">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{t('checkout.deliveryType')}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRentalType('agency')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left rtl:text-right flex items-start space-x-4 rtl:space-x-reverse ${
                      rentalType === 'agency' ? 'border-[#0D3512] bg-emerald-50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${rentalType === 'agency' ? 'bg-[#0D3512] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t('checkout.agencyPickup')}</p>
                      <p className="text-xs text-slate-500">Récupérez la voiture à l'agence</p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRentalType('delivery')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left rtl:text-right flex items-start space-x-4 rtl:space-x-reverse ${
                      rentalType === 'delivery' ? 'border-[#0D3512] bg-emerald-50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${rentalType === 'delivery' ? 'bg-[#0D3512] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Navigation className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t('checkout.homeDelivery')}</p>
                      <p className="text-xs text-slate-500">Nous livrons la voiture à l'adresse</p>
                    </div>
                  </button>
                </div>

                <AnimatePresence>
                  {rentalType === 'delivery' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{t('checkout.deliveryAddress')}</label>
                        <input 
                          required
                          name="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none transition-all"
                          placeholder={t('checkout.deliveryAddress')}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-[#0D3512] text-white rounded-full flex items-center justify-center text-sm mr-3 rtl:ml-3 rtl:mr-0">3</span>
                  {t('checkout.paymentMethod')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 rtl:space-x-reverse ${
                      paymentMethod === 'card' ? 'border-[#0D3512] bg-emerald-50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-[#0D3512] bg-[#0D3512]' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="text-left rtl:text-right">
                      <p className="font-bold text-slate-900">{t('checkout.creditCard')}</p>
                      <p className="text-xs text-slate-500">Pay securely online</p>
                    </div>
                    <CreditCard className={`h-6 w-6 ml-auto rtl:mr-auto rtl:ml-0 ${paymentMethod === 'card' ? 'text-[#0D3512]' : 'text-slate-300'}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 rtl:space-x-reverse ${
                      paymentMethod === 'cash' ? 'border-[#0D3512] bg-emerald-50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'cash' ? 'border-[#0D3512] bg-[#0D3512]' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'cash' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="text-left rtl:text-right">
                      <p className="font-bold text-slate-900">{t('checkout.cashOnPickup')}</p>
                      <p className="text-xs text-slate-500">Cash or card at pickup</p>
                    </div>
                    <Shield className={`h-6 w-6 ml-auto rtl:mr-auto rtl:ml-0 ${paymentMethod === 'cash' ? 'text-[#0D3512]' : 'text-slate-300'}`} />
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                      <input 
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                        <input 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">CVC</label>
                        <input 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </form>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6">{t('details.summary')}</h2>
              
              {/* Car Info */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6 pb-6 border-b border-slate-100">
                <img src={car.img} alt={car.name} className="w-24 h-16 object-cover rounded-xl" />
                <div>
                  <h3 className="font-bold text-slate-900">{car.name}</h3>
                  <p className="text-xs text-slate-500">{car.type} • {car.transmission}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-[#0D3512]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{t('details.pickupReturn').split('&')[0].trim()}</p>
                    <p className="text-sm font-bold text-slate-900">{pickupDate || 'Not selected'}</p>
                    <p className="text-xs text-slate-500">{pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-[#0D3512]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{t('details.pickupReturn').split('&')[1].trim()}</p>
                    <p className="text-sm font-bold text-slate-900">{returnDate || 'Not selected'}</p>
                    <p className="text-xs text-slate-500">{pickupLocation}</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{t('common.rental')} ({days} {days === 1 ? t('common.day') : t('common.days')})</span>
                  <span className="font-bold text-slate-900">{totalRental} {t('common.mad')}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{t('common.total')}</span>
                  <span className="text-2xl font-extrabold text-[#0D3512]">{grandTotal} {t('common.mad')}</span>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#0D3512] text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t('checkout.completeBooking')
                )}
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 rtl:space-x-reverse text-[10px] text-slate-400">
                <Shield className="h-3 w-3" />
                <span>Secure 256-bit SSL Encrypted Payment</span>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-[#0D3512] rounded-3xl p-6 text-white">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{t('common.help')}</h3>
              </div>
              <p className="text-xs text-emerald-100 mb-4 leading-relaxed">
                {t('common.supportDesc')}
              </p>
              <p className="text-sm font-bold">+212 500 000 000</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
