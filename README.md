# Demo Website Company Profile (3 Paket)

Situs statis (HTML + CSS + JavaScript, tanpa build step), siap di-deploy ke Vercel.
Demo memakai perusahaan **fiktif** "PT Perisai Prima Nusantara". Nama, alamat, email, produk, event, berita, struktur, dan testimoni semuanya contoh dan diganti dengan materi resmi klien saat produksi.

| URL | Isi |
|---|---|
| `/` | Halaman pilihan paket (harga & cakupan sesuai RAB) |
| `/standard/` | Paket **Standar** — 6 menu statis, form kontak, WhatsApp, peta |
| `/profesional/` | Paket **Profesional** — desain custom, animasi, halaman detail Produk/Event/Berita |
| `/profesional-admin/` | Paket **Profesional + Panel Admin** — website yang membaca konten dari panel |
| `/admin/` | **Panel Admin** |

Menu website: Beranda, Tentang Perusahaan, Struktur Organisasi, Produk, Event, Berita.
Halaman detail (paket Profesional): `#/produk/<id>`, `#/event/<id>`, `#/berita/<id>`.

## Akun demo panel admin (RBAC)
| Role | Login | Akses |
|---|---|---|
| Admin | `admin` / `admin123` | Semua menu: produk, event, berita, struktur organisasi, profil perusahaan, pesan masuk, pengguna & hak akses; menerbitkan berita |
| Editor | `editor` / `editor123` | Produk, event, berita. Berita yang ditulis editor tersimpan sebagai **draf** sampai diterbitkan admin |

Menu yang tidak boleh diakses editor tampil dengan ikon gembok dan menampilkan halaman "Akses dibatasi".

## Skenario demo ke klien (±5 menit)
1. Buka `/` → tunjukkan tiga paket dan tabel perbandingan.
2. Buka `/standard/` lalu `/profesional/` → bandingkan tampilan dan animasi, klik salah satu produk/berita untuk halaman detail.
3. Buka `/profesional-admin/` di satu tab dan `/admin/` di tab lain.
4. Login sebagai **editor** → tulis berita baru → tunjukkan berita belum tampil (masih draf) → coba buka menu Pengguna (terkunci).
5. Keluar, login sebagai **admin** → klik **Terbitkan** → berita langsung muncul di tab website.
6. Isi form kontak di website → pesan masuk di menu **Pesan Masuk** admin.
7. Tombol **Reset data demo** (khusus admin) mengembalikan semua data ke kondisi awal.

## Deploy ke Vercel
1. Upload folder ini ke repository GitHub.
2. Di vercel.com: **Add New → Project** → import repository → Framework Preset **Other** → kosongkan Build Command dan Output Directory → **Deploy**.
   Atau lewat CLI: `npm i -g vercel` lalu `vercel --prod` di dalam folder ini.

Uji lokal: `npx serve .` atau `python3 -m http.server`.

## Unggah foto di panel admin
Setiap kolom gambar (gambar beranda & tentang di Profil Perusahaan, foto produk, gambar event, sampul berita) punya dua cara:
1. Tempel **URL gambar**, atau
2. Klik **Unggah foto** / seret foto ke kotak di bawah URL (JPG, PNG, WebP, maks. 10 MB).

Pada mockup, foto otomatis diperkecil (maks. 1280 px) dan dikompres ke JPEG ±100–300 KB lalu disimpan di browser. Penyimpanan browser terbatas (±5 MB), jadi bila penuh akan muncul pesan untuk memakai foto lebih kecil.
Pada versi produksi, foto diunggah ke server/object storage dan yang disimpan di database hanya URL-nya.

## Mengganti konten
- Semua konten ada di `assets/js/data.js` (profil, produk, event, berita, struktur, alamat & peta, WhatsApp).
- Logo: fungsi `logo()` di `data.js` dan SVG di `profesional*/index.html` (preloader). Ganti dengan logo resmi.
- Warna: variabel `:root` di `assets/css/*.css` (hijau tua + amber mengikuti dokumen penawaran).
- SEO: ubah `canonical`, meta description, dan JSON-LD di setiap `index.html`. Google Analytics: ganti `G-XXXXXXXXXX` dan hapus tanda komentar.
- Foto contoh di-hotlink dari Unsplash; untuk produksi gunakan foto milik klien di `assets/img/`.

## Catatan teknis (mockup vs produksi)
Pada mockup, data panel admin, akun, pesan, dan log aktivitas disimpan di **localStorage browser**, sehingga:
- perubahan hanya terlihat di browser yang sama (cukup untuk demo);
- login dan pengecekan role belum aman.

Untuk produksi (paket + Panel Admin), sambungkan ke backend: ganti fungsi `CP.getData / saveData / getMessages / addMessage / getUsers / addLog` di `data.js` dengan `fetch()` ke API, simpan password ter-hash, periksa role di server untuk setiap endpoint, dan simpan unggahan gambar di object storage. Struktur JSON di `data.js` dapat langsung dipakai sebagai kontrak API.
