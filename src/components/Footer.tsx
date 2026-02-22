import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-[#0D3512] p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">Cardnd</span>
            </Link>
            <p className="text-sm leading-relaxed">
              The leading car rental platform in Morocco. We connect you with verified local agencies for a seamless travel experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/listings" className="hover:text-white transition-colors">Find a Car</Link></li>
              <li><Link to="/pages/aboutUs" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/join-us" className="hover:text-white transition-colors">Join as Agency</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal & Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/pages/terms-condition" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/pages/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#0D3512] shrink-0" />
                <span>Casablanca, Morocco</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#0D3512] shrink-0" />
                <span>+212 5XX XX XX XX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#0D3512] shrink-0" />
                <span>support@cardnd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>© {new Date().getFullYear()} Cardnd. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Made with ❤️ for Morocco</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
