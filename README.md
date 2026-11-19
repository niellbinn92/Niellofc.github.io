# NIEL STORE — web starter

Tema: hitam + ungu. Tampilan mobile-first mengikuti struktur referensi video, dengan teks yang diminta untuk tidak ditampilkan dikecualikan dari UI.

## Isi paket
- `index.html` — katalog publik, pencarian, kategori, detail produk, pilihan durasi, login Google UI.
- `admin.html` — antarmuka dashboard admin.
- Kedua halaman memanggil API Worker melalui endpoint `/api/...`.

## Status
Ini adalah **frontend starter**, bukan website produksi yang sudah terhubung. Google OAuth, sesi aman, database, CRUD produk, pesanan, dan data dashboard belum aktif sampai Worker API disiapkan dan diuji. Tidak ada kredensial atau akses admin palsu di dalam file.

## Kontrak API yang dibutuhkan
- `GET /api/products` → `{ "products": [{ "id", "name", "category", "description", "symbol", "starting_price", "stock", "durations": [{ "id", "label", "price", "stock" }] }] }`
- `GET /api/me` → `{ "user": { "email", "name", "role": "user|admin" } }`
- `POST /api/auth/google` → body `{ "credential": "<Google ID token>" }`, server wajib memverifikasi signature, issuer, audience, expiry, lalu menentukan role dari allowlist email server-side.
- `POST /api/auth/logout`
- `POST /api/orders` → body `{ "product_id", "duration_id" }`
- `GET /api/admin/overview` → statistik, produk, pesanan; hanya admin.
- `POST /api/admin/products` → tambah produk; hanya admin.
- `DELETE /api/admin/products/:id` → hapus produk; hanya admin.

## Konfigurasi yang masih diperlukan
1. Google OAuth Web Client ID; masukkan ke `GOOGLE_CLIENT_ID` pada `index.html`.
2. Email Google admin; simpan di environment Worker sebagai allowlist `ADMIN_EMAILS` (jangan taruh sebagai satu-satunya pemeriksaan di browser).
3. Worker API URL jika berbeda domain; isi `API_BASE` di kedua HTML. Untuk cookie lintas domain, gunakan desain domain/cookie yang sesuai dan uji di browser.
4. Worker source dan skema D1 saat ini. Database NIEL STORE sebelumnya memiliki tabel `products`, `orders`, dan `keys`; jangan jalankan migrasi destruktif sebelum struktur kolom aktual diperiksa.
5. Uji login user biasa, admin, email yang tidak diizinkan, logout, CRUD produk, dan akses langsung ke endpoint admin.

## Deploy
Upload `index.html` sebagai halaman utama dan `admin.html` di root yang sama. Jangan publikasikan sebagai produksi sebelum API dan autentikasi server-side selesai.
