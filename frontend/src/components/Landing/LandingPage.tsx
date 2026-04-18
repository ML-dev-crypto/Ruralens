import { ArrowRight, Activity, Bot, GitBranch, ShieldAlert, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import ragImg from '../../../assets/RAG.jpeg';
import gnnImg from '../../../assets/gnn.jpeg';
import discrepancyImg from '../../../assets/discrepency.jpeg';
import aiAgentImg from '../../../assets/AI-agent.jpeg';
import sdg6Img from '../../../assets/sdg6.jpeg';
import sdg9Img from '../../../assets/sdg9.jpeg';
import sdg11Img from '../../../assets/sdg11.jpeg';
import sdg16Img from '../../../assets/sdg16.jpeg';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FEATURE_RAILS = [
  {
    id: '01',
    title: { hi: 'RAG ज्ञान इंजन', en: 'RAG Knowledge Engine' },
    subtitle: { hi: 'नीति, योजना और अनुपालन से जुड़े प्रश्न साधारण भाषा में पूछें।', en: 'Ask policy, scheme, and compliance questions in plain language.' },
    desc: { hi: 'Retrieval-Augmented Generation सरकारी परिपत्र, टेंडर रिकॉर्ड और योजना दस्तावेज़ खोजकर अधिकारियों और नागरिकों को तथ्य-आधारित उत्तर देता है।', en: 'Retrieval-Augmented Generation searches circulars, tenders, and scheme manuals to return grounded answers for officers and citizens.' },
    icon: Bot,
    image: ragImg,
    accent: 'from-emerald-500/25 to-lime-300/10'
  },
  {
    id: '02',
    title: { hi: 'GNN प्रभाव पूर्वानुमान', en: 'GNN Impact Forecaster' },
    subtitle: { hi: 'एक विफलता पूरे इंफ्रास्ट्रक्चर में कैसे फैलती है, इसका पूर्वानुमान।', en: 'Model how one failure can ripple across infrastructure.' },
    desc: { hi: 'Graph Neural Networks पंप, टैंक, सड़क और बिजली नोड्स के बीच छिपे संबंधों को मैप करके सेवा बाधा का पहले से अनुमान लगाता है।', en: 'Graph Neural Networks map hidden dependencies between pumps, tanks, roads, and power nodes to forecast disruption.' },
    icon: GitBranch,
    image: gnnImg,
    accent: 'from-teal-500/25 to-green-300/10'
  },
  {
    id: '03',
    title: { hi: 'डिस्क्रेपेंसी डिटेक्टर', en: 'Discrepancy Detector' },
    subtitle: { hi: 'योजना माइलस्टोन की फील्ड और वेंडर साक्ष्य से स्वचालित तुलना।', en: 'Auto-compare milestones against field and vendor evidence.' },
    desc: { hi: 'रिपोर्ट, इनवॉइस, जियोटैग और दस्तावेज़ साक्ष्य को जोड़कर बजट लीकेज, प्रगति असंगति और समय-सीमा देरी पकड़ता है।', en: 'Detects budget leakage, progress mismatch, and timeline slippage by correlating reports and evidence.' },
    icon: ShieldAlert,
    image: discrepancyImg,
    accent: 'from-lime-500/20 to-emerald-300/10'
  },
  {
    id: '04',
    title: { hi: 'गुमनाम शिकायत रिपोर्टिंग', en: 'Anonymous Issue Reporting' },
    subtitle: { hi: 'लोग सुरक्षित रूप से रिपोर्ट करें, और प्रशासन तेजी से समाधान करे।', en: 'Residents report safely while teams resolve quickly.' },
    desc: { hi: 'नागरिक गोपनीयता-सुरक्षित तरीके से लोकेशन-आधारित शिकायतें दर्ज करते हैं। केस स्वतः एस्केलेट होते हैं और पूरी टाइमलाइन ट्रेसेबल रहती है।', en: 'Citizens submit location-based issues with privacy protection and traceable escalation timelines.' },
    icon: Activity,
    image: sdg16Img,
    accent: 'from-green-500/25 to-emerald-200/10'
  },
  {
    id: '05',
    title: { hi: 'एआई कॉलिंग एजेंट - काव्या', en: 'AI Calling Agent - Kavya' },
    subtitle: { hi: 'कम इंटरनेट वाले क्षेत्रों के लिए कॉल-आधारित शिकायत पंजीकरण।', en: 'Call-based complaint registration for low-connectivity regions.' },
    desc: { hi: 'काव्या नागरिकों की ओर से कॉल लेती है, शिकायत विवरण दर्ज करती है और उसे RuraLens सिस्टम में सीधे रजिस्टर करती है ताकि ग्रामीण इलाकों में भी सेवा पहुंच सुनिश्चित रहे।', en: 'Kavya receives calls on behalf of RuraLens, captures complaint details, and registers cases directly into the system for rural areas with poor internet access.' },
    icon: PhoneCall,
    image: aiAgentImg,
    accent: 'from-emerald-600/25 to-teal-300/10'
  }
];

const SDG_BLOCKS = [
  {
    goal: 'SDG 6',
    title: { hi: 'स्वच्छ जल और स्वच्छता', en: 'Clean Water and Sanitation' },
    icon: sdg6Img,
    photo: sdg6Img,
    objectPosition: 'object-center'
  },
  {
    goal: 'SDG 9',
    title: { hi: 'उद्योग, नवाचार और अवसंरचना', en: 'Industry, Innovation and Infrastructure' },
    icon: sdg9Img,
    photo: sdg9Img,
    objectPosition: 'object-center'
  },
  {
    goal: 'SDG 11',
    title: { hi: 'टिकाऊ शहर और समुदाय', en: 'Sustainable Cities and Communities' },
    icon: sdg11Img,
    photo: sdg11Img,
    objectPosition: 'object-center'
  },
  {
    goal: 'SDG 16',
    title: { hi: 'शांति, न्याय और सशक्त संस्थान', en: 'Peace, Justice and Strong Institutions' },
    icon: sdg16Img,
    photo: sdg16Img,
    objectPosition: 'object-[50%_35%]'
  }
];

const SDG_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1400&auto=format&fit=crop';
const HERO_CITY_IMAGE =
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop';

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t, lang, toggleLang } = useLanguage();
  const hi = lang === 'hi';
  const tx = (en: string, hiText: string) => (hi ? hiText : en);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcf6] via-[#f6f5ec] to-[#eef2e6] text-[#1f2b24]">
      <header className="sticky top-0 z-50 border-b border-[#dce5d1] bg-[#fbfbf3]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/ruralens-logo.png" alt="RuraLens" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-[#1a2c24]">{t('appBrand', 'RuraLens')}</p>
              <p className="text-xs font-medium text-[#5f7769]">{t('appTagline', 'AI Governance Twin')}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#4f665a] md:flex">
            <a href="#features" className="hover:text-[#1f5f46]">{t('capabilities', 'Capabilities')}</a>
            <a href="#sdgs" className="hover:text-[#1f5f46]">{t('sdgs', 'SDGs')}</a>
            <a href="#impact" className="hover:text-[#1f5f46]">{t('impact', 'Impact')}</a>
          </nav>
          <button
            onClick={toggleLang}
            className="rounded-lg border border-[#9cb7a6] px-3 py-1.5 text-xs font-bold text-[#2a5f46]"
          >
            {lang === 'hi' ? 'EN' : 'हि'}
          </button>
          <button
            onClick={onGetStarted}
            className="rounded-full border border-[#8dad9a] bg-gradient-to-r from-[#d7e8dc] to-[#c7ddcf] px-6 py-2.5 text-sm font-bold text-[#1b3f31] shadow-sm transition hover:from-[#cde1d2] hover:to-[#bdd5c5]"
          >
            {t('enterPlatform', 'Enter Platform')}
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c2d7c8] bg-[#edf6ec] px-4 py-1.5 text-xs font-bold tracking-wide text-[#2f614b]">
            {tx('Unified Civic Intelligence Platform', 'एकीकृत नागरिक इंटेलिजेंस प्लेटफॉर्म')}
          </div>
          <h1 className="text-5xl font-black leading-[1.05] text-[#19372c] md:text-6xl">
            {tx('Governance that feels', 'ऐसा शासन जो हो')}
            <span className="block bg-gradient-to-r from-[#2f7a5b] to-[#78a66f] bg-clip-text text-transparent">
              {tx('predictive, accountable, and human.', 'पूर्वानुमेय, जवाबदेह और मानवीय।')}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4f665a]">
            {tx('A living civic intelligence surface combining RAG, GNN, discrepancy forensics, and privacy-first issue reporting for faster and fairer administration.', 'RAG, GNN, डिस्क्रेपेंसी फॉरेंसिक्स और गोपनीयता-प्रथम शिकायत प्रणाली का एकीकृत प्लेटफॉर्म, ताकि प्रशासन तेज, निष्पक्ष और पारदर्शी बने।')}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-full bg-[#1f5f46] px-8 py-3 font-semibold text-[#f5fbf4] shadow-lg shadow-[#366a52]/20 transition hover:bg-[#194d39]"
            >
                  {t('launchDashboard', 'Launch Dashboard')}
              <ArrowRight size={18} />
            </button>
            <a
              href="#features"
              className="rounded-full border border-[#adc5b6] bg-[#fbfdf8] px-8 py-3 font-semibold text-[#2f614b] transition hover:bg-[#f1f7ee]"
            >
                  {tx('Explore Stack', 'फीचर देखें')}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] border border-[#cfdccc] bg-[#f8fbf4] p-3 shadow-xl shadow-[#8fa88e]/20">
            <img
              src={HERO_CITY_IMAGE}
              alt="सिटी गवर्नेंस"
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[#c8d9ca] bg-[#f5faf0] px-5 py-3 shadow-lg">
            <p className="text-xs font-semibold tracking-wide text-[#557061]">{tx('LIVE GOVERNANCE GRID', 'लाइव गवर्नेंस ग्रिड')}</p>
            <p className="text-2xl font-black text-[#204735]">{tx('5 Core Engines', '5 मुख्य इंजन')}</p>
          </div>
        </div>
      </section>

      <section id="impact" className="border-y border-[#dbe5d2] bg-[#f2f6ec] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          <Metric value="2.8M+" label={tx('Daily Civic Signals', 'दैनिक नागरिक संकेत')} />
          <Metric value="96.4%" label={tx('Issue Traceability', 'शिकायत ट्रेसबिलिटी')} />
          <Metric value="3.2x" label={tx('Faster Escalation', 'तेज एस्केलेशन')} />
          <Metric value="18 States" label={tx('Deployment Footprint', 'तैनाती कवरेज')} />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#62836f]">{tx('Core Feature Stack', 'मुख्य फीचर स्टैक')}</p>
            <h2 className="mt-3 text-4xl font-black text-[#1e3b30]">{tx('Five engines. One seamless command surface.', 'पांच इंजन। एक एकीकृत कमांड सतह।')}</h2>
          </div>
        </div>

        <div className="space-y-6">
          {FEATURE_RAILS.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.id}
                className="group overflow-hidden rounded-[26px] border border-[#c9d9ca] bg-gradient-to-r from-[#f9fcf5] via-[#f4f8ef] to-[#edf3e7]"
              >
                <div className="grid md:grid-cols-[140px_1fr_280px]">
                  <div className="flex items-center justify-center border-b border-[#d8e4d5] p-6 md:border-b-0 md:border-r">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#285640]">{feature.id}</p>
                      <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d7e8dc] text-[#1f5f46]">
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="p-7 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#698874]">{feature.subtitle[lang]}</p>
                    <h3 className="mt-2 text-3xl font-black text-[#1c3a2f]">{feature.title[lang]}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4f665a]">{feature.desc[lang]}</p>
                    {feature.id === '03' ? (
                      <div className="mt-6 space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-xl border border-[#c8ddc9] bg-[#eef6ea] px-2 py-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5f7868]">{tx('Budget Drift', 'बजट ड्रिफ्ट')}</p>
                            <p className="text-xl font-black text-[#24533f]">-18%</p>
                          </div>
                          <div className="rounded-xl border border-[#c8ddc9] bg-[#eef6ea] px-2 py-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5f7868]">{tx('Timeline Risk', 'टाइमलाइन जोखिम')}</p>
                            <p className="text-xl font-black text-[#24533f]">{tx('High', 'उच्च')}</p>
                          </div>
                          <div className="rounded-xl border border-[#c8ddc9] bg-[#eef6ea] px-2 py-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5f7868]">{tx('Evidence Match', 'एविडेंस मैच')}</p>
                            <p className="text-xl font-black text-[#24533f]">72%</p>
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#dfead9]">
                          <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-[#89b35f] via-[#4d9968] to-[#2b6d50]" />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 h-2 w-full rounded-full bg-[#dfead9]">
                        <div className={`h-2 w-2/3 rounded-full bg-gradient-to-r ${feature.accent}`} />
                      </div>
                    )}
                  </div>

                  <div className="relative min-h-[180px] md:min-h-full">
                    <img src={feature.image} alt={feature.title[lang]} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#eaf3e5]/20 to-[#f6fbf2]/65" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="sdgs" className="border-t border-[#d9e3d0] bg-[#f7faf3] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#67816f]">{tx('UN SDG Visual Alignment', 'UN SDG विज़ुअल अलाइनमेंट')}</p>
            <h2 className="mt-3 text-4xl font-black text-[#1e3b30]">{tx('SDG imagery integrated into civic operations', 'SDG इमेजरी को नागरिक संचालन से जोड़ा गया')}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SDG_BLOCKS.map((sdg) => (
              <div key={sdg.goal} className="overflow-hidden rounded-[24px] border border-[#cddac9] bg-[#fbfdf8]">
                <div className="grid grid-cols-[90px_1fr] items-center border-b border-[#dce5d2] bg-[#f0f6ec] p-4">
                  <img
                    src={sdg.icon}
                    alt={sdg.goal}
                    className="h-16 w-16 rounded-lg object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = SDG_IMAGE_FALLBACK;
                    }}
                  />
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#698571]">{sdg.goal}</p>
                    <h3 className="text-xl font-bold text-[#1f3c31]">{sdg.title[lang]}</h3>
                  </div>
                </div>
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={sdg.photo}
                    alt={sdg.title[lang]}
                    className={`h-full w-full object-cover ${sdg.objectPosition}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = SDG_IMAGE_FALLBACK;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#214f3d] to-[#537a5f] py-16 text-center text-[#f4fbf2]">
        <h2 className="text-4xl font-black">{tx('Build trust faster than issues spread.', 'मुद्दे फैलने से पहले भरोसा बनाइए।')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#dcecdf]">
          {tx('Start with one district, then scale to a full-state governance twin without replacing current systems.', 'एक जिले से शुरुआत करें, फिर मौजूदा सिस्टम बदले बिना पूरे राज्य तक स्केल करें।')}
        </p>
        <button
          onClick={onGetStarted}
          className="mt-8 rounded-full bg-[#f4fbf2] px-10 py-3.5 text-lg font-bold text-[#1f4a38] transition hover:bg-[#e9f4e8]"
        >
          {tx('Start Now', 'अभी शुरू करें')}
        </button>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#d4e0ce] bg-[#f8fbf4] px-4 py-5">
      <p className="text-3xl font-black text-[#1f4a38]">{value}</p>
      <p className="mt-1 text-sm font-semibold text-[#60786a]">{label}</p>
    </div>
  );
}
