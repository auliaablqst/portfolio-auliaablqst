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

export interface AboutStat {
  value: string
  label: string
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
  stats: AboutStat[]
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

export interface ExperienceItem {
  period: string
  role: string
  organization: string
  summary: string
  highlights: string[]
  tone: "indigo" | "amber" | "emerald"
}

export interface SkillGroup {
  category: string
  tone: "indigo" | "amber" | "emerald"
  items: string[]
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

// ============================================================================
// DATA PLACEHOLDERS (Semua data dipusatkan di sini)
// ============================================================================

export const SITE_CONFIG: SiteConfig = {
  // TODO: ganti dengan nama lengkap Anda
  name: "Nama Lengkap",
  // TODO: ganti dengan title halaman/SEO Anda
  title: "Nama Lengkap — Data Scientist & UI/UX Designer",
  // TODO: ganti dengan deskripsi meta SEO Anda
  description: "Portfolio profesional Data Science, UI/UX Design, serta karya kreatif Fotografi & Videografi.",
  // TODO: ganti dengan kata kunci yang relevan
  keywords: [
    "Data Science",
    "UI/UX Design",
    "Business Intelligence",
    "Photography",
    "Videography",
    "Portfolio",
  ],
  // TODO: ganti dengan nama penulis/pemilik
  author: "Nama Lengkap",
  // TODO: ganti dengan institusi/kampus Anda
  institution: "Politeknik Negeri Malang",
  // TODO: ganti dengan jurusan/program studi Anda
  major: "Sistem Informasi Bisnis",
  // TODO: ganti dengan bidang fokus keahlian Anda
  focus: ["Data Science", "UI/UX Design", "Creative Media"],
  social: {
    // TODO: ganti dengan URL profil LinkedIn asli Anda
    linkedin: "https://linkedin.com/in/username",
    // TODO: ganti dengan URL profil GitHub asli Anda
    github: "https://github.com/username",
    // TODO: ganti dengan alamat email aktif Anda
    email: "email@example.com",
    // TODO: ganti dengan username atau URL Instagram jika ada
    instagram: "https://instagram.com/username",
  },
}

export const HERO_CONTENT: HeroContent = {
  // TODO: ganti teks badge pembuka
  badge: "Available for Projects & Roles",
  // TODO: ganti kata sapaan jika diinginkan
  greeting: "Halo, saya",
  // TODO: ganti dengan nama panggilan / nama display
  name: "Nama Lengkap",
  // TODO: ganti headline / sub-judul profesi
  title: "Data Science, UI/UX Design & Creative Storytelling",
  // TODO: ganti ringkasan singkat profil Anda untuk Hero
  description:
    "Menggabungkan ketajaman analitik data dengan estetika antarmuka intuitif untuk menghasilkan produk digital yang fungsional, terukur, dan bermakna.",
  ctaPrimary: {
    label: "Lihat Proyek",
    href: "#projects",
  },
  ctaSecondary: {
    label: "Hubungi Saya",
    href: "#contact",
  },
  // TODO: ganti lokasi domisili Anda
  location: "Malang, Indonesia",
  // TODO: ganti label singkat afiliasi kampus / instansi
  affiliation: "SIB · Polinema",
  // TODO: ganti tag keahlian utama di kartu foto hero
  roleTag: "Data Scientist · UI/UX Designer",
  // TODO: ganti inisial avatar jika belum memakai foto
  avatarInitials: "NL",
  metrics: [
    {
      // TODO: ganti jumlah proyek selesai
      value: "6+",
      label: "Selected Projects",
    },
    {
      // TODO: ganti lama tahun pengalaman / belajar
      value: "3+",
      label: "Years Learning",
    },
    {
      // TODO: ganti jumlah disiplin inti
      value: "4",
      label: "Core Disciplines",
    },
  ],
}

export const ABOUT_CONTENT: AboutContent = {
  label: "About Me",
  heading: "Menjembatani Data, Desain, dan Cerita Visual",
  title: "About Me",
  // TODO: ganti perjalanan ringkas Anda
  journey:
    "Sebagai mahasiswa Sistem Informasi Bisnis, saya menemukan titik temu antara logika data dan empati desain pengguna. Setiap keputusan produk dimulai dari pemahaman data yang solid dan dieksekusi dengan antarmuka yang bersih.",
  // TODO: ganti narasi bio kolom kiri (latar belakang & awal mula)
  bioLeft:
    "Berbasis di Malang, saya mendalami bagaimana data warehouse, pemodelan analitik, dan visualisasi interaktif dapat menjawab tantangan operasional bisnis secara presisi.",
  // TODO: ganti narasi bio kolom kanan (passion & visi ke depan)
  bioRight:
    "Di sisi kreatif, saya memegang prinsip bahwa UI/UX yang baik bukan hanya tentang estetika visual, tapi juga tentang kemudahan navigasi dan penyampaian pesan yang beresonansi.",
  // TODO: ganti teks badge pada avatar About
  avatarBadge: "Polinema · SIB",
  skills: [
    "Data Science & Analytics",
    "UI/UX Design",
    "Business Intelligence",
    "Photography & Videography",
  ],
  stats: [
    {
      // TODO: ganti statistik 1
      value: "3+",
      label: "Tahun Eksplorasi",
    },
    {
      // TODO: ganti statistik 2
      value: "10+",
      label: "Proyek & Riset",
    },
    {
      // TODO: ganti statistik 3
      value: "100%",
      label: "Dedikasi & Detail",
    },
  ],
}

export const PROJECTS_CONTENT: ProjectItem[] = [
  {
    id: "project-1",
    // TODO: ganti judul proyek data 1
    title: "Customer Segmentation & Behavioral Analysis",
    // TODO: ganti deskripsi proyek 1
    description:
      "Pemodelan klasterisasi pelanggan berbasis transaksi e-commerce untuk mengidentifikasi segmen bernilai tinggi serta optimasi retensi.",
    category: "data",
    // TODO: ganti tools yang dipakai di proyek 1
    tools: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    // TODO: ganti peran Anda di proyek 1
    role: "Lead Data Analyst",
    // TODO: ganti dampak / hasil terukur proyek 1
    outcome: "Meningkatkan akurasi targeting segmen kampanye marketing hingga 24%",
    // TODO: ganti link demo / repository proyek 1
    link: "#",
    // TODO: ganti path gambar / mockup proyek 1
    image: "/placeholder-project-1.svg",
    featured: true,
  },
  {
    id: "project-2",
    // TODO: ganti judul proyek design 1
    title: "SaaS Analytics & Operations Dashboard UI/UX",
    // TODO: ganti deskripsi proyek 2
    description:
      "Perancangan antarmuka komprehensif dashboard analitik B2B dengan fokus pada keterbacaan data kompleks dan hierarki visual yang jelas.",
    category: "design",
    // TODO: ganti tools yang dipakai di proyek 2
    tools: ["Figma", "Design Tokens", "Wireframing", "Usability Testing"],
    // TODO: ganti peran Anda di proyek 2
    role: "UI/UX Designer",
    // TODO: ganti dampak / hasil terukur proyek 2
    outcome: "Merancang 45+ komponen reusable dengan SUS score pengujian 86",
    // TODO: ganti link prototipe / case study proyek 2
    link: "#",
    // TODO: ganti path gambar proyek 2
    image: "/placeholder-project-2.svg",
    featured: false,
  },
  {
    id: "project-3",
    // TODO: ganti judul proyek data 2
    title: "Sales Performance & Executive BI Dashboard",
    // TODO: ganti deskripsi proyek 3
    description:
      "Dashboard interaktif end-to-end untuk monitoring metrik omzet, perputaran inventori, dan proyeksi kuartalan bagi jajaran manajemen.",
    category: "data",
    // TODO: ganti tools proyek 3
    tools: ["Power BI", "SQL", "DAX", "Data Modeling"],
    // TODO: ganti peran proyek 3
    role: "BI Developer",
    // TODO: ganti outcome proyek 3
    outcome: "Memangkas waktu pelaporan mingguan manual dari 6 jam menjadi otomatis",
    // TODO: ganti link proyek 3
    link: "#",
    // TODO: ganti path gambar proyek 3
    image: "/placeholder-project-3.svg",
    featured: false,
  },
  {
    id: "project-4",
    // TODO: ganti judul proyek design 2
    title: "Mobile Banking & Smart Wealth App Design",
    // TODO: ganti deskripsi proyek 4
    description:
      "Redesain alur onboarding dan dashboard investasi mikro untuk pengguna muda dengan micro-interactions yang ramah pemula.",
    category: "design",
    // TODO: ganti tools proyek 4
    tools: ["Figma", "Prototyping", "User Research", "Mobile UI"],
    // TODO: ganti peran proyek 4
    role: "Product Designer",
    // TODO: ganti outcome proyek 4
    outcome: "Menurunkan drop-off rate simulasi pendaftaran akun hingga 35%",
    // TODO: ganti link proyek 4
    link: "#",
    // TODO: ganti path gambar proyek 4
    image: "/placeholder-project-4.svg",
    featured: false,
  },
  {
    id: "project-5",
    // TODO: ganti judul proyek creative 1
    title: "Visual Brand Campaign & Product Shoot",
    // TODO: ganti deskripsi proyek 5
    description:
      "Produksi konten visual terpadu untuk peluncuran lini produk lokal, mencakup fotografi studio dan aset media sosial.",
    category: "creative",
    // TODO: ganti tools proyek 5
    tools: ["Sony Alpha", "Lightroom", "Color Grading", "Art Direction"],
    // TODO: ganti peran proyek 5
    role: "Photographer & Creative Lead",
    // TODO: ganti outcome proyek 5
    outcome: "Menghasilkan 30+ aset visual beresolusi tinggi untuk kampanye musiman",
    // TODO: ganti link proyek 5
    link: "#",
    // TODO: ganti path gambar proyek 5
    image: "/placeholder-project-5.svg",
    featured: false,
  },
  {
    id: "project-6",
    // TODO: ganti judul proyek creative 2
    title: "Short Documentary: Crafting Digital Future",
    // TODO: ganti deskripsi proyek 6
    description:
      "Video dokumenter pendek berdurasi 3 menit yang meliput kisah inovasi teknologi mahasiswa dalam ajang kompetisi nasional.",
    category: "creative",
    // TODO: ganti tools proyek 6
    tools: ["Premiere Pro", "DaVinci Resolve", "Audio Mastering"],
    // TODO: ganti peran proyek 6
    role: "Director & Video Editor",
    // TODO: ganti outcome proyek 6
    outcome: "Diputar pada pembukaan expo tahunan dengan 1.200+ penonton",
    // TODO: ganti link proyek 6
    link: "#",
    // TODO: ganti path gambar proyek 6
    image: "/placeholder-project-6.svg",
    featured: false,
  },
]

export const EXPERIENCE_CONTENT: ExperienceItem[] = [
  {
    // TODO: ganti periode jabatan 1
    period: "2023 - Sekarang",
    // TODO: ganti nama peran / jabatan 1
    role: "Ketua Divisi IT & Digital",
    // TODO: ganti nama organisasi / instansi 1
    organization: "Himpunan Mahasiswa Sistem Informasi Bisnis",
    // TODO: ganti rangkuman tanggung jawab peran 1
    summary:
      "Memimpin perumusan roadmap digital organisasi, mengelola infrastruktur sistem informasi internal, serta membawahi tim pengembang web dan aset media.",
    // TODO: ganti highlight keahlian peran 1
    highlights: ["Leadership", "Digital Infrastructure", "Project Management"],
    tone: "indigo",
  },
  {
    // TODO: ganti periode jabatan 2
    period: "2022 - 2023",
    // TODO: ganti nama peran / jabatan 2
    role: "Spesialis Media, Dokumentasi & IT",
    // TODO: ganti nama organisasi / instansi 2
    organization: "Komunitas Teknologi & Robotika Polinema",
    // TODO: ganti rangkuman tanggung jawab peran 2
    summary:
      "Bertanggung jawab atas publikasi visual, live coverage kompetisi tingkat regional, serta pemeliharaan portal informasi komunitas.",
    // TODO: ganti highlight keahlian peran 2
    highlights: ["Videography", "Web Maintenance", "Media Production"],
    tone: "amber",
  },
  {
    // TODO: ganti periode jabatan 3
    period: "2021 - 2022",
    // TODO: ganti nama peran / jabatan 3
    role: "Koordinator Publikasi & Desain Kreatif",
    // TODO: ganti nama organisasi / event 3
    organization: "Pekan Ilmiah & Kewirausahaan Mahasiswa",
    // TODO: ganti rangkuman tanggung jawab peran 3
    summary:
      "Merancang guideline visual, booklet acara, serta materi publikasi digital multi-channel untuk menjangkau peserta dari 15+ perguruan tinggi.",
    // TODO: ganti highlight keahlian peran 3
    highlights: ["Visual Identity", "Content Direction", "Event Ops"],
    tone: "emerald",
  },
]

// 4 Grup Skill sesuai instruksi: Data Science, UI/UX & Design, Fotografi, Videografi
export const SKILLS_CONTENT: SkillGroup[] = [
  {
    category: "Data Science",
    tone: "indigo",
    // TODO: ganti daftar tools / skills Data Science
    items: [
      "Python",
      "Pandas & NumPy",
      "Scikit-Learn",
      "SQL (PostgreSQL / MySQL)",
      "Power BI",
      "Tableau",
      "Data Cleaning & EDA",
    ],
  },
  {
    category: "UI/UX & Design",
    tone: "amber",
    // TODO: ganti daftar tools / skills UI/UX & Design
    items: [
      "Figma",
      "Design Systems",
      "Wireframing & Prototyping",
      "User Research & Journey",
      "Information Architecture",
      "Responsive Layouts",
    ],
  },
  {
    category: "Fotografi",
    tone: "emerald",
    // TODO: ganti daftar tools / skills Fotografi
    items: [
      "Composition & Framing",
      "Studio Lighting",
      "Portrait & Editorial",
      "Adobe Lightroom",
      "Color Retouching",
      "Product Photography",
    ],
  },
  {
    category: "Videografi",
    tone: "indigo",
    // TODO: ganti daftar tools / skills Videografi
    items: [
      "Storyboarding & Scripting",
      "Cinematography",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Color Grading (Rec.709)",
      "Audio Mixing Basics",
    ],
  },
]

export const CREATIVE_CONTENT: CreativeContent = {
  eyebrow: "Creative Work",
  title: "Visual Storytelling: Foto & Video",
  description:
    "Eksplorasi visual di luar ranah kode dan spreadsheet — menangkap momen, membingkai komposisi, dan merangkai narasi sinematik.",
  photos: [
    {
      id: "photo-1",
      // TODO: ganti judul foto 1
      title: "Urban Geometry",
      // TODO: ganti caption foto 1
      caption: "Studi garis dan bayangan arsitektur modern.",
      category: "Architecture",
      aspect: "landscape",
      placeholderGradient: "from-indigo-900 via-purple-900 to-slate-900",
    },
    {
      id: "photo-2",
      // TODO: ganti judul foto 2
      title: "Warm Light Portrait",
      // TODO: ganti caption foto 2
      caption: "Eksplorasi pencahayaan natural di golden hour.",
      category: "Portrait",
      aspect: "portrait",
      placeholderGradient: "from-amber-900 via-orange-900 to-zinc-900",
    },
    {
      id: "photo-3",
      // TODO: ganti judul foto 3
      title: "Product Detail & Texture",
      // TODO: ganti caption foto 3
      caption: "Studio macro capture untuk detail material kerajinan.",
      category: "Still Life",
      aspect: "square",
      placeholderGradient: "from-emerald-900 via-teal-900 to-slate-900",
    },
    {
      id: "photo-4",
      // TODO: ganti judul foto 4
      title: "Street Cadence",
      // TODO: ganti caption foto 4
      caption: "Merekam dinamika ritme pejalan kaki di pusat kota.",
      category: "Street",
      aspect: "landscape",
      placeholderGradient: "from-slate-800 via-blue-950 to-neutral-900",
    },
  ],
  videos: [
    {
      id: "video-1",
      // TODO: ganti judul video 1
      title: "Behind the Screen: Creative Process",
      // TODO: ganti peran dalam video 1
      role: "Director & Editor",
      // TODO: ganti durasi video 1
      duration: "02:15",
      // TODO: ganti ringkasan video 1
      description: "Mini video esai mengenai cara membangun antarmuka pengguna dari core wireframe hingga visual akhir.",
      // TODO: ganti software/tools video 1
      tools: ["Premiere Pro", "After Effects"],
      // TODO: ganti URL video asli (misal YouTube / Vimeo)
      link: "#",
    },
    {
      id: "video-2",
      // TODO: ganti judul video 2
      title: "Polinema Tech Recap & Highlights",
      // TODO: ganti peran dalam video 2
      role: "Cinematographer & Colorist",
      // TODO: ganti durasi video 2
      duration: "01:45",
      // TODO: ganti ringkasan video 2
      description: "Video teaser berkecepatan tinggi yang merangkum showcase teknologi dan robotika mahasiswa.",
      // TODO: ganti software/tools video 2
      tools: ["DaVinci Resolve", "Sony A7"],
      // TODO: ganti URL video asli
      link: "#",
    },
  ],
}

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Contact & Collaboration",
  heading: "Terbuka untuk diskusi proyek dan peluang kerja sama.",
  description:
    "Apakah Anda mencari kolaborasi di ranah analisis data, perancangan antarmuka digital, atau produksi konten kreatif? Mari terhubung.",
  // TODO: ganti dengan email Anda
  email: "email@example.com",
  // TODO: ganti dengan link LinkedIn Anda
  linkedin: "https://linkedin.com/in/username",
  // TODO: ganti dengan link GitHub Anda
  github: "https://github.com/username",
  // TODO: ganti domisili Anda
  location: "Malang, Jawa Timur, Indonesia",
  // TODO: ganti institusi Anda
  institution: "Politeknik Negeri Malang",
  // TODO: ganti program studi Anda
  major: "Sistem Informasi Bisnis",
  // TODO: ganti fokus keahlian Anda
  focus: ["Data Science", "UI/UX Design", "Creative Media"],
}
