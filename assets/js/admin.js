/* =====================================================================
   PANEL ADMIN (mockup) — kelola konten website paket Profesional + Admin.
   Data disimpan di localStorage browser. Untuk produksi, ganti fungsi
   CP.getData / CP.saveData / CP.getMessages di data.js dengan panggilan API
   ke backend Anda (mis. Spring Boot / Laravel / Node) dan pindahkan login ke server.
   ===================================================================== */
(function () {
  'use strict';
  const { icon, esc, cssUrl, fmtDate } = CP;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  // Akun demo — HANYA untuk mockup. Login sungguhan wajib diverifikasi di server.
  const DEMO_USER = 'admin';
  const DEMO_PASS = 'admin123';
  const SESSION = 'arunika_admin_session';

  let D = CP.getData(true);
  let msgs = CP.getMessages();
  let memAuth = false;
  const root = $('#root');

  const VIEWS = {
    dashboard: ['Dashboard', 'home'],
    profil: ['Profil Perusahaan', 'building'],
    layanan: ['Layanan', 'layers'],
    event: ['Event', 'calendar'],
    struktur: ['Struktur Organisasi', 'branch'],
    pesan: ['Pesan Masuk', 'inbox']
  };
  const ICON_CHOICES = ['briefcase', 'code', 'cloud', 'shield', 'chart', 'users', 'target', 'award', 'zap', 'heart', 'layers', 'trending', 'building', 'chat'];

  function authed() { try { return sessionStorage.getItem(SESSION) === '1'; } catch (e) { return memAuth; } }
  function setAuth(v) { memAuth = v; try { v ? sessionStorage.setItem(SESSION, '1') : sessionStorage.removeItem(SESSION); } catch (e) { /* abaikan */ } }
  const unread = () => msgs.filter((m) => !m.read).length;

  /* ---------- Login ---------- */
  function renderLogin() {
    root.innerHTML =
      '<div class="login"><div class="login-art"><div class="brand">' + CP.logo(38) + '<span>' + esc(D.company.short) + '<small>Panel Admin</small></span></div>' +
      '<div><h1>Kelola website perusahaan Anda <em>tanpa coding.</em></h1><p>Ubah profil, layanan, event, struktur organisasi, dan baca pesan masuk — semua perubahan langsung tampil di website.</p></div>' +
      '<p style="font-size:.8rem">© ' + new Date().getFullYear() + ' ' + esc(D.company.name) + '</p></div>' +
      '<div class="login-form-wrap"><form class="login-card" id="loginForm"><h2>Masuk ke Panel Admin</h2><p>Silakan masuk untuk mengelola konten website.</p>' +
      '<div class="demo-note">' + icon('lock', 18) + '<span>Akun demo — username: <b>admin</b>, password: <b>admin123</b></span></div>' +
      '<div class="f" style="margin-bottom:14px"><label for="u">Username</label><input id="u" autocomplete="username" required value=""></div>' +
      '<div class="f" style="margin-bottom:20px"><label for="p">Password</label><input id="p" type="password" autocomplete="current-password" required></div>' +
      '<button class="btn btn-primary btn-block" type="submit">Masuk ' + icon('arrow', 16, 2.2) + '</button><div class="err" id="err"></div>' +
      '<p style="margin-top:18px;font-size:.85rem;color:var(--muted)"><a href="../profesional-admin/" style="color:var(--sun2);font-weight:700">← Kembali ke website</a></p></form></div></div>';
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if ($('#u').value.trim() === DEMO_USER && $('#p').value === DEMO_PASS) {
        setAuth(true); renderApp();
      } else {
        $('#err').textContent = 'Username atau password salah.';
        const c = $('.login-card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
      }
    });
  }

  /* ---------- Layout ---------- */
  function renderApp() {
    root.innerHTML =
      '<div class="layout"><aside class="sidebar" id="sidebar"><div class="brand">' + CP.logo(36) + '<span>' + esc(D.company.short) + '<small>Panel Admin</small></span></div>' +
      '<div class="side-label">Menu</div><nav class="side-nav">' +
      Object.keys(VIEWS).map((k) => '<a href="#' + k + '" data-view="' + k + '">' + icon(VIEWS[k][1], 19) + VIEWS[k][0] + (k === 'pesan' ? '<span class="count" id="badge"></span>' : '') + '</a>').join('') +
      '</nav><div class="side-foot"><a href="../profesional-admin/" target="_blank" rel="noopener">' + icon('external', 17) + 'Lihat Website</a>' +
      '<button id="resetBtn">' + icon('refresh', 17) + 'Reset ke data awal</button><button id="logoutBtn">' + icon('logout', 17) + 'Keluar</button></div></aside>' +
      '<div class="main"><header class="topbar"><div style="display:flex;align-items:center;gap:12px"><button class="menu-btn" id="menuBtn" aria-label="Menu">' + icon('menu', 22) + '</button><h1 id="viewTitle"></h1></div>' +
      '<div class="topbar-r"><a class="btn btn-light" href="../profesional-admin/" target="_blank" rel="noopener">' + icon('eye', 16) + '<span>Lihat Website</span></a>' +
      '<div class="user"><div class="av">AD</div><div><strong>Administrator</strong><small>admin</small></div></div></div></header>' +
      '<section class="content" id="content"></section></div></div>' +
      '<div class="modal" id="modal"><div class="modal-bg" data-close></div><div class="modal-box" id="modalBox"></div></div>' +
      '<div class="toast" id="toast"></div>';

    $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    $('#logoutBtn').addEventListener('click', () => { setAuth(false); history.replaceState(null, '', location.pathname); renderLogin(); });
    $('#resetBtn').addEventListener('click', () => confirmBox('Reset semua konten?', 'Seluruh perubahan (profil, layanan, event, struktur, pesan) akan dikembalikan ke data awal.', 'Ya, reset', () => {
      CP.resetData(); D = CP.getData(true); msgs = CP.getMessages(); show(); toast('Data dikembalikan ke kondisi awal.');
    }));
    $('#modal').addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
    updateBadge();
    show();
  }

  function updateBadge() {
    const b = $('#badge');
    if (!b) return;
    const n = unread();
    b.textContent = n;
    b.style.display = n ? '' : 'none';
  }

  function show() {
    const v = location.hash.slice(1);
    const name = VIEWS[v] ? v : 'dashboard';
    $('#viewTitle').textContent = VIEWS[name][0];
    $$('[data-view]').forEach((a) => a.classList.toggle('active', a.dataset.view === name));
    $('#sidebar').classList.remove('open');
    const c = $('#content');
    c.style.animation = 'none'; void c.offsetWidth; c.style.animation = '';
    c.innerHTML = views[name]();
    (binders[name] || function () {})();
    document.title = VIEWS[name][0] + ' — Panel Admin ' + D.company.short;
    window.scrollTo(0, 0);
  }

  function save(msg) {
    if (!CP.saveData(D)) { toast('Gagal menyimpan: penyimpanan browser tidak tersedia.', true); return; }
    toast(msg || 'Tersimpan. Perubahan langsung tampil di website.');
  }
  function saveMsgs() { CP.saveMessages(msgs); updateBadge(); }

  /* ---------- Modal, konfirmasi, toast ---------- */
  function openModal(html, small) {
    const box = $('#modalBox');
    box.className = 'modal-box' + (small ? ' sm' : '');
    box.innerHTML = html;
    $('#modal').classList.add('open');
    const first = $('input, textarea, select', box);
    if (first) setTimeout(() => first.focus(), 50);
  }
  function closeModal() { $('#modal').classList.remove('open'); }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#modal')) closeModal(); });

  function confirmBox(title, text, yes, onYes) {
    openModal('<div class="modal-body" style="padding:28px"><div class="confirm-ic">' + icon('trash', 22) + '</div><h3 style="margin-bottom:6px">' + title + '</h3><p style="color:var(--muted)">' + text + '</p></div>' +
      '<div class="modal-foot"><button class="btn btn-light" data-close>Batal</button><button class="btn btn-danger" id="yesBtn">' + yes + '</button></div>', true);
    $('#yesBtn').addEventListener('click', () => { closeModal(); onYes(); });
  }

  function toast(msg, isErr) {
    const t = $('#toast');
    t.innerHTML = icon(isErr ? 'x' : 'check', 18, 2.4) + '<span>' + msg + '</span>';
    $('.ic', t).style.color = isErr ? '#f87171' : '';
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 3200);
  }

  function field(f, v) {
    const val = v == null ? '' : v;
    const req = f.required ? ' required' : '';
    let input;
    if (f.type === 'textarea') input = '<textarea name="' + f.name + '"' + req + ' rows="' + (f.rows || 4) + '">' + esc(val) + '</textarea>';
    else if (f.type === 'select') input = '<select name="' + f.name + '">' + f.options.map((o) => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
    else input = '<input name="' + f.name + '" type="' + (f.type || 'text') + '" value="' + esc(val) + '"' + req + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '') + (f.list ? ' list="' + f.list + '"' : '') + '>';
    return '<div class="f' + (f.full ? ' full' : '') + '"><label>' + f.label + (f.required ? ' *' : '') + '</label>' + input + (f.hint ? '<small>' + f.hint + '</small>' : '') +
      (f.preview ? '<div class="img-preview" data-preview="' + f.name + '" style="background-image:' + cssUrl(val) + '"></div>' : '') + '</div>';
  }

  function openForm(title, fields, values, onSave, extra) {
    openModal('<div class="modal-head"><h3>' + title + '</h3><button class="icon-btn" data-close aria-label="Tutup">' + icon('x', 18) + '</button></div>' +
      '<form class="modal-body" id="mForm"><div class="form-grid">' + fields.map((f) => field(f, values[f.name])).join('') + '</div>' + (extra || '') + '</form>' +
      '<div class="modal-foot"><button class="btn btn-light" data-close>Batal</button><button class="btn btn-primary" type="submit" form="mForm">' + icon('check', 16, 2.4) + 'Simpan</button></div>');
    const form = $('#mForm');
    $$('[data-preview]', form).forEach((p) => {
      const inp = $('[name="' + p.dataset.preview + '"]', form);
      inp.addEventListener('input', () => { p.style.backgroundImage = cssUrl(inp.value); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vals = Object.fromEntries(new FormData(form).entries());
      Object.keys(vals).forEach((k) => { vals[k] = String(vals[k]).trim(); });
      onSave(vals);
      closeModal();
    });
  }
  const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean);

  /* ---------- Tampilan ---------- */
  const views = {
    dashboard() {
      const { up } = CP.sortEvents(D.events);
      const n = unread();
      return '<div class="welcome"><div><h2>Selamat datang kembali, Admin</h2><p>Kelola konten ' + esc(D.company.name) + ' dari satu tempat.</p></div>' +
        '<a class="btn btn-sun" href="../profesional-admin/" target="_blank" rel="noopener">' + icon('eye', 16) + 'Lihat Website</a></div>' +
        '<div class="grid-stats">' +
        statCard('a', 'layers', D.services.length, 'Layanan aktif') +
        statCard('b', 'calendar', up.length, 'Event akan datang') +
        statCard('c', 'users', D.organization.length, 'Anggota struktur') +
        statCard('d', 'inbox', n, 'Pesan belum dibaca') + '</div>' +
        '<div class="cols-2"><div class="panel"><div class="panel-head"><h3>Pesan terbaru</h3><a href="#pesan" class="btn btn-light">Lihat semua</a></div>' +
        (msgs.length ? msgs.slice(0, 4).map((m) => '<div class="list-row"><div class="av-sm">' + CP.initials(m.name) + '</div><div class="grow"><strong>' + esc(m.name) + (m.read ? '' : ' <span class="badge new">Baru</span>') + '</strong><span class="sub">' + esc(m.message) + '</span></div></div>').join('') : '<div class="empty">Belum ada pesan.</div>') +
        '</div><div class="panel"><div class="panel-head"><h3>Event akan datang</h3><a href="#event" class="btn btn-light">Kelola</a></div>' +
        (up.length ? up.slice(0, 4).map((e) => { const p = CP.dateParts(e.date); return '<div class="list-row"><div class="date-box"><b>' + p.day + '</b><small>' + p.mon + '</small></div><div class="grow"><strong>' + esc(e.title) + '</strong><span class="sub">' + esc(e.location) + ' · ' + esc(e.time) + '</span></div></div>'; }).join('') : '<div class="empty">Tidak ada event terjadwal.</div>') +
        '</div></div>' +
        '<div class="panel" style="margin-top:20px"><div class="panel-body" style="display:flex;gap:14px;align-items:flex-start;color:var(--muted);font-size:.9rem">' + icon('zap', 20) +
        '<span><b style="color:var(--text)">Tips:</b> buka website di tab lain, lalu ubah konten di sini — tampilan website ikut berubah otomatis tanpa perlu dimuat ulang.</span></div></div>';
    },

    profil() {
      const C = D.company;
      const fs = [
        ['Identitas', [
          { name: 'name', label: 'Nama perusahaan', required: true }, { name: 'short', label: 'Nama singkat / brand', required: true },
          { name: 'tagline', label: 'Tagline (judul utama beranda)', required: true, full: true }, { name: 'founded', label: 'Tahun berdiri', type: 'number' }]],
        ['Tentang', [
          { name: 'about', label: 'Deskripsi singkat', type: 'textarea', full: true, rows: 3 },
          { name: 'aboutLong', label: 'Cerita perusahaan', type: 'textarea', full: true, rows: 5 }]],
        ['Visi & Misi', [
          { name: 'vision', label: 'Visi', type: 'textarea', full: true, rows: 3 },
          { name: 'mission', label: 'Misi', type: 'textarea', full: true, rows: 5, hint: 'Satu poin misi per baris.' }]],
        ['Kontak', [
          { name: 'address', label: 'Alamat', full: true }, { name: 'phone', label: 'Telepon' }, { name: 'email', label: 'Email', type: 'email' },
          { name: 'whatsapp', label: 'Nomor WhatsApp', hint: 'Format internasional, mis. 6281234567890' }, { name: 'hours', label: 'Jam operasional' }]],
        ['Gambar', [
          { name: 'heroImage', label: 'Gambar utama beranda (URL)', type: 'url', full: true, preview: true },
          { name: 'aboutImage', label: 'Gambar tentang 1 (URL)', type: 'url', preview: true },
          { name: 'aboutImage2', label: 'Gambar tentang 2 (URL)', type: 'url', preview: true }]]
      ];
      const vals = Object.assign({}, C, { mission: C.mission.join('\n') });
      return '<form class="panel" id="profilForm"><div class="panel-head"><div><h3>Profil Perusahaan</h3><p>Informasi ini tampil di seluruh halaman website.</p></div></div>' +
        '<div class="panel-body"><div class="form-grid">' +
        fs.map(([title, fields]) => '<div class="form-section">' + title + '</div>' + fields.map((f) => field(f, vals[f.name])).join('')).join('') +
        '<div class="form-section">Angka statistik</div>' +
        C.stats.map((s, i) => '<div class="f"><label>Statistik ' + (i + 1) + '</label><div class="stat-edit"><input name="sv' + i + '" type="number" value="' + esc(s.value) + '" aria-label="Angka"><input name="ss' + i + '" value="' + esc(s.suffix) + '" placeholder="+" aria-label="Akhiran"><input name="sl' + i + '" value="' + esc(s.label) + '" aria-label="Label"></div></div>').join('') +
        '</div></div><div class="sticky-save"><button type="button" class="btn btn-light" id="cancelProfil">Batalkan</button><button class="btn btn-primary" type="submit">' + icon('check', 16, 2.4) + 'Simpan Perubahan</button></div></form>';
    },

    layanan() {
      return '<div class="panel"><div class="panel-head"><div><h3>Daftar Layanan</h3><p>' + D.services.length + ' layanan ditampilkan di website.</p></div><button class="btn btn-primary" id="addSvc">' + icon('plus', 16, 2.4) + 'Tambah Layanan</button></div>' +
        (D.services.length ? '<div class="table-wrap"><table><thead><tr><th>#</th><th>Layanan</th><th class="hide-sm">Fitur</th><th></th></tr></thead><tbody>' +
          D.services.map((s, i) => '<tr><td>' + (i + 1) + '</td><td><div class="cell-flex"><div class="ic-cell">' + icon(s.icon, 18) + '</div><div><div class="t-title">' + esc(s.title) + '</div><div class="t-sub">' + esc(s.short) + '</div></div></div></td>' +
            '<td class="hide-sm">' + (s.features || []).length + ' poin</td><td><div class="actions"><button class="icon-btn" data-edit="' + esc(s.id) + '" title="Ubah">' + icon('edit', 16) + '</button><button class="icon-btn del" data-del="' + esc(s.id) + '" title="Hapus">' + icon('trash', 16) + '</button></div></td></tr>').join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada layanan.</div>') + '</div>';
    },

    event() {
      const { up, past } = CP.sortEvents(D.events);
      const all = up.concat(past);
      return '<div class="panel"><div class="panel-head"><div><h3>Daftar Event</h3><p>' + up.length + ' akan datang · ' + past.length + ' selesai</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><label class="search-in">' + icon('search', 16) + '<input id="evQ" placeholder="Cari event…"></label><button class="btn btn-primary" id="addEv">' + icon('plus', 16, 2.4) + 'Tambah Event</button></div></div>' +
        (all.length ? '<div class="table-wrap"><table><thead><tr><th>Event</th><th class="hide-sm">Kategori</th><th>Tanggal</th><th>Status</th><th></th></tr></thead><tbody id="evBody">' +
          all.map((e) => { const isUp = CP.isUpcoming(e.date); return '<tr data-q="' + esc((e.title + ' ' + e.location + ' ' + e.category).toLowerCase()) + '"><td><div class="cell-flex"><div class="thumb" style="background-image:' + cssUrl(e.image) + '"></div><div><div class="t-title">' + esc(e.title) + '</div><div class="t-sub">' + esc(e.location) + '</div></div></div></td>' +
            '<td class="hide-sm">' + esc(e.category) + '</td><td style="white-space:nowrap">' + fmtDate(e.date, { day: 'numeric', month: 'short', year: 'numeric' }) + '</td><td><span class="badge ' + (isUp ? 'up' : 'past') + '">' + (isUp ? 'Akan datang' : 'Selesai') + '</span></td>' +
            '<td><div class="actions"><button class="icon-btn" data-edit="' + esc(e.id) + '" title="Ubah">' + icon('edit', 16) + '</button><button class="icon-btn del" data-del="' + esc(e.id) + '" title="Hapus">' + icon('trash', 16) + '</button></div></td></tr>'; }).join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada event.</div>') + '</div>';
    },

    struktur() {
      const byId = Object.fromEntries(D.organization.map((o) => [o.id, o]));
      const mini = (nodes) => '<ul>' + nodes.map((n) => '<li><div class="mt-node"><div class="av-sm">' + CP.initials(n.name) + '</div><div><strong>' + esc(n.name) + '</strong><br><span>' + esc(n.position) + '</span></div></div>' + (n.children.length ? mini(n.children) : '') + '</li>').join('') + '</ul>';
      return '<div class="cols-2" style="grid-template-columns:1.4fr 1fr;align-items:start"><div class="panel"><div class="panel-head"><div><h3>Anggota Struktur</h3><p>Atur jabatan dan atasan langsung.</p></div><button class="btn btn-primary" id="addOrg">' + icon('plus', 16, 2.4) + 'Tambah Anggota</button></div>' +
        (D.organization.length ? '<div class="table-wrap"><table><thead><tr><th>Nama</th><th>Jabatan</th><th class="hide-sm">Atasan</th><th></th></tr></thead><tbody>' +
          D.organization.map((o) => '<tr><td><div class="cell-flex"><div class="av-sm">' + CP.initials(o.name) + '</div><span class="t-title">' + esc(o.name) + '</span></div></td><td>' + esc(o.position) + '</td>' +
            '<td class="hide-sm t-sub">' + (byId[o.parent] ? esc(byId[o.parent].position) : '— Puncak —') + '</td>' +
            '<td><div class="actions"><button class="icon-btn" data-edit="' + esc(o.id) + '" title="Ubah">' + icon('edit', 16) + '</button><button class="icon-btn del" data-del="' + esc(o.id) + '" title="Hapus">' + icon('trash', 16) + '</button></div></td></tr>').join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada anggota.</div>') + '</div>' +
        '<div class="panel"><div class="panel-head"><div><h3>Pratinjau Bagan</h3><p>Hierarki seperti tampil di website.</p></div></div><div class="mini-tree">' + mini(CP.buildTree(D.organization)) + '</div></div></div>';
    },

    pesan() {
      const n = unread();
      return '<div class="panel"><div class="panel-head"><div><h3>Pesan Masuk</h3><p>' + msgs.length + ' pesan · ' + n + ' belum dibaca. Pesan berasal dari formulir kontak website.</p></div>' +
        (n ? '<button class="btn btn-light" id="readAll">' + icon('check', 16, 2.4) + 'Tandai semua dibaca</button>' : '') + '</div>' +
        (msgs.length ? msgs.map((m) => '<div class="msg' + (m.read ? '' : ' unread') + '" data-id="' + esc(m.id) + '"><div class="msg-top"><span class="m-name">' + esc(m.name) + '</span><span class="m-meta">' +
          new Date(m.date).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</span></div>' +
          '<div class="m-meta">' + esc(m.company || '-') + ' · ' + esc(m.service || '-') + '</div><div class="m-preview">' + esc(m.message) + '</div>' +
          '<div class="m-detail"><dl><dt>Email</dt><dd>' + esc(m.email) + '</dd><dt>Perusahaan</dt><dd>' + esc(m.company || '-') + '</dd><dt>Layanan</dt><dd>' + esc(m.service || '-') + '</dd></dl>' +
          '<div style="display:flex;gap:8px"><a class="btn btn-primary" href="mailto:' + esc(m.email) + '?subject=' + encodeURIComponent('Re: Pertanyaan ' + (m.service || '')) + '">' + icon('mail', 16) + 'Balas via Email</a>' +
          '<button class="btn btn-light" data-del="' + esc(m.id) + '">' + icon('trash', 16) + 'Hapus</button></div></div></div>').join('') : '<div class="empty">Belum ada pesan masuk.</div>') + '</div>';
    }
  };

  function statCard(c, ic, n, label) {
    return '<div class="stat-card"><div class="si ' + c + '">' + icon(ic, 22) + '</div><div><strong>' + n + '</strong><span>' + label + '</span></div></div>';
  }

  /* ---------- Aksi tiap tampilan ---------- */
  function crud(listKey, prefix, formTitle, fields, toItem) {
    const list = () => D[listKey];
    const content = $('#content');
    const edit = (id) => {
      const item = list().find((x) => x.id === id);
      const values = item ? toItem.toForm(item) : toItem.empty();
      openForm((item ? 'Ubah ' : 'Tambah ') + formTitle, typeof fields === 'function' ? fields(item) : fields, values, (vals) => {
        const data = toItem.fromForm(vals, item);
        if (item) Object.assign(item, data);
        else list().push(Object.assign({ id: CP.uid(prefix) }, data));
        save(); show();
      });
    };
    content.addEventListener('click', (e) => {
      const ed = e.target.closest('[data-edit]');
      const del = e.target.closest('[data-del]');
      if (ed) edit(ed.dataset.edit);
      if (del) {
        const item = list().find((x) => x.id === del.dataset.del);
        confirmBox('Hapus ' + formTitle.toLowerCase() + '?', '“' + esc(item.title || item.name) + '” akan dihapus dari website.', 'Hapus', () => {
          if (toItem.onDelete) toItem.onDelete(item);
          D[listKey] = list().filter((x) => x.id !== item.id);
          save('Data dihapus.'); show();
        });
      }
    });
    return edit;
  }

  const binders = {
    profil() {
      const form = $('#profilForm');
      $$('[data-preview]', form).forEach((p) => {
        const inp = $('[name="' + p.dataset.preview + '"]', form);
        inp.addEventListener('input', () => { p.style.backgroundImage = cssUrl(inp.value); });
      });
      $('#cancelProfil').addEventListener('click', show);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = Object.fromEntries(new FormData(form).entries());
        const C = D.company;
        ['name', 'short', 'tagline', 'about', 'aboutLong', 'vision', 'address', 'phone', 'email', 'whatsapp', 'hours', 'heroImage', 'aboutImage', 'aboutImage2'].forEach((k) => { C[k] = String(v[k] || '').trim(); });
        C.founded = parseInt(v.founded, 10) || C.founded;
        C.mission = lines(v.mission);
        C.stats = C.stats.map((s, i) => ({ value: parseInt(v['sv' + i], 10) || 0, suffix: v['ss' + i] || '', label: v['sl' + i] || s.label }));
        save('Profil perusahaan tersimpan.');
      });
    },

    layanan() {
      const edit = crud('services', 's', 'Layanan', [
        { name: 'title', label: 'Nama layanan', required: true },
        { name: 'icon', label: 'Ikon', type: 'select', options: ICON_CHOICES.map((i) => [i, i]) },
        { name: 'short', label: 'Deskripsi singkat', full: true, hint: 'Tampil di kartu beranda.' },
        { name: 'desc', label: 'Deskripsi lengkap', type: 'textarea', full: true, rows: 3 },
        { name: 'features', label: 'Daftar fitur', type: 'textarea', full: true, rows: 4, hint: 'Satu fitur per baris.' }
      ], {
        empty: () => ({ icon: 'briefcase' }),
        toForm: (s) => Object.assign({}, s, { features: (s.features || []).join('\n') }),
        fromForm: (v) => ({ title: v.title, icon: v.icon, short: v.short, desc: v.desc, features: lines(v.features) })
      });
      $('#addSvc').addEventListener('click', () => edit(null));
    },

    event() {
      const cats = Array.from(new Set(D.events.map((e) => e.category)));
      const extra = '<datalist id="catList">' + cats.map((c) => '<option value="' + esc(c) + '">').join('') + '</datalist>';
      const edit = crud('events', 'e', 'Event', [
        { name: 'title', label: 'Judul event', required: true, full: true },
        { name: 'category', label: 'Kategori', list: 'catList', placeholder: 'Workshop, Webinar, …' },
        { name: 'date', label: 'Tanggal', type: 'date', required: true },
        { name: 'time', label: 'Waktu', placeholder: '09.00 – 12.00 WIB' },
        { name: 'location', label: 'Lokasi', placeholder: 'Kota / Daring' },
        { name: 'image', label: 'URL gambar', type: 'url', full: true, preview: true },
        { name: 'desc', label: 'Deskripsi', type: 'textarea', full: true, rows: 4 }
      ], {
        empty: () => ({}),
        toForm: (e) => Object.assign({}, e),
        fromForm: (v) => ({ title: v.title, category: v.category || 'Umum', date: v.date, time: v.time, location: v.location, image: v.image, desc: v.desc })
      });
      // datalist kategori disisipkan ke modal saat dibuka
      const origAdd = () => { edit(null); $('#mForm').insertAdjacentHTML('beforeend', extra); };
      $('#addEv').addEventListener('click', origAdd);
      $('#content').addEventListener('click', (e) => { if (e.target.closest('[data-edit]') && $('#mForm') && !$('#catList')) $('#mForm').insertAdjacentHTML('beforeend', extra); });
      const q = $('#evQ');
      if (q) q.addEventListener('input', () => {
        const s = q.value.trim().toLowerCase();
        $$('#evBody tr').forEach((tr) => { tr.style.display = !s || tr.dataset.q.includes(s) ? '' : 'none'; });
      });
    },

    struktur() {
      const descendants = (id) => {
        const out = new Set([id]);
        let grew = true;
        while (grew) { grew = false; D.organization.forEach((o) => { if (out.has(o.parent) && !out.has(o.id)) { out.add(o.id); grew = true; } }); }
        return out;
      };
      const edit = crud('organization', 'o', 'Anggota', (item) => {
        const blocked = item ? descendants(item.id) : new Set();
        return [
          { name: 'name', label: 'Nama lengkap', required: true, full: true },
          { name: 'position', label: 'Jabatan', required: true },
          { name: 'parent', label: 'Atasan langsung', type: 'select', options: [['', '— Tidak ada (posisi puncak) —']].concat(D.organization.filter((o) => !blocked.has(o.id)).map((o) => [o.id, o.position + ' — ' + o.name])) }
        ];
      }, {
        empty: () => ({ parent: (D.organization[0] || {}).id || '' }),
        toForm: (o) => Object.assign({}, o),
        fromForm: (v) => ({ name: v.name, position: v.position, parent: v.parent }),
        onDelete: (item) => { D.organization.forEach((o) => { if (o.parent === item.id) o.parent = item.parent || ''; }); }
      });
      $('#addOrg').addEventListener('click', () => edit(null));
    },

    pesan() {
      const content = $('#content');
      const ra = $('#readAll');
      if (ra) ra.addEventListener('click', () => { msgs.forEach((m) => { m.read = true; }); saveMsgs(); show(); });
      content.addEventListener('click', (e) => {
        const del = e.target.closest('[data-del]');
        if (del) {
          e.stopPropagation();
          confirmBox('Hapus pesan?', 'Pesan ini akan dihapus permanen.', 'Hapus', () => { msgs = msgs.filter((m) => m.id !== del.dataset.del); saveMsgs(); show(); toast('Pesan dihapus.'); });
          return;
        }
        if (e.target.closest('a')) return;
        const box = e.target.closest('.msg');
        if (!box) return;
        box.classList.toggle('open');
        const m = msgs.find((x) => x.id === box.dataset.id);
        if (m && !m.read) { m.read = true; box.classList.remove('unread'); saveMsgs(); }
      });
    }
  };

  // Sinkron jika ada pesan baru dari website di tab lain
  window.addEventListener('storage', (e) => {
    if (!authed() || !$('#content')) return;
    if (e.key === 'arunika_cp_messages_v1') { msgs = CP.getMessages(); updateBadge(); if (location.hash === '#pesan' || location.hash === '#dashboard' || !location.hash) show(); toast('Ada pesan baru masuk.'); }
  });

  window.addEventListener('hashchange', () => { if (authed() && $('#content')) show(); });
  authed() ? renderApp() : renderLogin();
})();
