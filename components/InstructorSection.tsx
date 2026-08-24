import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

interface PatentItem {
  title: string;
  desc: string;
  tag: string;
}

interface TeachingAssistant {
  name: string;
  image?: string;
  initials: string;
  gradient: string;
  linkedin?: string;
}

const PATENTS: PatentItem[] = [
  {
    title: "Spherical Sector Microphone Array",
    desc: "Novel array geometry for high-resolution acoustic source localization and spatial filtering.",
    tag: "Granted Patent",
  },
  {
    title: "AI-Powered Social Interaction Training Robot",
    desc: "Intelligent robotic system designed for social interaction guidance and adaptive learning.",
    tag: "Granted Patent",
  },
  {
    title: "Biosensor Device for Cancer Cell Detection",
    desc: "Intelligent sensing apparatus integrating biomedical signal analytics for early cell identification.",
    tag: "Granted Patent",
  },
];

const DOMAIN_TAGS = [
  "Machine Learning",
  "Artificial Intelligence",
  "Array Signal Processing",
  "Acoustic Source Localization",
  "Spatial Audio",
  "Biomedical Imaging",
  "Healthcare Analytics",
  "Intelligent Sensing & Robotics",
];

const TEACHING_ASSISTANTS: TeachingAssistant[] = [
  {
    name: "Roshan Ajith",
    image: "/images/ta/roshan_ajith.jpg",
    initials: "RA",
    gradient: "from-blue-500 to-indigo-600",
    linkedin: "https://www.linkedin.com/in/roshanajith/",
  },
  {
    name: "Rhythm Thakur",
    image: "/images/ta/rhythm_thakur.png",
    initials: "RT",
    gradient: "from-indigo-500 to-purple-600",
    linkedin: "https://www.linkedin.com/in/rhythm-thakur-a466b52b3/",
  },
  {
    name: "Srinidhi Nidamarty",
    image: "/images/ta/srinidhi_nidamarty.jpg",
    initials: "SN",
    gradient: "from-purple-500 to-pink-600",
    linkedin: "https://www.linkedin.com/in/srinidhi-nidamarty-b56a222b2/",
  },
  {
    name: "Yash Salunkhe",
    image: "/images/ta/yash_salunkhe.jpg",
    initials: "YS",
    gradient: "from-emerald-500 to-teal-600",
    linkedin: "https://www.linkedin.com/in/yash-salunkhe-374a252b2/",
  },
  {
    name: "Tarun Mudaliar",
    image: "/images/ta/tarun_mudaliar.jpg",
    initials: "TM",
    gradient: "from-amber-500 to-orange-600",
    linkedin: "https://www.linkedin.com/in/tarun-mudaliar-0604b92b3/",
  },
];

