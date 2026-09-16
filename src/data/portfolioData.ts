import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Frans Lampard',
  tagline: 'Mahasiswa Teknik Informatika | Cyber Security Enthusiast',
  education: 'Teknik Informatika (S1)',
  status: 'Open for Cyber Security Roles & Projects',
  bio: 'Halo, saya Frans Lampard, mahasiswa Teknik Informatika yang fokus di Cyber Security, khususnya keamanan aplikasi web. Saya terbiasa melakukan secure code review, pengujian OWASP Top 10, dan hardening deployment Linux. Latar belakang web development membuat saya nyaman membaca source code sampai ke query paling dalam untuk memastikan aplikasi aman sebelum rilis.',
  experienceStart: 'Security-Focused Developer',
  avatarUrl: '/profile.jpeg',
  interests: [
    'Cyber Security',
    'Web App Security',
    'OWASP Top 10',
    'Secure Code Review',
    'Linux Hardening'
  ],
  contact: {
    email: 'franslampard321@gmail.com',
    github: 'https://github.com/FransLard',
    linkedin: 'https://www.linkedin.com/in/frans-lampard/',
    location: 'Indonesia'
  }
};

export const techStackData: TechItem[] = [

  {
    name: 'TypeScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'typescript',
    color: '#3178C6',
    roleTag: 'Safe Rendering',
    usageContext: 'Output encoding, validasi input di sisi klien, dan kontrak tipe buat cegah bug yang berujung XSS',
    projectLinks: ['phishing-detector', 'password-tools']
  },
  {
    name: 'React',
    category: 'frontend',
    layer: 'client',
    iconKey: 'react',
    color: '#0e9384',
    roleTag: 'Secure Components',
    usageContext: 'Pola komponen aman: dangerouslySetInnerHTML dihindari, auth state dijaga, error tidak bocorkan data sensitif',
    projectLinks: ['phishing-detector', 'password-tools']
  },
  {
    name: 'Next.js',
    category: 'frontend',
    layer: 'client',
    iconKey: 'nextdotjs',
    color: '#0f172a',
    roleTag: 'Secure Headers',
    usageContext: 'Middleware auth, security headers, dan pemisahan server/client component biar secret tidak kebawa ke browser',
    projectLinks: []
  },
  {
    name: 'Tailwind CSS v4',
    category: 'frontend',
    layer: 'client',
    iconKey: 'tailwindcss',
    color: '#06b6d4',
    roleTag: 'Design Tokens',
    usageContext: 'Styling utilitas buat halaman security report dan dashboard temuan yang gampang dibaca',
    projectLinks: ['password-tools']
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'javascript',
    color: '#eab308',
    roleTag: 'DOM Awareness',
    usageContext: 'Bedah DOM XSS, open redirect, dan prototype pollution dari sisi browser',
    projectLinks: ['velard-tools', 'phishing-detector', 'password-tools']
  },

  {
    name: 'Python',
    category: 'backend',
    layer: 'backend',
    iconKey: 'python',
    color: '#3776AB',
    roleTag: 'Scanner Engine',
    usageContext: 'Asyncio port scanner, tech fingerprinting, dan payload testing SQLi/XSS buat audit web cepat',
    projectLinks: ['web-scanner', 'phishing-detector', 'password-tools']
  },
  {
    name: 'Laravel',
    category: 'backend',
    layer: 'backend',
    iconKey: 'laravel',
    color: '#ef4444',
    roleTag: 'Secure Backend',
    usageContext: 'CSRF protection, Eloquent ORM anti-SQLi, policy authorization, dan rate limit login',
    projectLinks: ['booking-gedung']
  },
  {
    name: 'Node.js',
    category: 'backend',
    layer: 'backend',
    iconKey: 'nodejs',
    color: '#22c55e',
    roleTag: 'API Hardening',
    usageContext: 'Validasi schema, JWT rotation, helmet headers, dan logging percobaan auth mencurigakan',
    projectLinks: ['velard-tools', 'phishing-detector']
  },

  {
    name: 'PostgreSQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'postgresql',
    color: '#2563eb',
    roleTag: 'RLS & Least Privilege',
    usageContext: 'Row-level security, role DB terpisah per service, dan query parameterized tanpa string concat',
    projectLinks: []
  },
  {
    name: 'MySQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'mysql',
    color: '#0e9384',
    roleTag: 'Injection-Safe',
    usageContext: 'Prepared statements, user privilege minimal, dan backup terenkripsi buat data transaksi',
    projectLinks: ['booking-gedung']
  },

  {
    name: 'Linux',
    category: 'tools',
    layer: 'devops',
    iconKey: 'linux',
    color: '#eab308',
    roleTag: 'Hardening',
    usageContext: 'SSH key-only, file permission audit, fail2ban, dan baca log auth kayak baca koran pagi',
    projectLinks: ['velard-tools', 'phishing-detector', 'password-tools', 'booking-gedung', 'web-scanner']
  },
  {
    name: 'Docker',
    category: 'tools',
    layer: 'devops',
    iconKey: 'docker',
    color: '#0e9384',
    roleTag: 'Isolation',
    usageContext: 'Image minimal, non-root user, secret via env bukan baked di layer, dan scan sebelum push',
    projectLinks: ['velard-tools', 'booking-gedung']
  },
  {
    name: 'Git',
    category: 'tools',
    layer: 'devops',
    iconKey: 'git',
    color: '#f97316',
    roleTag: 'Secret Hygiene',
    usageContext: 'Gitleaks pre-commit, signed commit, dan review diff khusus cari credential nyangkut',
    projectLinks: ['velard-tools', 'phishing-detector', 'password-tools', 'booking-gedung', 'web-scanner']
  }
];

