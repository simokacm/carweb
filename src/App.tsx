/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { BookingProvider } from './context/BookingContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import JoinUs from './pages/JoinUs';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <SearchProvider>
      <BookingProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:id" element={<ListingDetails />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/pages/aboutUs" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/authentication/register" element={<Register />} />
                <Route path="/authentication/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/pages/terms-condition" element={<Terms />} />
                <Route path="/pages/privacy-policy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </SearchProvider>
  );
}
