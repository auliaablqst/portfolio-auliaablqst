// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SiteSocial {
  linkedin: string
  github: string
  email: string
  instagram?: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  keywords: string[]
  author: string
  institution: string
  major: string
  focus: string[]
  social: SiteSocial
}

export interface HeroMetric {
  value: string
  label: string
}

export interface HeroContent {
  badge: string
  greeting: string
  name: string
  title: string
  description: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  location: string
  affiliation: string
  roleTag: string
  avatarInitials: string
  metrics: HeroMetric[]
}

export interface AboutContent {
  label: string
  heading: string
  title: string
  journey: string
  bioLeft: string
  bioRight: string
  avatarBadge: string
  skills: string[]
  focusAreas: string[]
}

export type ProjectCategory = "data" | "design" | "creative"

export interface ProjectItem {
  id: string
  title: string
  description: string
  category: ProjectCategory
  tools: string[]
  role: string
  outcome: string
  link: string
  image: string
  featured?: boolean
}

export interface HeroSlide {
  id: string
  image?: string
  alt: string
  caption: string
  tag: string
  iconName: "user" | "data" | "design" | "creative"
}

export interface ExperienceItem {
  id: string
  title: string
  role: string
  organization: string
  period: string
  startYear: number
  category: "data" | "design" | "creative"
  impact: number // Angka 1-10 untuk ketinggian titik kurva trajectory
  highlights: string[]
  tools: string[]
  summary?: string
  tone?: "indigo" | "amber" | "emerald"
}

export interface SkillGroup {
  category: string
  tone: "indigo" | "amber" | "emerald"
  items: { name: string; icon: string }[]
}

export interface CreativePhoto {
  id: string
  title: string
  caption: string
  category: string
  aspect: "landscape" | "portrait" | "square"
  placeholderGradient: string
}

export interface CreativeVideo {
  id: string
  title: string
  role: string
  duration: string
  description: string
  tools: string[]
  link: string
}

export interface CreativeContent {
  eyebrow: string
  title: string
  description: string
  photos: CreativePhoto[]
  videos: CreativeVideo[]
}

export interface ContactContent {
  eyebrow: string
  heading: string
  description: string
  email: string
  linkedin: string
  github: string
  location: string
  institution: string
  major: string
  focus: string[]
}

export interface SectionHeadings {
  projects: { eyebrow: string; title: string; description: string }
  experience: { eyebrow: string; title: string; description: string }
  skills: { eyebrow: string; title: string; description: string }
  creative: { eyebrow: string; title: string; description: string }
  contact: { eyebrow: string; title: string; description: string }
}

// ============================================================================
// DATA UTAMA & PLACEHOLDERS (Pusat seluruh konten)
// ============================================================================

export const SITE_CONFIG: SiteConfig = {
  // Sumber nama tunggal yang dipakai di navbar, hero, dan metadata
  name: "Aulia Bilqisty",
  title: "Aulia Bilqisty — Data Scientist & UI/UX Designer",
  description:
    "Portfolio profesional Aulia Bilqisty berfokus pada Data Science, UI/UX Design, serta karya kreatif Fotografi & Videografi.",
  keywords: [
    "Aulia Bilqisty",
    "Data Science",
    "UI/UX Design",
    "Business Intelligence",
    "Fotografi",
    "Videografi",
    "Politeknik Negeri Malang",
  ],
  author: "Aulia Bilqisty",
  institution: "Politeknik Negeri Malang",
  major: "Sistem Informasi Bisnis",
  focus: ["Data Science", "UI/UX Design", "Creative Media"],
  social: {
    // TODO: ganti dengan URL profil LinkedIn asli
    linkedin: "https://linkedin.com/in/auliabilqisty",
    // TODO: ganti dengan URL profil GitHub asli
    github: "https://github.com/auliabilqisty",
    // TODO: ganti dengan alamat email aktif
    email: "aulia@example.com",
    // TODO: ganti dengan Instagram jika ada
    instagram: "https://instagram.com/auliabilqisty",
  },
}

