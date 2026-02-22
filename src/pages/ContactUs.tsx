import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t('contact.title')}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">{t('contact.getInTouch')}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-[#0D3512]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t('contact.phone')}</p>
                    <p className="text-sm text-slate-600">+212 5XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-[#0D3512]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t('contact.email')}</p>
                    <p className="text-sm text-slate-600">support@cardnd.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-[#0D3512]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t('contact.office')}</p>
                    <p className="text-sm text-slate-600">Casablanca Finance City, Morocco</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0D3512] p-8 rounded-3xl shadow-lg text-white">
              <MessageSquare className="h-10 w-10 mb-6 text-emerald-400" />
              <h3 className="text-xl font-bold mb-4">{t('contact.liveChat')}</h3>
              <p className="text-emerald-100 text-sm mb-6 leading-relaxed">{t('contact.chatDesc')}</p>
              <button className="w-full bg-white text-[#0D3512] py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                {t('contact.startChat')}
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('contact.sent')}</h3>
                  <p className="text-slate-500 mb-8">{t('contact.sentDesc')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#0D3512] font-bold hover:underline"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">{t('contact.fullName')}</label>
                      <input type="text" placeholder={t('contact.placeholders.name')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">{t('contact.emailAddress')}</label>
                      <input type="email" placeholder={t('contact.placeholders.email')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('contact.subject')}</label>
                    <input type="text" placeholder={t('contact.placeholders.subject')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('contact.message')}</label>
                    <textarea rows={6} placeholder={t('contact.placeholders.message')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none resize-none" required></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0D3512] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    {t('contact.sendMessage')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
