import { ArrowRight, Bot, GitBranch, ShieldAlert, Activity } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import sdg6Img from '../../../assets/sdg6.jpeg';
import sdg9Img from '../../../assets/sdg9.jpeg';
import sdg11Img from '../../../assets/sdg11.jpeg';
import sdg16Img from '../../../assets/sdg16.jpeg';

interface MobileLandingPageProps {
  onGetStarted: () => void;
}

const mobileFeatures = [
  {
    title: { hi: 'RAG ज्ञान इंजन', en: 'RAG Knowledge Engine' },
    note: { hi: 'नीति और योजना दस्तावेज़ों से प्रमाणित उत्तर प्राप्त करें।', en: 'Search policy and scheme docs with grounded answers.' },
    icon: Bot
  },
  {
    title: { hi: 'GNN प्रभाव पूर्वानुमान', en: 'GNN Impact Forecaster' },
    note: { hi: 'स्थानीय विफलता के नेटवर्क-स्तरीय प्रभाव का अनुमान लगाएं।', en: 'Predict network-wide effects of local failures.' },
    icon: GitBranch
  },
  {
    title: { hi: 'डिस्क्रेपेंसी डिटेक्टर', en: 'Discrepancy Detector' },
    note: { hi: 'बजट, टाइमलाइन और फील्ड डेटा असंगति जल्दी पकड़ें।', en: 'Catch budget, timeline, and field-data mismatches early.' },
    icon: ShieldAlert
  },
  {
    title: { hi: 'शिकायत रिपोर्टिंग', en: 'Issue Reporting' },
    note: { hi: 'गोपनीयता-प्रथम रिपोर्टिंग और ट्रेसेबल एस्केलेशन।', en: 'Privacy-first reporting with escalation trails.' },
    icon: Activity
  }
];

const HERO_CITY_IMAGE =
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop';

export default function MobileLandingPage({ onGetStarted }: MobileLandingPageProps) {
  const { t, lang, toggleLang } = useLanguage();
  const hi = lang === 'hi';
  const tx = (en: string, hiText: string) => (hi ? hiText : en);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefdf8] via-[#f4f7ef] to-[#edf2e6] text-[#1f2c24]">
      <header className="border-b border-[#d8e2d1] bg-[#fbfdf8]/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/ruralens-logo.png" alt="RuraLens" className="h-9 w-9 object-contain" />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1b3a2f]">{t('appBrand', 'RuraLens')}</h1>
            <p className="text-xs font-semibold text-[#62796b]">{t('appTagline', 'AI Governance Twin')}</p>
          </div>
          <button
            onClick={toggleLang}
            className="ml-auto rounded-md border border-[#9cb7a6] px-2.5 py-1 text-xs font-bold text-[#2a5f46]"
          >
            {lang === 'hi' ? 'EN' : 'हि'}
          </button>
        </div>
      </header>

      <main className="px-4 pb-8 pt-5">
        <div className="overflow-hidden rounded-[24px] border border-[#cddac9] bg-[#f7fbf3] p-2 shadow-lg">
          <img
            src={HERO_CITY_IMAGE}
            alt="सिटी गवर्नेंस"
            className="h-52 w-full rounded-[18px] object-cover"
          />
        </div>

        <h2 className="mt-6 text-4xl font-black leading-[1.05] text-[#1d3f31]">
          {tx('One civic brain for', 'एकीकृत नागरिक दिमाग')}
          <span className="block bg-gradient-to-r from-[#2f7a5b] to-[#7ba471] bg-clip-text text-transparent">
            {tx('data, trust, and action.', 'डेटा, भरोसा और कार्रवाई के लिए।')}
          </span>
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#51685b]">
          {tx('RuraLens combines RAG, GNN, discrepancy intelligence, and citizen issue workflows into one command layer.', 'RuraLens, RAG, GNN, डिस्क्रेपेंसी इंटेलिजेंस और नागरिक शिकायत वर्कफ्लो को एक कमांड लेयर में जोड़ता है।')}
        </p>

        <section className="mt-6 space-y-2">
          {mobileFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title.en}
                className="grid grid-cols-[40px_1fr] gap-3 border-b border-[#dce7d5] py-3 last:border-b-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8eadb] text-[#1e5a43]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-[#6e8877]">0{idx + 1}</p>
                  <h3 className="text-lg font-extrabold text-[#1f3e31]">{feature.title[lang]}</h3>
                  <p className="text-sm text-[#576f60]">{feature.note[lang]}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#668371]">{tx('SDG Image Strip', 'SDG इमेज स्ट्रिप')}</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <img
              src={sdg6Img}
              alt="SDG 6"
              className="h-20 w-20 shrink-0 rounded-lg border border-[#cad9c8] bg-white object-cover"
            />
            <img
              src={sdg9Img}
              alt="SDG 9"
              className="h-20 w-20 shrink-0 rounded-lg border border-[#cad9c8] bg-white object-cover"
            />
            <img
              src={sdg11Img}
              alt="SDG 11"
              className="h-20 w-20 shrink-0 rounded-lg border border-[#cad9c8] bg-white object-cover"
            />
            <img
              src={sdg16Img}
              alt="SDG 16"
              className="h-20 w-20 shrink-0 rounded-lg border border-[#cad9c8] bg-white object-cover"
            />
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 border-t border-[#d8e2d1] bg-[#fbfdf8]/95 p-4 backdrop-blur">
        <button
          onClick={onGetStarted}
          className="flex w-full items-center justify-between rounded-2xl bg-[#1f5f46] px-5 py-3.5 text-lg font-bold text-[#eff8ee]"
        >
          {t('launchDashboard', 'Launch Dashboard')}
          <span className="rounded-xl bg-[#174435] p-2">
            <ArrowRight size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
