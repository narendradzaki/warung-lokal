# 🍽️ Warung Lokal - Platform Pesan Makanan UMKM

<div align="center">

![Warung Lokal](https://placehold.co/800x400/334155/94a3b8?text=Warung+Lokal+UI)

**Platform modern untuk memesan makanan dari UMKM lokal favorit Anda**

[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosted-orange?logo=firebase)](https://umkmproject1.firebaseapp.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[🌐 Live Demo](https://umkmproject1.firebaseapp.com/) • [🚀 Fitur](#-fitur) • [🛠️ Teknologi](#️-teknologi) • [📦 Instalasi](#-instalasi)

</div>

## 📖 Tentang Proyek

Warung Lokal adalah aplikasi web progresif (PWA) yang menghubungkan pelanggan dengan berbagai UMKM kuliner lokal. Platform ini dirancang untuk memberikan pengalaman memesan makanan yang modern, efisien, dan user-friendly dengan antarmuka yang responsif dan fitur-fitur canggih.

### 🎯 Tujuan
- Memberikan platform digital bagi UMKM kuliner lokal
- Memudahkan pelanggan menemukan dan memesan makanan favorit
- Meningkatkan daya saing UMKM dengan teknologi modern
- Menyediakan pengalaman pengguna yang seamless dari pemesanan hingga pengiriman

## ✨ Fitur

### 👥 Untuk Pelanggan
- **🔍 Pencarian Cerdas** - Temukan restoran dan menu dengan mudah
- **🏷️ Filter Kategori** - Filter berdasarkan jenis makanan (kopi, ramen, nasi, dll)
- **🤖 Asisten AI** - Dapatkan rekomendasi menu dengan AI
- **🛒 Keranjang Pintar** - Sistem keranjang yang intuitif
- **📱 Responsif** - Optimal untuk desktop dan mobile
- **📍 Integrasi Maps** - Lihat lokasi restoran dengan satu klik

### 👨‍💼 Untuk Pemilik Toko
- **📊 Dasbor Owner** - Kelola pesanan masuk dengan mudah
- **🔄 Update Status** - Ubah status pesanan (Pending → Confirmed → Delivered)
- **📈 Manajemen Menu** - Sistem menu yang terorganisir
- **🔔 Notifikasi Real-time** - Update pesanan secara real-time

## 🛠️ Teknologi

### Frontend
- **HTML5** - Struktur semantik
- **CSS3/Tailwind** - Styling dan utility classes
- **JavaScript ES6+** - Logika aplikasi
- **Firebase Auth** - Autentikasi pengguna

### Backend & Database
- **Firebase Firestore** - Database real-time
- **Firebase Hosting** - Deployment dan hosting
- **Google Gemini AI** - Asisten rekomendasi cerdas

### Integrasi
- **Google Maps** - Integrasi lokasi restoran
- **REST API** - Komunikasi dengan layanan eksternal

## 🚀 Demo Langsung

Kunjungi aplikasi langsung di:  
**🌐 [https://umkmproject1.firebaseapp.com/](https://umkmproject1.firebaseapp.com/)**

### Akun Demo untuk Testing:

#### Pelanggan:
- **Email:** `user@demo.com`
- **Password:** `password123`

#### Pemilik Toko (Tetta Kopi):
- **Email:** `tettakopi@admin.com`
- **Password:** `admin123`

## 📦 Instalasi & Setup

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- Akun Firebase
- API Key Google Gemini AI

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/warung-lokal.git
   cd warung-lokal
   ```

2. **Setup Firebase**
   - Buat project baru di [Firebase Console](https://console.firebase.google.com)
   - Aktifkan Authentication (Email/Password)
   - Buat Firestore Database
   - Dapatkan konfigurasi Firebase dan ganti di `app.js`

3. **Setup Google Gemini AI**
   - Dapatkan API Key dari [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Ganti placeholder API key di fungsi `callGeminiAPI()`

4. **Deploy**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login ke Firebase
   firebase login
   
   # Deploy ke Firebase Hosting
   firebase deploy
   ```

## 🏗️ Struktur Proyek

```
warung-lokal/
├── index.html          # Struktur utama aplikasi
├── app.js             # Logika aplikasi dan Firebase
├── style.css          # Styling custom dan animasi
├── firebase.json      # Konfigurasi Firebase
└── README.md          # Dokumentasi
```

## 📱 Penggunaan

### Bagi Pelanggan:
1. **Daftar/Login** - Buat akun atau login dengan email
2. **Jelajahi Restoran** - Gunakan search dan filter kategori
3. **Lihat Menu** - Klik "Lihat Menu" pada restoran pilihan
4. **Tambah ke Keranjang** - Pilih item dan varian (jika ada)
5. **Checkout** - Isi data pengiriman dan konfirmasi pesanan
6. **Lacak Pesanan** - Pantau status pesanan di "Lacak Pesanan"

### Bagi Pemilik Toko:
1. **Login dengan Email Owner** - Gunakan email khusus owner
2. **Akses Dasbor** - Lihat semua pesanan masuk
3. **Kelola Status** - Update status pesanan sesuai progres
4. **Monitor Aktivitas** - Pantau semua aktivitas toko

## 🔧 Konfigurasi

### Data Restoran
Aplikasi sudah dilengkapi dengan data 10 restoran UMKM lengkap dengan menu, harga, dan kategori. Data dapat dikustomisasi di array `initialRestaurantData` dalam `app.js`.

### Mapping Owner
Setiap restoran dapat dikaitkan dengan email owner tertentu melalui objek `ownerEmailMapping`.

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/namafitur`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/namafitur`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 🆘 Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Cek [Issues](https://github.com/username/warung-lokal/issues) yang sudah ada
2. Buat issue baru dengan detail yang jelas
3. Hubungi tim development di email@example.com

## 🙏 Penghargaan

Terima kasih kepada:
- **Firebase** untuk infrastruktur yang handal
- **Tailwind CSS** untuk utility classes yang powerful
- **Google Gemini AI** untuk kemampuan AI yang canggih
- **Seluruh UMKM mitra** yang telah berpartisipasi

---

<div align="center">

**Dibuat dengan ❤️ untuk mendukung UMKM lokal Indonesia**

[⬆ Kembali ke atas](#-warung-lokal---platform-pesan-makanan-umkm)

</div>
