import { Building2, TrendingUp, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function JoinUs() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0D3512] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">{t('joinUs.heroTitle')}</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
            {t('joinUs.heroDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="bg-white text-[#0D3512] px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
            >
              {t('joinUs.applyNow')}
            </button>
            <button 
              onClick={scrollToBenefits}
              className="bg-emerald-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all"
            >
              {t('joinUs.learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('joinUs.whyTitle')}</h2>
            <p className="text-slate-600">{t('joinUs.whyDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: TrendingUp, title: t('joinUs.benefit1Title'), desc: t('joinUs.benefit1Desc') },
              { icon: Building2, title: t('joinUs.benefit2Title'), desc: t('joinUs.benefit2Desc') },
              { icon: Globe, title: t('joinUs.benefit3Title'), desc: t('joinUs.benefit3Desc') },
            ].map((benefit, i) => (
              <div key={i} className="space-y-6">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-[#0D3512]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">{t('joinUs.howTitle')}</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: t('joinUs.step1Title'), desc: t('joinUs.step1Desc') },
                  { step: "02", title: t('joinUs.step2Title'), desc: t('joinUs.step2Desc') },
                  { step: "03", title: t('joinUs.step3Title'), desc: t('joinUs.step3Desc') },
                  { step: "04", title: t('joinUs.step4Title'), desc: t('joinUs.step4Desc') },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6 rtl:space-x-reverse">
                    <span className="text-4xl font-black text-emerald-200">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={formRef} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 scroll-mt-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">{t('joinUs.formTitle')}</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('joinUs.agencyName')}</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('search.location')}</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('joinUs.fleetSize')}</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none">
                      <option>1-5 Cars</option>
                      <option>6-20 Cars</option>
                      <option>21-50 Cars</option>
                      <option>50+ Cars</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('checkout.email')}</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D3512] outline-none" required />
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-[#0D3512] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <span>{t('joinUs.submit')}</span>
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                </button>
              </form>
              {submitted && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-800">{t('joinUs.successMsg')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