export default function InstructorSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50/80 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
              Course Instructor
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-slate-100">
              Meet Your <span className="text-gradient">Instructor</span>
            </h2>
            <p className="mt-1 max-w-5xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              Guided by distinguished academic faculty and research innovators dedicated to practical, hands-on engineering education.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Faculty Portrait & Contact Card */}
          <div className="lg:col-span-4">
            <Reveal delay={80}>
              <div className="card-glow relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
                {/* Photo with gradient ring */}
                <div className="relative mx-auto flex justify-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-2xl ring-4 ring-brand-500/20 sm:h-56 sm:w-56 dark:ring-brand-400/20">
                    <Image
                      src="/images/faculty/deepika_kumari.jpg"
                      alt="Dr. Deepika Kumari"
                      fill
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 192px, 224px"
                      priority
                    />
                  </div>
                </div>

                {/* Identity */}
                <div className="mt-5 text-center">
                  <h3 className="font-display text-2xl font-bold text-ink dark:text-slate-100">
                    Dr. Deepika Kumari
                  </h3>
                  <p className="mt-1 font-medium text-brand-600 dark:text-brand-400">
                    Associate Professor
                  </p>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">
                    Dept. of Electronics & Computer Science
                  </p>
                  <p className="text-[12px] font-medium text-slate-400 dark:text-slate-500">
                    SIES Graduate School of Technology, Nerul
                  </p>
                </div>

                {/* Credentials list */}
                <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-[13px] dark:border-slate-800">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 dark:bg-slate-800/60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Doctorate</span>
                    <span className="font-semibold text-ink dark:text-slate-200">Ph.D., IIT Delhi</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 dark:bg-slate-800/60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Master&apos;s</span>
                    <span className="font-semibold text-ink dark:text-slate-200">M.Tech, NIT Durgapur</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 dark:bg-slate-800/60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Experience</span>
                    <span className="font-semibold text-ink dark:text-slate-200">10+ Years (Academia & R&D)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 dark:bg-slate-800/60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Inventions</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400">
                      3 Granted Patents
                    </span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/dr-deepika-kumari-41a368112/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a66c2] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[#084e96] active:scale-[0.99]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66Z" />
                    </svg>
                    Connect on LinkedIn
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://siesgst.edu.in/faculty/deepikak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11.5px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:bg-slate-800 dark:hover:text-brand-300"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      Faculty Page
                    </a>

                    <a
                      href="https://deepikakumaridk.wixsite.com/iitd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11.5px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:bg-slate-800 dark:hover:text-brand-300"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Homepage
                    </a>
                  </div>

                  <a
                    href="mailto:deepikak@sies.edu.in"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11.5px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    deepikak@sies.edu.in
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Bio, Qualifications, Research & Patents */}
          <div className="space-y-6 lg:col-span-8">
            {/* Biography & Summary Card */}
            <Reveal delay={120}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h3 className="font-display text-xl font-bold text-ink dark:text-slate-100">
                  Academic Profile & Biography
                </h3>
                <div className="mt-4 space-y-3.5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  <p>
                    <strong className="font-semibold text-slate-900 dark:text-white">Dr. Deepika Kumari</strong> is an interdisciplinary researcher, educator, and innovator with over a decade of experience across academia, research, and industry. Currently serving as an Associate Professor at the Department of Electronics & Computer Science at SIES Graduate School of Technology.
                  </p>
                  <p>
                    She received her Ph.D. from the <strong>Indian Institute of Technology (IIT) Delhi</strong>, specializing in Array Signal Processing. Her expertise spans Signal Processing, Artificial Intelligence, Machine Learning, Acoustic Source Localization, Spatial Audio, Robotics, Biomedical Imaging, and Intelligent Sensing Systems.
                  </p>
                  <p>
                    Her research focuses on developing advanced signal processing and AI-based solutions for real-world challenges in acoustics, healthcare, robotics, and intelligent systems. She has published extensively in premier journals and conferences including <em>IEEE Transactions on Signal Processing</em>, <em>The Journal of the Acoustical Society of America</em>, and <em>ICASSP</em>.
                  </p>
                </div>

                {/* Domain badges */}
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Core Areas of Expertise
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {DOMAIN_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Qualifications & Grants Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Education */}
              <Reveal delay={160}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </span>
                    <h4 className="font-display text-base font-bold text-ink dark:text-slate-100">
                      Education & Degrees
                    </h4>
                  </div>
                  <div className="mt-4 space-y-4 text-xs">
                    <div className="border-l-2 border-brand-500 pl-3.5">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Ph.D. in Array Signal Processing</p>
                      <p className="text-slate-500 dark:text-slate-400">IIT Delhi · July 2017 – Jan 2022</p>
                      <p className="mt-1 italic text-slate-600 dark:text-slate-300">
                        &quot;Optimal Array Processing for Spherical Sector Microphone Array&quot;
                      </p>
                    </div>
                    <div className="border-l-2 border-accent-500 pl-3.5">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">M.Tech</p>
                      <p className="text-slate-500 dark:text-slate-400">NIT Durgapur · July 2014 – June 2016</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Research & Funding */}
              <Reveal delay={200}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </span>
                    <h4 className="font-display text-base font-bold text-ink dark:text-slate-100">
                      Research & Grants
                    </h4>
                  </div>
                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">SERB Sponsored Projects:</strong> Research supported by the Science and Engineering Research Board (SERB), Government of India.
                    </p>
                    <p>
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">IIT Delhi Collaboration:</strong> Active ongoing joint research in acoustics, medical imaging, healthcare analytics, and intelligent sensing.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Patents & Innovations Section */}
            <Reveal delay={240}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink dark:text-slate-100">
                        Granted Patents & Inventions
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Inventor & Co-Inventor of 3 Granted Patents in Signal Processing, AI & Robotics
                      </p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 sm:inline-flex dark:bg-amber-950/60 dark:text-amber-300">
                    3 Patents
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {PATENTS.map((pat, idx) => (
                    <div
                      key={pat.title}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50/30 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-amber-500/30"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            0{idx + 1}
                          </span>
                          <span className="rounded-md bg-amber-100/70 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                            {pat.tag}
                          </span>
                        </div>
                        <h5 className="mt-2 text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                          {pat.title}
                        </h5>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {pat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- Teaching Assistants Section ---------- */}
        <div className="mt-16 border-t border-slate-200/80 pt-14 dark:border-slate-800">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Development Team
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                Teaching <span className="text-gradient">Assistants</span>
              </h3>
              <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
                Student developers facilitating hands-on simulations, code assistance and experiment evaluations.
              </p>
            </div>
          </Reveal>

          {/* 5 TA Cards Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TEACHING_ASSISTANTS.map((ta, i) => (
              <Reveal key={ta.name} delay={i * 70}>
                <div className="card-glow group relative flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
                  {/* Avatar / Photo */}
                  <div className="relative mb-3.5">
                    {ta.image ? (
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-brand-500/20 transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24 dark:ring-brand-400/20">
                        <Image
                          src={ta.image}
                          alt={ta.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 80px, 96px"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${ta.gradient} font-display text-xl font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24`}
                      >
                        {ta.initials}
                      </div>
                    )}
                  </div>

                  <h4 className="font-display text-sm font-bold text-ink transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                    {ta.name}
                  </h4>

                  {ta.linkedin ? (
                    <a
                      href={ta.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-[#0a66c2] transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-[#0a66c2] dark:hover:text-white"
                    >
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66Z" />
                      </svg>
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
