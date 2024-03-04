const app_status = 'development';

class DatabaseToko {

    get_table(nama_tabel) {
        this.table_name = nama_tabel;

        let db_tabel = localStorage.getItem(nama_tabel);

        if (!db_tabel) {
            console.error('get_table: tabel tidak ditemukan di database! ' + nama_tabel);
        }

        return this;
    }

    create_table(nama_tabel, columns = []) {
        this.table_name = nama_tabel;

        let db_tabel = localStorage.getItem(nama_tabel);

        if (!db_tabel) {

            if (columns.length == 0) {
                return console.error('create_table: harap masukan kolom tabel');
            }

            localStorage.setItem(nama_tabel, '[]');
            localStorage.setItem(nama_tabel + '_columns', columns.sort().join(','));

            this.tabel_finger_print = columns.sort().join(',');
        }

        console.warn('Tabel berhasil dibuat : ', nama_tabel);

        return this;
    }

    get_records() {
        return JSON.parse(localStorage.getItem(this.table_name, '[]'));
    }

    get_record_by_id(id) {
        let records = this.get_records();

        let found_record = {};

        for (let index = 0; index < records.length; index++) {
            if (index === id - 1) found_record = records[index];
        }

        return found_record;
    }

    get_record_by(column_name, value_name) {
        let records = this.get_records();

        let found_records = [];

        for (let index = 0; index < records.length; index++) {
            var regex = new RegExp(value_name, 'i');
            let _data = records[index][column_name].toString();
            if (_data.match(regex)) found_records.push(records[index]);
        }

        return found_records;
    }

    add_record(data) {

        let records = this.get_records();

        let id = records.length + 1;

        this._validate_table_colums(data);

        data['id'] = id;
        data['tgl_buat'] = this.format_date(new Date());
        data['tgl_update'] = this.format_date(new Date());

        records.push(data);

        localStorage.setItem(this.table_name, JSON.stringify(records));
    }

    add_records(new_records) {

        let records = this.get_records();

        let id = records.length + 1;

        for (let index = 0; index < new_records.length; index++) {
            let data = new_records[index];

            this._validate_table_colums(data);

            let date = new Date();

            let day_to_add = 0;

            date.setDate(date.getDate() + day_to_add);

            data['id'] = id;
            data['tgl_buat'] = this.format_date(date);
            data['tgl_update'] = this.format_date(date);

            records.push(data);

            id++;
        }

        localStorage.setItem(this.table_name, JSON.stringify(records));
    }

    _validate_table_colums(data) {
        if (typeof data !== 'object') {
            return console.log('database_table: tabel tidak valid!')
        }

        let keys = Object.keys(data).sort().join(',');

        let table_colums = localStorage.getItem(this.table_name + '_columns');

        if (keys !== table_colums) {
            let msg = 'Terjadi kesalahan, kolom table ' + this.table_name + ' tidak sesuai, harap cek kolom yg anda masukan \n Kolom Tabel :\n' + table_colums + '\n Kolom Data : \n' + keys;

            throw new Error(msg);
        }
    }

    update_record(id, new_data) {
        let record = this.get_record_by_id(id);

        if (!record) {
            throw new Error(`Data di table ${this.table_name} dengan id = ${id} tidak ditemukan!`);
        }

        let records = this.get_records();

        this._validate_table_colums(new_data);

        new_data['id'] = id;
        new_data['tgl_buat'] = record['tgl_buat'];
        new_data['tgl_update'] = this.format_date(new Date());

        records[id <= 0 ? 0 : id - 1] = new_data;

        localStorage.setItem(this.table_name, JSON.stringify(records));
    }

    remove_record(id) {
        let records = this.get_records();

        let new_records = [];
        for (let index = 0; index < records.length; index++) {
            if (records[index]['id'] == id) continue;
            else new_records.push(records[index])
        }

        localStorage.setItem(this.table_name, JSON.stringify(new_records));
    }

