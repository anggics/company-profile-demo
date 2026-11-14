/* =====================================================================
   PANEL ADMIN (DEMO) — PT Perisai Prima Nusantara
   Hak akses (RBAC):
     • Admin  : semua menu (konten, struktur, profil, pesan, pengguna) + menerbitkan berita
     • Editor : produk, event, berita (berita baru tersimpan sebagai draf)
   Mockup menyimpan data di localStorage. Untuk produksi, pindahkan login,
   pengecekan role, dan penyimpanan ke backend (API + database).
   ===================================================================== */
(function () {
  'use strict';
  const { icon, esc, cssUrl, fmtDate } = CP;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const SESSION = 'demo_admin_session';

  let D = CP.getData(true);
  let msgs = CP.getMessages();
  let users = CP.getUsers();
  let me = null;
  let memSession = '';
  const root = $('#root');

  const ROLE_LABEL = { admin: 'Admin', editor: 'Editor' };
  // [judul, ikon, grup, role yang boleh]
  const VIEWS = {
    dashboard: ['Dashboard', 'home', '', ['admin', 'editor']],
    produk: ['Produk', 'package', 'Konten', ['admin', 'editor']],
    event: ['Event', 'calendar', 'Konten', ['admin', 'editor']],
    berita: ['Berita', 'news', 'Konten', ['admin', 'editor']],
    struktur: ['Struktur Organisasi', 'branch', 'Konten', ['admin']],
    profil: ['Profil Perusahaan', 'building', 'Perusahaan', ['admin']],
    pesan: ['Pesan Masuk', 'inbox', 'Perusahaan', ['admin']],
    pengguna: ['Pengguna & Hak Akses', 'usercheck', 'Pengaturan', ['admin']]
  };
  const ICON_CHOICES = ['flame', 'bell', 'droplet', 'shield', 'clipboard', 'camera', 'wrench', 'package', 'zap', 'building', 'users', 'award'];
  const can = (view) => !!me && VIEWS[view][3].indexOf(me.role) > -1;
  const isAdmin = () => me && me.role === 'admin';

  function getSession() { try { return sessionStorage.getItem(SESSION) || ''; } catch (e) { return memSession; } }
  function setSession(id) { memSession = id; try { id ? sessionStorage.setItem(SESSION, id) : sessionStorage.removeItem(SESSION); } catch (e) { /* abaikan */ } }
  const unread = () => msgs.filter((m) => !m.read).length;

  /* ---------- Login ---------- */
  function renderLogin() {
    root.innerHTML =
      '<div class="login"><div class="login-art"><div class="brand">' + CP.logo(38) + '<span>' + esc(D.company.short) + '<small>Panel Admin</small></span></div>' +
      '<div><h1>Kelola website perusahaan <em>secara mandiri.</em></h1><p>Perbarui produk, event, berita, dan struktur organisasi tanpa menunggu developer. Akses dibedakan untuk Admin dan Editor.</p></div>' +
      '<p style="font-size:.8rem">© ' + new Date().getFullYear() + ' ' + esc(D.company.name) + '</p></div>' +
      '<div class="login-form-wrap"><form class="login-card" id="loginForm"><h2>Masuk ke Panel Admin</h2><p>Gunakan akun demo di bawah untuk mencoba.</p>' +
      '<div class="demo-accounts">' +
      '<button type="button" class="demo-acc" data-u="admin" data-p="admin123"><span class="badge admin">Admin</span><span><b>admin</b> / admin123</span><small>Akses penuh</small></button>' +
      '<button type="button" class="demo-acc" data-u="editor" data-p="editor123"><span class="badge editor">Editor</span><span><b>editor</b> / editor123</span><small>Produk, event, berita</small></button></div>' +
      '<div class="f" style="margin-bottom:14px"><label for="u">Username</label><input id="u" autocomplete="username" required></div>' +
      '<div class="f" style="margin-bottom:20px"><label for="p">Password</label><input id="p" type="password" autocomplete="current-password" required></div>' +
      '<button class="btn btn-primary btn-block" type="submit">Masuk ' + icon('arrow', 16, 2.2) + '</button><div class="err" id="err"></div>' +
      '<p style="margin-top:18px;font-size:.85rem;color:var(--muted)"><a href="../profesional-admin/" style="color:var(--sun2);font-weight:700">← Kembali ke website</a></p></form></div></div>';
    $$('.demo-acc').forEach((b) => b.addEventListener('click', () => { $('#u').value = b.dataset.u; $('#p').value = b.dataset.p; $('#p').focus(); }));
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      users = CP.getUsers();
      const u = users.find((x) => x.username === $('#u').value.trim() && x.password === $('#p').value);
      if (u) { me = u; setSession(u.id); history.replaceState(null, '', location.pathname + '#dashboard'); renderApp(); }
      else {
        $('#err').textContent = 'Username atau password salah.';
        const c = $('.login-card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
      }
    });
  }

  /* ---------- Layout ---------- */
  function renderApp() {
    let group = null;
    const nav = Object.keys(VIEWS).map((k) => {
      const v = VIEWS[k];
      let head = '';
      if (v[2] !== group) { group = v[2]; if (group) head = '<div class="side-label">' + group + '</div>'; }
      const locked = !can(k);
      return head + '<a href="#' + k + '" data-view="' + k + '"' + (locked ? ' class="locked" title="Khusus Admin"' : '') + '>' + icon(v[1], 19) + v[0] +
        (locked ? '<span class="lock">' + icon('lock', 14) + '</span>' : (k === 'pesan' ? '<span class="count" id="badge"></span>' : '')) + '</a>';
    }).join('');
    root.innerHTML =
      '<div class="layout"><aside class="sidebar" id="sidebar"><div class="brand">' + CP.logo(36) + '<span>' + esc(D.company.short) + '<small>Panel Admin</small></span></div>' +
      '<nav class="side-nav">' + nav + '</nav>' +
      '<div class="side-foot"><a href="../profesional-admin/" target="_blank" rel="noopener">' + icon('external', 17) + 'Lihat Website</a>' +
      (isAdmin() ? '<button id="resetBtn">' + icon('refresh', 17) + 'Reset data demo</button>' : '') +
      '<button id="logoutBtn">' + icon('logout', 17) + 'Keluar</button></div></aside>' +
      '<div class="main"><header class="topbar"><div style="display:flex;align-items:center;gap:12px"><button class="menu-btn" id="menuBtn" aria-label="Menu">' + icon('menu', 22) + '</button><h1 id="viewTitle"></h1></div>' +
      '<div class="topbar-r"><a class="btn btn-light" href="../profesional-admin/" target="_blank" rel="noopener">' + icon('eye', 16) + '<span>Lihat Website</span></a>' +
      '<div class="user"><div class="av">' + CP.initials(me.name) + '</div><div><strong>' + esc(me.name) + '</strong><small><span class="badge ' + me.role + '">' + ROLE_LABEL[me.role] + '</span></small></div></div></div></header>' +
      '<section class="content" id="content"></section></div></div>' +
      '<div class="modal" id="modal"><div class="modal-bg" data-close></div><div class="modal-box" id="modalBox"></div></div>' +
      '<div class="toast" id="toast"></div>';

    $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    $('#logoutBtn').addEventListener('click', () => { setSession(''); me = null; history.replaceState(null, '', location.pathname); renderLogin(); });
    if ($('#resetBtn')) $('#resetBtn').addEventListener('click', () => confirmBox('Reset data demo?', 'Seluruh perubahan konten, pesan, pengguna, dan log aktivitas dikembalikan ke kondisi awal.', 'Ya, reset', () => {
      CP.resetData(); D = CP.getData(true); msgs = CP.getMessages(); users = CP.getUsers(); me = users.find((u) => u.role === 'admin'); setSession(me.id); renderApp(); toast('Data demo dikembalikan ke kondisi awal.');
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
    const fresh = c.cloneNode(false); // buang listener lama
    c.parentNode.replaceChild(fresh, c);
    fresh.innerHTML = can(name) ? views[name]() : denied(name);
    if (can(name)) (binders[name] || function () {})();
    document.title = VIEWS[name][0] + ' — Panel Admin ' + D.company.short;
    window.scrollTo(0, 0);
  }

  function denied(name) {
    return '<div class="panel denied"><div class="confirm-ic" style="background:#fff7e6;color:var(--sun2)">' + icon('lock', 24) + '</div><h3>Akses dibatasi</h3>' +
      '<p>Menu <b>' + VIEWS[name][0] + '</b> hanya dapat diakses oleh <span class="badge admin">Admin</span>. Anda masuk sebagai <span class="badge editor">Editor</span>.</p>' +
      '<a href="#dashboard" class="btn btn-primary" style="margin-top:18px">Kembali ke Dashboard</a></div>';
  }

  function save(msg, logText) {
    if (!CP.saveData(D)) { toast('Gagal menyimpan: penyimpanan browser tidak tersedia.', true); return; }
    if (logText) CP.addLog(me, logText);
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
  function closeModal() { const m = $('#modal'); if (m) m.classList.remove('open'); }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function confirmBox(title, text, yes, onYes) {
    openModal('<div class="modal-body" style="padding:28px"><div class="confirm-ic">' + icon('trash', 22) + '</div><h3 style="margin-bottom:6px">' + title + '</h3><p style="color:var(--muted)">' + text + '</p></div>' +
      '<div class="modal-foot"><button class="btn btn-light" data-close>Batal</button><button class="btn btn-danger" id="yesBtn">' + yes + '</button></div>', true);
    $('#yesBtn').addEventListener('click', () => { closeModal(); onYes(); });
  }

  function toast(msg, isErr) {
    const t = $('#toast');
    if (!t) return;
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
      (f.preview ? '<div class="img-preview" data-preview="' + f.name + '" style="background-image:' + cssUrl(val) + (val ? '' : ';display:none') + '"></div>' : '') + '</div>';
  }
  const datalist = (id, items) => '<datalist id="' + id + '">' + Array.from(new Set(items)).map((c) => '<option value="' + esc(c) + '">').join('') + '</datalist>';

  function openForm(title, fields, values, onSave, extra) {
    openModal('<div class="modal-head"><h3>' + title + '</h3><button class="icon-btn" data-close aria-label="Tutup">' + icon('x', 18) + '</button></div>' +
      '<form class="modal-body" id="mForm"><div class="form-grid">' + fields.map((f) => field(f, values[f.name])).join('') + '</div>' + (extra || '') + '</form>' +
      '<div class="modal-foot"><button class="btn btn-light" data-close>Batal</button><button class="btn btn-primary" type="submit" form="mForm">' + icon('check', 16, 2.4) + 'Simpan</button></div>');
    const form = $('#mForm');
    bindPreviews(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vals = Object.fromEntries(new FormData(form).entries());
      Object.keys(vals).forEach((k) => { vals[k] = String(vals[k]).trim(); });
      if (onSave(vals) !== false) closeModal();
    });
  }
  function bindPreviews(form) {
    $$('[data-preview]', form).forEach((p) => {
      const inp = $('[name="' + p.dataset.preview + '"]', form);
      inp.addEventListener('input', () => { p.style.backgroundImage = cssUrl(inp.value); p.style.display = inp.value ? '' : 'none'; });
    });
  }
  const localDate = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const paras = (s) => String(s || '').split(/\n\s*\n/).map((x) => x.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
  const head = (title, sub, actions) => '<div class="panel-head"><div><h3>' + title + '</h3><p>' + sub + '</p></div>' + (actions ? '<div style="display:flex;gap:10px;flex-wrap:wrap">' + actions + '</div>' : '') + '</div>';
  const searchBox = (id, ph) => '<label class="search-in">' + icon('search', 16) + '<input id="' + id + '" placeholder="' + ph + '"></label>';
  const actions = (id) => '<div class="actions"><button class="icon-btn" data-edit="' + esc(id) + '" title="Ubah">' + icon('edit', 16) + '</button><button class="icon-btn del" data-del="' + esc(id) + '" title="Hapus">' + icon('trash', 16) + '</button></div>';
  const fmtTime = (iso) => new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  /* ---------- Tampilan ---------- */
  const views = {
    dashboard() {
      const { up } = CP.sortEvents(D.events);
      const pub = D.news.filter((n) => n.status !== 'draft').length;
      const drafts = D.news.filter((n) => n.status === 'draft');
      const log = CP.getLog().slice(0, 6);
      return '<div class="welcome"><div><h2>Halo, ' + esc(me.name) + '</h2><p>Anda masuk sebagai <b style="color:#fff">' + ROLE_LABEL[me.role] + '</b>. ' +
        (isAdmin() ? 'Anda memiliki akses penuh ke seluruh menu.' : 'Anda dapat mengelola produk, event, dan berita.') + '</p></div>' +
        '<a class="btn btn-sun" href="../profesional-admin/" target="_blank" rel="noopener">' + icon('eye', 16) + 'Lihat Website</a></div>' +
        '<div class="grid-stats">' +
        statCard('a', 'package', D.products.length, 'Produk', '#produk') +
        statCard('b', 'calendar', up.length, 'Event akan datang', '#event') +
        statCard('c', 'news', pub, 'Berita terbit · ' + drafts.length + ' draf', '#berita') +
        (isAdmin() ? statCard('d', 'inbox', unread(), 'Pesan belum dibaca', '#pesan') : statCard('d', 'branch', D.organization.length, 'Anggota struktur', '')) + '</div>' +
        (isAdmin() && drafts.length ? '<div class="notice">' + icon('news', 18) + '<span><b>' + drafts.length + ' berita draf</b> menunggu untuk diterbitkan.</span><a href="#berita" class="btn btn-light">Tinjau</a></div>' : '') +
        '<div class="cols-2"><div class="panel">' + head('Aktivitas terbaru', 'Log perubahan konten oleh pengguna panel.') +
        (log.length ? log.map((l) => '<div class="list-row"><div class="av-sm">' + CP.initials(l.user) + '</div><div class="grow"><strong>' + esc(l.user) + ' <span class="badge ' + l.role + '">' + ROLE_LABEL[l.role] + '</span></strong><span class="sub">' + esc(l.text) + '</span></div><span class="m-meta hide-sm">' + fmtTime(l.at) + '</span></div>').join('') : '<div class="empty">Belum ada aktivitas.</div>') +
        '</div><div class="panel">' + head('Event akan datang', 'Agenda yang tampil di website.', '<a href="#event" class="btn btn-light">Kelola</a>') +
        (up.length ? up.slice(0, 4).map((e) => { const p = CP.dateParts(e.date); return '<div class="list-row"><div class="date-box"><b>' + p.day + '</b><small>' + p.mon + '</small></div><div class="grow"><strong>' + esc(e.title) + '</strong><span class="sub">' + esc(e.location) + ' · ' + esc(e.time) + '</span></div></div>'; }).join('') : '<div class="empty">Tidak ada event terjadwal.</div>') +
        '</div></div>' +
        '<div class="panel" style="margin-top:20px">' + head('Hak akses pengguna', 'Pembagian akses Admin dan Editor (RBAC).') +
        '<div class="table-wrap"><table class="rbac"><thead><tr><th>Menu</th><th>Admin</th><th>Editor</th></tr></thead><tbody>' +
        Object.keys(VIEWS).filter((k) => k !== 'dashboard').map((k) => '<tr><td>' + icon(VIEWS[k][1], 16) + ' ' + VIEWS[k][0] + '</td><td>' + yes(VIEWS[k][3].indexOf('admin') > -1) + '</td><td>' + yes(VIEWS[k][3].indexOf('editor') > -1) + '</td></tr>').join('') +
        '<tr><td>' + icon('check', 16) + ' Menerbitkan berita</td><td>' + yes(true) + '</td><td>' + yes(false) + ' <small style="color:var(--muted)">(simpan sebagai draf)</small></td></tr>' +
        '</tbody></table></div></div>';
    },

    produk() {
      return '<div class="panel">' + head('Daftar Produk', D.products.length + ' produk tampil di website.', searchBox('q', 'Cari produk…') + '<button class="btn btn-primary" id="addBtn">' + icon('plus', 16, 2.4) + 'Tambah Produk</button>') +
        (D.products.length ? '<div class="table-wrap"><table><thead><tr><th>Produk</th><th class="hide-sm">Kategori</th><th class="hide-sm">Spesifikasi</th><th></th></tr></thead><tbody id="rows">' +
          D.products.map((p) => '<tr data-q="' + esc((p.name + ' ' + p.category).toLowerCase()) + '"><td><div class="cell-flex">' + (p.image ? '<div class="thumb" style="background-image:' + cssUrl(p.image) + '"></div>' : '<div class="ic-cell">' + icon(p.icon, 18) + '</div>') +
            '<div><div class="t-title">' + esc(p.name) + '</div><div class="t-sub">' + esc(p.short) + '</div></div></div></td>' +
            '<td class="hide-sm">' + esc(p.category) + '</td><td class="hide-sm">' + (p.specs || []).length + ' baris</td><td>' + actions(p.id) + '</td></tr>').join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada produk.</div>') + '</div>';
    },

    event() {
      const { up, past } = CP.sortEvents(D.events);
      const all = up.concat(past);
      return '<div class="panel">' + head('Daftar Event', up.length + ' akan datang · ' + past.length + ' selesai', searchBox('q', 'Cari event…') + '<button class="btn btn-primary" id="addBtn">' + icon('plus', 16, 2.4) + 'Tambah Event</button>') +
        (all.length ? '<div class="table-wrap"><table><thead><tr><th>Event</th><th class="hide-sm">Kategori</th><th>Tanggal</th><th>Status</th><th></th></tr></thead><tbody id="rows">' +
          all.map((e) => { const isUp = CP.isUpcoming(e.date); return '<tr data-q="' + esc((e.title + ' ' + e.location + ' ' + e.category).toLowerCase()) + '"><td><div class="cell-flex"><div class="thumb" style="background-image:' + cssUrl(e.image) + '"></div><div><div class="t-title">' + esc(e.title) + '</div><div class="t-sub">' + esc(e.location) + '</div></div></div></td>' +
            '<td class="hide-sm">' + esc(e.category) + '</td><td style="white-space:nowrap">' + fmtDate(e.date, { day: 'numeric', month: 'short', year: 'numeric' }) + '</td><td><span class="badge ' + (isUp ? 'up' : 'past') + '">' + (isUp ? 'Akan datang' : 'Selesai') + '</span></td><td>' + actions(e.id) + '</td></tr>'; }).join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada event.</div>') + '</div>';
    },

    berita() {
      const list = D.news.slice().sort((a, b) => b.date.localeCompare(a.date));
      const drafts = list.filter((n) => n.status === 'draft').length;
      return '<div class="panel">' + head('Daftar Berita', (list.length - drafts) + ' terbit · ' + drafts + ' draf' + (isAdmin() ? '' : ' — berita yang Anda buat tersimpan sebagai draf dan diterbitkan oleh Admin.'), searchBox('q', 'Cari berita…') + '<button class="btn btn-primary" id="addBtn">' + icon('plus', 16, 2.4) + 'Tulis Berita</button>') +
        (list.length ? '<div class="table-wrap"><table><thead><tr><th>Berita</th><th class="hide-sm">Penulis</th><th>Tanggal</th><th>Status</th><th></th></tr></thead><tbody id="rows">' +
          list.map((n) => '<tr data-q="' + esc((n.title + ' ' + n.category + ' ' + n.author).toLowerCase()) + '"><td><div class="cell-flex"><div class="thumb" style="background-image:' + cssUrl(n.image) + '"></div><div><div class="t-title">' + esc(n.title) + '</div><div class="t-sub">' + esc(n.category) + '</div></div></div></td>' +
            '<td class="hide-sm">' + esc(n.author) + '</td><td style="white-space:nowrap">' + fmtDate(n.date, { day: 'numeric', month: 'short', year: 'numeric' }) + '</td>' +
            '<td>' + (n.status === 'draft' ? '<span class="badge draft">Draf</span>' + (isAdmin() ? ' <button class="btn btn-sun btn-xs" data-publish="' + esc(n.id) + '">Terbitkan</button>' : '') : '<span class="badge up">Terbit</span>') + '</td><td>' + actions(n.id) + '</td></tr>').join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada berita.</div>') + '</div>';
    },

    struktur() {
      const byId = Object.fromEntries(D.organization.map((o) => [o.id, o]));
      const mini = (nodes) => '<ul>' + nodes.map((n) => '<li><div class="mt-node"><div class="av-sm">' + CP.initials(n.name) + '</div><div><strong>' + esc(n.name) + '</strong><br><span>' + esc(n.position) + '</span></div></div>' + (n.children.length ? mini(n.children) : '') + '</li>').join('') + '</ul>';
      return '<div class="cols-2" style="grid-template-columns:1.4fr 1fr;align-items:start"><div class="panel">' + head('Anggota Struktur', 'Atur jabatan dan atasan langsung.', '<button class="btn btn-primary" id="addBtn">' + icon('plus', 16, 2.4) + 'Tambah Anggota</button>') +
        (D.organization.length ? '<div class="table-wrap"><table><thead><tr><th>Nama</th><th>Jabatan</th><th class="hide-sm">Atasan</th><th></th></tr></thead><tbody>' +
          D.organization.map((o) => '<tr><td><div class="cell-flex"><div class="av-sm">' + CP.initials(o.name) + '</div><span class="t-title">' + esc(o.name) + '</span></div></td><td>' + esc(o.position) + '</td>' +
            '<td class="hide-sm t-sub">' + (byId[o.parent] ? esc(byId[o.parent].position) : '— Puncak —') + '</td><td>' + actions(o.id) + '</td></tr>').join('') +
          '</tbody></table></div>' : '<div class="empty">Belum ada anggota.</div>') + '</div>' +
        '<div class="panel">' + head('Pratinjau Bagan', 'Hierarki seperti tampil di website.') + '<div class="mini-tree">' + mini(CP.buildTree(D.organization)) + '</div></div></div>';
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
        ['Kontak & Peta', [
          { name: 'address', label: 'Alamat', full: true }, { name: 'mapQuery', label: 'Lokasi peta', hint: 'Nama tempat/alamat untuk Google Maps.' },
          { name: 'phone', label: 'Telepon' }, { name: 'email', label: 'Email', type: 'email' },
          { name: 'whatsapp', label: 'Nomor WhatsApp', hint: 'Format internasional, mis. 6281234567890' }, { name: 'hours', label: 'Jam operasional', full: true }]],
        ['Gambar', [
          { name: 'heroImage', label: 'Gambar utama beranda (URL)', type: 'url', full: true, preview: true },
          { name: 'aboutImage', label: 'Gambar tentang 1 (URL)', type: 'url', preview: true },
          { name: 'aboutImage2', label: 'Gambar tentang 2 (URL)', type: 'url', preview: true }]]
      ];
      const vals = Object.assign({}, C, { mission: C.mission.join('\n') });
      return '<form class="panel" id="profilForm">' + head('Profil Perusahaan', 'Informasi ini tampil di seluruh halaman website.') +
        '<div class="panel-body"><div class="form-grid">' +
        fs.map(([title, fields]) => '<div class="form-section">' + title + '</div>' + fields.map((f) => field(f, vals[f.name])).join('')).join('') +
        '<div class="form-section">Angka statistik</div>' +
        C.stats.map((s, i) => '<div class="f"><label>Statistik ' + (i + 1) + '</label><div class="stat-edit"><input name="sv' + i + '" type="number" value="' + esc(s.value) + '" aria-label="Angka"><input name="ss' + i + '" value="' + esc(s.suffix) + '" placeholder="+" aria-label="Akhiran"><input name="sl' + i + '" value="' + esc(s.label) + '" aria-label="Label"></div></div>').join('') +
        '</div></div><div class="sticky-save"><button type="button" class="btn btn-light" id="cancelProfil">Batalkan</button><button class="btn btn-primary" type="submit">' + icon('check', 16, 2.4) + 'Simpan Perubahan</button></div></form>';
    },

    pesan() {
      const n = unread();
      return '<div class="panel">' + head('Pesan Masuk', msgs.length + ' pesan · ' + n + ' belum dibaca. Pesan berasal dari formulir kontak website.', n ? '<button class="btn btn-light" id="readAll">' + icon('check', 16, 2.4) + 'Tandai semua dibaca</button>' : '') +
        (msgs.length ? msgs.map((m) => '<div class="msg' + (m.read ? '' : ' unread') + '" data-id="' + esc(m.id) + '"><div class="msg-top"><span class="m-name">' + esc(m.name) + '</span><span class="m-meta">' + fmtTime(m.date) + '</span></div>' +
          '<div class="m-meta">' + esc(m.company || '-') + ' · ' + esc(m.topic || '-') + '</div><div class="m-preview">' + esc(m.message) + '</div>' +
          '<div class="m-detail"><dl><dt>Email</dt><dd>' + esc(m.email) + '</dd><dt>Perusahaan</dt><dd>' + esc(m.company || '-') + '</dd><dt>Kebutuhan</dt><dd>' + esc(m.topic || '-') + '</dd></dl>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-primary" href="mailto:' + esc(m.email) + '?subject=' + encodeURIComponent('Re: ' + (m.topic || 'Pertanyaan')) + '">' + icon('mail', 16) + 'Balas via Email</a>' +
          '<button class="btn btn-light" data-del="' + esc(m.id) + '">' + icon('trash', 16) + 'Hapus</button></div></div></div>').join('') : '<div class="empty">Belum ada pesan masuk.</div>') + '</div>';
    },

    pengguna() {
      return '<div class="panel">' + head('Pengguna Panel', 'Atur siapa yang dapat masuk dan hak aksesnya.', '<button class="btn btn-primary" id="addBtn">' + icon('plus', 16, 2.4) + 'Tambah Pengguna</button>') +
        '<div class="table-wrap"><table><thead><tr><th>Nama</th><th>Username</th><th>Hak akses</th><th></th></tr></thead><tbody>' +
        users.map((u) => '<tr><td><div class="cell-flex"><div class="av-sm">' + CP.initials(u.name) + '</div><span class="t-title">' + esc(u.name) + (u.id === me.id ? ' <small style="color:var(--muted)">(Anda)</small>' : '') + '</span></div></td>' +
          '<td>' + esc(u.username) + '</td><td><span class="badge ' + u.role + '">' + ROLE_LABEL[u.role] + '</span></td><td>' + actions(u.id) + '</td></tr>').join('') +
        '</tbody></table></div></div>' +
        '<div class="panel" style="margin-top:20px"><div class="panel-body" style="display:flex;gap:12px;color:var(--muted);font-size:.9rem">' + icon('lock', 18) +
        '<span>Pada mockup, akun disimpan di browser. Pada versi produksi, password disimpan terenkripsi (hash) di server dan setiap akses diperiksa oleh backend.</span></div></div>';
    }
  };

  const yes = (ok) => ok ? '<span class="yes">' + icon('check', 16, 2.6) + '</span>' : '<span class="no">' + icon('x', 16, 2.4) + '</span>';
  function statCard(c, ic, n, label, href) {
    return '<' + (href ? 'a href="' + href + '"' : 'div') + ' class="stat-card"><div class="si ' + c + '">' + icon(ic, 22) + '</div><div><strong>' + n + '</strong><span>' + label + '</span></div></' + (href ? 'a' : 'div') + '>';
  }

  /* ---------- Aksi tiap tampilan ---------- */
  function crud(cfg) {
    const list = () => D[cfg.key];
    const edit = (id) => {
      const item = list().find((x) => x.id === id);
      openForm((item ? 'Ubah ' : 'Tambah ') + cfg.label, cfg.fields(item), item ? cfg.toForm(item) : cfg.empty(), (vals) => {
        const data = cfg.fromForm(vals, item);
        if (item) Object.assign(item, data); else list().push(Object.assign({ id: CP.uid(cfg.prefix) }, data));
        const name = data.title || data.name;
        save(cfg.savedMsg ? cfg.savedMsg(data, item) : null, (item ? 'mengubah ' : 'menambahkan ') + cfg.label.toLowerCase() + ' “' + name + '”');
        show();
      }, cfg.extra ? cfg.extra() : '');
    };
    $('#content').addEventListener('click', (e) => {
      const ed = e.target.closest('[data-edit]');
      const del = e.target.closest('[data-del]');
      if (ed) edit(ed.dataset.edit);
      if (del) {
        const item = list().find((x) => x.id === del.dataset.del);
        const name = item.title || item.name;
        confirmBox('Hapus ' + cfg.label.toLowerCase() + '?', '“' + esc(name) + '” akan dihapus dari website.', 'Hapus', () => {
          if (cfg.onDelete) cfg.onDelete(item);
          D[cfg.key] = list().filter((x) => x.id !== item.id);
          save('Data dihapus.', 'menghapus ' + cfg.label.toLowerCase() + ' “' + name + '”'); show();
        });
      }
    });
    const add = $('#addBtn');
    if (add) add.addEventListener('click', () => edit(null));
    const q = $('#q');
    if (q) q.addEventListener('input', () => {
      const s = q.value.trim().toLowerCase();
      $$('#rows tr').forEach((tr) => { tr.style.display = !s || tr.dataset.q.includes(s) ? '' : 'none'; });
    });
  }

  const binders = {
    produk() {
      crud({
        key: 'products', prefix: 'p', label: 'Produk',
        extra: () => datalist('catList', D.products.map((p) => p.category)),
        fields: () => [
          { name: 'name', label: 'Nama produk', required: true, full: true },
          { name: 'category', label: 'Kategori', list: 'catList', required: true },
          { name: 'icon', label: 'Ikon (jika tanpa foto)', type: 'select', options: ICON_CHOICES.map((i) => [i, i]) },
          { name: 'image', label: 'URL foto produk (opsional)', type: 'url', full: true, preview: true },
          { name: 'short', label: 'Deskripsi singkat', full: true, hint: 'Tampil di kartu produk.' },
          { name: 'desc', label: 'Deskripsi lengkap', type: 'textarea', full: true, rows: 3 },
          { name: 'specs', label: 'Spesifikasi', type: 'textarea', full: true, rows: 4, hint: 'Satu baris per spesifikasi, format: Label: Nilai' },
          { name: 'features', label: 'Keunggulan', type: 'textarea', full: true, rows: 4, hint: 'Satu poin per baris.' }
        ],
        empty: () => ({ icon: 'flame' }),
        toForm: (p) => Object.assign({}, p, { specs: (p.specs || []).map((s) => s[0] + ': ' + s[1]).join('\n'), features: (p.features || []).join('\n') }),
        fromForm: (v) => ({
          name: v.name, category: v.category, icon: v.icon, image: v.image, short: v.short, desc: v.desc,
          specs: lines(v.specs).map((l) => { const i = l.indexOf(':'); return i > -1 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, '']; }),
          features: lines(v.features)
        })
      });
    },

    event() {
      crud({
        key: 'events', prefix: 'e', label: 'Event',
        extra: () => datalist('catList', D.events.map((e) => e.category)),
        fields: () => [
          { name: 'title', label: 'Judul event', required: true, full: true },
          { name: 'category', label: 'Kategori', list: 'catList', placeholder: 'Pelatihan, Pameran, …' },
          { name: 'date', label: 'Tanggal', type: 'date', required: true },
          { name: 'time', label: 'Waktu', placeholder: '09.00 – 12.00 WIB' },
          { name: 'location', label: 'Lokasi', placeholder: 'Kota / Daring' },
          { name: 'image', label: 'URL gambar', type: 'url', full: true, preview: true },
          { name: 'desc', label: 'Deskripsi', type: 'textarea', full: true, rows: 4 }
        ],
        empty: () => ({}),
        toForm: (e) => Object.assign({}, e),
        fromForm: (v) => ({ title: v.title, category: v.category || 'Umum', date: v.date, time: v.time, location: v.location, image: v.image, desc: v.desc })
      });
    },

    berita() {
      crud({
        key: 'news', prefix: 'n', label: 'Berita',
        extra: () => datalist('catList', D.news.map((n) => n.category)),
        fields: () => [
          { name: 'title', label: 'Judul berita', required: true, full: true },
          { name: 'category', label: 'Kategori', list: 'catList', placeholder: 'Edukasi, Perusahaan, Tips…' },
          { name: 'date', label: 'Tanggal', type: 'date', required: true },
          { name: 'author', label: 'Penulis' },
          isAdmin() ? { name: 'status', label: 'Status', type: 'select', options: [['publish', 'Terbit'], ['draft', 'Draf']] }
            : { name: 'statusInfo', label: 'Status', hint: 'Editor menyimpan sebagai draf. Admin yang menerbitkan.' },
          { name: 'image', label: 'URL gambar sampul', type: 'url', full: true, preview: true },
          { name: 'excerpt', label: 'Ringkasan', type: 'textarea', full: true, rows: 2 },
          { name: 'content', label: 'Isi berita', type: 'textarea', full: true, rows: 9, hint: 'Pisahkan paragraf dengan satu baris kosong.' }
        ],
        empty: () => ({ date: localDate(), author: me.name, status: 'draft', statusInfo: 'Draf' }),
        toForm: (n) => Object.assign({}, n, { content: (n.content || []).join('\n\n'), statusInfo: n.status === 'draft' ? 'Draf' : 'Terbit' }),
        fromForm: (v, item) => ({
          title: v.title, category: v.category || 'Umum', date: v.date, author: v.author || me.name, image: v.image, excerpt: v.excerpt, content: paras(v.content),
          status: isAdmin() ? v.status : (item ? item.status : 'draft')
        }),
        savedMsg: (d) => d.status === 'draft' ? 'Tersimpan sebagai draf (belum tampil di website).' : null
      });
      $('#content').addEventListener('click', (e) => {
        const b = e.target.closest('[data-publish]');
        if (!b || !isAdmin()) return;
        const n = D.news.find((x) => x.id === b.dataset.publish);
        n.status = 'publish';
        save('Berita diterbitkan dan tampil di website.', 'menerbitkan berita “' + n.title + '”');
        show();
      });
      $('#content').addEventListener('click', () => setTimeout(() => { const x = $('#mForm [name="statusInfo"]'); if (x) x.readOnly = true; }, 0));
    },

    struktur() {
      const descendants = (id) => {
        const out = new Set([id]);
        let grew = true;
        while (grew) { grew = false; D.organization.forEach((o) => { if (out.has(o.parent) && !out.has(o.id)) { out.add(o.id); grew = true; } }); }
        return out;
      };
      crud({
        key: 'organization', prefix: 'o', label: 'Anggota',
        fields: (item) => {
          const blocked = item ? descendants(item.id) : new Set();
          return [
            { name: 'name', label: 'Nama lengkap', required: true, full: true },
            { name: 'position', label: 'Jabatan', required: true },
            { name: 'parent', label: 'Atasan langsung', type: 'select', options: [['', '— Tidak ada (posisi puncak) —']].concat(D.organization.filter((o) => !blocked.has(o.id)).map((o) => [o.id, o.position + ' — ' + o.name])) }
          ];
        },
        empty: () => ({ parent: (D.organization[0] || {}).id || '' }),
        toForm: (o) => Object.assign({}, o),
        fromForm: (v) => ({ name: v.name, position: v.position, parent: v.parent }),
        onDelete: (item) => { D.organization.forEach((o) => { if (o.parent === item.id) o.parent = item.parent || ''; }); }
      });
    },

    profil() {
      const form = $('#profilForm');
      bindPreviews(form);
      $('#cancelProfil').addEventListener('click', show);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = Object.fromEntries(new FormData(form).entries());
        const C = D.company;
        ['name', 'short', 'tagline', 'about', 'aboutLong', 'vision', 'address', 'mapQuery', 'phone', 'email', 'whatsapp', 'hours', 'heroImage', 'aboutImage', 'aboutImage2'].forEach((k) => { C[k] = String(v[k] || '').trim(); });
        C.founded = parseInt(v.founded, 10) || C.founded;
        C.mission = lines(v.mission);
        C.stats = C.stats.map((s, i) => ({ value: parseInt(v['sv' + i], 10) || 0, suffix: v['ss' + i] || '', label: v['sl' + i] || s.label }));
        save('Profil perusahaan tersimpan.', 'memperbarui profil perusahaan');
      });
    },

    pesan() {
      const ra = $('#readAll');
      if (ra) ra.addEventListener('click', () => { msgs.forEach((m) => { m.read = true; }); saveMsgs(); show(); });
      $('#content').addEventListener('click', (e) => {
        const del = e.target.closest('[data-del]');
        if (del) {
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
    },

    pengguna() {
      const content = $('#content');
      const edit = (id) => {
        const u = users.find((x) => x.id === id);
        openForm(u ? 'Ubah Pengguna' : 'Tambah Pengguna', [
          { name: 'name', label: 'Nama', required: true, full: true },
          { name: 'username', label: 'Username', required: true },
          { name: 'password', label: u ? 'Password baru' : 'Password', type: 'password', required: !u, hint: u ? 'Kosongkan jika tidak diubah.' : '' },
          { name: 'role', label: 'Hak akses', type: 'select', options: [['editor', 'Editor — produk, event, berita'], ['admin', 'Admin — akses penuh']] }
        ], u ? { name: u.name, username: u.username, role: u.role } : { role: 'editor' }, (v) => {
          if (users.some((x) => x.username === v.username && x !== u)) { toast('Username sudah dipakai.', true); return false; }
          if (u && u.role === 'admin' && v.role !== 'admin' && users.filter((x) => x.role === 'admin').length === 1) { toast('Minimal harus ada satu Admin.', true); return false; }
          if (u) { u.name = v.name; u.username = v.username; u.role = v.role; if (v.password) u.password = v.password; }
          else users.push({ id: CP.uid('u'), name: v.name, username: v.username, password: v.password, role: v.role });
          CP.saveUsers(users);
          if (u && u.id === me.id) { me = u; }
          CP.addLog(me, (u ? 'mengubah' : 'menambahkan') + ' pengguna “' + v.name + '” (' + ROLE_LABEL[v.role] + ')');
          toast('Pengguna tersimpan.');
          if (u && u.id === me.id && me.role !== 'admin') { renderApp(); return; }
          show();
        });
      };
      $('#addBtn').addEventListener('click', () => edit(null));
      content.addEventListener('click', (e) => {
        const ed = e.target.closest('[data-edit]');
        const del = e.target.closest('[data-del]');
        if (ed) edit(ed.dataset.edit);
        if (del) {
          const u = users.find((x) => x.id === del.dataset.del);
          if (u.id === me.id) { toast('Anda tidak dapat menghapus akun sendiri.', true); return; }
          if (u.role === 'admin' && users.filter((x) => x.role === 'admin').length === 1) { toast('Minimal harus ada satu Admin.', true); return; }
          confirmBox('Hapus pengguna?', '“' + esc(u.name) + '” tidak akan bisa masuk ke panel lagi.', 'Hapus', () => {
            users = users.filter((x) => x.id !== u.id); CP.saveUsers(users); CP.addLog(me, 'menghapus pengguna “' + u.name + '”'); show(); toast('Pengguna dihapus.');
          });
        }
      });
    }
  };

  window.addEventListener('storage', (e) => {
    if (!me || !$('#content')) return;
    if (e.key === 'demo_cp_messages_v1') { msgs = CP.getMessages(); updateBadge(); if (isAdmin()) { toast('Ada pesan baru masuk.'); if (/^#(pesan|dashboard)?$/.test(location.hash)) show(); } }
  });
  window.addEventListener('hashchange', () => { if (me && $('#content')) { closeModal(); show(); } });

  users = CP.getUsers();
  me = users.find((u) => u.id === getSession()) || null;
  me ? renderApp() : renderLogin();
})();