export const HERO_CONTENT: HeroContent = {
  badge: "Tersedia untuk Peluang Karir & Proyek",
  greeting: "Halo, saya",
  name: "Aulia Bilqisty",
  title: "Data Scientist & UI/UX Designer",
  description:
    "Menjembatani analisis data berbasis wawasan mendalam dengan perancangan antarmuka digital yang intuitif dan berpusat pada pengguna. Didukung kemampuan kreatif dalam fotografi dan videografi.",
  ctaPrimary: {
    label: "Lihat Proyek Pilihan",
    href: "#projects",
  },
  ctaSecondary: {
    label: "Hubungi Saya",
    href: "#contact",
  },
  location: "Malang, Indonesia",
  affiliation: "SIB · Polinema",
  roleTag: "Data Science · UI/UX Design",
  avatarInitials: "AB",
  metrics: [
    {
      // TODO: ganti dengan data asli (jumlah proyek)
      value: "6+",
      label: "Selected Projects",
    },
    {
      // TODO: ganti dengan data asli (tahun belajar/pengalaman)
      value: "3+",
      label: "Years Experience",
    },
    {
      // TODO: ganti dengan data asli (disiplin keahlian inti)
      value: "4",
      label: "Core Disciplines",
    },
  ],
}

// Copywriting profesional untuk tiap section (bebas dari teks catatan desain)
export const SECTION_HEADINGS: SectionHeadings = {
  projects: {
    eyebrow: "Projects",
    title: "Karya Pilihan & Studi Kasus",
    description:
      "Eksplorasi proyek data science, perancangan antarmuka pengguna, dan integrasi analitik dengan fokus pada dampak nyata.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Rekam Jejak & Pengalaman",
    description:
      "Perjalanan kontribusi aktif dalam kepemimpinan teknologi, tata kelola sistem informasi, dan manajemen operasional media digital.",
  },
  skills: {
    eyebrow: "Skills",
    title: "Keahlian & Kemampuan Teknis",
    description:
      "Kombinasi kompetensi inti di bidang pengolahan data analitik dan perancangan UI/UX, diperkaya kemampuan multimedia visual.",
  },
  creative: {
    eyebrow: "Creative",
    title: "Eksplorasi Fotografi & Videografi",
    description:
      "Karya visual kreatif yang memperkuat storytelling digital melalui komposisi cahaya, warna, dan narasi video yang dinamis.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Terbuka untuk Diskusi & Kolaborasi",
    description:
      "Mari terhubung untuk peluang kerja profesional, riset analitik, desain produk digital, atau proyek kreatif.",
  },
}

export const ABOUT_CONTENT: AboutContent = {
  label: "About",
  heading: "Menjembatani Data, Desain, dan Cerita Visual",
  title: "About Me",
  journey:
    "Sebagai mahasiswa Sistem Informasi Bisnis di Politeknik Negeri Malang, saya meyakini bahwa data terbaik adalah data yang dapat dipahami dan diwujudkan ke dalam antarmuka yang ramah pengguna.",
  bioLeft:
    "Berakar di Malang, saya tertarik pada machine learning, visualisasi business intelligence, dan keputusan berbasis data.",
  bioRight:
    "Di ranah kreatif, saya mengeksplorasi human-centered design, fotografi, dan sinematografi untuk menyampaikan nilai produk.",
  avatarBadge: "Polinema · SIB",
  skills: [
    "Data Science & Analytics",
    "UI/UX Design",
    "Business Intelligence",
    "Photography & Videography",
  ],
  focusAreas: ["Data Science", "UI/UX & Design", "Foto & Video"],
}

