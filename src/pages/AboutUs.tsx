import { Shield, Users, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?auto=format&fit=crop&q=80&w=2000" alt="Morocco" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('about.title')}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('about.missionTitle')}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('about.missionP1')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('about.missionP2')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-extrabold text-[#0D3512] mb-2">500+</div>
                <div className="text-sm text-slate-500 font-medium">{t('about.statsCars')}</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-extrabold text-[#0D3512] mb-2">50+</div>
                <div className="text-sm text-slate-500 font-medium">{t('about.statsAgencies')}</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-extrabold text-[#0D3512] mb-2">15+</div>
                <div className="text-sm text-slate-500 font-medium">{t('about.statsCities')}</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-extrabold text-[#0D3512] mb-2">10k+</div>
                <div className="text-sm text-slate-500 font-medium">{t('about.statsCustomers')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.valuesTitle')}</h2>
            <p className="text-slate-600">{t('about.valuesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t('about.value1Title'), desc: t('about.value1Desc') },
              { icon: Target, title: t('about.value2Title'), desc: t('about.value2Desc') },
              { icon: Award, title: t('about.value3Title'), desc: t('about.value3Desc') },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
                <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-[#0D3512]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