    flush() {
        localStorage.clear();
    }

    drop_table() {
        localStorage.removeItem(this.table_name);
        localStorage.removeItem(this.table_name + '_columns');
    }

    group_by_date() {
        let records = this.get_records();

        let groupedData = [];

        records.forEach(function (item) {
            var date = new Date(item['tgl_buat']);
            var formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            if (!groupedData[formattedDate]) {
                groupedData[formattedDate] = [];
            }
            groupedData[formattedDate].push(item);
        });

        return groupedData;
    }


    format_date(date) {
        var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var months = ['Januaru', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        var dayOfWeek = days[date.getDay()];
        var dayOfMonth = date.getDate();
        var month = this.shortenMonth(months[date.getMonth()]);
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // Tambahkan nol di depan bilangan tunggal
        if (dayOfMonth < 10) dayOfMonth = '0' + dayOfMonth;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        return dayOfWeek + ', ' + dayOfMonth + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    }


    shortenMonth(month) {
        return month.slice(0, 3);
    }

    forgot() {
        this.table_name = '';
    }

}


function format_money(inputValue) {
    // Remove non-numeric characters
    inputValue = inputValue.toString().replace(/[^0-9]/g, '');

    // Format the number with commas
    inputValue = Number(inputValue).toLocaleString();

    // Update the input value
    return "Rp " + inputValue;
}

function unformat_money(formattedValue) {
    // Remove non-numeric characters including commas and currency symbol
    var unformattedValue = formattedValue.toString().replace(/[^\d.-]/g, '');

    // Convert the formatted string back to a number
    return parseInt(unformattedValue);
}


function number_field(el) {
    el.value = format_money(el.value);
}


function set_up_table() {
    window.db = new DatabaseToko();

    create_tabel_barang();

    create_tabel_penjualan_barang();
}


function create_tabel_barang() {
    let db = new DatabaseToko();

    window.tabel_barang = db.create_table('tabel_barang', ['nama', 'deskripsi', 'stock', 'harga_beli', 'harga_jual']);
}


function create_tabel_penjualan_barang() {
    let db = new DatabaseToko();

    window.tabel_penjualan_barang = db.create_table('tabel_penjualan_barang', ['nama', 'qty', 'pembeli', 'harga_barang', 'total_transaksi', 'id_barang']);
}

function getLocalStorageSize() {
    var totalSize = 0;

    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            // Calculate the size of each key-value pair
            totalSize += (key.length + localStorage[key].length) * 2; // 2 bytes per character for UTF-16 encoding
        }
    }

    // Convert bytes to kilobytes (1 KB = 1024 bytes)
    var sizeInKB = totalSize / 1024;

    return sizeInKB.toFixed(2); // Return size rounded to 2 decimal places
}


set_up_table();