export const PROJECTS_CONTENT: ProjectItem[] = [
  {
    id: "project-1",
    // TODO: ganti judul proyek 1
    title: "Customer Segmentation & Behavioral Analysis",
    // TODO: ganti deskripsi proyek 1
    description:
      "Pemodelan klasterisasi pelanggan berbasis transaksi e-commerce untuk mengidentifikasi segmen bernilai tinggi dan mengoptimalkan retensi pelanggan.",
    category: "data",
    // TODO: ganti tools proyek 1
    tools: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    role: "Lead Data Analyst",
    outcome: "Meningkatkan akurasi rekomendasi kampanye pemasaran hingga 24%",
    link: "#",
    image: "/placeholder-project-1.svg",
    featured: true,
  },
  {
    id: "project-2",
    // TODO: ganti judul proyek 2
    title: "SaaS Analytics & Operations Dashboard UI/UX",
    // TODO: ganti deskripsi proyek 2
    description:
      "Perancangan sistem antarmuka dashboard B2B dengan penekanan pada visualisasi metrik kompleks dan kemudahan navigasi hierarkis.",
    category: "design",
    // TODO: ganti tools proyek 2
    tools: ["Figma", "Design Tokens", "Wireframing", "Usability Testing"],
    role: "UI/UX Designer",
    outcome: "Merancang 45+ komponen reusable dengan skor pengujian SUS 86",
    link: "#",
    image: "/placeholder-project-2.svg",
    featured: false,
  },
  {
    id: "project-3",
    // TODO: ganti judul proyek 3
    title: "Executive Sales & Inventory BI Dashboard",
    // TODO: ganti deskripsi proyek 3
    description:
      "Dashboard interaktif end-to-end untuk monitoring performa omzet harian, rasio perputaran inventori, dan peramalan tren kuartalan.",
    category: "data",
    // TODO: ganti tools proyek 3
    tools: ["Power BI", "SQL", "DAX", "Data Modeling"],
    role: "BI Developer",
    outcome: "Mengotomatisasi pelaporan mingguan manual dan menghemat 6 jam kerja per minggu",
    link: "#",
    image: "/placeholder-project-3.svg",
    featured: false,
  },
  {
    id: "project-4",
    // TODO: ganti judul proyek 4
    title: "Mobile Banking & Smart Wealth App Design",
    // TODO: ganti deskripsi proyek 4
    description:
      "Redesain menyeluruh pengalaman onboarding dan portfolio investasi mikro dengan pendekatan mikro-interaksi yang ramah pemula.",
    category: "design",
    // TODO: ganti tools proyek 4
    tools: ["Figma", "Prototyping", "User Research", "Mobile UI"],
    role: "Product Designer",
    outcome: "Menurunkan tingkat drop-off pengguna pada simulasi registrasi akun hingga 35%",
    link: "#",
    image: "/placeholder-project-4.svg",
    featured: false,
  },
  {
    id: "project-5",
    // TODO: ganti judul proyek 5
    title: "Editorial Brand Shoot & Visual Campaign",
    // TODO: ganti deskripsi proyek 5
    description:
      "Produksi aset visual fotografi studio untuk peluncuran lini produk ritel, mencakup tata cahaya, pengarahan gaya, dan post-processing.",
    category: "creative",
    // TODO: ganti tools proyek 5
    tools: ["Sony Alpha", "Lightroom", "Color Grading", "Lighting"],
    role: "Photographer & Art Director",
    outcome: "Menghasilkan 30+ aset visual beresolusi tinggi untuk katalog dan promosi digital",
    link: "#",
    image: "/placeholder-project-5.svg",
    featured: false,
  },
  {
    id: "project-6",
    // TODO: ganti judul proyek 6
    title: "Short Documentary: Inovasi Mahasiswa Polinema",
    // TODO: ganti deskripsi proyek 6
    description:
      "Video dokumenter pendek berdurasi 3 menit yang meliput perjuangan tim riset teknologi dalam kompetisi inovasi berskala nasional.",
    category: "creative",
    // TODO: ganti tools proyek 6
    tools: ["Premiere Pro", "DaVinci Resolve", "Audio Mastering"],
    role: "Director & Video Editor",
    outcome: "Diputar pada seremonial pembukaan expo kampus dengan lebih dari 1.200 pemirsa",
    link: "#",
    image: "/placeholder-project-6.svg",
    featured: false,
  },
]

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-portrait",
    // TODO: ganti path foto potret asli Anda jika sudah ada di /public
    image: "/placeholder-portrait.svg",
    alt: "Potret Profesional Aulia Bilqisty",
    caption: "Data Scientist & UI/UX Designer berbasis di Malang",
    tag: "Potret Utama",
    iconName: "user",
  },
  {
    id: "slide-data",
    // TODO: ganti path preview riset data asli
    image: "/placeholder-project-1.svg",
    alt: "Machine Learning & Customer Segmentation",
    caption: "Pemodelan klasterisasi analitik dan visualisasi data bisnis",
    tag: "Data Science",
    iconName: "data",
  },
  {
    id: "slide-design",
    // TODO: ganti path preview desain UI/UX asli
    image: "/placeholder-project-2.svg",
    alt: "SaaS Analytics Dashboard UI System",
    caption: "Perancangan design tokens dan antarmuka interaktif",
    tag: "UI/UX Design",
    iconName: "design",
  },
  {
    id: "slide-creative",
    // TODO: ganti path preview fotografi / video asli
    image: "/placeholder-project-5.svg",
    alt: "Editorial Photography & Visual Stories",
    caption: "Studi pencahayaan studio dan sinematografi naratif",
    tag: "Foto & Video",
    iconName: "creative",
  },
]

