# Drone Booster AI v16

## Deskripsi Singkat

Drone Booster AI adalah sebuah game simulasi berbasis web di mana pemain dapat mengontrol sebuah drone secara manual atau melatih kecerdasan buatan (AI) untuk menerbangkan drone secara otomatis. AI dilatih menggunakan algoritma genetika neuroevolusi melalui pustaka Neataptic.js. Tujuan utama AI adalah untuk bertahan hidup selama mungkin sambil menghindari rintangan dan mengumpulkan target untuk mendapatkan energi dan memulihkan health. Game ini menawarkan berbagai opsi konfigurasi untuk menyesuaikan parameter simulasi dan pelatihan AI.

## Fitur Utama

* **Kontrol Drone Manual:** Pemain dapat menerbangkan drone menggunakan keyboard (W/A/D atau Panah).
* **Pelatihan AI (NEAT):** Melatih populasi drone AI menggunakan algoritma NEAT untuk belajar terbang secara mandiri.
* **Playback AI Terbaik:** Memutar ulang aksi drone AI dengan performa (fitness) terbaik dari hasil pelatihan.
* **Konfigurasi Lanjutan:** Layar konfigurasi awal untuk mengatur parameter NEAT (mutasi, elitisme, metode), fisika game (gravitasi, thrust, health, energi), dimensi drone, sistem target, dan efek visual.
* **Sistem Target:** Target muncul secara acak di arena. Mengambil target memberikan pemulihan health dan energi.
* **Sistem Rintangan:** Rintangan (asteroid) muncul secara acak dan bergerak untuk menambah tantangan. Pengaturan rintangan (kecepatan, frekuensi, ukuran) dapat disesuaikan di layar game.
* **Sistem Energi:** Drone memiliki energi yang terkonsumsi saat melakukan thrust.
* **Efek Visual:** Termasuk motion blur (opsional), efek partikel saat target diambil, dan efek ledakan saat drone hancur.
* **Simpan/Muat Model AI:** Kemampuan untuk menyimpan model AI terbaik dan memuatnya kembali untuk melanjutkan pelatihan atau playback.
* **Antarmuka Responsif:** Tampilan game dan konfigurasi dirancang agar responsif terhadap berbagai ukuran layar.

## Panduan Pengguna (Untuk Awam)

### Cara Bermain Manual

1.  Buka file game (HTML) di browser Anda.
2.  Di layar konfigurasi, atur parameter sesuai keinginan atau gunakan nilai default. Klik **"Mulai Game"**.
3.  Tekan tombol **[R]** pada keyboard Anda atau klik tombol **"Reset Manual [R]"** di bagian bawah layar.
4.  Gunakan tombol berikut untuk mengontrol drone:
    * **[W]** atau **[↑] (Panah Atas):** Mendorong drone ke atas (menggunakan kedua booster).
    * **[A]** atau **[←] (Panah Kiri):** Memutar booster ke kiri (drone bergerak ke kanan).
    * **[D]** atau **[→] (Panah Kanan):** Memutar booster ke kanan (drone bergerak ke kiri).
5.  Tujuan Anda adalah bertahan hidup selama mungkin, menghindari dinding dan rintangan (jika diaktifkan). Kumpulkan target kuning untuk memulihkan health dan energi.
6.  Skor Anda akan ditampilkan di pojok kanan atas.
7.  Jika drone hancur, tekan **[R]** lagi untuk memulai ulang.

### Cara Melatih AI

1.  Setelah mengklik **"Mulai Game"** dari layar konfigurasi.
2.  Sesuaikan **"Populasi AI"** (jumlah drone yang dilatih bersamaan) dan **"Kecepatan Train"** (seberapa cepat simulasi berjalan) menggunakan slider di bagian bawah. Populasi lebih besar bisa belajar lebih baik tapi lebih berat untuk komputer. Kecepatan lebih tinggi mempercepat latihan tapi mungkin sulit diamati.
3.  Tekan tombol **[T]** pada keyboard atau klik tombol **"Mulai AI [T]"**.
4.  Anda akan melihat banyak drone berwarna-warni terbang dan belajar. Perhatikan statistik di bagian AI Controls:
    * **Generasi:** Menunjukkan generasi pelatihan keberapa.
    * **Fit Terbaik:** Skor fitness (kemampuan bertahan hidup dan mencapai target) tertinggi dari drone di generasi sebelumnya.
    * **Fit Rata2:** Rata-rata skor fitness populasi di generasi sebelumnya.
    * **Drone Aktif:** Jumlah drone yang masih hidup di generasi saat ini.
5.  Biarkan AI berlatih selama beberapa generasi. Anda dapat melihat skor AI terbaik meningkat seiring waktu.
6.  Anda bisa **mengubah kecepatan latihan kapan saja** menggunakan slider "Kecepatan Train".
7.  Untuk menghentikan latihan, klik tombol merah **"Stop AI"**.

### Melihat AI Terbaik Bermain (Playback)

