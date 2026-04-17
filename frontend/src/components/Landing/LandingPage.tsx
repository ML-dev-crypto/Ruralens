import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Database,
  Globe2,
  Zap,
  Activity,
  Droplets,
  Building2,
  Landmark,
  Handshake,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const SDG_LIST = [
  {
    number: 6,
    title: 'Clean Water & Sanitation',
    desc: 'Real-time monitoring of water pipelines, pumps and tanks ensures safe, continuous water supply.',
    color: 'bg-blue-100 border-blue-300',
    textColor: 'text-blue-700',
    icon: <Droplets size={22} className="text-blue-600" />,
    badge: 'SDG 6',
    badgeColor: 'bg-blue-600',
  },
  {
    number: 9,
    title: 'Industry, Innovation & Infrastructure',
    desc: 'AI-powered digital twins and IoT sensor grids drive smarter infrastructure planning and maintenance.',
    color: 'bg-orange-50 border-orange-300',
    textColor: 'text-orange-700',
    icon: <Building2 size={22} className="text-orange-600" />,
    badge: 'SDG 9',
    badgeColor: 'bg-orange-500',
  },
  {
    number: 11,
    title: 'Sustainable Cities & Communities',
    desc: 'Spatial digital twin mapping and predictive analytics support long-term urban-rural planning.',
    color: 'bg-yellow-50 border-yellow-300',
    textColor: 'text-yellow-700',
    icon: <Globe2 size={22} className="text-yellow-600" />,
    badge: 'SDG 11',
    badgeColor: 'bg-yellow-500',
  },
  {
    number: 16,
    title: 'Peace, Justice & Strong Institutions',
    desc: 'Transparent fund tracking and anonymous citizen reporting strengthen accountability and public trust.',
    color: 'bg-sky-50 border-sky-300',
    textColor: 'text-sky-700',
    icon: <Landmark size={22} className="text-sky-600" />,
    badge: 'SDG 16',
    badgeColor: 'bg-sky-600',
  },
  {
    number: 17,
    title: 'Partnerships for the Goals',
    desc: 'Open APIs and interoperable data layers enable collaboration across government bodies and NGOs.',
    color: 'bg-indigo-50 border-indigo-300',
    textColor: 'text-indigo-700',
    icon: <Handshake size={22} className="text-indigo-600" />,
    badge: 'SDG 17',
    badgeColor: 'bg-indigo-600',
  },
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="bg-stone-50 font-sans text-stone-800 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/ruralens-logo.png" alt="RuraLens" className="w-9 h-9 object-contain" />
            <span className="text-lg font-bold text-stone-900 tracking-tight">RuraLens</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-blue-600">Platform</a>
            <a href="#sdgs" className="hover:text-blue-600">SDGs</a>
            <a href="#stats" className="hover:text-blue-600">Impact</a>
          </nav>

          <button
            onClick={onGetStarted}
            className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
            Next-Gen GovTech Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
            The Digital Twin for<br />
            <span className="text-blue-600">Smart Governance</span>
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
            Empowering administrations with real-time infrastructure monitoring, transparent fund tracking, and AI-driven insights — all in one unified platform.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700"
            >
              Launch Platform <ArrowRight size={16} />
            </button>
            <button
              onClick={() => window.open('https://youtu.be/K7QxVA4PYDA', '_blank')}
              className="flex items-center gap-2 px-7 py-3 bg-white border border-stone-300 text-stone-700 rounded-full font-semibold hover:border-stone-400"
            >
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80"
            alt="Smart governance dashboard analytics"
            className="w-full h-72 md:h-96 object-cover"
            loading="eager"
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="bg-blue-600 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <StatItem value="600K+" label="Localities Monitored" />
          <StatItem value="₹2.4T" label="Funds Tracked" />
          <StatItem value="10M+" label="Daily Data Points" />
          <StatItem value="99.9%" label="Uptime SLA" />
        </div>
      </section>

      {/* ── PLATFORM IMAGE STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
              alt="Water infrastructure monitoring"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 bg-white">
              <p className="font-semibold text-stone-800">Water Infrastructure</p>
              <p className="text-sm text-stone-500 mt-1">Live sensor feeds from pipelines, tanks and pumping stations.</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80"
              alt="Government analytics team"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 bg-white">
              <p className="font-semibold text-stone-800">Data-Driven Administration</p>
              <p className="text-sm text-stone-500 mt-1">AI insights help officials make faster, evidence-based decisions.</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80"
              alt="Community engagement"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 bg-white">
              <p className="font-semibold text-stone-800">Citizen Engagement</p>
              <p className="text-sm text-stone-500 mt-1">Anonymous reporting channels connect residents directly to officials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Comprehensive <span className="text-blue-600">Platform Capabilities</span>
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              An integrated suite of enterprise-grade tools designed to modernize infrastructure management and ensure accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="text-blue-600" />}
              title="IoT Infrastructure Grid"
              desc="Real-time telemetry from water, power, and environmental sensors with predictive maintenance alerts."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-600" />}
              title="Fiscal Transparency"
              desc="Blockchain-verified fund allocation and utilization tracking to prevent discrepancies."
            />
            <FeatureCard
              icon={<Users className="text-indigo-600" />}
              title="Citizen Engagement"
              desc="Secure, anonymous reporting channels connecting residents directly to administration."
            />
            <FeatureCard
              icon={<Database className="text-purple-600" />}
              title="Neural Search (RAG)"
              desc="Instant access to thousands of government documents using natural language queries."
            />
            <FeatureCard
              icon={<Globe2 className="text-cyan-600" />}
              title="Spatial Digital Twin"
              desc="High-fidelity 3D map visualization of public assets for better planning and response."
            />
            <FeatureCard
              icon={<Activity className="text-rose-600" />}
              title="Predictive Analytics"
              desc="Machine learning models that forecast resource needs and potential system failures."
            />
          </div>
        </div>
      </section>

      {/* ── UN SDGs ── */}
      <section id="sdgs" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wide mb-4">
              UN Sustainable Development Goals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Aligned with Global Priorities
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              RuraLens directly supports five UN SDGs, helping governments measure and demonstrate real-world impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SDG_LIST.map((sdg) => (
              <div
                key={sdg.number}
                className={`rounded-2xl border p-6 ${sdg.color} flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-full ${sdg.badgeColor}`}>
                    {sdg.badge}
                  </span>
                  {sdg.icon}
                </div>
                <h3 className={`font-bold text-base ${sdg.textColor}`}>{sdg.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{sdg.desc}</p>
              </div>
            ))}

            {/* UN Logo / Info card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 flex flex-col items-center justify-center text-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sustainable_Development_Goals.png/800px-Sustainable_Development_Goals.png"
                alt="UN Sustainable Development Goals"
                className="w-40 object-contain"
                loading="lazy"
              />
              <p className="text-xs text-stone-500 mt-2">
                United Nations 2030 Agenda for Sustainable Development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-20 px-6 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to Modernize Governance?</h2>
        <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
          Deploy RuraLens today — join administrations using data to drive accountability, efficiency, and citizen trust.
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-4 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50"
        >
          Get Started Now
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-100 border-t border-stone-200 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/ruralens-logo.png" alt="RuraLens" className="w-6 h-6 object-contain" />
            <span className="font-bold text-stone-800">RuraLens</span>
          </div>

          <div className="flex gap-8 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-800">Privacy Policy</a>
            <a href="#" className="hover:text-stone-800">Terms of Service</a>
            <a href="#" className="hover:text-stone-800">Security</a>
          </div>

          <p className="text-stone-400 text-xs">© 2025 RuraLens Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ── Helper Components ──

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold mb-1">{value}</div>
      <div className="text-blue-200 text-sm font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-7 rounded-2xl bg-stone-50 border border-stone-200 hover:border-blue-300 hover:shadow-md transition-shadow">
      <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-5 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}