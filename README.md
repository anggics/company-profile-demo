# Mockup Website Company Profile — 3 Paket

Situs statis murni (HTML + CSS + JavaScript, tanpa build step) yang siap di-deploy ke Vercel.
Konten demo memakai perusahaan fiktif **PT Arunika Solusi Nusantara**.

| URL | Isi |
|---|---|
| `/` | Halaman pilihan paket + tabel perbandingan |
| `/standard/` | Paket **Standar** — template company profile yang bersih |
| `/profesional/` | Paket **Profesional** — desain premium + animasi |
| `/profesional-admin/` | Paket **Profesional + Admin** — website yang membaca konten dari panel admin |
| `/admin/` | **Panel Admin** (login demo: `admin` / `admin123`) |

Menu di setiap website: Beranda, Tentang Perusahaan, Struktur Organisasi, Event, Layanan.

## Deploy ke Vercel

**Cara 1 — lewat dashboard (paling mudah)**
1. Upload folder ini ke repository GitHub/GitLab.
2. Di vercel.com, pilih **Add New → Project**, lalu import repository tersebut.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan.
4. Klik **Deploy**.

**Cara 2 — lewat CLI**
```bash
npm i -g vercel
cd company-profile
vercel          # deploy preview
vercel --prod   # deploy produksi
```

Mau mencoba di komputer sendiri? Jalankan `npx serve .` atau `python3 -m http.server`, lalu buka `http://localhost:3000` atau `:8000`.

## Struktur folder
```
├── index.html              halaman pilihan paket
├── standard/index.html
├── profesional/index.html
├── profesional-admin/index.html   (sama dengan profesional + window.CP_USE_STORE = true)
├── admin/index.html
├── assets/
│   ├── js/data.js          ← SEMUA KONTEN ada di sini (profil, layanan, event, struktur, dll.)
│   ├── js/standard.js      render paket Standar
│   ├── js/pro.js           render + animasi paket Profesional
│   ├── js/admin.js         panel admin
│   └── css/                standard.css, pro.css, admin.css
└── vercel.json
```

## Mengganti konten untuk klien
- Edit `assets/js/data.js`: nama perusahaan, tagline, visi-misi, layanan, event, struktur, foto, nomor WhatsApp.
- Warna: ubah variabel `:root` di file CSS masing-masing paket (`--primary`/`--accent` untuk Standar, `--sun1`/`--sun2`/`--ink` untuk Profesional).
- Logo: fungsi `logo()` di `data.js`. Ganti dengan `<img src="...">` bila klien punya file logo.
- Foto demo diambil dari Unsplash (hotlink). Untuk produksi, simpan foto klien di `assets/img/` lalu ganti URL-nya.
- Harga paket di `index.html` hanya contoh.

## Catatan penting paket + Admin
Panel admin pada mockup ini menyimpan data di **localStorage browser**, jadi:
- Perubahan hanya terlihat di browser yang sama (cocok untuk demo ke klien).
- Login `admin/admin123` hanya untuk demo, **bukan pengamanan sungguhan**.

Untuk produksi, sambungkan ke backend (Spring Boot, Laravel, Node, Supabase, dll.):
1. Ganti `CP.getData`, `CP.saveData`, `CP.getMessages`, `CP.saveMessages`, `CP.addMessage` di `data.js` dengan `fetch()` ke API Anda.
2. Pindahkan login ke server (JWT/session), dan lindungi endpoint tulis.
3. Simpan upload gambar ke object storage (mis. S3/MinIO) sebagai ganti input URL.

Struktur data JSON-nya sudah siap dipakai sebagai kontrak API (`company`, `services[]`, `events[]`, `organization[]` dengan relasi `parent`, `messages[]`).

## Animasi paket Profesional
Preloader, transisi tirai antarhalaman, reveal teks per kata, scroll reveal, parallax gambar, counter angka, marquee klien, spotlight kursor pada kartu layanan, tombol magnetik, hitung mundur event, filter + pencarian event dengan animasi, modal detail, slider testimoni, timeline dengan garis progres, highlight teks saat scroll, FAQ accordion, progress bar scroll, dan header yang tersembunyi saat scroll ke bawah.
Semua animasi otomatis dimatikan bila pengguna mengaktifkan *reduce motion* di perangkatnya.