function __fake_data_barang() {

    let example_data_barang = [
        {
            nama: 'Implora Brightening Serum',
            deskripsi: 'Serum mencerahkan wajah',
            stock: Math.floor(Math.random() * 100) + 1, // Stock antara 1-100
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Sensitivex Moisturizing Cream',
            deskripsi: 'Krim pelembab untuk kulit sensitif',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'GlamGlow Supermud Clearing Treatment',
            deskripsi: 'Masker untuk membersihkan pori-pori',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Maybelline Fit Me Matte + Poreless Foundation',
            deskripsi: 'Foundation matte untuk kulit berminyak',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Neutrogena Hydro Boost Water Gel',
            deskripsi: 'Pelembab wajah berbasis gel',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'MAC Ruby Woo Lipstick',
            deskripsi: 'Lipstik matte dengan warna merah cerah',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'The Ordinary Niacinamide 10% + Zinc 1% Serum',
            deskripsi: 'Serum untuk mengurangi jerawat dan meratakan warna kulit',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Urban Decay Naked Heat Eyeshadow Palette',
            deskripsi: 'Palet eyeshadow dengan warna hangat',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'CeraVe Hydrating Facial Cleanser',
            deskripsi: 'Pembersih wajah dengan formula lembut',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Anastasia Beverly Hills Dipbrow Pomade',
            deskripsi: 'Pomade untuk membentuk alis',
            stock: Math.floor(Math.random() * 100) + 1,
            harga_jual: Math.floor(Math.random() * 50000) + 30000,
            harga_beli: Math.floor(Math.random() * 25000) + 1000,
        },
        {
            nama: 'Meja Makan Kayu Jati',
            deskripsi: 'Meja makan berbahan kayu jati dengan desain minimalis',
            stock: Math.floor(Math.random() * 50) + 1,
            harga_jual: Math.floor(Math.random() * 2000000) + 1000000,
            harga_beli: Math.floor(Math.random() * 1000000) + 500000,
        },
        {
            nama: 'Sofa L-Shaped',
            deskripsi: 'Sofa sudut berbahan kain yang nyaman',
            stock: Math.floor(Math.random() * 30) + 1,
            harga_jual: Math.floor(Math.random() * 3000000) + 1500000,
            harga_beli: Math.floor(Math.random() * 1500000) + 700000,
        },
        {
            nama: 'Lemari Pakaian 3 Pintu',
            deskripsi: 'Lemari pakaian berbahan kayu dengan 3 pintu dan 2 laci',
            stock: Math.floor(Math.random() * 40) + 1,
            harga_jual: Math.floor(Math.random() * 2500000) + 1200000,
            harga_beli: Math.floor(Math.random() * 1200000) + 600000,
        },
        {
            nama: 'Kursi Kantor Ergonomis',
            deskripsi: 'Kursi kantor dengan desain ergonomis untuk kenyamanan bekerja',
            stock: Math.floor(Math.random() * 20) + 1,
            harga_jual: Math.floor(Math.random() * 1500000) + 800000,
            harga_beli: Math.floor(Math.random() * 800000) + 400000,
        },
        {
            nama: 'Rak Buku Minimalis',
            deskripsi: 'Rak buku berbahan kayu dengan desain minimalis',
            stock: Math.floor(Math.random() * 60) + 1,
            harga_jual: Math.floor(Math.random() * 800000) + 400000,
            harga_beli: Math.floor(Math.random() * 400000) + 200000,
        },
        {
            nama: 'Kompor Gas 2 Tungku',
            deskripsi: 'Kompor gas dengan 2 tungku untuk memasak',
            stock: Math.floor(Math.random() * 25) + 1,
            harga_jual: Math.floor(Math.random() * 500000) + 200000,
            harga_beli: Math.floor(Math.random() * 200000) + 100000,
        },
        {
            nama: 'Panci Set Stainless Steel',
            deskripsi: 'Set panci berbahan stainless steel dengan pegangan anti panas',
            stock: Math.floor(Math.random() * 35) + 1,
            harga_jual: Math.floor(Math.random() * 600000) + 300000,
            harga_beli: Math.floor(Math.random() * 300000) + 150000,
        },
        {
            nama: 'Lampu Tidur LED',
            deskripsi: 'Lampu tidur dengan lampu LED hemat energi',
            stock: Math.floor(Math.random() * 50) + 1,
            harga_jual: Math.floor(Math.random() * 200000) + 80000,
            harga_beli: Math.floor(Math.random() * 80000) + 40000,
        },
        {
            nama: 'Cermin Dinding Bulat',
            deskripsi: 'Cermin dinding berbentuk bulat dengan bingkai kayu',
            stock: Math.floor(Math.random() * 40) + 1,
            harga_jual: Math.floor(Math.random() * 500000) + 200000,
            harga_beli: Math.floor(Math.random() * 200000) + 100000,
        },
        {
            nama: 'Rak Piring Aluminium',
            deskripsi: 'Rak piring berbahan aluminium untuk menyimpan piring',
            stock: Math.floor(Math.random() * 30) + 1,
            harga_jual: Math.floor(Math.random() * 300000) + 150000,
            harga_beli: Math.floor(Math.random() * 150000) + 75000,
        },
        {
            nama: 'Kursi Lipat Outdoor',
            deskripsi: 'Kursi lipat yang cocok untuk digunakan di luar ruangan',
            stock: Math.floor(Math.random() * 20) + 1,
            harga_jual: Math.floor(Math.random() * 500000) + 200000,
            harga_beli: Math.floor(Math.random() * 200000) + 100000,
        },
        {
            nama: 'Gantungan Baju Kayu',
            deskripsi: 'Gantungan baju dengan pegangan kayu alami',
            stock: Math.floor(Math.random() * 50) + 1,
            harga_jual: Math.floor(Math.random() * 100000) + 50000,
            harga_beli: Math.floor(Math.random() * 50000) + 25000,
        },
        {
            nama: 'Kipas Angin Meja',
            deskripsi: 'Kipas angin berukuran kecil yang cocok untuk meja',
            stock: Math.floor(Math.random() * 30) + 1,
            harga_jual: Math.floor(Math.random() * 200000) + 100000,
            harga_beli: Math.floor(Math.random() * 100000) + 50000,
        },
        {
            nama: 'Tempat Tidur Anak Tingkat',
            deskripsi: 'Tempat tidur anak dengan desain tingkat yang dapat menyimpan ruang',
            stock: Math.floor(Math.random() * 25) + 1,
            harga_jual: Math.floor(Math.random() * 1500000) + 800000,
            harga_beli: Math.floor(Math.random() * 800000) + 400000,
        },
        {
            nama: 'Tabung Gas 12 Kg',
            deskripsi: 'Tabung gas ukuran 12 kg untuk memasak',
            stock: Math.floor(Math.random() * 20) + 1,
            harga_jual: Math.floor(Math.random() * 400000) + 200000,
            harga_beli: Math.floor(Math.random() * 200000) + 100000,
        }
    ];

    let confirm_ = confirm('Apakah anda yakin ingin, men-generate data barang?')

    if (!confirm_) return;

    tabel_barang.add_records(example_data_barang);

    iziToast.success({
        title: 'Berhasil',
        message: `${example_data_barang.length} data barang berhasil ditambahkan`
    });
}

