# 📝 Todo List

Sebuah aplikasi web Todo List dinamis dan interaktif yang dibangun sebagai bagian dari kurikulum Full Stack JavaScript di [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

Proyek ini mendemonstrasikan penerapan arsitektur MVC (Model-View-Controller) murni menggunakan **Vanilla JavaScript**, manajemen penyimpanan data lokal (LocalStorage), dan penggunaan **Webpack** sebagai _module bundler_.

## 🌟 Live Preview

*https://bimbdevp.github.io/todo-list/*

## ✨ Fitur Utama

- **Manajemen Proyek:** Kelompokkan tugas-tugas ke dalam proyek (kategori) terpisah agar lebih terorganisir. Mencegah penghapusan proyek default ("Inbox").
- **Manajemen Tugas Lengkap (CRUD):** Buat, lihat, edit, dan hapus tugas dengan mudah. Setiap tugas memiliki detail komprehensif termasuk Judul, Deskripsi, Tenggat Waktu (Due Date), Prioritas, Catatan (Notes), dan Checklist.
- **Penyimpanan Permanen (LocalStorage):** Data proyek dan tugas disimpan secara lokal di browser, sehingga tidak akan hilang saat halaman di-refresh atau ditutup.
- **Format Tanggal Dinamis:** Terintegrasi dengan library `date-fns` untuk menghasilkan format tenggat waktu yang cerdas (misalnya, "(today)", "(2 days to go)", atau "(2 days overdue)").
- **Arsitektur MVC:** Kode sumber secara ketat dipisahkan menjadi bagian _Model_ (logika data), _View_ (manipulasi DOM), dan _Controller_ (penghubung interaksi), mematuhi prinsip _Separation of Concerns_.

## 🛠️ Dibangun Menggunakan

- HTML5 & CSS3
- Vanilla JavaScript (ES6 Modules)
- [Webpack 5](https://webpack.js.org/)
- [date-fns](https://date-fns.org/)
- npm

## 📁 Struktur Proyek

```text
src/
├── index.js              # Titik masuk utama (Entry point)
├── controller/
│   └── controller.js     # Menangani event listener dan alur interaksi
├── model/
│   ├── appState.js       # State utama aplikasi (array projects & tasks)
│   ├── project.js        # Factory function pembentuk objek Proyek
│   ├── task.js           # Factory function pembentuk objek Tugas
│   └── storage.js        # Menangani logika save/load ke LocalStorage
├── view/
│   └── view.js           # Menghasilkan dan memanipulasi elemen DOM
├── style.css             # Gaya CSS global
└── template.html         # Kerangka dasar HTML
```

## 🚀 Cara Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer Anda.

### Prasyarat

Pastikan Anda sudah menginstal Node.js dan npm di komputer Anda.

### Instalasi

1. _Clone_ repositori ini
   ```sh
   git clone https://github.com/BimbDevp/todo-list.git
   ```
2. Masuk ke dalam direktori proyek
   ```sh
   cd todo-list
   ```
3. Instal semua paket NPM yang dibutuhkan
   ```sh
   npm install
   ```

### Penggunaan

- Untuk menjalankan _development server_ Webpack:
  ```sh
  npm run dev
  ```
- Untuk mem-_bundle_ file ke tahap produksi (menghasilkan folder `dist/`):
  ```sh
  npm run build
  ```

## 🌐 Cara Deploy ke GitHub Pages

Proyek ini menggunakan metode `git subtree` bawaan Git untuk proses _deployment_ sesuai instruksi The Odin Project.

1. Pastikan file `package.json` Anda memiliki script _deploy_:
   ```json
   "scripts": {
     "build": "webpack",
     "deploy": "git subtree push --prefix dist origin gh-pages"
   }
   ```
2. Buat cabang `gh-pages` lokal dan selaraskan dengan `main`:
   ```sh
   git checkout -b gh-pages
   git merge main --no-edit
   ```
3. Lakukan _build_ produksi:
   ```sh
   npm run build
   ```
4. Paksa commit folder `dist`:
   ```sh
   git add dist -f && git commit -m "Deployment commit"
   ```
5. Deploy secara otomatis dengan menjalankan:
   ```sh
   npm run deploy
   ```
6. Kembali ke cabang utama:
   ```sh
   git checkout main
   ```

## 💡 Pelajaran yang Didapat (_Lessons Learned_)

- Penerapan pola desain **MVC (Model-View-Controller)** secara nyata untuk menjaga kode tetap bersih dan mudah dipelihara.
- Cara kerja DOM Manipulation yang terstruktur tanpa mencampuradukkan dengan logika bisnis aplikasi.
- Manajemen _State_ lokal menggunakan Array dan menyinkronkannya dengan antarmuka pengguna serta browser `localStorage`.
- Penggunaan library tanggal pihak ketiga (`date-fns`) dan mengintegrasikannya dengan sistem _bundler_ Webpack.

---

_Proyek ini adalah bagian dari Kurikulum Full Stack JavaScript di The Odin Project._
