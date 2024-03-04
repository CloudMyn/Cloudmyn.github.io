<?php
// Menerima data dari client
$data = json_decode(file_get_contents("php://input"), true);

// Memeriksa PIN
$pinFromRequest = isset($data['pin']) ? $data['pin'] : null;
$validPin = "1234"; // PIN yang valid, sesuaikan dengan PIN yang digunakan di client
if ($pinFromRequest !== $validPin) {
    http_response_code(403);
    echo "Akses ditolak. PIN tidak valid.";
    exit();
}

// Membuat file JSON untuk menyimpan backup data
$backupFilename = "backup_" . date("Y-m-d_H-i-s") . ".json";
file_put_contents($backupFilename, $data['data']);

// Memberikan respons berhasil kepada client
echo "Backup telah berhasil diterima dan disimpan sebagai file: $backupFilename";
?>
