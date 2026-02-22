import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, Shield, Zap, CreditCard, Star, Users, Fuel, Gauge, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '../context/SearchContext';
import { MOROCCAN_CITIES } from '../constants/cities';
import { CARS } from '../data/cars';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { location, setLocation, pickupDate, setPickupDate, returnDate, setReturnDate } = useSearch();
  const [sortBy, setSortBy] = useState('Recommended');
  const resultsRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split('T')[0];

  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchesCity = !location || location === 'All' || car.city.toLowerCase() === location.toLowerCase();
      // In a real app, we'd check date availability here
      return matchesCity;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') {
        return a.price - b.price;
      }
      if (sortBy === 'Price: High to Low') {
        return b.price - a.price;
      }
      return 0; // Recommended (default order)
    });
  }, [location, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDateClick = (e: React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as any).showPicker?.();
    } catch (err) {
      // Fallback for older browsers
    }
  };

  const carsByCity = useMemo(() => {
    const grouped: Record<string, typeof CARS> = {};
    filteredCars.forEach(car => {
      if (!grouped[car.city]) grouped[car.city] = [];
      grouped[car.city].push(car);
    });
    return grouped;
  }, [filteredCars]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden py-20 md:py-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?auto=format&fit=crop&q=80&w=2000"
            alt="Morocco Landscape"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 rtl:left-auto rtl:right-3" />
                <input
                  list="moroccan-cities"
                  placeholder={t('search.placeholder')}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] focus:border-transparent outline-none transition-all rtl:pr-10 rtl:pl-4"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <datalist id="moroccan-cities">
                  {MOROCCAN_CITIES.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none rtl:left-auto rtl:right-3" />
                <input
                  type="date"
                  placeholder={t('search.pickup')}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] focus:border-transparent outline-none transition-all cursor-pointer rtl:pr-10 rtl:pl-4"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  onClick={handleDateClick}
                  onFocus={handleDateClick}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none rtl:left-auto rtl:right-3" />
                <input
                  type="date"
                  placeholder={t('search.return')}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] focus:border-transparent outline-none transition-all cursor-pointer rtl:pr-10 rtl:pl-4"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  onClick={handleDateClick}
                  onFocus={handleDateClick}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>
              <button
                type="submit"
                className="bg-[#0D3512] text-white py-3 px-8 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span>{t('hero.search')}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Available Cars Section */}
      <section ref={resultsRef} className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4">
                {location ? t('listings.availableIn', { city: location }) : t('listings.allCars')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                {t('listings.carsFound', { count: filteredCars.length })} {location && t('listings.forTrip', { city: location })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse w-full md:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0D3512] shadow-sm w-full"
              >
                <option value="Recommended">{t('listings.sortRecommended')}</option>
                <option value="Price: Low to High">{t('listings.sortPriceLow')}</option>
                <option value="Price: High to Low">{t('listings.sortPriceHigh')}</option>
              </select>
              {location && (
                <button
                  onClick={() => setLocation('')}
                  className="text-[#0D3512] font-bold hover:underline text-sm whitespace-nowrap text-center"
                >
                  {t('listings.clearFilters')}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-16">
            <AnimatePresence mode="popLayout">
              {(Object.entries(carsByCity) as [string, typeof CARS][]).map(([city, cityCars]) => (
                <motion.div
                  key={city}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {!location && (
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="h-px bg-slate-200 flex-grow" />
                      <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="h-5 w-5 text-[#0D3512]" />
                        <span>{t('listings.availableIn', { city: city })}</span>
                      </h3>
                      <div className="h-px bg-slate-200 flex-grow" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cityCars.map((car) => (
                      <motion.div
                        key={car.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={`/listings/${car.id}`}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group block h-full flex flex-col"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex flex-col gap-2">
                              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0D3512] shadow-sm">
                                {car.type}
                              </div>
                              <div className="bg-[#0D3512]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {car.city}
                              </div>
                            </div>
                          </div>
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                                <div className="md:hidden mt-1">
                                  <span className="text-xl font-bold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                                  <span className="text-slate-500 text-xs"> / {t('common.day')}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm font-bold ml-1 rtl:mr-1 rtl:ml-0">4.9</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6">
                              <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
                                <Users className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-[10px] text-slate-500 font-medium">{car.seats} {t('common.seats')}</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
                                <Fuel className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-[10px] text-slate-500 font-medium">{car.fuel}</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
                                <Gauge className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-[10px] text-slate-500 font-medium">{car.transmission}</span>
                              </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                              <div className="hidden md:block">
                                <span className="text-2xl font-bold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                                <span className="text-slate-500 text-sm"> / {t('common.day')}</span>
                              </div>
                              <div className="md:hidden text-slate-500 text-xs font-medium">
                                {t('common.bookNow')}
                              </div>
                              <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-[#0D3512] transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                                <span className="hidden sm:inline">{t('common.bookNow')}</span>
                                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('listings.noCars')}</h3>
              <p className="text-slate-500">{t('listings.noCarsDesc')}</p>
              <button
                onClick={() => setLocation('')}
                className="mt-6 text-[#0D3512] font-bold hover:underline"
              >
                {t('listings.showAll')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: t('features.f1_title'), desc: t('features.f1_desc') },
              { icon: Zap, title: t('features.f2_title'), desc: t('features.f2_desc') },
              { icon: CreditCard, title: t('features.f3_title'), desc: t('features.f3_desc') },
              { icon: Clock, title: t('features.f4_title'), desc: t('features.f4_desc') },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="bg-white p-3 rounded-xl shadow-sm w-fit mb-6 group-hover:bg-[#0D3512] transition-colors">
                  <feature.icon className="h-6 w-6 text-[#0D3512] group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0D3512] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-emerald-100 mb-10 text-lg">{t('cta.subtitle')}</p>
          <button
            onClick={() => navigate('/join-us')}
            className="bg-white text-[#0D3512] px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
          >
            {t('cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