export const EXPERIENCE_CONTENT: ExperienceItem[] = [
  {
    id: "exp-1",
    // TODO: ganti milestone pencapaian 1
    title: "Koordinator Publikasi & Desain Kreatif",
    role: "Desainer & Koordinator",
    organization: "Pekan Ilmiah & Kewirausahaan Mahasiswa",
    period: "2021 - 2022",
    startYear: 2021,
    category: "creative",
    impact: 4.2,
    highlights: ["Merancang identitas visual event", "Mencapai 15+ kampus peserta", "Manajemen aset promosi"],
    tools: ["Figma", "Illustrator", "Event Ops"],
    summary: "Memimpin perancangan materi komunikasi visual dan publikasi digital multi-channel untuk event tahunan.",
    tone: "emerald",
  },
  {
    id: "exp-2",
    // TODO: ganti milestone pencapaian 2
    title: "Spesialis Media & IT Support",
    role: "Media Lead & Web Support",
    organization: "Komunitas Robotika Polinema",
    period: "2022 - 2023",
    startYear: 2022,
    category: "creative",
    impact: 5.8,
    highlights: ["Dokumentasi video kompetisi nasional", "Pemeliharaan portal web komunitas", "Live streaming teknis"],
    tools: ["Sony Alpha", "Premiere Pro", "WordPress"],
    summary: "Mengelola produksi konten dokumentasi, liputan live kompetisi regional, serta pemeliharaan portal web.",
    tone: "amber",
  },
  {
    id: "exp-3",
    // TODO: ganti milestone pencapaian 3
    title: "UI/UX Researcher & Design Systems",
    role: "Product Designer",
    organization: "Proyek Kolaboratif SIB Polinema",
    period: "2023",
    startYear: 2023,
    category: "design",
    impact: 7.2,
    highlights: ["Menyusun 45+ komponen atomik", "Usability testing skor SUS 86", "Prototyping interaktif"],
    tools: ["Figma", "Design Tokens", "Usability Testing"],
    summary: "Merancang fondasi sistem desain modular untuk aplikasi layanan kampus dan evaluasi kegunaan pengguna.",
    tone: "indigo",
  },
  {
    id: "exp-4",
    // TODO: ganti milestone pencapaian 4
    title: "Ketua Divisi IT & Digital Operations",
    role: "Ketua Divisi IT",
    organization: "Himpunan Mahasiswa Sistem Informasi Bisnis",
    period: "2023 - 2024",
    startYear: 2023,
    category: "data",
    impact: 8.5,
    highlights: ["Memimpin roadmap digital organisasi", "Manajemen tim tech & media", "Sentralisasi basis data"],
    tools: ["System Ops", "Leadership", "SQL Database"],
    summary: "Mengomandoi perumusan sistem informasi internal dan tata kelola infrastruktur teknologi himpunan.",
    tone: "indigo",
  },
  {
    id: "exp-5",
    // TODO: ganti milestone pencapaian 5
    title: "Lead Data Analyst: E-Commerce Segmentation",
    role: "Lead Data Analyst",
    organization: "Riset Terapan Data Science",
    period: "2024",
    startYear: 2024,
    category: "data",
    impact: 9.3,
    highlights: ["Pemodelan K-Means clustering", "Optimasi retensi pelanggan +24%", "Dashboard interaktif"],
    tools: ["Python", "Pandas", "Scikit-Learn", "Power BI"],
    summary: "Membangun model segmentasi perilaku belanja pelanggan dan memvisualisasikan insight untuk strategi retensi.",
    tone: "indigo",
  },
  {
    id: "exp-6",
    // TODO: ganti milestone pencapaian 6
    title: "B2B SaaS Analytics Architecture & Design",
    role: "UI/UX & Data Specialist",
    organization: "Studi Kasus Bisnis Terintegrasi",
    period: "2025 - Sekarang",
    startYear: 2025,
    category: "design",
    impact: 9.8,
    highlights: ["Integrasi data warehousing ke UI", "Desain visualisasi metrik kompleks", "Efisiensi alur pengguna"],
    tools: ["Figma", "SQL", "Tableau", "Prototyping"],
    summary: "Mengintegrasikan pipeline analitik data ke dalam antarmuka web modern yang intuitif dan recruiter-friendly.",
    tone: "indigo",
  },
]

