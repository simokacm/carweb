import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Car, 
  ClipboardList, 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  XCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Store,
  Navigation,
  CreditCard,
  Menu
} from 'lucide-react';
import { CARS } from '../data/cars';
import { useBookings, Booking } from '../context/BookingContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState(CARS);
  const { bookings, updateBookingStatus } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { 
      label: 'Total Revenue', 
      value: `${bookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()} MAD`, 
      icon: DollarSign, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100' 
    },
    { 
      label: 'Active Bookings', 
      value: bookings.filter(b => b.status === 'Confirmed').length.toString(), 
      icon: Calendar, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { label: 'Total Cars', value: cars.length.toString(), icon: Car, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Customers', value: new Set(bookings.map(b => b.email)).size.toString(), icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const handleDeleteCar = (id: string) => {
    if (window.confirm('Are you sure you want to remove this car?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-64 bg-[#0D3512] text-white z-50 lg:hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tighter">Cardnd Admin</h1>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-grow p-4 space-y-2">
              {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'bookings', icon: ClipboardList, label: 'Bookings' },
                { id: 'inventory', icon: Car, label: 'Inventory' },
                { id: 'customers', icon: Users, label: 'Customers' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#0D3512] text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tighter">Cardnd Admin</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            <ClipboardList className="h-5 w-5" />
            <span className="font-medium">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Car className="h-5 w-5" />
            <span className="font-medium">Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'customers' ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Customers</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold">A</div>
            <div>
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[10px] text-emerald-100/60">admin@cardnd.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
              <p className="text-slate-500 text-sm">Welcome back to your dashboard.</p>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#0D3512]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D3512] outline-none w-full md:w-64"
              />
            </div>
            {activeTab === 'inventory' && (
              <button className="bg-[#0D3512] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 hover:bg-opacity-90 transition-all whitespace-nowrap">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Car</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span className="text-emerald-500 text-xs font-bold flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12%
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Recent Bookings</h3>
                <button className="text-[#0D3512] text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">Booking ID</th>
                      <th className="px-6 py-4 font-bold">Customer</th>
                      <th className="px-6 py-4 font-bold">Car</th>
                      <th className="px-6 py-4 font-bold">Dates</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Total</th>
                      <th className="px-6 py-4 font-bold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                          No bookings found.
                        </td>
                      </tr>
                    ) : (
                      bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-[#0D3512]">{booking.id}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">{booking.customerName}</p>
                            <p className="text-xs text-slate-500">{booking.email}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{booking.carName}</td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-bold text-slate-900">{booking.pickupDate}</p>
                            <p className="text-[10px] text-slate-500">to {booking.returnDate}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' :
                              booking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">{booking.totalPrice} MAD</td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => setSelectedBooking(booking)}
                              className="text-slate-400 hover:text-[#0D3512]"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <motion.div 
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/90 backdrop-blur p-2 rounded-xl text-slate-600 hover:text-[#0D3512] transition-colors shadow-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCar(car.id)}
                      className="bg-white/90 backdrop-blur p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{car.name}</h3>
                      <div className="md:hidden mt-1">
                        <span className="text-lg font-extrabold text-[#0D3512]">{car.price} MAD</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold ml-1">Per Day</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{car.type} • {car.transmission}</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-lg font-extrabold text-[#0D3512]">{car.price} MAD</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Per Day</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{car.seats} Seats</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Booking ID</th>
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Car</th>
                    <th className="px-6 py-4 font-bold">Pickup</th>
                    <th className="px-6 py-4 font-bold">Return</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Total</th>
                    <th className="px-6 py-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-[#0D3512]">{booking.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{booking.customerName}</p>
                        <p className="text-xs text-slate-500">{booking.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.carName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.pickupDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.returnDate}</td>
                      <td className="px-6 py-4">
                        <select 
                          className={`text-[10px] font-bold px-3 py-1 rounded-full outline-none border-none cursor-pointer ${
                            booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' :
                            booking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                            'bg-slate-100 text-slate-600'
                          }`}
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{booking.totalPrice} MAD</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Search className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#0D3512] text-white">
                  <h3 className="text-xl font-bold">Booking Details: {selectedBooking.id}</h3>
                  <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Customer Information</h4>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900">{selectedBooking.customerName}</p>
                        <p className="text-sm text-slate-600">{selectedBooking.email}</p>
                        <p className="text-sm text-slate-600">{selectedBooking.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Rental Type</h4>
                      <div className="flex items-center space-x-2">
                        {selectedBooking.rentalType === 'agency' ? <Store className="h-4 w-4 text-[#0D3512]" /> : <Navigation className="h-4 w-4 text-[#0D3512]" />}
                        <p className="font-bold text-slate-900 capitalize">{selectedBooking.rentalType}</p>
                      </div>
                      {selectedBooking.deliveryAddress && (
                        <p className="text-sm text-slate-600 mt-1">{selectedBooking.deliveryAddress}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Payment Method</h4>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-[#0D3512]" />
                        <p className="font-bold text-slate-900 capitalize">{selectedBooking.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Vehicle</h4>
                      <p className="font-bold text-slate-900">{selectedBooking.carName}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Dates & Location</h4>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">Pickup: {selectedBooking.pickupDate}</p>
                        <p className="text-sm font-bold text-slate-900">Return: {selectedBooking.returnDate}</p>
                        <p className="text-sm text-slate-600">Location: {selectedBooking.pickupLocation}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Total Price</span>
                        <span className="text-2xl font-extrabold text-[#0D3512]">{selectedBooking.totalPrice} MAD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-4">
                  <button 
                    onClick={() => setSelectedBooking(null)}
                    className="px-6 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'Confirmed');
                      setSelectedBooking(null);
                    }}
                    className="px-6 py-2 bg-[#0D3512] text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
