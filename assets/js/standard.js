/* ===== PAKET STANDAR — render halaman dari data.js ===== */
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
    ['event', 'Event'],
    ['layanan', 'Layanan']
  ];

  /* ---------- Shell ---------- */
  function brand() {
    return '<a href="#/beranda" class="brand">' + CP.logo(36) + '<span>' + esc(C.short) + '<small>' + esc(C.name) + '</small></span></a>';
  }

  document.getElementById('header').innerHTML =
    '<div class="container nav">' + brand() +
    '<nav class="nav-links" id="navLinks">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '" data-route="' + k + '">' + l + '</a>').join('') + '</nav>' +
    '<div class="nav-cta"><a href="#kontak" class="btn btn-accent btn-sm">Hubungi Kami</a>' +
    '<button class="burger" id="burger" aria-label="Buka menu">' + icon('menu', 26) + '</button></div></div>';

  document.getElementById('footer').innerHTML =
    '<div class="container"><div class="foot-grid" id="kontak">' +
    '<div>' + brand() + '<p>' + esc(C.tagline) + '.</p></div>' +
    '<div><h4>Menu</h4><div class="foot-links">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '">' + l + '</a>').join('') + '</div></div>' +
    '<div><h4>Kontak</h4><ul class="contact-list">' +
    '<li>' + icon('pin', 18) + '<span>' + esc(C.address) + '</span></li>' +
    '<li>' + icon('phone', 18) + '<span>' + esc(C.phone) + '</span></li>' +
    '<li>' + icon('mail', 18) + '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></li></ul></div>' +
    '<div><h4>Jam Operasional</h4><ul class="contact-list"><li>' + icon('clock', 18) + '<span>' + esc(C.hours) + '</span></li></ul></div>' +
    '</div><div class="copy"><span>© ' + new Date().getFullYear() + ' ' + esc(C.name) + '. Hak cipta dilindungi.</span><span>Paket Standar</span></div></div>';

  document.body.insertAdjacentHTML('beforeend', '<a class="wa-float" href="' + CP.waLink(C.whatsapp, 'Halo ' + C.short + ', saya ingin bertanya.') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icon('chat', 26, 2) + '</a>');

  const navLinks = document.getElementById('navLinks');
  document.getElementById('burger').addEventListener('click', () => navLinks.classList.toggle('open'));

  /* ---------- Komponen ---------- */
  const pageHero = (title, sub) =>
    '<section class="page-hero"><div class="container"><div class="crumb"><a href="#/beranda">Beranda</a> / ' + title + '</div><h1>' + title + '</h1><p>' + sub + '</p></div></section>';

  const serviceCard = (s, full) =>
    '<article class="card"><div class="card-body"><div class="icon-box">' + icon(s.icon, 24) + '</div><h3>' + esc(s.title) + '</h3><p>' + esc(full ? s.desc : s.short) + '</p>' +
    (full ? '<ul class="check-list">' + (s.features || []).map((f) => '<li>' + icon('check', 16, 2.4) + esc(f) + '</li>').join('') + '</ul>' : '') + '</div></article>';

  const eventCard = (e) => {
    const up = CP.isUpcoming(e.date);
    return '<article class="card"><div class="event-img img" style="--img:' + cssUrl(e.image) + '"><span class="badge ' + (up ? 'up' : '') + '">' + (up ? 'Akan datang' : 'Selesai') + '</span></div>' +
      '<div class="card-body"><span class="tag">' + esc(e.category) + '</span><h3>' + esc(e.title) + '</h3><ul class="meta">' +
      '<li>' + icon('calendar', 16) + fmtDate(e.date) + '</li><li>' + icon('clock', 16) + esc(e.time) + '</li><li>' + icon('pin', 16) + esc(e.location) + '</li></ul>' +
      '<p>' + esc(e.desc) + '</p></div></article>';
  };

  function treeHTML(nodes, lv) {
    return '<ul>' + nodes.map((n) =>
      '<li><div class="node lv' + lv + '"><div class="av">' + CP.initials(n.name) + '</div><strong>' + esc(n.name) + '</strong><span>' + esc(n.position) + '</span></div>' +
      (n.children.length ? treeHTML(n.children, lv + 1) : '') + '</li>').join('') + '</ul>';
  }

  const cta = () =>
    '<section class="cta"><div class="container cta-inner"><div><h2>Siap memulai proyek bersama kami?</h2><p>Konsultasi awal tanpa biaya. Tim kami akan merespons dalam 1×24 jam kerja.</p></div>' +
    '<a class="btn btn-accent" href="' + CP.waLink(C.whatsapp, 'Halo ' + C.short + ', saya ingin konsultasi.') + '" target="_blank" rel="noopener">' + icon('chat', 18) + 'Konsultasi via WhatsApp</a></div></section>';

  /* ---------- Halaman ---------- */
  const pages = {
    beranda() {
      const { up } = CP.sortEvents(D.events);
      return '<section class="hero"><div class="container hero-grid"><div>' +
        '<span class="eyebrow">Berdiri sejak ' + esc(C.founded) + '</span><h1>' + esc(C.tagline) + '</h1><p>' + esc(C.about) + '</p>' +
        '<div class="btns"><a href="#/layanan" class="btn btn-primary">Lihat Layanan ' + icon('arrow', 18) + '</a><a href="#/tentang" class="btn btn-outline">Tentang Kami</a></div></div>' +
        '<div class="hero-img img" style="--img:' + cssUrl(C.heroImage) + '" role="img" aria-label="Kantor ' + esc(C.short) + '"></div></div></section>' +

        '<section class="stats"><div class="container stats-grid">' + C.stats.map((s) => '<div><strong>' + esc(s.value) + esc(s.suffix) + '</strong><span>' + esc(s.label) + '</span></div>').join('') + '</div></section>' +

        '<section class="section"><div class="container two-col"><div class="img" style="--img:' + cssUrl(C.aboutImage) + '"></div><div>' +
        '<div class="section-head left"><span class="eyebrow">Tentang Kami</span><h2>Membantu bisnis Indonesia bertumbuh lewat teknologi</h2></div>' +
        '<p class="lead">' + esc(C.aboutLong) + '</p><a href="#/tentang" class="link-more">Selengkapnya ' + icon('arrow', 16) + '</a></div></div></section>' +

        '<section class="section bg-soft"><div class="container"><div class="section-head"><span class="eyebrow">Layanan</span><h2>Solusi yang kami tawarkan</h2><p>Layanan menyeluruh dari strategi hingga implementasi.</p></div>' +
        '<div class="grid-3">' + D.services.slice(0, 3).map((s) => serviceCard(s)).join('') + '</div>' +
        '<p style="text-align:center;margin-top:32px"><a href="#/layanan" class="btn btn-outline">Semua Layanan</a></p></div></section>' +

        '<section class="section"><div class="container"><div class="section-head"><span class="eyebrow">Event</span><h2>Agenda terdekat</h2></div>' +
        (up.length ? '<div class="grid-3">' + up.slice(0, 3).map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada agenda terdekat.</div>') +
        '</div></section>' + cta();
    },

    tentang() {
      return pageHero('Tentang Perusahaan', 'Mengenal lebih dekat ' + esc(C.name) + '.') +
        '<section class="section"><div class="container two-col"><div><div class="section-head left"><span class="eyebrow">Profil</span><h2>' + esc(C.name) + '</h2></div>' +
        '<p class="lead">' + esc(C.about) + '</p><p class="lead">' + esc(C.aboutLong) + '</p></div><div class="img" style="--img:' + cssUrl(C.aboutImage2) + '"></div></div></section>' +

        '<section class="section bg-soft"><div class="container vm">' +
        '<div class="card"><div class="card-body"><h3>' + icon('eye', 22) + 'Visi</h3><p class="vision-text">' + esc(C.vision) + '</p></div></div>' +
        '<div class="card"><div class="card-body"><h3>' + icon('target', 22) + 'Misi</h3><ol class="mission">' + C.mission.map((m) => '<li>' + esc(m) + '</li>').join('') + '</ol></div></div>' +
        '</div></section>' +

        '<section class="section"><div class="container"><div class="section-head"><span class="eyebrow">Nilai Perusahaan</span><h2>Prinsip yang kami pegang</h2></div>' +
        '<div class="grid-4">' + C.values.map((v) => '<div class="card"><div class="card-body"><div class="icon-box">' + icon(v.icon, 24) + '</div><h3>' + esc(v.title) + '</h3><p>' + esc(v.desc) + '</p></div></div>').join('') + '</div></div></section>' +

        '<section class="section bg-soft"><div class="container"><div class="section-head"><span class="eyebrow">Perjalanan</span><h2>Sejarah singkat</h2></div><div class="timeline">' +
        C.history.map((h) => '<div class="tl-item"><span class="tl-year">' + esc(h.year) + '</span><h4>' + esc(h.title) + '</h4><p>' + esc(h.desc) + '</p></div>').join('') +
        '</div></div></section>' + cta();
    },

    struktur() {
      return pageHero('Struktur Organisasi', 'Susunan manajemen yang memimpin ' + esc(C.short) + '.') +
        '<section class="section"><div class="container"><div class="section-head"><span class="eyebrow">Manajemen</span><h2>Bagan organisasi</h2></div>' +
        '<p class="scroll-hint">Geser ke samping untuk melihat bagan lengkap →</p>' +
        '<div class="tree-wrap"><div class="tree">' + treeHTML(CP.buildTree(D.organization), 0) + '</div></div></div></section>' + cta();
    },

    event() {
      const { up, past } = CP.sortEvents(D.events);
      return pageHero('Event', 'Agenda kegiatan, seminar, dan program sosial ' + esc(C.short) + '.') +
        '<section class="section"><div class="container"><h2 class="sub-title">Event Akan Datang</h2>' +
        (up.length ? '<div class="grid-3">' + up.map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada agenda terdekat.</div>') +
        '</div></section><section class="section bg-soft"><div class="container"><h2 class="sub-title">Event Sebelumnya</h2>' +
        (past.length ? '<div class="grid-3">' + past.map(eventCard).join('') + '</div>' : '<div class="empty">Belum ada arsip event.</div>') +
        '</div></section>';
    },

    layanan() {
      return pageHero('Layanan', 'Solusi menyeluruh untuk kebutuhan digital perusahaan Anda.') +
        '<section class="section"><div class="container"><div class="grid-3">' + D.services.map((s) => serviceCard(s, true)).join('') + '</div></div></section>' + cta();
    }
  };

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.slice(1);
    if (hash && !hash.startsWith('/')) {
      const el = document.getElementById(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    const key = hash.replace('/', '');
    const name = pages[key] ? key : 'beranda';
    app.innerHTML = pages[name]();
    const label = ROUTES.find((r) => r[0] === name)[1];
    document.title = (name === 'beranda' ? C.name + ' — ' + C.tagline : label + ' — ' + C.name);
    document.querySelectorAll('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === name));
    navLinks.classList.remove('open');
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
