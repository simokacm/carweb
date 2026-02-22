import { Link } from 'react-router-dom';
import { Car, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-[#0D3512] p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-[#0D3512]">Cardnd</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/listings" className="text-sm font-medium text-slate-600 hover:text-[#0D3512] transition-colors">{t('nav.listings')}</Link>
            <Link to="/pages/aboutUs" className="text-sm font-medium text-slate-600 hover:text-[#0D3512] transition-colors">{t('nav.about')}</Link>
            <Link to="/join-us" className="text-sm font-medium text-slate-600 hover:text-[#0D3512] transition-colors">{t('nav.joinUs')}</Link>
            <Link to="/contact-us" className="text-sm font-medium text-slate-600 hover:text-[#0D3512] transition-colors">{t('nav.contact')}</Link>
          </nav>

          {/* Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-[#0D3512] transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.name}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", isLangOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 rtl:right-auto rtl:left-0"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center space-x-3 rtl:space-x-reverse rtl:text-right",
                          i18n.language === lang.code ? "text-[#0D3512] font-bold bg-emerald-50" : "text-slate-600"
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link to="/authentication/login" className="text-sm font-medium text-slate-600 hover:text-[#0D3512]">{t('nav.login')}</Link>
              <Link to="/authentication/register" className="bg-[#0D3512] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-md">
                {t('nav.signup')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-slate-600 hover:text-[#0D3512] p-2"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-[#0D3512] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Language Selector */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-50 border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-4 grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all",
                    i18n.language === lang.code 
                      ? "bg-white border-[#0D3512] text-[#0D3512] shadow-sm font-bold" 
                      : "bg-white border-slate-200 text-slate-600"
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link 
                to="/listings" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                {t('nav.listings')}
              </Link>
              <Link 
                to="/pages/aboutUs" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/join-us" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                {t('nav.joinUs')}
              </Link>
              <Link 
                to="/contact-us" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                {t('nav.contact')}
              </Link>
              <div className="pt-4 flex flex-col space-y-2">
                <Link 
                  to="/authentication/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-3 text-base font-medium text-slate-600 border border-slate-200 rounded-xl"
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/authentication/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-3 text-base font-medium text-white bg-[#0D3512] rounded-xl shadow-lg"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