// 4 Grup Skill sesuai instruksi: Data Science, UI/UX & Design, Fotografi, Videografi (tanpa Web Dev)
export const SKILLS_CONTENT: SkillGroup[] = [
  {
    category: "Data Science",
    tone: "indigo",
    // TODO: ganti daftar tools/skills Data Science
    items: [
      { name: "Python", icon: "python" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Scikit-Learn", icon: "scikit-learn" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "Power BI", icon: "power-bi" },
      { name: "Tableau", icon: "tableau" },
      { name: "Data Cleaning & EDA", icon: "data-cleaning" },
    ],
  },
  {
    category: "UI/UX & Design",
    tone: "amber",
    // TODO: ganti daftar tools/skills UI/UX
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Design Systems", icon: "design-systems" },
      { name: "Wireframing & Prototyping", icon: "wireframing" },
      { name: "User Research & Journey", icon: "user-research" },
      { name: "Information Architecture", icon: "information-architecture" },
      { name: "Responsive Layouts", icon: "responsive-layouts" },
    ],
  },
  {
    category: "Fotografi",
    tone: "emerald",
    // TODO: ganti daftar tools/skills Fotografi
    items: [
      { name: "Komposisi & Framing", icon: "composition" },
      { name: "Pencahayaan Studio", icon: "lighting" },
      { name: "Foto Editorial & Potret", icon: "editorial-photography" },
      { name: "Adobe Lightroom", icon: "lightroom" },
      { name: "Koreksi Warna & Retouching", icon: "color-correction" },
      { name: "Fotografi Produk", icon: "product-photography" },
    ],
  },
  {
    category: "Videografi",
    tone: "indigo",
    // TODO: ganti daftar tools/skills Videografi
    items: [
      { name: "Storyboarding & Scripting", icon: "storyboarding" },
      { name: "Sinematografi Dasar", icon: "cinematography" },
      { name: "Adobe Premiere Pro", icon: "premiere-pro" },
      { name: "DaVinci Resolve", icon: "davinci-resolve" },
      { name: "Color Grading (Rec.709)", icon: "color-grading" },
      { name: "Audio Mixing Dasar", icon: "audio-mixing" },
    ],
  },
]

export const CREATIVE_CONTENT: CreativeContent = {
  eyebrow: "Creative",
  title: "Visual Storytelling: Foto & Video",
  description:
    "Eksplorasi visual kreatif yang mengabadikan momen berharga melalui komposisi framing, pencahayaan alami, dan ritme video yang dinamis.",
  photos: [
    {
      id: "photo-1",
      title: "Geometri Perkotaan",
      caption: "Studi garis dan bayangan arsitektur modern perkotaan.",
      category: "Arsitektur",
      aspect: "landscape",
      placeholderGradient: "from-indigo-900 via-purple-900 to-slate-900",
    },
    {
      id: "photo-2",
      title: "Potret Cahaya Alami",
      caption: "Eksplorasi pencahayaan natural di golden hour.",
      category: "Potret",
      aspect: "portrait",
      placeholderGradient: "from-amber-900 via-orange-900 to-zinc-900",
    },
    {
      id: "photo-3",
      title: "Detail & Tekstur Kerajinan",
      caption: "Studio macro capture untuk detail material kerajinan lokal.",
      category: "Produk",
      aspect: "square",
      placeholderGradient: "from-emerald-900 via-teal-900 to-slate-900",
    },
    {
      id: "photo-4",
      title: "Dinamika Jalanan",
      caption: "Merekam ritme dan aktivitas pejalan kaki di pusat kota.",
      category: "Street Photography",
      aspect: "landscape",
      placeholderGradient: "from-slate-800 via-blue-950 to-neutral-900",
    },
  ],
  videos: [
    {
      id: "video-1",
      title: "Behind the Screen: Creative Process",
      role: "Director & Editor",
      duration: "02:15",
      description: "Mini video esai tentang alur perancangan antarmuka pengguna dari wireframe kasar hingga prototipe final.",
      tools: ["Premiere Pro", "After Effects"],
      link: "#",
    },
    {
      id: "video-2",
      title: "Showcase Inovasi & Teknologi Kampus",
      role: "Sinematografer & Colorist",
      duration: "01:45",
      description: "Video rangkuman dinamis yang menampilkan karya teknologi mahasiswa di pameran inovasi.",
      tools: ["DaVinci Resolve", "Sony Alpha"],
      link: "#",
    },
  ],
}

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Contact & Collaboration",
  heading: "Terbuka untuk diskusi proyek dan peluang kerja sama.",
  description:
    "Apakah Anda mencari kolaborator di ranah data science, riset antarmuka UI/UX, atau produksi konten visual kreatif? Mari terhubung.",
  email: "aulia@example.com",
  linkedin: "https://linkedin.com/in/auliabilqisty",
  github: "https://github.com/auliabilqisty",
  location: "Malang, Jawa Timur, Indonesia",
  institution: "Politeknik Negeri Malang",
  major: "Sistem Informasi Bisnis",
  focus: ["Data Science", "UI/UX Design", "Creative Media"],
}
