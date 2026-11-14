/* =====================================================================
   DATA KONTEN WEBSITE (DEMO — PT Perisai Prima Nusantara, perusahaan fiktif)
   Edit file ini untuk mengganti isi website.
   Dipakai paket Standar, Profesional, dan Profesional + Panel Admin.
   ===================================================================== */
(function () {
  'use strict';

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
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
    news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>',
    package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    usercheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
  };

  function icon(name, size, sw) {
    size = size || 20; sw = sw || 1.8;
    return '<svg class="ic" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.layers) + '</svg>';
  }

  // Logo demo (perisai). Ganti dengan logo resmi klien: return '<img src="/assets/img/logo.svg" ...>'
  function logo(size) {
    size = size || 34;
    return '<svg class="logo-mark" width="' + size + '" height="' + size + '" viewBox="0 0 32 32" aria-hidden="true">' +
      '<rect width="32" height="32" rx="9" fill="currentColor"/>' +
      '<path d="M16 6.5l7.5 2.8v5.6c0 4.7-3.2 8.2-7.5 9.6-4.3-1.4-7.5-4.9-7.5-9.6V9.3z" stroke="#fff" stroke-width="2.2" fill="none" stroke-linejoin="round"/>' +
      '<path d="M12.6 15.6l2.4 2.4 4.6-4.8" stroke="#f2b33d" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  const IMG = (id, w) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + (w || 1200) + '&q=70';

  /* =================================================================
     KONTEN DEMO — semua teks di bawah adalah CONTOH (placeholder).
     Ganti dengan data resmi PT Perisai Prima Nusantara.
     ================================================================= */
  const DEFAULT = {
    company: {
      name: 'PT Perisai Prima Nusantara',
      short: 'Perisai Prima',
      tagline: 'Melindungi aset dan nyawa dengan proteksi terpercaya',
      about: 'PT Perisai Prima Nusantara adalah penyedia sistem proteksi kebakaran dan perlengkapan keselamatan kerja untuk gedung perkantoran, pabrik, rumah sakit, dan fasilitas publik. Kami melayani pengadaan, instalasi, inspeksi, hingga perawatan berkala.',
      aboutLong: 'Berawal dari bengkel isi ulang APAR di Jakarta Timur, Perisai Prima kini didukung tim teknisi bersertifikat yang menangani proyek proteksi kebakaran di berbagai provinsi. Nama Perisai melambangkan perlindungan yang menyeluruh — dari pencegahan, deteksi dini, hingga pemadaman. Kami percaya keselamatan bukan sekadar kewajiban regulasi, tetapi investasi untuk melindungi orang-orang yang bekerja di dalamnya.',
      founded: 2014,
      address: 'Jl. Contoh Raya No. 21, Pulogadung, Jakarta Timur',
      mapQuery: 'Pulogadung, Jakarta Timur',
      phone: '(021) 4600 1234',
      email: 'info@perisaiprima.example',
      whatsapp: '6281234567890',
      hours: 'Senin – Jumat, 08.00 – 17.00 WIB',
      vision: 'Menjadi mitra proteksi kebakaran dan keselamatan kerja yang paling tepercaya di Indonesia.',
      mission: [
        'Menyediakan produk proteksi kebakaran dan keselamatan yang berkualitas dan bersertifikat.',
        'Memberikan layanan instalasi, inspeksi, dan perawatan yang tepat waktu dan sesuai standar.',
        'Mengedukasi masyarakat dan dunia usaha tentang budaya keselamatan kerja.',
        'Membangun tim profesional yang kompeten, jujur, dan responsif.'
      ],
      values: [
        { icon: 'shield', title: 'Keselamatan Utama', desc: 'Setiap keputusan berawal dari pertanyaan: apakah ini aman?' },
        { icon: 'clipboard', title: 'Patuh Standar', desc: 'Produk dan pekerjaan mengikuti standar nasional dan internasional.' },
        { icon: 'zap', title: 'Responsif', desc: 'Cepat tanggap saat klien membutuhkan, termasuk kondisi darurat.' },
        { icon: 'users', title: 'Integritas', desc: 'Jujur dalam penawaran, transparan dalam pengerjaan.' }
      ],
      history: [
        { year: '2014', title: 'Perisai Prima berdiri', desc: 'Dimulai sebagai layanan penjualan dan isi ulang APAR di Jakarta Timur.' },
        { year: '2017', title: 'Divisi instalasi sistem', desc: 'Mulai menangani instalasi fire alarm, hydrant, dan sprinkler untuk gedung.' },
        { year: '2020', title: 'Layanan inspeksi berkala', desc: 'Membuka layanan inspeksi dan perawatan rutin dengan laporan digital.' },
        { year: '2023', title: 'Ekspansi ke luar Jawa', desc: 'Melayani proyek kawasan industri di Sumatra dan Kalimantan.' },
        { year: '2026', title: 'Transformasi digital', desc: 'Meluncurkan website resmi sebagai pusat informasi produk, event, dan berita.' }
      ],
      stats: [
        { value: 12, suffix: '+', label: 'Tahun pengalaman' },
        { value: 500, suffix: '+', label: 'Proyek terpasang' },
        { value: 300, suffix: '+', label: 'Klien korporat' },
        { value: 18, suffix: '', label: 'Provinsi terlayani' }
      ],
      heroImage: IMG('photo-1486406146926-c627a92ad1ab', 1400),
      aboutImage: IMG('photo-1522071820081-009f0129c71c', 1200),
      aboutImage2: IMG('photo-1600880292203-757bb62b4baf', 900)
    },

    products: [
      { id: 'p1', icon: 'flame', category: 'Alat Pemadam Api', name: 'APAR Powder ABC 6 kg', image: '',
        short: 'Pemadam serbaguna untuk kebakaran kelas A, B, dan C.',
        desc: 'Alat pemadam api ringan berbahan dry chemical powder yang efektif untuk kebakaran bahan padat, cairan mudah terbakar, dan instalasi listrik. Cocok untuk kantor, gudang, dan area produksi.',
        specs: [['Media', 'Dry chemical powder ABC'], ['Kapasitas', '6 kg'], ['Jarak semprot', '± 5 meter'], ['Durasi semprot', '± 15 detik'], ['Garansi', '1 tahun']],
        features: ['Tabung baja dengan pengukur tekanan', 'Sudah termasuk bracket dinding', 'Gratis label dan kartu inspeksi', 'Layanan isi ulang tersedia'] },
      { id: 'p2', icon: 'flame', category: 'Alat Pemadam Api', name: 'APAR CO2 5 kg', image: '',
        short: 'Pemadam bersih tanpa residu untuk ruang server dan panel listrik.',
        desc: 'Menggunakan gas karbon dioksida yang tidak meninggalkan residu, ideal untuk ruang server, panel listrik, laboratorium, dan peralatan elektronik bernilai tinggi.',
        specs: [['Media', 'Karbon dioksida (CO2)'], ['Kapasitas', '5 kg'], ['Jarak semprot', '± 2 meter'], ['Kelas kebakaran', 'B dan C'], ['Garansi', '1 tahun']],
        features: ['Tidak merusak perangkat elektronik', 'Corong semprot anti-beku', 'Termasuk bracket dinding', 'Uji tekanan berkala'] },
      { id: 'p3', icon: 'bell', category: 'Sistem Deteksi', name: 'Sistem Fire Alarm Konvensional', image: '',
        short: 'Deteksi dini asap dan panas untuk gedung bertingkat.',
        desc: 'Paket sistem alarm kebakaran yang terdiri dari panel kontrol, detektor asap, detektor panas, manual call point, dan alarm bell. Dirancang sesuai luas dan fungsi bangunan.',
        specs: [['Panel', '4 – 16 zona'], ['Detektor', 'Asap & panas'], ['Catu daya', 'AC + baterai cadangan'], ['Instalasi', 'Termasuk desain & commissioning']],
        features: ['Survei lokasi tanpa biaya', 'Gambar desain sistem', 'Pelatihan operator', 'Garansi instalasi 1 tahun'] },
      { id: 'p4', icon: 'droplet', category: 'Sistem Pemadam', name: 'Sistem Fire Hydrant', image: '',
        short: 'Jaringan hydrant indoor dan outdoor untuk area luas.',
        desc: 'Instalasi sistem hydrant lengkap mulai dari pompa, jaringan pipa, hydrant box, hingga hydrant pillar untuk kawasan pabrik, gudang, dan gedung bertingkat.',
        specs: [['Komponen', 'Pompa, pipa, box, pillar'], ['Pompa', 'Elektrik, diesel, jockey'], ['Pipa', 'Baja hitam schedule 40'], ['Pengujian', 'Uji tekanan & aliran']],
        features: ['Perhitungan kebutuhan air', 'Gambar kerja & as-built drawing', 'Pengujian sebelum serah terima', 'Kontrak perawatan tersedia'] },
      { id: 'p5', icon: 'droplet', category: 'Sistem Pemadam', name: 'Sistem Sprinkler Otomatis', image: '',
        short: 'Pemadaman otomatis yang aktif saat suhu ruangan naik.',
        desc: 'Kepala sprinkler akan pecah dan menyemprotkan air secara otomatis pada suhu tertentu, sehingga api terkendali sejak awal bahkan saat bangunan kosong.',
        specs: [['Tipe', 'Pendent, upright, sidewall'], ['Suhu aktif', '68 °C (standar)'], ['Cakupan', 'Sesuai klasifikasi bahaya'], ['Integrasi', 'Fire alarm & pompa']],
        features: ['Desain sesuai klasifikasi hunian', 'Material bersertifikat', 'Flushing & uji tekanan', 'Dokumentasi lengkap'] },
      { id: 'p6', icon: 'shield', category: 'Perlengkapan K3', name: 'Paket Alat Pelindung Diri (APD)', image: '',
        short: 'Helm, rompi, sepatu, dan sarung tangan keselamatan.',
        desc: 'Paket APD standar untuk pekerja lapangan, proyek konstruksi, dan area produksi. Tersedia dalam berbagai ukuran dan bisa dicetak logo perusahaan.',
        specs: [['Isi paket', 'Helm, rompi, sepatu, sarung tangan'], ['Ukuran', 'S – XXL'], ['Kustom', 'Cetak logo perusahaan'], ['Minimal order', '10 paket']],
        features: ['Material sesuai standar keselamatan', 'Pilihan warna sesuai divisi', 'Pengiriman ke seluruh Indonesia', 'Harga khusus pembelian partai'] }
    ],

    events: [
      { id: 'e1', title: 'Pelatihan Penggunaan APAR untuk Karyawan', category: 'Pelatihan', date: '2026-11-26', time: '09.00 – 12.00 WIB', location: 'Workshop Perisai Prima, Jakarta Timur', image: IMG('photo-1552664730-d307ca884978'),
        desc: 'Pelatihan praktik memadamkan api menggunakan APAR, mengenal kelas kebakaran, dan prosedur pelaporan keadaan darurat. Peserta mendapat sertifikat keikutsertaan.' },
      { id: 'e2', title: 'Pameran Keselamatan Kerja & Proteksi Kebakaran 2026', category: 'Pameran', date: '2026-12-09', time: '10.00 – 18.00 WIB', location: 'JIExpo Kemayoran, Jakarta', image: IMG('photo-1540575467063-178a50c2df87'),
        desc: 'Kunjungi booth Perisai Prima untuk melihat demo sistem fire alarm, sprinkler, dan produk APD terbaru. Tersedia konsultasi gratis untuk pengelola gedung.' },
      { id: 'e3', title: 'Webinar: Kewajiban Sistem Proteksi Kebakaran pada Gedung', category: 'Webinar', date: '2027-01-20', time: '13.00 – 15.00 WIB', location: 'Daring via Zoom', image: IMG('photo-1517694712202-14dd9538aa97'),
        desc: 'Membahas jenis sistem proteksi yang wajib ada pada gedung, cara menyiapkan inspeksi, dan tips menyusun anggaran perawatan tahunan.' },
      { id: 'e4', title: 'Simulasi Evakuasi Kebakaran Bersama Mitra', category: 'Simulasi', date: '2026-09-17', time: '08.00 – 11.00 WIB', location: 'Kawasan Industri Pulogadung', image: IMG('photo-1505373877841-8d25f7d46678'),
        desc: 'Simulasi evakuasi melibatkan 400 karyawan dari tiga perusahaan mitra, lengkap dengan evaluasi waktu evakuasi dan titik kumpul.' },
      { id: 'e5', title: 'Bulan K3 Nasional: Edukasi Keselamatan di Sekolah', category: 'CSR', date: '2026-02-12', time: '08.00 – 12.00 WIB', location: 'SMK Negeri 26 Jakarta', image: IMG('photo-1511795409834-ef04bbd61622'),
        desc: 'Program sosial dalam rangka Bulan K3 Nasional: edukasi pencegahan kebakaran dan praktik penggunaan APAR untuk pelajar.' }
    ],

    news: [
      { id: 'n1', title: 'Mengapa APAR Wajib Diperiksa Secara Berkala?', category: 'Edukasi', date: '2026-11-10', author: 'Tim Teknis', status: 'publish', image: IMG('photo-1497366216548-37526070297c'),
        excerpt: 'APAR yang terlihat baik dari luar belum tentu siap pakai. Ini hal-hal yang perlu dicek secara rutin.',
        content: ['Alat pemadam api ringan (APAR) sering dianggap cukup dipasang sekali lalu dilupakan. Padahal, tekanan tabung bisa turun, media pemadam bisa menggumpal, dan selang bisa retak tanpa terlihat dari luar.', 'Pemeriksaan berkala memastikan APAR benar-benar berfungsi saat dibutuhkan. Hal yang dicek antara lain jarum pengukur tekanan, kondisi segel dan pin pengaman, kondisi selang dan nozzle, serta tanggal kedaluwarsa media pemadam.', 'Tim Perisai Prima menyediakan layanan inspeksi rutin dengan laporan digital dan kartu inspeksi yang ditempel di setiap unit, sehingga pengelola gedung mudah memantau kondisi seluruh APAR.'] },
      { id: 'n2', title: 'Mengenal Kelas Kebakaran dan Jenis APAR yang Tepat', category: 'Edukasi', date: '2026-10-28', author: 'Tim Teknis', status: 'publish', image: IMG('photo-1600880292203-757bb62b4baf'),
        excerpt: 'Salah memilih jenis APAR bisa membuat api justru membesar. Kenali kelas kebakaran sebelum membeli.',
        content: ['Kebakaran dikelompokkan berdasarkan bahan yang terbakar. Kelas A untuk bahan padat seperti kertas dan kayu, kelas B untuk cairan dan gas mudah terbakar, kelas C untuk instalasi listrik yang bertegangan, dan kelas D untuk logam.', 'APAR powder ABC cocok untuk sebagian besar kebutuhan kantor dan gudang. Untuk ruang server dan panel listrik, APAR CO2 lebih disarankan karena tidak meninggalkan residu.', 'Jika ragu, konsultasikan kebutuhan Anda dengan tim kami. Kami akan membantu menentukan jenis, kapasitas, dan jumlah APAR sesuai luas dan fungsi ruangan.'] },
      { id: 'n3', title: 'Perisai Prima Menyelesaikan Instalasi Hydrant di Kawasan Industri', category: 'Perusahaan', date: '2026-10-05', author: 'Humas', status: 'publish', image: IMG('photo-1486406146926-c627a92ad1ab'),
        excerpt: 'Proyek instalasi hydrant untuk tiga gudang logistik selesai tepat waktu dan lolos uji tekanan.',
        content: ['Tim proyek Perisai Prima telah menyelesaikan instalasi sistem fire hydrant untuk tiga gudang logistik milik mitra di kawasan industri Jawa Barat.', 'Pekerjaan mencakup pemasangan pompa, jaringan pipa utama, hydrant pillar, dan hydrant box, lalu ditutup dengan uji tekanan dan uji aliran bersama pihak pengelola kawasan.', 'Setelah serah terima, sistem ini akan dirawat melalui kontrak perawatan berkala agar selalu siap digunakan.'] },
      { id: 'n4', title: '5 Tips Menyiapkan Jalur Evakuasi di Kantor', category: 'Tips', date: '2026-09-22', author: 'Tim K3', status: 'publish', image: IMG('photo-1522071820081-009f0129c71c'),
        excerpt: 'Jalur evakuasi yang jelas bisa menyelamatkan nyawa. Mulai dari langkah sederhana berikut.',
        content: ['Pertama, pastikan jalur evakuasi bebas dari barang yang menghalangi. Kedua, pasang rambu arah evakuasi yang mudah terlihat, termasuk saat listrik padam.', 'Ketiga, tentukan titik kumpul yang aman dan cukup luas. Keempat, tunjuk petugas evakuasi di setiap lantai. Kelima, lakukan simulasi secara rutin agar seluruh karyawan terbiasa.', 'Perisai Prima dapat membantu menyusun denah evakuasi dan memfasilitasi simulasi untuk kantor Anda.'] },
      { id: 'n5', title: 'Rencana Program Edukasi K3 2027', category: 'Perusahaan', date: '2026-11-14', author: 'Editor', status: 'draft', image: IMG('photo-1517694712202-14dd9538aa97'),
        excerpt: 'Rangkaian pelatihan dan simulasi keselamatan yang akan kami gelar sepanjang 2027.',
        content: ['Ini contoh berita berstatus draf. Berita draf tidak tampil di website publik sampai admin menerbitkannya dari panel admin.'] }
    ],

    organization: [
      { id: 'o1', name: 'Ir. Hadi Santoso', position: 'Komisaris Utama', parent: '' },
      { id: 'o2', name: 'Andika Pratama, S.T., M.M.', position: 'Direktur Utama', parent: 'o1' },
      { id: 'o3', name: 'Rudi Hartanto, S.T.', position: 'Direktur Operasional', parent: 'o2' },
      { id: 'o4', name: 'Lestari Wulandari, S.E.', position: 'Direktur Keuangan & Umum', parent: 'o2' },
      { id: 'o5', name: 'Fikri Maulana, S.Kom.', position: 'Direktur Pemasaran', parent: 'o2' },
      { id: 'o6', name: 'Agus Setiawan', position: 'Manajer Teknik & Instalasi', parent: 'o3' },
      { id: 'o7', name: 'Bayu Firmansyah', position: 'Manajer Inspeksi & Perawatan', parent: 'o3' },
      { id: 'o8', name: 'Dewi Kartika', position: 'Manajer Keuangan', parent: 'o4' },
      { id: 'o9', name: 'Siti Nurhaliza', position: 'Manajer HRD & GA', parent: 'o4' },
      { id: 'o10', name: 'Rina Marlina', position: 'Manajer Penjualan', parent: 'o5' },
      { id: 'o11', name: 'Yusuf Hidayat', position: 'Manajer Pemasaran Digital', parent: 'o5' }
    ],

    clients: ['Gedung Perkantoran', 'Kawasan Industri', 'Rumah Sakit', 'Pusat Perbelanjaan', 'Gudang Logistik', 'Hotel & Resort', 'Sekolah & Kampus', 'Apartemen', 'Pabrik Manufaktur', 'Instansi Pemerintah'],

    testimonials: [
      { name: 'Hendra Gunawan', role: 'Building Manager, Gedung Perkantoran (contoh)', text: 'Inspeksi rutin dari Perisai Prima sangat rapi. Laporannya jelas, sehingga kami siap setiap kali ada audit keselamatan gedung.' },
      { name: 'Maria Ulfa', role: 'HSE Officer, Pabrik Manufaktur (contoh)', text: 'Instalasi hydrant selesai sesuai jadwal tanpa mengganggu produksi. Tim teknisinya komunikatif dan paham standar.' },
      { name: 'Dodi Kurniawan', role: 'Pemilik Gudang Logistik (contoh)', text: 'Pemesanan APAR dan APD cepat, harganya transparan, dan pelatihan karyawannya sangat membantu.' }
    ],

    faq: [
      { q: 'Apakah tersedia survei lokasi sebelum penawaran?', a: 'Ya. Tim kami akan melakukan survei lokasi tanpa biaya untuk menentukan kebutuhan sistem proteksi yang tepat.' },
      { q: 'Berapa lama proses instalasi sistem proteksi kebakaran?', a: 'Tergantung luas dan jenis sistem. Pemasangan APAR bisa selesai dalam hitungan hari, sedangkan hydrant atau sprinkler umumnya beberapa minggu.' },
      { q: 'Apakah melayani isi ulang dan perawatan APAR?', a: 'Ya. Kami melayani isi ulang, inspeksi berkala, dan kontrak perawatan tahunan dengan laporan digital.' },
      { q: 'Apakah bisa mengirim ke luar Jakarta?', a: 'Bisa. Produk dapat dikirim ke seluruh Indonesia, dan tim instalasi kami melayani proyek di berbagai provinsi.' }
    ]
  };

  /* ---------- Penyimpanan (paket + Panel Admin) ----------
     Mockup memakai localStorage. Untuk produksi, ganti fungsi-fungsi
     ini dengan fetch() ke API backend. */
  const KEY = 'demo_cp_data_v1';
  const MSG_KEY = 'demo_cp_messages_v1';
  const USER_KEY = 'demo_cp_users_v1';
  const LOG_KEY = 'demo_cp_log_v1';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function sGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function sDel(k) { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } }
  function sJSON(k, fallback) { const raw = sGet(k); if (!raw) return clone(fallback); try { return JSON.parse(raw); } catch (e) { return clone(fallback); } }

  const DEFAULT_MESSAGES = [
    { id: 'm1', name: 'Bambang Sutrisno', email: 'bambang@contoh.co.id', company: 'PT Gudang Sejahtera (contoh)', topic: 'Sistem Fire Hydrant', message: 'Mohon penawaran instalasi hydrant untuk gudang seluas 2.000 m² di Cikarang.', date: '2026-11-13T10:20:00', read: false },
    { id: 'm2', name: 'Nurul Aini', email: 'nurul@contoh.com', company: 'Klinik Sehat (contoh)', topic: 'APAR CO2 5 kg', message: 'Kami butuh 6 unit APAR untuk klinik 2 lantai. Apakah termasuk pemasangan?', date: '2026-11-11T15:05:00', read: true }
  ];
  // Akun demo. Untuk produksi, autentikasi WAJIB di server (password di-hash, token/session).
  const DEFAULT_USERS = [
    { id: 'u1', name: 'Administrator', username: 'admin', password: 'admin123', role: 'admin' },
    { id: 'u2', name: 'Editor Konten', username: 'editor', password: 'editor123', role: 'editor' }
  ];
  const DEFAULT_LOG = [
    { at: '2026-11-14T09:12:00', user: 'Editor Konten', role: 'editor', text: 'membuat draf berita “Rencana Program Edukasi K3 2027”' },
    { at: '2026-11-10T08:30:00', user: 'Administrator', role: 'admin', text: 'menerbitkan berita “Mengapa APAR Wajib Diperiksa Secara Berkala?”' }
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
    resetData() { [KEY, MSG_KEY, USER_KEY, LOG_KEY].forEach(sDel); },
    getMessages() { return sJSON(MSG_KEY, DEFAULT_MESSAGES); },
    saveMessages(list) { return sSet(MSG_KEY, JSON.stringify(list)); },
    addMessage(m) {
      const list = CP.getMessages();
      list.unshift(Object.assign({ id: 'm' + Date.now(), date: new Date().toISOString(), read: false }, m));
      return CP.saveMessages(list);
    },
    getUsers() { return sJSON(USER_KEY, DEFAULT_USERS); },
    saveUsers(list) { return sSet(USER_KEY, JSON.stringify(list)); },
    getLog() { return sJSON(LOG_KEY, DEFAULT_LOG); },
    addLog(user, text) {
      const list = CP.getLog();
      list.unshift({ at: new Date().toISOString(), user: user.name, role: user.role, text: text });
      return sSet(LOG_KEY, JSON.stringify(list.slice(0, 50)));
    },
    publishedNews(list) { return list.filter((n) => n.status !== 'draft').sort((a, b) => b.date.localeCompare(a.date)); },
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
    isUpcoming(iso) { return new Date(iso + 'T23:59:59') >= new Date(); },
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
    },
    mapSrc(q) { return 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=15&output=embed'; },
    readMins(n) { return Math.max(1, Math.round((n.content || []).join(' ').split(/\s+/).length / 180)); },
    setMeta(title, desc) {
      document.title = title;
      let m = document.querySelector('meta[name="description"]');
      if (m && desc) m.setAttribute('content', desc);
      let og = document.querySelector('meta[property="og:title"]');
      if (og) og.setAttribute('content', title);
    }
  };

  window.CP = CP;
})();