// Fungsi untuk melakukan backup localStorage dan mengirimkannya melalui AJAX
function backupLocalStorage(pin) {
    // Mendapatkan data dari localStorage
    var localStorageData = JSON.stringify(localStorage);

    // Mengirim data ke server menggunakan AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "backup.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Backup telah berhasil dikirim.");
            } else {
                console.error("Backup gagal: " + xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify({ pin: pin, data: localStorageData }));
}


// Fungsi untuk menarik (pull) backup dari server
function pullBackup(pin) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "pull_backup.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if (responseData.success) {
                    // Data berhasil ditarik dari server
                    var localStorageData = JSON.parse(responseData.data);
                    // Memulihkan data ke localStorage
                    for (var key in localStorageData) {
                        if (localStorageData.hasOwnProperty(key)) {
                            localStorage.setItem(key, localStorageData[key]);
                        }
                    }
                    console.log("Backup berhasil dipulihkan.");
                } else {
                    console.error("Gagal menarik backup: " + responseData.error);
                }
            } else {
                console.error("Gagal menarik backup: " + xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify({ pin: pin }));
}

// // Contoh penggunaan:
// var pin = "1234";
// pullBackup(pin);
// backupLocalStorage(pin);


// Fungsi untuk mendapatkan nama hari berdasarkan indeks
function getDayName(dayIndex) {
    var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[dayIndex];
}

// Fungsi untuk mendapatkan nama bulan berdasarkan indeks
function getMonthName(monthIndex) {
    var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return months[monthIndex];
}