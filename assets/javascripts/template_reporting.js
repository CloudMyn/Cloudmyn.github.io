const idElement = document.getElementById('barang_id_value');
const nameElement = document.getElementById('barang_name_value');
const descElement = document.getElementById('barang_desc_value');
const stockElement = document.getElementById('barang_stock_value');
const hargaBeliElement = document.getElementById('barang_harga_beli_value');
const hargaJualElement = document.getElementById('barang_harga_jual_value');

function get_data_penjualan_barang() {

    const tabel_penjulan_per_tanggal = document.getElementById('tabel_penjulan_per_tanggal');

    const db = new DatabaseToko();

    const db1 = new DatabaseToko();

    let tabel_barang = db1.get_table('tabel_barang');

    let tabel_penjualan_barang = db.get_table('tabel_penjualan_barang');

    let records_by_date = tabel_penjualan_barang.group_by_date();

    let el_records = [];

    for (let date in records_by_date) {
        let records = records_by_date[date];

        let sum_jumlah_trx = records.length;
        let sum_penjualan = 0;
        let sum_total_trx = 0;
        let sum_keuntungan = 0;

        for (let x in records) {
            let record = records[x];

            let data_barang = tabel_barang.get_record_by_id(record['id_barang']);

            let harga_beli_barang = unformat_money(data_barang['harga_beli']) ;

            sum_penjualan += parseInt(record['qty']);
            sum_total_trx += parseInt(record['total_transaksi']);
            sum_keuntungan += (harga_beli_barang * parseInt(record['qty'])) - parseInt(record['total_transaksi']);
        }

        el_records.push(`<tr>
                    <td>${date}</td>
                    <td>${sum_penjualan}</td>
                    <td>${sum_jumlah_trx}</td>
                    <td>${format_money(sum_total_trx)}</td>
                    <td>${format_money(sum_keuntungan)}</td>
                </tr>`);

        tabel_penjulan_per_tanggal.innerHTML = el_records.join('');

    }

}

function get_data_barang() {
    const id_barang = get_id_barang_from_url();
    const db = new DatabaseToko();

    let tabel_barang = db.get_table('tabel_barang');

    const data_barang = tabel_barang.get_record_by_id(id_barang);

    idElement.innerText = data_barang['id'];
    nameElement.innerText = data_barang['nama'];
    descElement.innerText = data_barang['deskripsi'];
    stockElement.innerText = data_barang['stock'] + ' pcs';
    hargaBeliElement.innerText = format_money(data_barang['harga_beli']);
    hargaJualElement.innerText = format_money(data_barang['harga_jual']);

}

function get_penjualan_barang() {
    let harga_beli_barang = unformat_money(hargaBeliElement.innerText);

    const tabel_record_penjualan = document.getElementById('tabel_record_penjualan');

    const penjual_total_qty = document.getElementById('penjual_total_qty');
    const penjualan_total_trx = document.getElementById('penjualan_total_trx');
    const penjualan_total_keuntungan = document.getElementById('penjualan_total_keuntungan');

    const id_barang = get_id_barang_from_url();
    const db = new DatabaseToko();

    let tabel_penjualan_barang = db.get_table('tabel_penjualan_barang');

    let records = tabel_penjualan_barang.get_record_by('id_barang', id_barang);

    let rows = [];

    let sum_qty = 0, sum_trx = 0, sum_harga_barang = 0;

    for (let i in records) {
        let data = records[i];

        sum_qty += parseInt(data['qty']);

        sum_trx += parseInt(data['total_transaksi']);

        sum_harga_barang += harga_beli_barang * parseInt(data['qty']);

        rows.push(get_row_table_element(data));
    }

    penjual_total_qty.innerText = sum_qty;

    penjualan_total_trx.innerText = format_money(sum_trx);

    penjualan_total_keuntungan.innerText = format_money(sum_harga_barang - sum_trx);

    console.log(format_money(sum_trx), format_money(sum_harga_barang));

    tabel_record_penjualan.innerHTML = rows.join('');

}


function get_row_table_element(data) {
    let harga_barang = format_money(data['harga_barang']);
    let total_transaksi = format_money(data['total_transaksi']);
    return ` <tr>
                <td>${data['id']}</td>
                <td>${data['pembeli']}</td>
                <td>${data['qty']}</td>
                <td>${harga_barang}</td>
                <td>${total_transaksi}</td>
                <td>${data['tgl_buat']}</td>
            </tr>`;
}


function get_id_barang_from_url() {
    const urlParams = new URLSearchParams(window.location.search);
    const idBarang = urlParams.get('id_barang');
    if (!idBarang) {
        alert('Parameter id_barang tidak ditemukan dalam URL.');
    }
    return idBarang;
}

function generatePDF(nama_file = 'laporan_tokoku.pdf') {
    const generatePDFButton = document.getElementById('generatePDFButton');
    generatePDFButton.style.display = 'none';

    const pdf = new jsPDF();
    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 0, 0, imgWidth, imgHeight);
        pdf.save(nama_file);


        generatePDFButton.style.display = 'inline-block';
    });

}

function updateDateElements() {
    // Buat objek tanggal
    var currentDate = new Date();

    // Daftar nama hari
    var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    // Ambil tanggal, bulan, dan tahun
    var day = days[currentDate.getDay()];
    var date = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Month dimulai dari 0, jadi perlu ditambah 1
    var year = currentDate.getFullYear();

    // Format tanggal sesuai dengan permintaan
    var formattedDate = day + " " + date + " ";

    // Daftar nama bulan
    var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    // Tambahkan nama bulan
    formattedDate += months[month - 1] + " " + year;

    // Dapatkan semua elemen dengan kelas "date-element"
    var dateElements = document.getElementsByClassName("date-element");

    // Loop melalui semua elemen dan ubah teksnya
    for (var i = 0; i < dateElements.length; i++) {
        dateElements[i].textContent = formattedDate;
    }
}

// Panggil fungsi untuk mengupdate elemen
updateDateElements();
