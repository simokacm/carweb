import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Users, Fuel, Gauge, Shield, CheckCircle2, Calendar, Clock, MapPin, ChevronRight, Info } from 'lucide-react';
import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { MOROCCAN_CITIES } from '../constants/cities';
import { CARS } from '../data/cars';
import { useTranslation } from 'react-i18next';

export default function ListingDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { location, pickupDate, returnDate, setLocation, setPickupDate, setReturnDate } = useSearch();
  const car = CARS.find(c => c.id === id) || CARS[0];
  const [isBooked, setIsBooked] = useState(false);

  const today = new Date().toISOString().split('T')[0];

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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/checkout/${id}`, { 
      state: { 
        pickupDate, 
        returnDate, 
        location 
      } 
    });
  };

  const handleDateClick = (e: React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as any).showPicker?.();
    } catch (err) {
      // Fallback
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-[#0D3512]">{t('nav.home')}</Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <Link to="/listings" className="hover:text-[#0D3512]">{t('listings.title')}</Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="text-slate-900 font-medium">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Car Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Section */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <img src={car.img} alt={car.name} className="w-full h-[400px] object-cover" />
            </div>

            {/* Details */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{car.name}</h1>
                  <div className="md:hidden mb-4">
                    <span className="text-3xl font-extrabold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                    <span className="text-slate-500 text-sm ml-1">{t('common.perDay')}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{car.type}</span>
                    <div className="flex items-center text-slate-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {car.city}
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold ml-1 rtl:mr-1 rtl:ml-0">4.9 (124 {t('details.reviews')})</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block text-right rtl:text-left">
                  <span className="text-3xl font-extrabold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                  <span className="text-slate-500 text-sm block">{t('common.perDay')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Users, label: t('common.seats'), value: `${car.seats} ${t('common.seats')}` },
                  { icon: Fuel, label: t('common.fuel'), value: car.fuel },
                  { icon: Gauge, label: t('common.transmission'), value: car.transmission },
                  { icon: Shield, label: t('details.insurance'), value: t('details.fullCoverage') },
                ].map((spec, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center text-center">
                    <spec.icon className="h-6 w-6 text-[#0D3512] mb-2" />
                    <span className="text-xs text-slate-500 mb-1">{spec.label}</span>
                    <span className="text-sm font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{t('details.description')}</h3>
                  <p className="text-slate-600 leading-relaxed">{car.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{t('details.features')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Air Conditioning", "Bluetooth Connectivity", "GPS Navigation", "Child Seat (Optional)", "Additional Driver", "Unlimited Mileage"].map((feat, i) => (
                      <div key={i} className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-slate-600">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Policy */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                <Info className="h-6 w-6 text-[#0D3512]" />
                <h3 className="text-lg font-bold text-slate-900">Rental Policy</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D3512] mt-1.5 shrink-0" />
                  <span>Minimum driver age is 21 years with at least 1 year of driving experience.</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D3512] mt-1.5 shrink-0" />
                  <span>Valid driving license and passport/ID required at pickup.</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D3512] mt-1.5 shrink-0" />
                  <span>Security deposit (pre-authorization) required via credit card.</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D3512] mt-1.5 shrink-0" />
                  <span>Free cancellation up to 48 hours before pickup.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 sticky top-24">
              {isBooked ? (
                <div className="text-center py-8">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Requested!</h3>
                  <p className="text-slate-500 mb-6">The agency will contact you shortly to confirm your reservation.</p>
                  <button
                    onClick={() => setIsBooked(false)}
                    className="text-[#0D3512] font-bold hover:underline"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{t('details.selectDates')}</h3>
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t('search.location')}</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 rtl:left-auto rtl:right-3" />
                        <input 
                          list="moroccan-cities-details"
                          placeholder={t('search.placeholder')}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none rtl:pr-10 rtl:pl-4"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <datalist id="moroccan-cities-details">
                          {MOROCCAN_CITIES.map(city => (
                            <option key={city} value={city} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">{t('search.pickup')}</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none rtl:left-auto rtl:right-3" />
                          <input 
                            type="date" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none cursor-pointer rtl:pr-10 rtl:pl-4" 
                            required 
                            value={pickupDate}
                            min={today}
                            onChange={(e) => setPickupDate(e.target.value)}
                            onClick={handleDateClick}
                            onFocus={handleDateClick}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none rtl:left-auto rtl:right-3" />
                          <input 
                            type="time" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none cursor-pointer rtl:pr-10 rtl:pl-4" 
                            required 
                            onClick={handleDateClick}
                            onFocus={handleDateClick}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">{t('search.return')}</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none rtl:left-auto rtl:right-3" />
                          <input 
                            type="date" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none cursor-pointer rtl:pr-10 rtl:pl-4" 
                            required 
                            value={returnDate}
                            min={pickupDate || today}
                            onChange={(e) => setReturnDate(e.target.value)}
                            onClick={handleDateClick}
                            onFocus={handleDateClick}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none rtl:left-auto rtl:right-3" />
                          <input 
                            type="time" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none cursor-pointer rtl:pr-10 rtl:pl-4" 
                            required 
                            onClick={handleDateClick}
                            onFocus={handleDateClick}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
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
                      type="submit"
                      className="w-full bg-[#0D3512] text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg mt-6"
                    >
                      {t('common.instantBooking')}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4">
                      By clicking "{t('common.instantBooking')}", you agree to our Terms of Service and Rental Policy.
                    </p>
                  </form>
                </>
              )}
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Secure Payment</h4>
                <p className="text-xs text-slate-500">Encrypted transactions & data protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