1.  Pastikan Anda sudah melatih AI setidaknya beberapa generasi sehingga ada "Model Tersimpan" dengan skor fitness tertentu.
2.  Tekan tombol **[P]** pada keyboard atau klik tombol **"Playback AI [P]"**.
3.  Drone berwarna kuning akan muncul dan meniru perilaku AI terbaik yang pernah tercatat selama pelatihan.
4.  Untuk menghentikan playback, tekan **[P]** lagi atau klik tombol **"Stop Playback [P]"**.

### Menyimpan dan Memuat Model AI

* **Simpan:** Saat AI sedang berlatih atau setelah dihentikan (jika ada model terbaik), klik tombol **"Simpan Model"**. File JSON berisi data AI terbaik akan diunduh.
* **Muat:** Klik tombol **"Import Model"**, pilih file JSON model AI yang sebelumnya disimpan. Pelatihan akan dimulai ulang menggunakan model tersebut sebagai dasar, atau Anda bisa langsung melakukan Playback.

### Layar Konfigurasi

Saat pertama kali membuka game, Anda akan melihat layar konfigurasi. Di sini Anda bisa mengatur berbagai aspek game dan AI sebelum memulai. Arahkan kursor ke slider untuk melihat nilai default atau sesuaikan sesuai keinginan Anda. Pengaturan ini akan digunakan saat Anda menekan "Mulai Game".

## Panduan Teknis

### Teknologi

* **HTML:** Struktur dasar halaman web.
* **CSS:** Styling menggunakan **Tailwind CSS** (via CDN) dan beberapa style inline dalam tag `<style>`.
* **JavaScript (ES6+):** Logika utama game, fisika, AI, interaksi UI.
* **Neataptic.js:** Pustaka JavaScript untuk implementasi algoritma neuroevolusi NEAT.

### Struktur Kode

Kode utama berada dalam satu file HTML:

* **HTML:** Mendefinisikan struktur halaman, termasuk layar konfigurasi (`#welcomeScreen`), layar game (`#gameScreen`), elemen UI (kontrol, skor, pesan), canvas (`#gameCanvas`), dan modal.
* **CSS:** Didefinisikan dalam tag `<style>` di bagian `<head>`. Menggunakan kelas Tailwind dan beberapa definisi kelas kustom untuk styling.
* **JavaScript:** Ditempatkan dalam tag `<script>` di akhir `<body>`. Mencakup semua logika game:
    * Inisialisasi variabel global dan konfigurasi (`CONFIG`).
    * Definisi objek `baseDrone` (prototipe untuk semua drone).
    * Fungsi untuk membuat rintangan (`createObstacle`) dan target (`spawnSingleTarget`, `drawTarget`, `updateTargetSystem`).
    * Fungsi untuk sistem partikel (`createParticles`, `createClaimEffect`, `createDestructionEffect`, `updateParticles`, `drawParticles`).
    * Logika AI (`initializeNeat`, `createAiDrones`, `runAiGeneration`, `evolvePopulation`).
    * Logika mode permainan (`stopAllModes`, `switchToManualMode`, `startAiTraining`, `stopAiTraining`, `togglePlaybackMode`, `runPlayback`).
    * Loop utama game (`gameLoop`).
    * Penanganan input (`keysPressed`, event listeners keyboard).
    * Penanganan UI (update tombol, skor, pesan, modal, resize canvas, skala game).
    * Logika layar konfigurasi (`populateMutationMethods`, `setupConfigScreenListeners`).
    * Inisialisasi awal (`window.onload`).

### Logika Inti

* **Fisika Drone (`baseDrone.update`):** Simulasi fisika dasar mencakup gravitasi, dorongan (thrust) dari dua booster yang sudutnya bisa diatur, hambatan udara (drag), batas kecepatan maksimum, dan konsumsi energi saat thrust. Kolisi dengan batas canvas juga ditangani di sini.
* **AI (Neataptic):**
    * **Inisialisasi (`initializeNeat`):** Membuat instance `Neat` dengan jumlah input (15 sensor: jarak dinding/lantai, kecepatan, jarak rintangan, health, energi, arah target) dan output (thrust, rotasi). Konfigurasi NEAT (rate/amount mutasi, elitisme, metode mutasi) diambil dari objek `CONFIG`.
    * **Aktivasi (`runAiGeneration`):** Nilai sensor drone saat ini dimasukkan ke jaringan syaraf (`genome.activate(inputs)`), menghasilkan output untuk thrust dan rotasi.
    * **Evolusi (`evolvePopulation`):** Setelah semua drone dalam satu generasi mati, populasi diurutkan berdasarkan skor fitness. Genome terbaik disimpan (`bestGenomeEver`). Populasi baru dibuat melalui elitisme (mempertahankan yang terbaik) dan offspring (hasil persilangan dan mutasi dari genome terpilih), lalu dimutasi lagi.
    * **Fitness:** Skor fitness drone dihitung dalam `baseDrone.update`. Faktor utamanya adalah waktu bertahan hidup, ditambah bonus/penalti untuk: mendekati target, berada di zona aman, berada di ketinggian ideal, mengumpulkan target, dan dikurangi penalti jika dekat dinding/lantai.
