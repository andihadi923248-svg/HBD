# 🎂 Web Ulang Tahun Interaktif & Viral (2024 - 2026 Edition) ✨

Website ucapan ulang tahun interaktif modern, romantis, dan estetik ala tren viral TikTok/Instagram dengan proteksi kata sandi rahasia dan integrasi pesan WhatsApp langsung!

---

## 🌟 Fitur Utama

1. **🔐 Proteksi Sandi Rahasia (Passcode Screen)**
   - Sebelum bisa masuk melihat ucapan, penerima harus memasukkan **Sandi: `923248`**.
   - Dilengkapi animasi getar (*shake effect*) jika salah memasukkan sandi dan ledakan konfeti jika berhasil!
   - Mendukung klik tombol keypad angka di layar maupun ketikan keyboard komputer/laptop.

2. **🎶 Music Box Melodi Ulang Tahun Otomatis**
   - Menggunakan instrumen *Web Audio API* jernih yang berfungsi 100% tanpa perlu download file MP3.
   - Dilengkapi widget pemutar musik mengambang (*spinning vinyl disc & equalizer bars*).
   - Mendukung jika kamu ingin mengganti lagu dengan file MP3 buatanmu sendiri.

3. **🎂 Kue Ulang Tahun Interaktif (Bisa Ditiup!)**
   - Kue 2 tingkat dengan lilin menyala.
   - Penerima bisa mengetuk kue atau menekan tombol *"Tiup Lilin"* untuk memadamkan lilin (dilengkapi efek asap & suara tiupan).
   - Pesan doa spesial akan muncul begitu lilin padam.

4. **🎁 Kotak Kado Kejutan 3D (Unboxing Gift Box)**
   - Kotak kado dengan pita emas yang melayang.
   - Saat disentuh, tutup kado akan terangkat dengan ledakan konfeti dan menampilkan pesan manis kejutan.

5. **📸 Galeri Foto Polaroid Estetik**
   - Desain polaroid klasik dengan selotip washi (*washi tape*) dan efek kemiringan alami.
   - Foto dan keterangan dapat kamu ganti dengan foto orang tersayang dengan mudah.

6. **💌 Surat Cinta / Ucapan dengan Efek Mesin Tik (Typewriter)**
   - Teks ucapan yang diketikkan otomatis huruf demi huruf saat website terbuka.

7. **🌸 Kartu Interaktif *"Kenapa Kamu Begitu Spesial?"***
   - Kartu-kartu kecil interaktif yang bisa disentuh untuk membaca keistimewaan dirinya.

8. **📲 Fitur Balasan Langsung ke WhatsApp (Utama)**
   - Terdapat kolom pesan di akhir website di mana dia bisa mengetik balasan atau memilih *quick chips* (misal: *"Terharu banget 🥺❤️"*, *"Wajib traktir makan nih! 🍕"*).
   - Begitu tombol **"Kirim Balasan ke WhatsApp Aku"** ditekan, pesannya akan langsung terkirim dan terbuka di WhatsApp kamu!

---

## ⚙️ Cara Mengganti Nomor WhatsApp & Nama

Kamu punya **3 cara mudah** untuk mengatur nama dan nomor WhatsApp:

### Cara 1: Menggunakan Tombol Pengaturan di Layar (Paling Mudah)
1. Buka file `index.html` di browsermu.
2. Di pojok kanan bawah, klik ikon gerigi **⚙️**.
3. Masukkan **Nama yang ulang tahun** dan **Nomor WhatsApp kamu** (nomor kamu sudah diset otomatis ke `6285200000206`).
4. Klik **Simpan Pengaturan**.

### Cara 2: Lewat Link URL (Praktis Saat Kirim Link)
Kamu bisa langsung menambahkan parameter pada link website:
```text
https://website-kamu.com/?name=Salsa&phone=6285200000206
```

### Cara 3: Edit Langsung File `script.js`
Buka file `script.js` menggunakan Notepad atau Text Editor, lalu cari bagian atas:
```javascript
const DEFAULT_CONFIG = {
  secretCode: "923248", // Sandi akses
  recipientName: "Bidadari Cantik ✨", // Nama yang ultah
  whatsappNumber: "6285200000206", // Nomor WhatsApp kamu: +62 852 0000 0206
  ...
};
```

---

## 📸 Cara Mengganti Foto Polaroid

Buka file `index.html`, cari bagian `<!-- Polaroid Memories Gallery -->`. Kamu bisa mengganti URL pada tag `<img src="...">` dengan link foto online atau foto lokal (misalnya buat folder `images/` dan masukkan fotomu).

---

## 🚀 Cara Membuka & Mengirimkan Website Ini

1. **Buka di Komputer / HP**:
   - Cukup klik dua kali file `index.html` untuk langsung membukanya di browser apa pun (Google Chrome, Safari, Edge).
2. **Kirim Lewat Internet (Gratis)**:

   coba lagi
   - Kamu bisa mengunggah folder ini ke layanan gratis seperti:
     - [Vercel](https://vercel.com) (Tinggal drag & drop folder)
     - [Netlify Drop](https://app.netlify.com/drop) (Tinggal seret folder ini, link langsung aktif dalam 5 detik!)
     - [GitHub Pages](https://pages.github.com)
   - Setelah mendapatkan link website online, kirimkan linknya ke orang yang sedang berulang tahun! 🎉
