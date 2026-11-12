/* =====================================================================
   DATA KONTEN WEBSITE  —  edit file ini untuk mengganti isi website.
   Dipakai oleh paket Standar, Profesional, dan Profesional + Admin.
   (Pada paket + Admin, isi bisa diubah langsung dari panel admin.)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Ikon (SVG garis, gaya Lucide) ---------- */
  const ICONS = {
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    chart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    branch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    up: '<polyline points="18 15 12 9 6 15"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'
  };

  function icon(name, size, sw) {
    size = size || 20; sw = sw || 1.8;
    return '<svg class="ic" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.layers) + '</svg>';
  }

  function logo(size) {
    size = size || 34;
    return '<svg class="logo-mark" width="' + size + '" height="' + size + '" viewBox="0 0 32 32" aria-hidden="true">' +
      '<rect width="32" height="32" rx="9" fill="currentColor"/>' +
      '<path d="M8 21.5a8 8 0 0 1 16 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M6 25h20" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M16 7.5v3M9.6 10l2 2M22.4 10l-2 2" stroke="#f7b733" stroke-width="2.2" stroke-linecap="round"/></svg>';
  }

  const IMG = (id, w) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + (w || 1200) + '&q=70';

  /* ---------- Konten default ---------- */
  const DEFAULT = {
    company: {
      name: 'PT Arunika Solusi Nusantara',
      short: 'Arunika',
      tagline: 'Mitra transformasi digital untuk bisnis Indonesia',
      about: 'Arunika adalah perusahaan konsultan dan pengembang solusi teknologi yang membantu perusahaan, instansi, dan UMKM bertumbuh melalui sistem digital yang tepat guna. Kami menggabungkan strategi bisnis, desain, dan rekayasa perangkat lunak dalam satu tim yang solid.',
      aboutLong: 'Berawal dari studio kecil di Jakarta Selatan pada 2012, kini Arunika didukung lebih dari 120 profesional di bidang konsultasi bisnis, pengembangan perangkat lunak, data, dan keamanan siber. Nama Arunika berarti "cahaya matahari pagi" — semangat kami untuk membawa awal yang baru bagi setiap klien. Kami percaya teknologi terbaik adalah teknologi yang benar-benar dipakai, mudah dirawat, dan memberi dampak terukur bagi bisnis.',
      founded: 2012,
      address: 'Menara Arunika Lt. 12, Jl. Jend. Sudirman Kav. 52, Jakarta Selatan 12190',
      phone: '(021) 5099 1234',
      email: 'halo@arunika.co.id',
      whatsapp: '6281234567890',
      hours: 'Senin – Jumat, 08.00 – 17.00 WIB',
      vision: 'Menjadi mitra teknologi paling tepercaya bagi bisnis Indonesia dalam membangun masa depan yang efisien, aman, dan berkelanjutan.',
      mission: [
        'Menghadirkan solusi digital yang tepat guna dan berdampak langsung pada kinerja bisnis klien.',
        'Membangun tim profesional yang berintegritas, kompeten, dan terus belajar.',
        'Menjaga kualitas layanan melalui standar kerja yang terukur dan transparan.',
        'Berkontribusi pada ekosistem digital nasional melalui edukasi dan program sosial.'
      ],
      values: [
        { icon: 'shield', title: 'Integritas', desc: 'Jujur, transparan, dan bertanggung jawab di setiap keputusan.' },
        { icon: 'target', title: 'Fokus pada Hasil', desc: 'Setiap pekerjaan diukur dari dampaknya bagi klien.' },
        { icon: 'users', title: 'Kolaborasi', desc: 'Klien adalah bagian dari tim, bukan sekadar pemesan.' },
        { icon: 'zap', title: 'Inovasi', desc: 'Terus mencari cara yang lebih baik, lebih cepat, lebih sederhana.' }
      ],
      history: [
        { year: '2012', title: 'Arunika berdiri', desc: 'Dimulai sebagai studio pengembangan web dengan 5 orang di Jakarta Selatan.' },
        { year: '2015', title: 'Ekspansi layanan konsultasi', desc: 'Membuka divisi konsultasi bisnis dan transformasi digital untuk korporasi.' },
        { year: '2018', title: 'Sertifikasi ISO 9001 & 27001', desc: 'Menegaskan standar mutu dan keamanan informasi di seluruh proses kerja.' },
        { year: '2021', title: 'Kantor cabang Surabaya & Makassar', desc: 'Memperluas jangkauan layanan ke Indonesia Timur dan Jawa Timur.' },
        { year: '2024', title: 'Peluncuran Arunika Cloud', desc: 'Platform cloud terkelola untuk UMKM dan instansi pemerintah daerah.' },
        { year: '2026', title: '120+ profesional, 350+ proyek', desc: 'Dipercaya ratusan klien di 24 kota di seluruh Indonesia.' }
      ],
      stats: [
        { value: 14, suffix: '+', label: 'Tahun pengalaman' },
        { value: 350, suffix: '+', label: 'Proyek selesai' },
        { value: 180, suffix: '+', label: 'Klien aktif' },
        { value: 24, suffix: '', label: 'Kota terlayani' }
      ],
      heroImage: IMG('photo-1497366216548-37526070297c', 1400),
      aboutImage: IMG('photo-1522071820081-009f0129c71c', 1200),
      aboutImage2: IMG('photo-1600880292203-757bb62b4baf', 900)
    },

    services: [
      { id: 's1', icon: 'briefcase', title: 'Konsultasi Bisnis & Digital', short: 'Strategi transformasi digital yang realistis dan terukur.', desc: 'Kami memetakan proses bisnis, menemukan titik lemah, dan menyusun peta jalan digital yang sesuai anggaran serta kesiapan tim Anda.', features: ['Audit proses bisnis', 'Peta jalan transformasi digital', 'Analisis kelayakan & ROI', 'Pendampingan manajemen perubahan'] },
      { id: 's2', icon: 'code', title: 'Pengembangan Aplikasi', short: 'Aplikasi web & mobile yang andal dan mudah dirawat.', desc: 'Dari sistem internal perusahaan hingga aplikasi untuk pelanggan, dibangun dengan arsitektur modern dan dokumentasi lengkap.', features: ['Aplikasi web & mobile', 'Sistem ERP & HRIS kustom', 'Integrasi API & payment gateway', 'Pemeliharaan & dukungan teknis'] },
      { id: 's3', icon: 'cloud', title: 'Cloud & Infrastruktur', short: 'Infrastruktur cloud yang aman, stabil, dan hemat biaya.', desc: 'Migrasi, pengelolaan, dan optimasi infrastruktur cloud dengan pemantauan 24/7 oleh tim kami.', features: ['Migrasi ke cloud', 'Managed server 24/7', 'Backup & disaster recovery', 'Optimasi biaya cloud'] },
      { id: 's4', icon: 'shield', title: 'Keamanan Siber', short: 'Lindungi data dan reputasi perusahaan Anda.', desc: 'Pengujian keamanan, kepatuhan regulasi, dan pelatihan kesadaran keamanan untuk seluruh karyawan.', features: ['Penetration testing', 'Audit kepatuhan UU PDP', 'Security awareness training', 'Respons insiden'] },
      { id: 's5', icon: 'chart', title: 'Data & Analitik', short: 'Ubah data menjadi keputusan yang lebih baik.', desc: 'Membangun dashboard, gudang data, dan model analitik agar manajemen dapat mengambil keputusan berbasis data.', features: ['Dashboard bisnis real-time', 'Data warehouse', 'Analitik prediktif', 'Pelatihan literasi data'] },
      { id: 's6', icon: 'users', title: 'Pelatihan & SDM Digital', short: 'Tingkatkan kompetensi digital tim Anda.', desc: 'Program pelatihan terstruktur untuk karyawan, dari literasi digital dasar hingga keahlian teknis tingkat lanjut.', features: ['Kurikulum sesuai kebutuhan', 'Kelas tatap muka & daring', 'Sertifikat kompetensi', 'Evaluasi pasca-pelatihan'] }
    ],

    events: [
      { id: 'e1', title: 'Workshop Transformasi Digital untuk UMKM', category: 'Workshop', date: '2026-11-27', time: '13.00 – 17.00 WIB', location: 'Menara Arunika, Jakarta', image: IMG('photo-1552664730-d307ca884978'), desc: 'Workshop praktis bagi pelaku UMKM untuk mulai mendigitalkan pencatatan keuangan, penjualan, dan pemasaran. Kuota terbatas 60 peserta.' },
      { id: 'e2', title: 'Indonesia Digital Business Summit 2026', category: 'Konferensi', date: '2026-12-04', time: '09.00 – 16.00 WIB', location: 'Jakarta Convention Center', image: IMG('photo-1540575467063-178a50c2df87'), desc: 'Konferensi tahunan yang mempertemukan pemimpin bisnis, regulator, dan praktisi teknologi untuk membahas arah ekonomi digital Indonesia.' },
      { id: 'e3', title: 'Webinar: Kepatuhan UU Perlindungan Data Pribadi', category: 'Webinar', date: '2027-01-15', time: '10.00 – 12.00 WIB', location: 'Daring via Zoom', image: IMG('photo-1517694712202-14dd9538aa97'), desc: 'Pembahasan langkah praktis yang perlu disiapkan perusahaan agar patuh terhadap UU PDP, lengkap dengan sesi tanya jawab.' },
      { id: 'e4', title: 'Arunika Annual Partner Gathering', category: 'Gathering', date: '2026-08-22', time: '18.00 – 22.00 WITA', location: 'Nusa Dua, Bali', image: IMG('photo-1511795409834-ef04bbd61622'), desc: 'Malam apresiasi untuk mitra dan klien setia Arunika, dengan sesi berbagi rencana kolaborasi tahun depan.' },
      { id: 'e5', title: 'CSR: Kelas Coding untuk Pelajar SMK', category: 'CSR', date: '2026-06-10', time: '08.00 – 15.00 WIB', location: 'SMK Negeri 1 Bandung', image: IMG('photo-1505373877841-8d25f7d46678'), desc: 'Program sosial tahunan: 200 pelajar SMK belajar dasar pemrograman web bersama engineer Arunika.' },
      { id: 'e6', title: 'Peluncuran Platform Arunika Cloud', category: 'Peluncuran', date: '2026-03-18', time: '10.00 – 13.00 WIB', location: 'Hotel Indonesia Kempinski, Jakarta', image: IMG('photo-1475721027785-f74eccf877e2'), desc: 'Peluncuran resmi platform cloud terkelola Arunika untuk UMKM dan pemerintah daerah.' }
    ],

    organization: [
      { id: 'o1', name: 'Ir. Hendra Wijaya', position: 'Komisaris Utama', parent: '' },
      { id: 'o2', name: 'Ratna Kusumawati, M.B.A.', position: 'Direktur Utama', parent: 'o1' },
      { id: 'o3', name: 'Bagus Prasetyo, S.T.', position: 'Direktur Operasional', parent: 'o2' },
      { id: 'o4', name: 'Sari Andriani, S.E., Ak.', position: 'Direktur Keuangan', parent: 'o2' },
      { id: 'o5', name: 'Dimas Aryaguna, M.M.', position: 'Direktur Pemasaran', parent: 'o2' },
      { id: 'o6', name: 'Fajar Nugroho', position: 'Manajer Teknologi', parent: 'o3' },
      { id: 'o7', name: 'Intan Permatasari', position: 'Manajer Proyek', parent: 'o3' },
      { id: 'o8', name: 'Yoga Saputra', position: 'Manajer Akuntansi', parent: 'o4' },
      { id: 'o9', name: 'Melati Anggraini', position: 'Manajer SDM & Umum', parent: 'o4' },
      { id: 'o10', name: 'Rizky Ramadhan', position: 'Manajer Pemasaran Digital', parent: 'o5' },
      { id: 'o11', name: 'Nadia Putri', position: 'Manajer Hubungan Klien', parent: 'o5' }
    ],

    clients: ['Bank Sentosa', 'Medika Group', 'Pelita Logistik', 'Kopi Senja', 'Pemkab Maju', 'Astana Properti', 'Nusa Retail', 'Garuda Agro', 'Sinar Energi', 'EduKita'],

    testimonials: [
      { name: 'Andi Kurniawan', role: 'Direktur, Pelita Logistik', text: 'Tim Arunika memahami bisnis kami sebelum menulis satu baris kode. Sistem pelacakan armada yang mereka bangun memangkas waktu laporan dari dua hari menjadi hitungan menit.' },
      { name: 'dr. Maya Lestari', role: 'COO, Medika Group', text: 'Proses migrasi ke cloud berjalan tanpa gangguan layanan pasien. Komunikasinya rapi, jadwalnya tepat, dan dukungan pascaproyek sangat responsif.' },
      { name: 'Teguh Santoso', role: 'Pemilik, Kopi Senja', text: 'Sebagai UMKM kami butuh mitra yang sabar dan jelas. Sekarang penjualan di 9 cabang bisa saya pantau langsung dari ponsel.' }
    ],

    faq: [
      { q: 'Berapa lama waktu pengerjaan sebuah proyek?', a: 'Tergantung ruang lingkupnya. Proyek konsultasi umumnya 2–6 minggu, sedangkan pengembangan aplikasi 2–6 bulan. Jadwal rinci kami sampaikan setelah sesi analisis kebutuhan.' },
      { q: 'Apakah ada layanan setelah proyek selesai?', a: 'Ada. Setiap proyek mendapat masa garansi, dan tersedia paket pemeliharaan bulanan dengan SLA yang jelas.' },
      { q: 'Apakah Arunika melayani klien di luar Jakarta?', a: 'Ya. Kami memiliki kantor di Jakarta, Surabaya, dan Makassar, serta melayani klien di seluruh Indonesia secara daring maupun tatap muka.' },
      { q: 'Bagaimana cara memulai kerja sama?', a: 'Isi formulir kontak atau hubungi kami melalui WhatsApp. Tim kami akan menjadwalkan sesi konsultasi awal tanpa biaya.' }
    ]
  };

  /* ---------- Penyimpanan (dipakai paket + Admin) ---------- */
  const KEY = 'arunika_cp_data_v1';
  const MSG_KEY = 'arunika_cp_messages_v1';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function sGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function sDel(k) { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } }

  const DEFAULT_MESSAGES = [
    { id: 'm1', name: 'Budi Hartono', email: 'budi@contoh.co.id', company: 'CV Maju Bersama', service: 'Pengembangan Aplikasi', message: 'Kami ingin membuat aplikasi kasir untuk 4 cabang toko. Mohon info estimasi biaya dan waktu.', date: '2026-11-12T09:14:00', read: false },
    { id: 'm2', name: 'Siti Rahmawati', email: 'siti.r@contoh.com', company: 'Dinas Kominfo Kab. Maju', service: 'Cloud & Infrastruktur', message: 'Apakah Arunika Cloud bisa dipakai untuk aplikasi layanan publik pemerintah daerah?', date: '2026-11-10T14:40:00', read: true }
  ];

  const CP = {
    icon, logo, IMG, DEFAULT,
    getData(useStore) {
      const base = clone(DEFAULT);
      if (!useStore) return base;
      const raw = sGet(KEY);
      if (!raw) return base;
      try {
        const saved = JSON.parse(raw);
        return Object.assign(base, saved, { company: Object.assign(base.company, saved.company || {}) });
      } catch (e) { return base; }
    },
    saveData(d) { return sSet(KEY, JSON.stringify(d)); },
    resetData() { sDel(KEY); sDel(MSG_KEY); },
    getMessages() {
      const raw = sGet(MSG_KEY);
      if (!raw) return clone(DEFAULT_MESSAGES);
      try { return JSON.parse(raw); } catch (e) { return clone(DEFAULT_MESSAGES); }
    },
    saveMessages(list) { return sSet(MSG_KEY, JSON.stringify(list)); },
    addMessage(m) {
      const list = CP.getMessages();
      list.unshift(Object.assign({ id: 'm' + Date.now(), date: new Date().toISOString(), read: false }, m));
      return CP.saveMessages(list);
    },
    uid(prefix) { return (prefix || 'id') + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },
    esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    cssUrl(u) { return 'url("' + String(u || '').replace(/["\\\n\r()]/g, '') + '")'; },
    fmtDate(iso, opt) {
      const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
      if (isNaN(d)) return iso;
      return d.toLocaleDateString('id-ID', opt || { day: 'numeric', month: 'long', year: 'numeric' });
    },
    dateParts(iso) {
      const d = new Date(iso + 'T00:00:00');
      return { day: d.getDate(), mon: d.toLocaleDateString('id-ID', { month: 'short' }).replace('.', ''), year: d.getFullYear() };
    },
    isUpcoming(iso) {
      const d = new Date(iso + 'T23:59:59');
      return d >= new Date();
    },
    sortEvents(list) {
      const up = list.filter((e) => CP.isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date));
      const past = list.filter((e) => !CP.isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date));
      return { up, past };
    },
    initials(name) {
      const clean = String(name).replace(/(^|\s)(Ir|dr|Dr|Prof|H|Hj)\.\s*/g, ' ').split(',')[0].trim();
      const p = clean.split(/\s+/).filter(Boolean);
      return ((p[0] || '')[0] || '').toUpperCase() + ((p[1] || '')[0] || '').toUpperCase();
    },
    buildTree(list) {
      const map = {};
      list.forEach((n) => { map[n.id] = Object.assign({}, n, { children: [] }); });
      const roots = [];
      list.forEach((n) => {
        const node = map[n.id];
        if (n.parent && map[n.parent] && n.parent !== n.id) map[n.parent].children.push(node);
        else roots.push(node);
      });
      return roots;
    },
    waLink(number, text) {
      return 'https://wa.me/' + String(number).replace(/\D/g, '') + (text ? '?text=' + encodeURIComponent(text) : '');
    }
  };

  window.CP = CP;
})();
