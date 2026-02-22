import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, Users, Fuel, Gauge, ChevronRight, Search, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CARS } from '../data/cars';
import { useTranslation } from 'react-i18next';

export default function Listings() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = CARS.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || car.type === selectedType;
    const matchesCity = selectedCity === 'All' || car.city === selectedCity;
    return matchesSearch && matchesType && matchesCity;
  }).sort((a, b) => {
    if (sortBy === t('common.priceLowHigh')) {
      return a.price - b.price;
    }
    if (sortBy === t('common.priceHighLow')) {
      return b.price - a.price;
    }
    return 0; // Recommended (default order)
  });

  const cities = ['All', 'Marrakech', 'Casablanca', 'Rabat', 'Fes', 'Tanger', 'Agadir'];
  const carTypes = ['All', 'Economy', 'Compact', 'Standard', 'Luxury', 'Luxury SUV', '4x4'];

  const carsByCity = filteredCars.reduce((acc, car) => {
    if (!acc[car.city]) acc[car.city] = [];
    acc[car.city].push(car);
    return acc;
  }, {} as Record<string, typeof CARS>);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-[#0D3512]">{t('nav.home')}</Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="text-slate-900 font-medium">{t('listings.title')}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Filter className="h-5 w-5 text-[#0D3512]" />
                  <h2 className="font-bold text-slate-900">{t('listings.filters')}</h2>
                </div>
                {showFilters ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 border-t border-slate-100 space-y-6">
                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">{t('listings.city')}</label>
                        <div className="space-y-2">
                          {cities.map((city) => (
                            <button
                              key={city}
                              onClick={() => setSelectedCity(city)}
                              className={cn(
                                "w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm transition-all",
                                selectedCity === city
                                  ? "bg-[#0D3512] text-white font-bold"
                                  : "text-slate-600 hover:bg-slate-50"
                              )}
                            >
                              {city === 'All' ? t('common.all') : city}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">{t('listings.carType')}</label>
                        <div className="space-y-2">
                          {carTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedType(type)}
                              className={cn(
                                "w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm transition-all",
                                selectedType === type
                                  ? "bg-[#0D3512] text-white font-bold"
                                  : "text-slate-600 hover:bg-slate-50"
                              )}
                            >
                              {type === 'All' ? t('common.all') : type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">{t('listings.priceRange')}</label>
                        <input type="range" min="200" max="2000" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D3512]" />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                          <span>200 {t('common.mad')}</span>
                          <span>2000 {t('common.mad')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-[#0D3512] p-6 rounded-2xl shadow-lg text-white">
              <h3 className="font-bold mb-2">{t('common.help')}</h3>
              <p className="text-xs text-emerald-100 mb-4">{t('common.supportDesc')}</p>
              <button className="w-full bg-white text-[#0D3512] py-2 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-colors">
                {t('common.contactSupport')}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  placeholder={t('listings.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] focus:border-transparent outline-none shadow-sm rtl:pr-10 rtl:pl-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse w-full md:w-auto">
                <span className="text-sm text-slate-500 whitespace-nowrap text-center md:text-left">
                  {t('listings.carsFound', { count: filteredCars.length })}
                </span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0D3512] shadow-sm w-full"
                >
                  <option value="Recommended">{t('common.sortBy')}: {t('common.recommended')}</option>
                  <option value={t('common.priceLowHigh')}>{t('common.sortBy')}: {t('common.priceLowHigh')}</option>
                  <option value={t('common.priceHighLow')}>{t('common.sortBy')}: {t('common.priceHighLow')}</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="space-y-12">
              {Object.entries(carsByCity).map(([city, cityCars]) => (
                <div key={city} className="space-y-6">
                  {selectedCity === 'All' && (
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap">
                        <MapPin className="h-5 w-5 text-[#0D3512]" />
                        <span>{city}</span>
                      </h3>
                      <div className="h-px bg-slate-200 flex-grow" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cityCars.map((car) => (
                      <Link
                        key={car.id}
                        to={`/listings/${car.id}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group flex flex-col"
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
                              <h3 className="text-lg font-bold text-slate-900">{car.name}</h3>
                              <div className="md:hidden mt-1">
                                <span className="text-lg font-bold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                                <span className="text-slate-500 text-[10px]"> / {t('common.day')}</span>
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

                          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="hidden md:block">
                              <span className="text-xl font-bold text-[#0D3512]">{car.price} {t('common.mad')}</span>
                              <span className="text-slate-500 text-xs"> / {t('common.day')}</span>
                            </div>
                            <div className="md:hidden text-slate-500 text-xs font-medium">
                              {t('common.viewDetails')}
                            </div>
                            <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:bg-[#0D3512] transition-colors">
                              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('listings.noCars')}</h3>
                <p className="text-slate-500">{t('listings.noCarsDesc')}</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                  className="mt-6 text-[#0D3512] font-bold hover:underline"
                >
                  {t('listings.clearFilters')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
