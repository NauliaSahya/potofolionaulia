# Portfolio Naulia Sahya Althafah

Catatan dan dokumentasi pribadi untuk source code website portofolio.
Fokus profil: Biomedical Engineering graduate di bidang digital healthcare, web systems, dan project coordination.

---

## Quick Commands

Catatan perintah saat development dan build:

```bash
# Jalankan dev server lokal
npm run dev

# Build untuk production (output ke folder /dist)
npm run build

# Preview hasil build production di lokal
npm run preview
```

---

## Panduan Build & Deploy ke Vercel

Website ini berbasis Vite (Single Page Application statis), tanpa perlu backend runtime khusus.

### 1. Pengaturan Build di Dashboard Vercel
Saat import repository dari GitHub ke Vercel, pastikan konfigurasi project sebagai berikut:
- **Framework Preset**: Vite (biasanya terdeteksi otomatis oleh Vercel)
- **Root Directory**: `./`
- **Build Command**: `npm run build` (menjalankan `tsc -b && vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x atau 22.x

### 2. Alur Deployment Otomatis
- Setiap kali melakukan `git push` ke branch utama (`main`), Vercel akan otomatis men-trigger build baru dan merilis update ke domain live (*production*).
- Jika membuat branch baru atau pull request, Vercel membuat link *Preview Deployment* terpisah untuk pengecekan sebelum di-merge.

### 3. Deploy Cepat via Terminal (Opsional)
Jika ingin deploy langsung tanpa push git:
```bash
# Deploy preview
npx vercel

# Deploy langsung ke production
npx vercel --prod
```

### 4. Custom Domain
Di dashboard Vercel, buka menu **Settings → Domains**, masukkan domain pribadi, dan arahkan DNS record (CNAME / A record) sesuai petunjuk Vercel. Sertifikat SSL/HTTPS diurus otomatis.

---

## Struktur Folder & Penjelasan File

Pohon direktori proyek beserta peran dari masing-masing folder dan filenya:

```text
naulia-portfolio/
├── public/
│   ├── images/                # Seluruh aset gambar webp yang disajikan publik
│   │   ├── fotoku1.webp       # Foto kartu lanyard (rasio 2:3)
│   │   ├── fotoku2.webp       # Foto profil hero utama
│   │   ├── sirj-admin.webp    # Screenshot portal admin SIRJ
│   │   ├── sirj-dokter.webp   # Screenshot portal dokter SIRJ
│   │   ├── sirj-pasien.webp   # Screenshot portal pasien SIRJ
│   │   ├── cenim.webp         # Screenshot website CENIM 2025
│   │   ├── cenimfoto.webp     # Foto dokumentasi konferensi CENIM
│   │   ├── hime-ui-1.webp     # UI alat Hi-Me (measurement)
│   │   ├── hime-ui-2.webp     # UI alat Hi-Me (summary)
│   │   ├── hime-web-1.webp    # Web dashboard Hi-Me (telemetry)
│   │   ├── hime-web-2.webp    # Web dashboard Hi-Me (records)
│   │   ├── kp-flow-1.webp     # Diagram alur koding RS PHC (01)
│   │   ├── kp-flow-2.webp     # Diagram alur koding RS PHC (02)
│   │   ├── kp-kegiatan-pagi.webp # Foto observasi pagi RS PHC
│   │   ├── kp-presentasi-1.webp  # Foto presentasi ruang rapat
│   │   └── kp-presentasi-2.webp  # Foto diskusi validasi pimpinan
│   ├── favicon.svg            # Favicon tab browser
│   └── resume.pdf             # File resume cadangan
├── src/
│   ├── main.tsx               # Entry point aplikasi React 19
│   ├── App.tsx                # Komponen root & susunan seluruh section halaman
│   ├── index.css              # Design tokens, warna tema gelap, font, dan utilitas Tailwind v4
│   ├── picture/               # Arsip sumber gambar mentah sebelum diproses
│   ├── data/                  # Pusat data konten & teks (terpisah dari komponen UI)
│   │   ├── assets.ts          # Pemetaan path aset gambar dari /public/images/
│   │   ├── content.ts         # Konten bio, hero, about, metrik, dan kontak
│   │   ├── projects.ts        # Data lengkap 4 proyek (SIRJ, CENIM, Hi-Me, KP RS PHC)
│   │   ├── experience.ts      # Riwayat magang, asisten lab, kepanitiaan, & organisasi
│   │   └── skills.ts          # Pengelompokan keahlian teknis & perangkat
│   ├── hooks/                 # Custom React hooks untuk animasi dan deteksi viewport
│   │   ├── useInView.ts       # Deteksi elemen masuk viewport untuk trigger animasi Reveal
│   │   ├── useCountUp.ts      # Animasi angka metrik counter naik saat di-scroll
│   │   ├── useScrollProgress.ts # Tracking persentase scroll halaman
│   │   ├── useActiveSection.ts  # Deteksi section yang sedang aktif untuk navbar
│   │   └── useReducedMotion.ts  # Deteksi preferensi reduced motion aksesibilitas pengguna
│   └── components/            # Seluruh komponen antarmuka web
│       ├── hero/
│       │   ├── Hero.tsx           # Headline utama, badge status, deskripsi, dan tombol aksi
│       │   └── LanyardIntro.tsx   # Kartu ID interaktif lanyard dengan 3D tilt fisik dan drag
│       ├── work/
│       │   ├── Work.tsx                 # Header & ringkasan katalog karya terpilih
│       │   ├── ProjectCard.tsx          # Komponen kartu proyek ringkas
│       │   ├── ProjectSIRJ.tsx          # Studi kasus proyek SIRJ & diagram arsitektur
│       │   ├── SIRJWebShowcase.tsx      # Showcase 3 portal SIRJ (auto-cycle & zoom modal)
│       │   ├── ProjectCENIM.tsx         # Studi kasus CENIM 2025 & bagan struktur tim
│       │   ├── ProjectHiMe.tsx          # Studi kasus Hi-Me! & parameter skrining
│       │   ├── HiMeShowcase.tsx         # Showcase dual-mode (web vs alat) Hi-Me dengan zoom modal
│       │   └── ProjectMedicalCoding.tsx # Studi kasus KP RS PHC (2 diagram + 3 foto dokumentasi + zoom)
│       ├── Navbar.tsx             # Navigasi melayang dengan status indikator aktif
│       ├── About.tsx              # Filosofi kerja (I build, I organize, I lead) & 3 metrik
│       ├── Experience.tsx         # Timeline riwayat kerja praktik & kepanitiaan
│       ├── Organization.tsx       # Riwayat kepemimpinan organisasi mahasiswa
│       ├── Skills.tsx             # Grid keahlian teknis dengan ikon representatif
│       ├── LanguagesEducation.tsx # Informasi pendidikan ITS & bahasa
│       ├── Contact.tsx            # Form kontak, link sosial, email, & resume link Google Drive
│       ├── Footer.tsx             # Footer penutup website & hak cipta
│       ├── CursorSpotlight.tsx    # Efek spotlight kursor halus di background
│       ├── MagneticButton.tsx     # Tombol interaktif dengan efek tarikan magnetik kursor
│       ├── MetricCounter.tsx      # Angka metrik counter beranimasi
│       ├── BrowserFrame.tsx       # Bingkai mockup browser minimalis
│       ├── ImageWithFallback.tsx  # Wrapper gambar lazy load dengan fallback elegan
│       └── Reveal.tsx             # Wrapper animasi reveal halus berbasis fade-up
├── index.html                 # Dokumen HTML, meta tags SEO, OpenGraph, dan Google Fonts
├── vite.config.ts             # Konfigurasi bundler Vite dan plugin Tailwind v4
├── tsconfig.json              # Konfigurasi TypeScript root
├── tsconfig.app.json          # Konfigurasi TypeScript untuk source code aplikasi
├── tsconfig.node.json         # Konfigurasi TypeScript untuk tooling Vite
├── package.json               # Dependensi proyek (React 19, Tailwind 4, Framer Motion, Lucide)
└── .oxlintrc.json             # Konfigurasi linting oxlint
```

---

## Catatan Proyek & Foto yang Digunakan

Daftar foto dan tangkapan layar yang sudah terpasang di portofolio:

### 1. Profil & Hero
- `public/images/fotoku2.webp`: Foto utama di hero.
- `public/images/fotoku1.webp`: Foto pada kartu ID lanyard (rasio 2:3 dengan efek interaktif 3D tilt).

### 2. SIRJ (Sistem Informasi Rawat Jalan)
- `public/images/sirj-admin.webp`: Portal Admin (antrean, pendaftaran pasien, & administrasi).
- `public/images/sirj-dokter.webp`: Portal Dokter (pemeriksaan klinis & rekam medis).
- `public/images/sirj-pasien.webp`: Portal Pasien (skrining mandiri & tanda vital).
- Dilengkapi carousel otomatis (auto-rotate tiap 6 detik, jeda saat kursor diarahkan), tab navigasi, dan modal zoom beresolusi penuh.

### 3. CENIM 2025
- `public/images/cenim.webp`: Tangkapan layar website konferensi CENIM 2025.
- `public/images/cenimfoto.webp`: Dokumentasi kegiatan hari H konferensi.
- Struktur tim: Organizing Committee (Dosen & Tendik), 3 Panitia Inti Mahasiswa, dan 12 Staf Mahasiswa terkoordinasi.

### 4. Hi-Me! (Smart Health Screening)
- **Tampilan UI Alat Skrining (Touchscreen Terminal)**:
  - `public/images/hime-ui-1.webp`: Layar pengukuran tanda vital pasien.
  - `public/images/hime-ui-2.webp`: Layar ringkasan triase kesehatan pada alat.
- **Tampilan Web Platform**:
  - `public/images/hime-web-1.webp`: Dashboard telemetri live antrean pasien.
  - `public/images/hime-web-2.webp`: Detail rekam skrining & analisis data klinis.
- Dilengkapi switcher kategori (Web Platform vs UI Alat) dan modal zoom interaktif.

### 5. Kerja Praktik RS PHC (Medical Coding Workflow)
- **Diagram Alur Analisis**:
  - `public/images/kp-flow-1.webp`: Pemetaan alur proses rekam medis & titik hambatan koding rawat jalan.
  - `public/images/kp-flow-2.webp`: Rekomendasi alur verifikasi digital & bridging sistem koding.
- **Dokumentasi Lapangan & Presentasi**:
  - `public/images/kp-kegiatan-pagi.webp`: Observasi lapangan pagi hari di RS PHC Surabaya.
  - `public/images/kp-presentasi-1.webp`: Presentasi akhir evaluasi alur di ruang rapat rumah sakit.
  - `public/images/kp-presentasi-2.webp`: Sesi validasi dan diskusi bersama atasan unit.
- Keterangan penting: Dipresentasikan langsung di hadapan jajaran pimpinan unit: Customer Service, Divisi IT, Rekam Medis, dan Komkordik.

---

## Catatan Styling & Animasi

- Styling menggunakan Tailwind CSS v4 dengan token tema di `src/index.css` (background gelap `--color-ink`, aksen `--color-cyan`, tipografi Space Grotesk dan Inter).
- Animasi gesture, spring, dan transisi modal dikelola dengan Framer Motion.
- Format kode rapi, bebas dari karakter emdash atau format artifisial, dan sepenuhnya responsif di perangkat mobile maupun desktop.