export const projectsData: Project[] = [
  {
    id: 'velard-tools',
    title: 'Velard Tools - Video Toolkit for Creators',
    subtitle: '8 browser based video tools with 100 percent local processing',
    category: 'fullstack',
    summary: 'Static video toolkit for content creators, live at velardtools.my.id: Quality Method compression, MP3 extract, format convert, cut, rescale, mute, thumbnail, and merge, all processed locally with FFmpeg WASM so files never leave the device.',
    description: 'I built Velard Tools as a privacy first toolkit for creators who need fast video utilities without uploading files anywhere. The app is handcrafted vanilla JS at version 1.2 with Indonesian and English support. Every tool runs fully in the browser using FFmpeg WASM plus JavaScript patches. Security was part of the build from day one: strict Content Security Policy, HSTS preload, X-Frame-Options DENY with frame ancestors none, COOP COEP CORP isolation, nosniff, and a documented security policy with responsible disclosure. Production JavaScript ships as an obfuscated build artifact from a Node pipeline using javascript-obfuscator and terser, verified by jsdom checks, while secrets stay out of version control.',
    architecture: [
      'Eight client side tools: Quality Method, MP3 extract, format convert, cut, rescale, mute, thumbnail, and merge, powered by FFmpeg WASM workers',
      'Zero upload architecture: files are processed in memory with blob URLs, stated in the FAQ, spec page, and structured data',
      'Hardened delivery: strict CSP, HSTS preload, anti clickjacking headers, COOP COEP CORP, Permissions Policy, and Vercel deployment',
      'Reproducible build pipeline: source in src, obfuscated output in assets, automated checks before release, plus an EmailJS bug report flow with rate limit and honeypot'
    ],
    stack: [
      'JavaScript',
      'FFmpeg WASM',
      'HTML/CSS',
      'Node.js',
      'Vercel',
      'Security Headers'
    ],
    highlights: [
      'Live production site at velardtools.my.id with SEO, sitemap, and structured data',
      'Published SECURITY.md with scope, disclosure flow, and a 24 hour response target',
      'Full ID and EN localization with tutorials, spec sheet, changelog, and FAQ panels'
    ],
    challenges: 'Keeping large video files smooth on low end phones while keeping every byte on device and the UI simple for non technical creators.',
    role: 'Frontend Developer & AppSec',
    demoUrl: 'https://velardtools.my.id/',
    githubUrl: 'https://github.com/FransLard/VTOOLS',
    imageUrl: '/projects/velardtools.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Focus', value: 'Video Toolkit' },
      { label: 'Privacy', value: '100% Local' },
      { label: 'Outcome', value: 'Live Production' }
    ]
  },
  {
    id: 'phishing-detector',
    title: 'Phishing Website Detector - ML Classifier',
    subtitle: 'Random Forest model with 30 URL and content features',
    category: 'fullstack',
    summary: 'Machine learning phishing detector trained on the UCI dataset of 11,055 samples: extracts 30 features from URL structure and page content, then classifies with a Random Forest model at about 96.7 percent accuracy with explainable output.',
    description: 'I built this detector to catch phishing sites automatically instead of relying on manual URL inspection. A feature extractor pulls 30 signals covering IP literals, URL length, shorteners, at symbols, redirects, SSL state, domain age, WHOIS, favicon, ports, anchors, iframes, and reputation data, using requests, BeautifulSoup, tld, and python-whois. The Random Forest classifier from scikit-learn is trained with a train test split and evaluated with a classification report and confusion matrix. The CLI supports check for instant verdicts, analyze for detailed explanations with risk score and confidence, train for retraining on custom datasets, plus setup and features helpers, and a CustomTkinter desktop GUI ships for non terminal users.',
    architecture: [
      'Feature pipeline with 30 UCI aligned signals from URL lexicals, HTML content, DNS, and WHOIS, with timeout and concurrency control',
      'Random Forest training flow with mapped column names, configurable test split, serialized model artifacts, and automatic dataset download',
      'Explainable analyzer reporting risk score, confidence, suspicious versus safe feature counts, and ranked reasons per verdict',
      'Dual interface: argparse CLI with check, analyze, train, features, setup, and gui commands plus a CustomTkinter desktop app'
    ],
    stack: [
      'Python',
      'scikit-learn',
      'pandas',
      'CustomTkinter',
      'BeautifulSoup',
      'WHOIS/DNS'
    ],
    highlights: [
      'About 96.7 percent accuracy on the 11,055 sample UCI phishing dataset',
      'Verbose analysis mode that shows every feature behind a verdict for auditability',
      'Retrainable on any CSV dataset with saved model artifacts for reuse'
    ],
    challenges: 'Keeping live web lookups fast and resilient with timeouts and fallbacks so one slow DNS or WHOIS query never blocks the whole verdict.',
    role: 'ML Security Developer',
    githubUrl: 'https://github.com/FransLard/deteksi_link_phising',
    imageUrl: '/projects/phishing-detector.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Focus', value: 'Phishing ML' },
      { label: 'Accuracy', value: '96.7%' },
      { label: 'Features', value: '30 Signals' }
    ]
  },
  {
    id: 'password-tools',
    title: 'Password Tool - Strength Checker and Generator',
    subtitle: 'Offline Python CLI and GUI with HIBP breach awareness',
    category: 'fullstack',
    summary: 'Dependency free password toolkit in pure Python: 0 to 100 strength scoring with entropy, pattern detection, Have I Been Pwned breach checks, batch file audits, and a secrets based generator, available as CLI and tkinter GUI.',
    description: 'I built this tool to make password hygiene practical without sending sensitive data anywhere. The checker scores each password from 0 to 100 across length, character variety, and entropy, then subtracts points for common passwords, keyboard sequences, sequential characters, date patterns, and repeats, returning one of five strength levels plus up to five fix suggestions. Breach awareness uses the Have I Been Pwned k anonymity API, so only a SHA1 prefix leaves the machine and the full hash never does. The generator uses the secrets module with guaranteed characters per selected category, an option to exclude lookalike glyphs, and lengths from 4 to 128. Everything runs offline except the optional breach lookup, with batch audits from text files and a two tab tkinter desktop app for check and generate flows.',
    architecture: [
      'Rule based scorer combining length tiers, category bonuses, entropy bands, and penalties into a clamped 0 to 100 result',
      'Privacy preserving breach check with SHA1 k anonymity range queries, masked password display, and clear safe versus breached messaging',
      'CSPRNG generator with mandatory characters per category, SystemRandom shuffle, similar character exclusion, and instant rescore',
      'Two interfaces sharing one engine: argparse CLI with check, check file, generate, and gui commands plus a tkinter notebook GUI'
    ],
    stack: [
      'Python',
      'tkinter',
      'secrets',
      'hashlib',
      'HIBP API',
      'Entropy Analysis'
    ],
    highlights: [
      'Zero dependencies: standard library only, runs anywhere Python runs',
      'Batch mode audits whole password lists with per entry score, entropy, and breach flags',
      'Generator output is scored immediately so every suggestion is verifiably strong'
    ],
    challenges: 'Designing a score that punishes real world patterns honestly while keeping suggestions short enough for non technical users to act on.',
    role: 'Security Tooling Developer',
    githubUrl: 'https://github.com/FransLard/password-tool',
    imageUrl: '/projects/passwordtools.png',
    imageFit: 'contain',
    featured: true,
    metrics: [
      { label: 'Focus', value: 'Password Hygiene' },
      { label: 'Deps', value: 'Zero Dependency' },
      { label: 'Output', value: 'CLI plus GUI' }
    ]
  },
  {
    id: 'booking-gedung',
    title: 'Booking Gedung - Secure Reservation',
    subtitle: 'Sistem reservasi gedung dengan auth, otorisasi & anti double-booking',
    category: 'fullstack',
    summary: 'Aplikasi booking gedung dengan fokus access control: user hanya lihat booking miliknya, admin terpisah jelas, dan validasi bentrok jadwal di sisi server.',
    description: 'Sistem reservasi gedung fullstack: backend Laravel (Sanctum auth, REST API) dan aplikasi mobile Flutter untuk browse gedung, booking tanggal, dan riwayat. Saya pegang sisi keamanan: broken access control (IDOR) ditutup dengan ownership check di setiap endpoint, validasi bentrok tanggal di server bukan di client, dan role admin dipisah dengan middleware.',
    architecture: [
      'Backend Laravel REST API: auth Sanctum, endpoint buildings, rooms, bookings, dan dashboard admin',
      'Mobile Flutter (Dart): browse gedung, date/time picker booking, riwayat, dan push notification',
      'Ownership check di setiap endpoint booking untuk cegah IDOR + validasi bentrok jadwal di server',
      'MySQL dengan email notification dan audit jejak siapa booking, ubah, dan batalkan'
    ],
    stack: [
      'Laravel',
      'Flutter',
      'MySQL',
      'Sanctum',
      'Dart',
      'REST API'
    ],
    highlights: [
      'IDOR tertutup: user tidak bisa intip/ubah booking orang lain',
      'Double-booking via request manual berhasil dicegah',
      'Alur tetap simpel untuk petugas gedung yang non-teknis'
    ],
    challenges: 'Aturan bisnis gedung (jam operasional, buffer bersih-bersih) harus diterjemahkan jadi validasi server yang presisi.',
    role: 'Fullstack & Security Reviewer',
    githubUrl: 'https://github.com/FransLard/booking-gedung',
    imageUrl: '/projects/bookinggedung.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Focus', value: 'IDOR & Logic' },
      { label: 'Control', value: 'Auth + RBAC' },
      { label: 'Outcome', value: 'No Double-Book' }
    ]
  },
  {
    id: 'web-scanner',
    title: 'Web Scanner - Multi-Mode Security Scanner',
    subtitle: 'Port scan async, tech fingerprinting & cek SQLi/XSS dalam satu CLI + GUI',
    category: 'fullstack',
    summary: 'Scanner keamanan web 4 mode (scan, tech, vuln, full): port scanner async dengan banner grabbing, deteksi teknologi via header + HTML, dan pengujian SQLi & reflected XSS berbasis payload.',
    description: 'Saya bangun Web Scanner sebagai tool audit awal sebelum testing manual: CLI Python dengan 4 subcommand plus GUI Tkinter untuk yang tidak nyaman di terminal. Mode scan memakai asyncio (128 konkuren) untuk cek 25+ common ports atau full 1-1024 dengan banner grabbing HTTP/FTP/SMTP. Mode tech mem-fingerprint server, framework, CMS, dan CDN dari header dan pola HTML. Mode vuln menguji tiap parameter GET dengan 5 payload SQLi error-based dan 3 payload XSS lalu cek error signature dan refleksi. Semua hasil bisa disimpan sebagai laporan JSON/TXT siap lampiran assessment.',
    architecture: [
      'Port scanner asyncio + socket dengan semaphore 128, support --ports custom dan --all (1-1024 + common)',
      'Banner grabbing per-service: HTTP GET, FTP, SMTP EHLO, dan TLS wrap khusus port 443',
      'Tech detector: analisis header (Server, X-Powered-By, CF-RAY, Varnish) + fingerprint HTML WordPress, Laravel, React, Vue, Angular',
      'Vuln tester: injeksi payload SQLi/XSS per parameter GET, deteksi via DB error signature dan payload reflection, dengan fallback HTTPS ke HTTP'
    ],
    stack: [
      'Python',
      'asyncio',
      'requests',
      'Tkinter GUI',
      'colorama',
      'OWASP Top 10'
    ],
    highlights: [
      'Satu perintah full langsung gabungkan port scan + tech detect + vuln scan',
      'GUI Tkinter dengan form target/ports/timeout, progress bar, log live, dan save report',
      'Laporan JSON/TXT otomatis dengan rincian port, teknologi, dan temuan per severity'
    ],
    challenges: 'Menjaga scan tetap cepat tapi sopan (timeout, concurrency limit) dan menekan false positive SQLi/XSS tanpa crawler full.',
    role: 'Security Tooling Developer',
    githubUrl: 'https://github.com/FransLard/web_scanner',
    imageUrl: '/projects/web-scanner.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Modes', value: '4-in-1 Scanner' },
      { label: 'Engine', value: 'Python Asyncio' },
      { label: 'Output', value: 'CLI + GUI + Report' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'edu-informatika',
    period: '2023 - Sekarang',
    role: 'S1 Teknik Informatika',
    organization: 'Universitas Prima Indonesia',
    badge: 'Pendidikan Formal',
    category: 'education',
    description:
      'Kuliah sambil ngoprek: fundamental struktur data, jaringan, basis data, dan rekayasa perangkat lunak. Minatnya pelan-pelan geser dari sekadar “bisa coding” ke “coding yang tidak gampang dibobol”.',
    highlights: [
      'Basis Data, Jaringan & Sistem Operasi',
      'Praktik SQL aman & pemodelan relasional',
      'Mulai dalami OWASP sejak semester tengah'
    ],
    tech: ['Algorithms', 'SQL', 'Networking', 'Linux Basics', 'Software Engineering']
  },
  {
    id: 'exp-web-foundation',
    period: '2024 - 2025',
    role: 'Web Developer (Foundation)',
    organization: 'Freelance & Proyek Kampus',
    badge: 'Web Foundation',
    category: 'project',
    description:
      'Bangun web fullstack Laravel + React buat kebutuhan kampus dan desa. Dari sini paham betul pola bug klasik: lupa authorize, percaya input user, dan callback payment yang asal trust.',
    highlights: [
      'Bangun & rawat 2 aplikasi produksi kecil',
      'Belajar dari bug sendiri: IDOR & auth bypass',
      'Mulai nulis checklist rilis aman sendiri'
    ],
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Docker', 'Git']
  },
  {
    id: 'exp-appsec-bootcamp',
    period: '2025 - 2026',
    role: 'Application Security Trainee',
    organization: 'Bootcamp & Lab Mandiri (Web Pentest Path)',
    badge: 'AppSec Training',
    category: 'security',
    description:
      'Latihan intensif web pentest: OWASP Top 10, Burp Suite, review source code, dan nulis laporan temuan yang bisa langsung di-fix developer. Lab-nya PortSwigger, DVWA, dan aplikasi sendiri.',
    highlights: [
      'Burp Suite: repeater, intruder & sequencer',
      'Secure code review PHP/JS: XSS, SQLi, IDOR, SSRF',
      'Nulis laporan severity + langkah reproduksi + fix'
    ],
    tech: ['Burp Suite', 'OWASP ZAP', 'OWASP Top 10', 'Secure Review', 'Linux', 'Reporting']
  },
  {
    id: 'exp-bug-hunting',
    period: '2026 - Sekarang',
    role: 'Bug Hunter & Security Reviewer',
    organization: 'Program Publik & Audit Proyek Teman',
    badge: 'Hunting & Review',
    category: 'security',
    description:
      'Ikut program bug bounty publik scope kecil dan bantu review proyek teman sebelum rilis. Fokus di broken access control dan logic flaw, area yang sering terlewat scanner tapi dampaknya nyata.',
    highlights: [
      'Valid report pertama: IDOR di fitur invoice',
      'Review pre-release buat 3 proyek web teman',
      'Bangun template laporan AppSec sendiri'
    ],
    tech: ['Bug Bounty', 'Access Control', 'API Testing', 'Nuclei', 'Writeups']
  }
];
