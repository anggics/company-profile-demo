/* =====================================================================
   PAKET PROFESIONAL — render halaman + seluruh animasi
   Set window.CP_USE_STORE = true sebelum file ini dimuat untuk membaca
   konten dari panel admin (paket Profesional + Admin).
   ===================================================================== */
(function () {
  'use strict';
  const USE_STORE = !!window.CP_USE_STORE;
  let D = CP.getData(USE_STORE);
  let C = D.company;
  const { icon, esc, cssUrl, fmtDate } = CP;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const ROUTES = [
    ['beranda', 'Beranda'],
    ['tentang', 'Tentang Perusahaan'],
    ['struktur', 'Struktur Organisasi'],
    ['event', 'Event'],
    ['layanan', 'Layanan']
  ];

  let current = null;
  let timers = [];
  let observer = null;
  let loaded = false;
  const onLoaded = [];

  /* ---------- Util ---------- */
  function splitWords(text, accentLast, base) {
    const words = String(text).trim().split(/\s+/);
    const cut = words.length - (accentLast || 0);
    return words.map((w, i) => {
      const inner = esc(w);
      const cls = i >= cut ? ' class="serif grad-text"' : '';
      return '<span class="w"><span' + cls + ' style="--d:' + (base + i * 0.07).toFixed(2) + 's">' + inner + '</span></span>';
    }).join(' ');
  }
  const brand = () => '<a href="#/beranda" class="brand">' + CP.logo(38) + '<span>' + esc(C.short) + '<small>' + esc(C.name) + '</small></span></a>';
  const waHref = (t) => CP.waLink(C.whatsapp, t);
  function jumpTop() {
    const h = document.documentElement;
    h.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    h.style.scrollBehavior = '';
  }
  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = icon('check', 18, 2.4) + '<span>' + msg + '</span>';
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 3800);
  }
  function whenLoaded(fn) { loaded ? fn() : onLoaded.push(fn); }

  /* ---------- Shell (header, menu, kontak, footer) ---------- */
  function renderShell() {
    $('#header').innerHTML =
      '<div class="container nav">' + brand() +
      '<nav class="nav-links">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '" data-route="' + k + '">' + l + '</a>').join('') + '</nav>' +
      '<div class="nav-right"><a href="#kontak" class="btn btn-sun btn-sm">Hubungi Kami ' + icon('arrow', 16, 2.2) + '</a>' +
      '<button class="burger" id="burger" aria-label="Buka menu">' + icon('menu', 22) + '</button></div></div>';

    $('#mobileMenu').innerHTML =
      '<button class="burger mm-close" id="mmClose" aria-label="Tutup menu">' + icon('x', 22) + '</button>' +
      '<nav>' + ROUTES.map(([k, l]) => '<a href="#/' + k + '" data-route="' + k + '">' + l + '</a>').join('') + '</nav>' +
      '<div class="mm-foot"><p>' + esc(C.email) + '</p><p>' + esc(C.phone) + '</p></div>';

    const services = D.services.map((s) => '<option>' + esc(s.title) + '</option>').join('');
    $('#kontak').innerHTML =
      '<div class="aurora"><i></i><i></i></div><div class="container contact-grid">' +
      '<div data-reveal><span class="eyebrow">Kontak</span><h2 class="h2">Mari diskusikan <span class="serif grad-text">kebutuhan</span> Anda</h2>' +
      '<ul class="contact-info">' +
      '<li><span class="ci-ic">' + icon('pin', 20) + '</span><div><small>Alamat</small>' + esc(C.address) + '</div></li>' +
      '<li><span class="ci-ic">' + icon('phone', 20) + '</span><div><small>Telepon</small>' + esc(C.phone) + '</div></li>' +
      '<li><span class="ci-ic">' + icon('mail', 20) + '</span><div><small>Email</small><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></div></li>' +
      '<li><span class="ci-ic">' + icon('clock', 20) + '</span><div><small>Jam operasional</small>' + esc(C.hours) + '</div></li></ul></div>' +
      '<form class="form" id="contactForm" data-reveal style="--d:.15s">' +
      '<div class="field"><label for="f-name">Nama lengkap</label><input id="f-name" name="name" required placeholder="Nama Anda"></div>' +
      '<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" required placeholder="nama@perusahaan.com"></div>' +
      '<div class="field"><label for="f-company">Perusahaan</label><input id="f-company" name="company" placeholder="Nama perusahaan"></div>' +
      '<div class="field"><label for="f-service">Layanan</label><select id="f-service" name="service">' + services + '<option>Lainnya</option></select></div>' +
      '<div class="field full"><label for="f-msg">Pesan</label><textarea id="f-msg" name="message" required placeholder="Ceritakan kebutuhan Anda…"></textarea></div>' +
      '<button class="btn btn-sun btn-magnet" type="submit">Kirim Pesan ' + icon('send', 18) + '</button>' +
      '<p class="form-note">' + (USE_STORE ? 'Pesan tersimpan otomatis dan dapat dibaca di panel admin.' : 'Pesan akan diteruskan ke WhatsApp tim kami.') + '</p></form></div>';

    $('#footer').innerHTML =
      '<div class="container"><div class="foot-top">' +
      '<div>' + brand() + '<p>' + esc(C.tagline) + '.</p></div>' +
      '<div><h5>Menu</h5><div class="foot-links">' + ROUTES.map(([k, l]) => '<a href="#/' + k + '">' + l + '</a>').join('') + '</div></div>' +
      '<div><h5>Layanan</h5><div class="foot-links">' + D.services.slice(0, 5).map((s) => '<a href="#/layanan">' + esc(s.title) + '</a>').join('') + '</div></div>' +
      '<div><h5>Kontak</h5><div class="foot-links"><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a><a href="' + waHref('Halo ' + C.short) + '" target="_blank" rel="noopener">WhatsApp</a><span>' + esc(C.phone) + '</span></div></div>' +
      '</div><div class="foot-big">' + esc(C.short.toUpperCase()) + '</div>' +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(C.name) + '. Hak cipta dilindungi.</span>' +
      (USE_STORE ? '<a href="../admin/">' + icon('lock', 14) + ' Masuk Panel Admin</a>' : '<span>Paket Profesional</span>') + '</div></div>';

    $('#waFloat').href = waHref('Halo ' + C.short + ', saya ingin bertanya.');

    $('#burger').addEventListener('click', () => toggleMenu(true));
    $('#mmClose').addEventListener('click', () => toggleMenu(false));
    $('#contactForm').addEventListener('submit', onContact);
    setActive(current);
  }

  function toggleMenu(open) {
    $('#mobileMenu').classList.toggle('open', open);
    document.body.classList.toggle('lock', open);
  }
  function setActive(name) {
    $$('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === name));
  }

  function onContact(e) {
    e.preventDefault();
    const f = e.target;
    const data = Object.fromEntries(new FormData(f).entries());
    if (USE_STORE) {
      CP.addMessage(data);
      toast('Terima kasih, ' + esc(data.name) + '! Pesan Anda sudah kami terima.');
    } else {
      const text = 'Halo ' + C.short + ', saya ' + data.name + (data.company ? ' dari ' + data.company : '') +
        '.\nLayanan: ' + data.service + '\nEmail: ' + data.email + '\n\n' + data.message;
      window.open(waHref(text), '_blank', 'noopener');
      toast('Membuka WhatsApp untuk mengirim pesan Anda…');
    }
    f.reset();
  }

  /* ---------- Komponen ---------- */
  function pageHero(eyebrow, title, accent, sub, big, base) {
    return '<section class="page-hero"><div class="aurora"><i></i><i></i><i></i></div><div class="grid-lines"></div><div class="container">' +
      '<div class="crumb fade-up" style="--d:' + base + 's"><a href="#/beranda">Beranda</a><i></i><span>' + eyebrow + '</span></div>' +
      '<h1 class="split">' + splitWords(title, accent, base + 0.08) + '</h1>' +
      '<p class="fade-up" style="--d:' + (base + 0.5) + 's">' + sub + '</p>' +
      '<div class="big-num">' + esc(big) + '</div></div></section>';
  }

  const svcCard = (s, i, light) =>
    '<article class="svc' + (light ? ' light' : '') + '" data-reveal style="--d:' + ((i % 3) * 0.1) + 's">' +
    '<span class="svc-num">' + String(i + 1).padStart(2, '0') + '</span><div class="svc-ic">' + icon(s.icon, 26) + '</div>' +
    '<h3>' + esc(s.title) + '</h3><p>' + esc(light ? s.desc : s.short) + '</p>' +
    (light ? '<ul class="feat">' + (s.features || []).map((f) => '<li>' + icon('check', 16, 2.4) + esc(f) + '</li>').join('') + '</ul>'
      : '<a href="#/layanan" class="more">Selengkapnya ' + icon('arrow', 16, 2.2) + '</a>') + '</article>';

  function evCard(e, i) {
    const up = CP.isUpcoming(e.date);
    const p = CP.dateParts(e.date);
    const text = (e.title + ' ' + e.location + ' ' + e.category).toLowerCase();
    return '<article class="ev' + (up ? '' : ' past') + '" data-event="' + esc(e.id) + '" data-status="' + (up ? 'up' : 'past') + '" data-text="' + esc(text) + '" data-reveal style="--d:' + ((i % 3) * 0.1) + 's" tabindex="0">' +
      '<div class="ev-img"><div class="img" style="--img:' + cssUrl(e.image) + '"></div>' +
      '<span class="chip ' + (up ? 'sun' : '') + '">' + (up ? 'Akan datang' : 'Selesai') + '</span>' +
      '<div class="ev-date"><strong>' + p.day + '</strong><span>' + p.mon + ' ' + p.year + '</span></div></div>' +
      '<div class="ev-body"><span class="cat">' + esc(e.category) + '</span><h3>' + esc(e.title) + '</h3>' +
      '<ul class="ev-meta"><li>' + icon('clock', 15) + esc(e.time) + '</li><li>' + icon('pin', 15) + esc(e.location) + '</li></ul></div></article>';
  }

  function treeHTML(nodes, lv) {
    return '<ul>' + nodes.map((n, i) =>
      '<li><div class="node lv' + lv + '" data-reveal="zoom" style="--d:' + (lv * 0.18 + i * 0.05).toFixed(2) + 's"><div class="av">' + CP.initials(n.name) + '</div><strong>' + esc(n.name) + '</strong><span>' + esc(n.position) + '</span></div>' +
      (n.children.length ? treeHTML(n.children, lv + 1) : '') + '</li>').join('') + '</ul>';
  }

  const ctaBand = () =>
    '<section class="section" style="padding-top:0"><div class="container"><div class="cta-band" data-reveal="zoom">' +
    '<div><h2>Punya ide atau tantangan bisnis? Mari wujudkan bersama.</h2><p>Sesi konsultasi awal tanpa biaya. Tim kami merespons dalam 1×24 jam kerja.</p></div>' +
    '<a href="#kontak" class="btn btn-dark btn-magnet">Jadwalkan Konsultasi ' + icon('arrow', 18) + '</a></div></div></section>';

  /* ---------- Halaman ---------- */
  const pages = {
    beranda(base) {
      const S = C.stats;
      const { up, past } = CP.sortEvents(D.events);
      const fe = up[0];
      const rest = up.slice(fe ? 1 : 0).concat(past).slice(0, 3);
      const clients = D.clients.map((c) => '<span>' + icon('building', 20) + esc(c) + '</span>').join('');

      return '<section class="hero"><div class="aurora"><i></i><i></i><i></i></div><div class="grid-lines"></div>' +
        '<div class="container hero-grid"><div>' +
        '<div class="pill fade-up" style="--d:' + base + 's"><b>Sejak ' + esc(C.founded) + '</b>Dipercaya ' + esc(S[2].value) + esc(S[2].suffix) + ' klien di Indonesia</div>' +
        '<h1 class="split">' + splitWords(C.tagline, 2, base + 0.1) + '</h1>' +
        '<p class="hero-sub fade-up" style="--d:' + (base + 0.75) + 's">' + esc(C.about) + '</p>' +
        '<div class="hero-btns fade-up" style="--d:' + (base + 0.9) + 's"><a href="#kontak" class="btn btn-sun btn-magnet">Mulai Konsultasi ' + icon('arrow', 18) + '</a><a href="#/layanan" class="btn btn-ghost">Jelajahi Layanan</a></div>' +
        '<div class="hero-trust fade-up" style="--d:' + (base + 1.05) + 's">' + [S[0], S[2], S[3]].map((s) => '<div><strong data-count="' + esc(s.value) + '" data-suffix="' + esc(s.suffix) + '">0</strong><span>' + esc(s.label) + '</span></div>').join('') + '</div>' +
        '</div><div class="hero-visual"><div class="hero-photo img" data-parallax="-0.06" style="--img:' + cssUrl(C.heroImage) + '"></div>' +
        '<div class="float-card fc1"><div class="fc-ic">' + icon('trending', 20, 2.2) + '</div><div><strong>' + esc(S[1].value) + esc(S[1].suffix) + ' ' + esc(S[1].label.toLowerCase()) + '</strong><span>di berbagai industri</span></div></div>' +
        '<div class="float-card fc2"><div class="fc-ic">' + icon('shield', 20, 2.2) + '</div><div><strong>ISO 9001 & 27001</strong><span>Standar mutu & keamanan</span></div></div>' +
        '</div></div><div class="scroll-ind"><span></span>Gulir</div></section>' +

        '<div class="marquee"><div class="marquee-track">' + clients + clients + '</div></div>' +

        '<section class="section"><div class="container"><div class="about-grid">' +
        '<div class="collage" data-reveal><div class="c1"><div class="img" data-parallax="0.08" style="--img:' + cssUrl(C.aboutImage) + '"></div></div>' +
        '<div class="c2"><div class="img" data-parallax="-0.08" style="--img:' + cssUrl(C.aboutImage2) + '"></div></div>' +
        '<div class="badge-year"><svg viewBox="0 0 132 132"><defs><path id="circ" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"/></defs><text font-size="10" letter-spacing="3.2" fill="#9aa5bd" font-weight="600"><textPath href="#circ">TERPERCAYA • PROFESIONAL • INOVATIF •</textPath></text></svg>' +
        '<div><strong>' + esc(S[0].value) + esc(S[0].suffix) + '</strong><span>Tahun</span></div></div></div>' +
        '<div class="about-text" data-reveal style="--d:.15s"><span class="eyebrow">Tentang Kami</span><h2 class="h2">Teknologi yang <span class="serif grad-text">benar-benar</span> dipakai, bukan sekadar dibuat</h2>' +
        '<p>' + esc(C.aboutLong) + '</p><p style="margin-top:30px"><a href="#/tentang" class="link-arrow">Kenali kami lebih dekat ' + icon('arrow', 18) + '</a></p></div></div>' +
        '<div class="stats-row">' + S.map((s, i) => '<div class="stat" data-reveal style="--d:' + (i * 0.1) + 's"><strong><span data-count="' + esc(s.value) + '">0</span><em>' + esc(s.suffix) + '</em></strong><span>' + esc(s.label) + '</span></div>').join('') + '</div>' +
        '</div></section>' +

        '<section class="section dark"><div class="aurora"><i></i></div><div class="container" style="position:relative">' +
        '<div class="head-row"><div data-reveal><span class="eyebrow">Layanan Kami</span><h2 class="h2">Solusi lengkap, <span class="serif grad-text">dari strategi</span><br>hingga eksekusi</h2></div>' +
        '<div data-reveal style="--d:.15s"><p>Satu tim untuk seluruh perjalanan digital Anda — konsultasi, pengembangan, infrastruktur, keamanan, hingga pelatihan SDM.</p><p style="margin-top:18px"><a href="#/layanan" class="link-arrow">Semua layanan ' + icon('arrow', 18) + '</a></p></div></div>' +
        '<div class="svc-grid">' + D.services.map((s, i) => svcCard(s, i)).join('') + '</div></div></section>' +

        '<section class="section"><div class="container">' +
        '<div class="head-row"><div data-reveal><span class="eyebrow">Event & Agenda</span><h2 class="h2">Jangan lewatkan agenda <span class="serif grad-text">terdekat</span></h2></div>' +
        '<div data-reveal style="--d:.15s"><a href="#/event" class="link-arrow">Lihat semua event ' + icon('arrow', 18) + '</a></div></div>' +
        (fe ? '<div class="fe" data-reveal><div class="fe-img"><div class="img" style="--img:' + cssUrl(fe.image) + '"></div><span class="chip sun tag-abs">' + icon('zap', 14, 2.4) + 'Event terdekat</span></div>' +
          '<div class="fe-body"><div><span class="chip dim">' + esc(fe.category) + '</span></div><h3>' + esc(fe.title) + '</h3>' +
          '<ul class="fe-meta"><li>' + icon('calendar', 17) + fmtDate(fe.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</li><li>' + icon('clock', 17) + esc(fe.time) + '</li><li>' + icon('pin', 17) + esc(fe.location) + '</li></ul>' +
          '<div class="countdown" data-countdown="' + esc(fe.date) + '"><div><strong>00</strong><span>Hari</span></div><div><strong>00</strong><span>Jam</span></div><div><strong>00</strong><span>Menit</span></div><div><strong>00</strong><span>Detik</span></div></div>' +
          '<div><button class="btn btn-sun btn-magnet" data-event="' + esc(fe.id) + '">Lihat Detail & Daftar ' + icon('arrow', 18) + '</button></div></div></div>' : '') +
        (rest.length ? '<div class="ev-grid" style="margin-top:26px">' + rest.map(evCard).join('') + '</div>' : '') +
        '</div></section>' +

        '<section class="section dark2"><div class="container"><div class="testi" data-reveal>' +
        '<span class="eyebrow" style="justify-content:center">Kata Klien</span><div class="testi-ic">' + icon('quote', 44, 1.2) + '</div>' +
        '<div class="testi-slides">' + D.testimonials.map((t, i) =>
          '<div class="testi-slide' + (i === 0 ? ' active' : '') + '"><blockquote>“' + esc(t.text) + '”</blockquote>' +
          '<div class="testi-who"><div class="av">' + CP.initials(t.name) + '</div><div><strong>' + esc(t.name) + '</strong><span>' + esc(t.role) + '</span></div></div></div>').join('') + '</div>' +
        '<div class="dots">' + D.testimonials.map((_, i) => '<button aria-label="Testimoni ' + (i + 1) + '"' + (i === 0 ? ' class="active"' : '') + '></button>').join('') + '</div>' +
        '</div></div></section>' +
        '<div style="height:120px"></div>' + ctaBand();
    },

    tentang(base) {
      const words = esc(C.aboutLong).split(/\s+/).map((w) => '<span class="word">' + w + '</span>').join(' ');
      return pageHero('Tentang Perusahaan', 'Tentang Perusahaan', 1, 'Mengenal lebih dekat ' + esc(C.name) + ' — siapa kami, apa yang kami percayai, dan perjalanan kami sejauh ini.', esc(C.founded), base) +
        '<section class="section"><div class="container">' +
        '<span class="eyebrow" data-reveal>Cerita Kami</span><p class="statement" id="statement">' + words + '</p>' +
        '<div class="about-grid" style="margin-top:100px"><div class="collage" style="height:480px"><div class="c1" style="width:100%;height:100%"><div class="img" data-reveal="clip" data-parallax="0.06" style="--img:' + cssUrl(C.aboutImage2) + '"></div></div></div>' +
        '<div class="about-text" data-reveal><span class="eyebrow">Profil Singkat</span><h2 class="h2">' + esc(C.name) + '</h2><p>' + esc(C.about) + '</p>' +
        '<ul class="contact-info" style="margin-top:30px">' +
        '<li><span class="ci-ic" style="background:#fff3e4;border:0;color:var(--sun2)">' + icon('award', 20) + '</span><div><small style="color:var(--muted)">Berdiri sejak</small><strong>' + esc(C.founded) + '</strong></div></li>' +
        '<li><span class="ci-ic" style="background:#fff3e4;border:0;color:var(--sun2)">' + icon('pin', 20) + '</span><div><small style="color:var(--muted)">Kantor pusat</small><strong>' + esc(C.address) + '</strong></div></li></ul></div></div>' +
        '</div></section>' +

        '<section class="section white"><div class="container"><div class="center-head" data-reveal><span class="eyebrow">Arah Kami</span><h2 class="h2">Visi & <span class="serif grad-text">Misi</span></h2></div>' +
        '<div class="vm-grid"><div class="vm-card vision" data-reveal="left"><div class="label">' + icon('eye', 18, 2.2) + 'Visi</div><p>' + esc(C.vision) + '</p></div>' +
        '<div class="vm-card mission" data-reveal="right"><div class="label">' + icon('target', 18, 2.2) + 'Misi</div><ol class="mis-list">' +
        C.mission.map((m, i) => '<li><b>0' + (i + 1) + '</b><span>' + esc(m) + '</span></li>').join('') + '</ol></div></div></div></section>' +

        '<section class="section"><div class="container"><div class="center-head" data-reveal><span class="eyebrow">Nilai Perusahaan</span><h2 class="h2">Prinsip yang kami <span class="serif grad-text">pegang</span></h2></div>' +
        '<div class="val-grid">' + C.values.map((v, i) => '<div class="val" data-reveal style="--d:' + (i * 0.1) + 's"><div class="svc-ic">' + icon(v.icon, 26) + '</div><h4>' + esc(v.title) + '</h4><p>' + esc(v.desc) + '</p></div>').join('') + '</div></div></section>' +

        '<section class="section dark"><div class="container"><div class="center-head" data-reveal><span class="eyebrow">Perjalanan</span><h2 class="h2">Tonggak sejarah <span class="serif grad-text">kami</span></h2></div>' +
        '<div class="tl" id="timeline"><div class="tl-line"><span></span></div>' +
        C.history.map((h) => '<div class="tl-item" data-reveal><div class="tl-year">' + esc(h.year) + '</div><h4>' + esc(h.title) + '</h4><p>' + esc(h.desc) + '</p></div>').join('') +
        '</div></div></section><div style="height:120px"></div>' + ctaBand();
    },

    struktur(base) {
      const tree = CP.buildTree(D.organization);
      const leaders = [];
      tree.forEach((r) => { leaders.push(r); if (r.children.length === 1) leaders.push(r.children[0]); });
      return pageHero('Struktur Organisasi', 'Struktur Organisasi', 1, 'Orang-orang di balik ' + esc(C.short) + ' yang memastikan setiap proyek berjalan dengan standar terbaik.', D.organization.length, base) +
        '<section class="section"><div class="container">' +
        '<div class="center-head" data-reveal><span class="eyebrow">Pimpinan</span><h2 class="h2">Dewan <span class="serif grad-text">pimpinan</span></h2></div>' +
        '<div class="leaders">' + leaders.slice(0, 2).map((n, i) =>
          '<div class="leader" data-reveal style="--d:' + (i * 0.12) + 's"><div class="ring"><div>' + CP.initials(n.name) + '</div></div><div><span class="role">' + esc(n.position) + '</span><h4>' + esc(n.name) + '</h4>' +
          '<p>Membawahi ' + n.children.length + ' ' + (n.children.length ? 'unit/jabatan langsung' : 'unit') + '</p></div></div>').join('') + '</div>' +
        '<div class="center-head" data-reveal style="margin-bottom:40px"><span class="eyebrow">Bagan</span><h2 class="h2">Bagan <span class="serif grad-text">organisasi</span></h2></div>' +
        '<p class="hint">Geser ke samping untuk melihat bagan lengkap →</p>' +
        '<div class="tree-wrap"><div class="tree">' + treeHTML(tree, 0) + '</div></div>' +
        '</div></section>' + ctaBand();
    },

    event(base) {
      const { up, past } = CP.sortEvents(D.events);
      const all = up.concat(past);
      return pageHero('Event', 'Event & Agenda', 1, 'Seminar, workshop, dan program sosial yang kami selenggarakan untuk komunitas bisnis Indonesia.', all.length, base) +
        '<section class="section"><div class="container">' +
        '<div class="toolbar" data-reveal><div class="tabs" id="evTabs"><span class="ind"></span>' +
        '<button class="active" data-filter="all">Semua (' + all.length + ')</button><button data-filter="up">Akan Datang (' + up.length + ')</button><button data-filter="past">Selesai (' + past.length + ')</button></div>' +
        '<label class="search">' + icon('search', 18) + '<input id="evSearch" type="search" placeholder="Cari event, kota, kategori…"></label></div>' +
        '<div class="ev-grid" id="evGrid">' + all.map(evCard).join('') + '</div>' +
        '<div class="no-result" id="noResult">Tidak ada event yang cocok.</div>' +
        '</div></section>' + ctaBand();
    },

    layanan(base) {
      const steps = [
        ['Konsultasi', 'Kami mendengarkan kebutuhan, tujuan, dan kendala bisnis Anda secara mendalam.'],
        ['Perencanaan', 'Menyusun ruang lingkup, jadwal, anggaran, dan indikator keberhasilan yang jelas.'],
        ['Eksekusi', 'Tim mengerjakan proyek dengan laporan progres rutin dan transparan.'],
        ['Pendampingan', 'Pelatihan, garansi, dan dukungan teknis setelah proyek selesai.']
      ];
      return pageHero('Layanan', 'Layanan Kami', 1, 'Dari strategi hingga implementasi — solusi menyeluruh untuk setiap tahap perjalanan digital perusahaan Anda.', String(D.services.length).padStart(2, '0'), base) +
        '<section class="section"><div class="container"><div class="svc-grid">' + D.services.map((s, i) => svcCard(s, i, true)).join('') + '</div></div></section>' +

        '<section class="section dark"><div class="container"><div class="center-head" data-reveal><span class="eyebrow">Cara Kerja</span><h2 class="h2">Proses yang <span class="serif grad-text">terukur</span> dan transparan</h2></div>' +
        '<div class="steps" data-reveal><div class="bar"></div>' + steps.map((s, i) => '<div class="step"><div class="step-n">0' + (i + 1) + '</div><h4>' + s[0] + '</h4><p>' + s[1] + '</p></div>').join('') + '</div></div></section>' +

        '<section class="section white"><div class="container"><div class="center-head" data-reveal><span class="eyebrow">FAQ</span><h2 class="h2">Pertanyaan yang <span class="serif grad-text">sering</span> diajukan</h2></div>' +
        '<div class="faq">' + D.faq.map((f, i) => '<div class="faq-item' + (i === 0 ? ' open' : '') + '" data-reveal style="--d:' + (i * 0.06) + 's"><button class="faq-q">' + esc(f.q) + '<span class="pm">' + icon('chevron', 18, 2.2) + '</span></button><div class="faq-a"><div><p>' + esc(f.a) + '</p></div></div></div>').join('') +
        '</div></div></section><div style="height:120px;background:var(--white)"></div>' + ctaBand();
    }
  };

  /* ---------- Interaksi per halaman ---------- */
  function initReveal() {
    if (observer) observer.disconnect();
    const els = $$('[data-reveal]:not(.in)');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        observer.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => observer.observe(el));
    // penghitung angka
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach((el) => cio.observe(el));
  }

  function countUp(el) {
    const end = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = end + suffix; return; }
    const dur = 2000, t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.round(end * (1 - Math.pow(2, -10 * p)));
      el.textContent = (p === 1 ? end : v) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function initCountdown() {
    const box = $('[data-countdown]');
    if (!box) return;
    const target = new Date(box.dataset.countdown + 'T09:00:00').getTime();
    const cells = $$('strong', box);
    const tick = () => {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      v.forEach((n, i) => { const t = String(n).padStart(2, '0'); if (cells[i].textContent !== t) cells[i].textContent = t; });
    };
    tick();
    timers.push(setInterval(tick, 1000));
  }

  function initTestimonials() {
    const slides = $$('.testi-slide');
    const dots = $$('.dots button');
    if (slides.length < 2) return;
    let i = 0, timer;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === i));
      dots.forEach((d, k) => { d.classList.remove('active'); if (k === i) { void d.offsetWidth; d.classList.add('active'); } });
      clearInterval(timer);
      timer = setInterval(() => go(i + 1), 6000);
      timers.push(timer);
    };
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    go(0);
  }

  function initEvents() {
    const tabs = $('#evTabs');
    if (!tabs) return;
    const ind = $('.ind', tabs);
    const input = $('#evSearch');
    let filter = 'all';
    const moveInd = () => {
      const b = $('button.active', tabs);
      ind.style.width = b.offsetWidth + 'px';
      ind.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    };
    const apply = () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      $$('#evGrid .ev').forEach((c) => {
        const ok = (filter === 'all' || c.dataset.status === filter) && (!q || c.dataset.text.includes(q));
        c.classList.toggle('hide', !ok);
        if (ok) {
          shown++;
          if (!reduce) { c.animate([{ opacity: 0, transform: 'translateY(24px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)', delay: shown * 40 }); }
        }
      });
      $('#noResult').classList.toggle('show', shown === 0);
    };
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', tabs).forEach((x) => x.classList.toggle('active', x === b));
      filter = b.dataset.filter;
      moveInd(); apply();
    });
    input.addEventListener('input', apply);
    requestAnimationFrame(moveInd);
    window.addEventListener('resize', moveInd);
  }

  function initFaq() {
    $$('.faq-q').forEach((b) => b.addEventListener('click', () => {
      const item = b.parentElement;
      const open = item.classList.contains('open');
      $$('.faq-item').forEach((x) => x.classList.remove('open'));
      if (!open) item.classList.add('open');
    }));
  }

  /* ---------- Modal event ---------- */
  function openEvent(id) {
    const e = D.events.find((x) => x.id === id);
    if (!e) return;
    const up = CP.isUpcoming(e.date);
    $('#modalContent').innerHTML =
      '<div class="modal-img img" style="--img:' + cssUrl(e.image) + '"></div><div class="modal-body">' +
      '<span class="chip ' + (up ? 'sun' : 'soft') + '">' + (up ? 'Akan datang' : 'Selesai') + '</span> <span class="chip soft">' + esc(e.category) + '</span>' +
      '<h3>' + esc(e.title) + '</h3><ul class="ev-meta"><li>' + icon('calendar', 17) + fmtDate(e.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</li><li>' + icon('clock', 17) + esc(e.time) + '</li><li>' + icon('pin', 17) + esc(e.location) + '</li></ul>' +
      '<p>' + esc(e.desc) + '</p>' +
      (up ? '<a class="btn btn-sun" target="_blank" rel="noopener" href="' + waHref('Halo ' + C.short + ', saya ingin mendaftar event "' + e.title + '" (' + fmtDate(e.date) + ').') + '">Daftar via WhatsApp ' + icon('arrow', 18) + '</a>'
        : '<button class="btn btn-dark" data-close>Tutup</button>') + '</div>';
    $('#modal').classList.add('open');
    document.body.classList.add('lock');
  }
  function closeModal() {
    $('#modal').classList.remove('open');
    document.body.classList.remove('lock');
  }

  /* ---------- Efek global ---------- */
  let ticking = false, lastY = 0;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? y / max : 0;
      $('#progress').style.transform = 'scaleX(' + p + ')';
      const hd = $('#header');
      hd.classList.toggle('scrolled', y > 40);
      hd.classList.toggle('hide', y > 400 && y > lastY && !$('#mobileMenu').classList.contains('open'));
      lastY = y;
      $('#toTop').classList.toggle('show', y > 600);
      $('#toTop circle').style.strokeDashoffset = 157 - 157 * p;

      if (!reduce) {
        $$('[data-parallax]').forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const center = r.top + r.height / 2 - vh / 2;
          el.style.transform = 'translate3d(0,' + (center * parseFloat(el.dataset.parallax)).toFixed(1) + 'px,0)';
        });
      }
      const st = $('#statement');
      if (st) {
        const r = st.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        const ws = st._words || (st._words = $$('.word', st));
        const n = reduce ? ws.length : Math.round(prog * ws.length);
        ws.forEach((w, i) => w.classList.toggle('on', i < n));
      }
      const tl = $('#timeline');
      if (tl) {
        const r = tl.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
        $('.tl-line span', tl).style.transform = 'scaleY(' + prog + ')';
      }
      ticking = false;
    });
  }

  function bindGlobal() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // spotlight kartu layanan
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.svc');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }
      if (!finePointer || reduce) return;
      const m = e.target.closest && e.target.closest('.btn-magnet');
      $$('.btn-magnet.mg').forEach((b) => { if (b !== m) { b.classList.remove('mg'); b.style.transform = ''; } });
      if (m) {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        m.classList.add('mg');
        m.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      }
    });

    // klik delegasi: modal event, tutup modal
    document.addEventListener('click', (e) => {
      const ev = e.target.closest('[data-event]');
      if (ev) { e.preventDefault(); openEvent(ev.dataset.event); return; }
      if (e.target.closest('[data-close]') || e.target.classList.contains('modal-bg')) closeModal();
      if (e.target.closest('#mobileMenu a')) toggleMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeModal(); toggleMenu(false); }
      if (e.key === 'Enter' && e.target.matches && e.target.matches('.ev[data-event]')) openEvent(e.target.dataset.event);
    });

    // paket + Admin: perbarui tampilan saat konten diubah dari panel admin (tab lain)
    if (USE_STORE) {
      window.addEventListener('storage', (e) => {
        if (e.key && e.key.indexOf('arunika_cp_data') === 0 || e.key === null) {
          D = CP.getData(true); C = D.company;
          renderShell(); render(current || 'beranda', 0.1);
          toast('Konten diperbarui dari panel admin.');
        }
      });
    }
  }

  /* ---------- Router + transisi halaman ---------- */
  function render(name, base) {
    timers.forEach(clearInterval); timers = [];
    const app = $('#app');
    app.innerHTML = pages[name](base);
    current = name;
    setActive(name);
    const label = ROUTES.find((r) => r[0] === name)[1];
    document.title = name === 'beranda' ? C.name + ' — ' + C.tagline : label + ' — ' + C.name;
    initCountdown(); initTestimonials(); initEvents(); initFaq();
    whenLoaded(() => { initReveal(); onScroll(); });
  }

  function navigate() {
    const hash = location.hash.slice(1);
    if (hash && hash.charAt(0) !== '/') {
      const el = document.getElementById(hash);
      if (el) { toggleMenu(false); el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); return; }
    }
    const key = hash.replace(/^\//, '');
    const name = pages[key] ? key : 'beranda';
    if (name === current) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (current === null || reduce) { render(name, current === null ? 0.25 : 0.1); jumpTop(); return; }
    const cur = $('#curtain');
    cur.classList.remove('open');
    cur.classList.add('cover');
    setTimeout(() => {
      render(name, 0.35);
      jumpTop();
      cur.classList.remove('cover');
      cur.classList.add('open');
      setTimeout(() => cur.classList.remove('open'), 650);
    }, 520);
  }

  /* ---------- Mulai ---------- */
  renderShell();
  bindGlobal();
  window.addEventListener('hashchange', navigate);
  navigate();

  const start = performance.now();
  function finishLoading() {
    if (loaded) return;
    const wait = Math.max(0, 1300 - (performance.now() - start));
    setTimeout(() => {
      loaded = true;
      $('#preloader').classList.add('done');
      document.body.classList.add('loaded');
      onLoaded.splice(0).forEach((fn) => fn());
    }, reduce ? 0 : wait);
  }
  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading);
  setTimeout(finishLoading, 3500); // pengaman jika ada aset lambat
})();
