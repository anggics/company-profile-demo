/* ===== PAKET STANDAR — 6 menu statis (tanpa animasi & halaman detail) ===== */
(function () {
  'use strict';
  const D = CP.getData(false);
  const C = D.company;
  const { icon, esc, cssUrl, fmtDate } = CP;
  const app = document.getElementById('app');

  const ROUTES = [
    ['beranda', 'Beranda'],
    ['tentang', 'Tentang Perusahaan'],
    ['struktur', 'Struktur Organisasi'],
    ['produk', 'Produk'],
    ['event', 'Event'],
    ['berita', 'Berita']
  ];

  /* ---------- Shell ---------- */
  const brand = () => '<a href="#/beranda" class="brand">' + CP.logo(36) + '<span>' + esc(C.short) + '<small>' + esc(C.name) + '</small></span></a>';
  const wa = (t) => CP.waLink(C.whatsapp, t);

  document.getElementById('header').innerHTML =
    '<div class="container nav">' + brand() +
    '<nav class="nav-links" id="navLinks">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '" data-route="' + k + '">' + l + '</a>').join('') + '</nav>' +
    '<div class="nav-cta"><a href="#kontak" class="btn btn-accent btn-sm">Hubungi Kami</a>' +
    '<button class="burger" id="burger" aria-label="Buka menu">' + icon('menu', 26) + '</button></div></div>';

  // Kontak: form + peta (tersedia di semua paket)
  document.getElementById('kontak').innerHTML =
    '<div class="container"><div class="section-head"><span class="eyebrow">Kontak</span><h2>Hubungi kami</h2><p>Konsultasi dan survei lokasi tanpa biaya.</p></div>' +
    '<div class="contact-grid"><form class="form-card" id="contactForm">' +
    '<label>Nama<input name="name" required placeholder="Nama Anda"></label>' +
    '<label>Email<input name="email" type="email" required placeholder="nama@perusahaan.com"></label>' +
    '<label>Perusahaan<input name="company" placeholder="Nama perusahaan"></label>' +
    '<label>Kebutuhan<select name="topic">' + D.products.map((p) => '<option>' + esc(p.name) + '</option>').join('') + '<option>Lainnya</option></select></label>' +
    '<label class="full">Pesan<textarea name="message" required placeholder="Tuliskan kebutuhan Anda…"></textarea></label>' +
    '<div class="full"><button class="btn btn-primary" type="submit">' + icon('send', 17) + 'Kirim via WhatsApp</button></div>' +
    '<small class="full">Pesan akan diteruskan ke WhatsApp kami.</small></form>' +
    '<div class="map-wrap"><ul class="info-list">' +
    '<li>' + icon('pin', 18) + '<span>' + esc(C.address) + '</span></li>' +
    '<li>' + icon('phone', 18) + '<span>' + esc(C.phone) + '</span></li>' +
    '<li>' + icon('mail', 18) + '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></li>' +
    '<li>' + icon('clock', 18) + '<span>' + esc(C.hours) + '</span></li></ul>' +
    '<iframe class="map" title="Peta lokasi ' + esc(C.name) + '" src="' + CP.mapSrc(C.mapQuery || C.address) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></div>';

  document.getElementById('footer').innerHTML =
    '<div class="container"><div class="foot-grid">' +
    '<div>' + brand() + '<p>' + esc(C.tagline) + '.</p></div>' +
    '<div><h4>Menu</h4><div class="foot-links">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '">' + l + '</a>').join('') + '</div></div>' +
    '<div><h4>Kontak</h4><ul class="contact-list">' +
    '<li>' + icon('pin', 18) + '<span>' + esc(C.address) + '</span></li>' +
    '<li>' + icon('phone', 18) + '<span>' + esc(C.phone) + '</span></li>' +
    '<li>' + icon('mail', 18) + '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></li></ul></div>' +
    '<div><h4>Jam Operasional</h4><ul class="contact-list"><li>' + icon('clock', 18) + '<span>' + esc(C.hours) + '</span></li></ul></div>' +
    '</div><div class="copy"><span>© ' + new Date().getFullYear() + ' ' + esc(C.name) + '. Hak cipta dilindungi.</span><span>Demo Paket Standar</span></div></div>';

  document.body.insertAdjacentHTML('beforeend', '<a class="wa-float" href="' + wa('Halo ' + C.short + ', saya ingin bertanya.') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icon('chat', 26, 2) + '</a>');

  const navLinks = document.getElementById('navLinks');
  document.getElementById('burger').addEventListener('click', () => navLinks.classList.toggle('open'));
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target).entries());
    const text = 'Halo ' + C.short + ', saya ' + d.name + (d.company ? ' dari ' + d.company : '') + '.\nKebutuhan: ' + d.topic + '\nEmail: ' + d.email + '\n\n' + d.message;
    window.open(wa(text), '_blank', 'noopener');
    e.target.reset();
  });

  /* ---------- Komponen ---------- */
  const pageHero = (title, sub) =>
    '<section class="page-hero"><div class="container"><div class="crumb"><a href="#/beranda">Beranda</a> / ' + title + '</div><h1>' + title + '</h1><p>' + sub + '</p></div></section>';

  const prodCard = (p, full) =>
    '<article class="card">' + (p.image ? '<div class="prod-tile has-img" style="background-image:' + cssUrl(p.image) + '"></div>' : '<div class="prod-tile">' + icon(p.icon, 54, 1.5) + '</div>') +
    '<div class="card-body"><span class="tag">' + esc(p.category) + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(full ? p.desc : p.short) + '</p>' +
    (full ? '<ul class="check-list">' + (p.features || []).map((f) => '<li>' + icon('check', 16, 2.4) + esc(f) + '</li>').join('') + '</ul>' +
      '<a class="price-note" href="' + wa('Halo ' + C.short + ', saya ingin minta penawaran: ' + p.name) + '" target="_blank" rel="noopener">' + icon('chat', 16) + 'Minta penawaran</a>' : '') +
    '</div></article>';

  const eventCard = (e) => {
    const up = CP.isUpcoming(e.date);
    return '<article class="card"><div class="event-img img" style="--img:' + cssUrl(e.image) + '"><span class="badge ' + (up ? 'up' : '') + '">' + (up ? 'Akan datang' : 'Selesai') + '</span></div>' +
      '<div class="card-body"><span class="tag">' + esc(e.category) + '</span><h3>' + esc(e.title) + '</h3><ul class="meta">' +
      '<li>' + icon('calendar', 16) + fmtDate(e.date) + '</li><li>' + icon('clock', 16) + esc(e.time) + '</li><li>' + icon('pin', 16) + esc(e.location) + '</li></ul>' +
      '<p>' + esc(e.desc) + '</p></div></article>';
  };

  const newsMeta = (n) => '<div class="news-meta"><span>' + icon('calendar', 14) + fmtDate(n.date) + '</span><span>' + icon('user', 14) + esc(n.author) + '</span></div>';
  const newsCard = (n) =>
    '<article class="card"><div class="event-img img" style="--img:' + cssUrl(n.image) + '"><span class="badge">' + esc(n.category) + '</span></div>' +
    '<div class="card-body">' + newsMeta(n) + '<h3>' + esc(n.title) + '</h3><p>' + esc(n.excerpt) + '</p></div></article>';
  // Paket Standar tidak memiliki halaman detail: isi berita ditampilkan langsung di daftar.
  const newsRow = (n) =>
    '<article class="card news-row"><div class="img" style="--img:' + cssUrl(n.image) + '"></div><div class="card-body"><span class="tag">' + esc(n.category) + '</span>' + newsMeta(n) +
    '<h3>' + esc(n.title) + '</h3>' + (n.content || []).map((p) => '<p>' + esc(p) + '</p>').join('') + '</div></article>';

  function treeHTML(nodes, lv) {
    return '<ul>' + nodes.map((n) =>
      '<li><div class="node lv' + lv + '"><div class="av">' + CP.initials(n.name) + '</div><strong>' + esc(n.name) + '</strong><span>' + esc(n.position) + '</span></div>' +
      (n.children.length ? treeHTML(n.children, lv + 1) : '') + '</li>').join('') + '</ul>';
  }

  const cta = () =>
    '<section class="cta"><div class="container cta-inner"><div><h2>Butuh sistem proteksi kebakaran?</h2><p>Survei lokasi dan konsultasi tanpa biaya. Tim kami merespons dalam 1×24 jam kerja.</p></div>' +
    '<a class="btn btn-accent" href="' + wa('Halo ' + C.short + ', saya ingin konsultasi.') + '" target="_blank" rel="noopener">' + icon('chat', 18) + 'Konsultasi via WhatsApp</a></div></section>';

  const head = (eyebrow, title, sub) => '<div class="section-head"><span class="eyebrow">' + eyebrow + '</span><h2>' + title + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>';
  const more = (href, label) => '<p style="text-align:center;margin-top:32px"><a href="' + href + '" class="btn btn-outline">' + label + '</a></p>';

  /* ---------- Halaman ---------- */
  const pages = {
    beranda() {
      const { up } = CP.sortEvents(D.events);
      const news = CP.publishedNews(D.news);
      return '<section class="hero"><div class="container hero-grid"><div>' +
        '<span class="eyebrow">Berdiri sejak ' + esc(C.founded) + '</span><h1>' + esc(C.tagline) + '</h1><p>' + esc(C.about) + '</p>' +
        '<div class="btns"><a href="#/produk" class="btn btn-primary">Lihat Produk ' + icon('arrow', 18) + '</a><a href="#/tentang" class="btn btn-outline">Tentang Kami</a></div></div>' +
        '<div class="hero-img img" style="--img:' + cssUrl(C.heroImage) + '" role="img" aria-label="' + esc(C.name) + '"></div></div></section>' +
        '<section class="stats"><div class="container stats-grid">' + C.stats.map((s) => '<div><strong>' + esc(s.value) + esc(s.suffix) + '</strong><span>' + esc(s.label) + '</span></div>').join('') + '</div></section>' +
        '<section class="section"><div class="container two-col"><div class="img" style="--img:' + cssUrl(C.aboutImage) + '"></div><div>' +
        '<div class="section-head left"><span class="eyebrow">Tentang Kami</span><h2>Proteksi menyeluruh, dari pencegahan hingga pemadaman</h2></div>' +
        '<p class="lead">' + esc(C.aboutLong) + '</p><a href="#/tentang" class="link-more">Selengkapnya ' + icon('arrow', 16) + '</a></div></div></section>' +
        '<section class="section bg-soft"><div class="container">' + head('Produk', 'Produk unggulan kami', 'Perlengkapan dan sistem proteksi kebakaran bersertifikat.') +
        '<div class="grid-3">' + D.products.slice(0, 3).map((p) => prodCard(p)).join('') + '</div>' + more('#/produk', 'Semua Produk') + '</div></section>' +
        '<section class="section"><div class="container">' + head('Event', 'Agenda terdekat') +
        (up.length ? '<div class="grid-3">' + up.slice(0, 3).map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada agenda terdekat.</div>') + '</div></section>' +
        '<section class="section bg-soft"><div class="container">' + head('Berita', 'Berita & artikel terbaru') +
        '<div class="grid-3">' + news.slice(0, 3).map(newsCard).join('') + '</div>' + more('#/berita', 'Semua Berita') + '</div></section>' + cta();
    },

    tentang() {
      return pageHero('Tentang Perusahaan', 'Mengenal lebih dekat ' + esc(C.name) + '.') +
        '<section class="section"><div class="container two-col"><div><div class="section-head left"><span class="eyebrow">Profil</span><h2>' + esc(C.name) + '</h2></div>' +
        '<p class="lead">' + esc(C.about) + '</p><p class="lead">' + esc(C.aboutLong) + '</p></div><div class="img" style="--img:' + cssUrl(C.aboutImage2) + '"></div></div></section>' +
        '<section class="section bg-soft"><div class="container vm">' +
        '<div class="card"><div class="card-body"><h3>' + icon('eye', 22) + 'Visi</h3><p class="vision-text">' + esc(C.vision) + '</p></div></div>' +
        '<div class="card"><div class="card-body"><h3>' + icon('target', 22) + 'Misi</h3><ol class="mission">' + C.mission.map((m) => '<li>' + esc(m) + '</li>').join('') + '</ol></div></div>' +
        '</div></section>' +
        '<section class="section"><div class="container">' + head('Nilai Perusahaan', 'Prinsip yang kami pegang') +
        '<div class="grid-4">' + C.values.map((v) => '<div class="card"><div class="card-body"><div class="icon-box">' + icon(v.icon, 24) + '</div><h3>' + esc(v.title) + '</h3><p>' + esc(v.desc) + '</p></div></div>').join('') + '</div></div></section>' +
        '<section class="section bg-soft"><div class="container">' + head('Perjalanan', 'Sejarah singkat') + '<div class="timeline">' +
        C.history.map((h) => '<div class="tl-item"><span class="tl-year">' + esc(h.year) + '</span><h4>' + esc(h.title) + '</h4><p>' + esc(h.desc) + '</p></div>').join('') +
        '</div></div></section>' + cta();
    },

    struktur() {
      return pageHero('Struktur Organisasi', 'Susunan manajemen ' + esc(C.name) + '.') +
        '<section class="section"><div class="container">' + head('Manajemen', 'Bagan organisasi') +
        '<p class="scroll-hint">Geser ke samping untuk melihat bagan lengkap →</p>' +
        '<div class="tree-wrap"><div class="tree">' + treeHTML(CP.buildTree(D.organization), 0) + '</div></div></div></section>' + cta();
    },

    produk() {
      const cats = Array.from(new Set(D.products.map((p) => p.category)));
      return pageHero('Produk', 'Perlengkapan dan sistem proteksi kebakaran serta keselamatan kerja.') +
        '<section class="section"><div class="container"><div class="filter-row">' + cats.map((c) => '<span>' + esc(c) + '</span>').join('') + '</div>' +
        '<div class="grid-3">' + D.products.map((p) => prodCard(p, true)).join('') + '</div></div></section>' + cta();
    },

    event() {
      const { up, past } = CP.sortEvents(D.events);
      return pageHero('Event', 'Pelatihan, pameran, dan kegiatan sosial ' + esc(C.short) + '.') +
        '<section class="section"><div class="container"><h2 class="sub-title">Event Akan Datang</h2>' +
        (up.length ? '<div class="grid-3">' + up.map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada agenda terdekat.</div>') +
        '</div></section><section class="section bg-soft"><div class="container"><h2 class="sub-title">Event Sebelumnya</h2>' +
        (past.length ? '<div class="grid-3">' + past.map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada arsip event.</div>') +
        '</div></section>';
    },

    berita() {
      const news = CP.publishedNews(D.news);
      return pageHero('Berita', 'Kabar perusahaan, edukasi keselamatan, dan tips proteksi kebakaran.') +
        '<section class="section"><div class="container"><div class="news-list">' + news.map(newsRow).join('') + '</div></div></section>';
    }
  };

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.slice(1);
    if (hash && hash.charAt(0) !== '/') {
      const el = document.getElementById(hash);
      if (el) { navLinks.classList.remove('open'); el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    const key = hash.replace(/^\//, '').split('/')[0];
    const name = pages[key] ? key : 'beranda';
    app.innerHTML = pages[name]();
    const label = ROUTES.find((r) => r[0] === name)[1];
    CP.setMeta(name === 'beranda' ? C.name + ' — ' + C.tagline : label + ' — ' + C.name, C.about);
    document.querySelectorAll('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === name));
    navLinks.classList.remove('open');
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