* **Sistem Target (`spawnSingleTarget`, `updateTargetSystem`, `drawTarget`, logika koleksi di `gameLoop`):** Satu target muncul di lokasi acak. Target memiliki waktu hidup terbatas. Jika diambil atau waktu habis, target hilang, dan cooldown dimulai sebelum target baru muncul. Drone yang mengambil mendapat reward health/energi.
* **Sistem Partikel:** Fungsi terpisah untuk membuat, memperbarui, dan menggambar partikel untuk efek visual saat target diambil atau drone hancur.
* **Layar Konfigurasi:** Menggunakan elemen input HTML (slider, checkbox) untuk mengubah nilai dalam objek global `CONFIG` sebelum game dimulai.

### Permasalahan & Solusi Selama Pengembangan

* **Bug Tombol "Mulai Game" Tidak Berfungsi:**
    * *Masalah:* Event listener klik tidak terpasang atau tidak terpicu dengan benar pada tombol "Mulai Game" di layar konfigurasi.
    * *Solusi:* Dilakukan debugging menggunakan `console.log` untuk memastikan: (1) Fungsi `setupConfigScreenListeners` terpanggil saat `window.onload`. (2) Elemen tombol (`startGameButton`) berhasil ditemukan oleh `getElementById`. (3) Event listener berhasil ditambahkan. (4) Fungsi handler event listener terpanggil saat tombol diklik. Ini membantu mengisolasi masalah pada urutan eksekusi atau kesalahan referensi elemen.
* **Bug Drone Menghilang Saat Training:**
    * *Masalah:* Drone terkadang menghilang dari canvas secara tiba-tiba, menghentikan update statistik meskipun proses training seolah masih berjalan. Ini diduga kuat disebabkan oleh perhitungan fisika yang menghasilkan nilai `NaN` (Not a Number) pada koordinat (x, y) atau kecepatan (vx, vy) drone. Nilai `NaN` membuat drone tidak bisa digambar dan bisa mengganggu logika game loop.
    * *Solusi:* Menambahkan pemeriksaan `isNaN` di dalam metode `baseDrone.update` setelah perhitungan posisi baru. Jika `NaN` terdeteksi pada `x`, `y`, `vx`, atau `vy`, drone tersebut langsung ditandai sebagai tidak aktif (`alive = false`) dan pesan error dicatat di konsol. Ini mencegah drone `NaN` menyebabkan masalah lebih lanjut dan memungkinkan generasi AI untuk tetap berlanjut dengan benar.
* **Perubahan Sistem Target (Iteratif):**
    * *Masalah:* Desain sistem target mengalami beberapa kali perubahan berdasarkan permintaan: dari satu target -> banyak target ditugaskan -> satu target dengan lifetime -> kembali ke banyak target non-assigned dengan refresh -> kembali ke satu target dengan lifetime dan interval spawn.
    * *Solusi (Final v16):* Mengimplementasikan sistem target tunggal (`currentTarget`). Target memiliki `targetLifetimeTimer`. Jika timer habis atau target diambil, `currentTarget` di-reset menjadi `null`, dan `targetSpawnCooldown` dimulai. Setelah cooldown selesai, `spawnSingleTarget` dipanggil untuk membuat target baru di lokasi acak dan mereset `targetLifetimeTimer`. Logika koleksi dipindahkan ke `gameLoop` untuk memeriksa tabrakan antara drone aktif (manual/AI/playback) dengan `currentTarget`. Sensor AI diubah untuk selalu mendeteksi arah ke `currentTarget` jika ada. Konfigurasi untuk interval spawn dan lifetime ditambahkan kembali.

### Keterbatasan & Pengembangan Selanjutnya

* **Performa:** Dengan populasi AI yang besar, terutama dengan motion blur aktif dan pencarian target terdekat (meskipun sekarang target tunggal), performa bisa menurun. Optimasi lebih lanjut mungkin diperlukan (misalnya, quadtree untuk deteksi kolisi, optimasi penggambaran).
* **Kompleksitas AI:** AI saat ini relatif sederhana. Bisa dikembangkan dengan menambahkan lebih banyak sensor (misalnya, kecepatan relatif target, sudut ke target) atau menggunakan struktur jaringan yang lebih kompleks.
* **Variasi Target:** Bisa ditambahkan jenis target berbeda dengan reward bervariasi atau efek berbeda.
* **Preset Konfigurasi:** Menambahkan tombol preset (misalnya, "Mudah", "Sulit", "Fokus Target") di layar konfigurasi untuk memudahkan pengguna awam.
* **Penyimpanan Lokal:** Menyimpan konfigurasi terakhir atau model AI terbaik secara otomatis di Local Storage browser.

## Cara Menjalankan

1.  Unduh file HTML.
2.  Buka file HTML tersebut menggunakan browser web modern (Chrome, Firefox, Edge, dll.).
3.  Atur konfigurasi di layar awal atau gunakan default.
4.  Klik "Mulai Game".
5.  Gunakan kontrol yang dijelaskan di bagian "Cara Bermain Manual" atau mulai pelatihan AI dengan tombol [T].

