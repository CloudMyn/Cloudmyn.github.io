<?php
// Menerima permintaan pull backup dari client
$data = json_decode(file_get_contents("php://input"), true);

// Memeriksa PIN
$pinFromRequest = isset($data['pin']) ? $data['pin'] : null;
$validPin = "1234"; // PIN yang valid, sesuaikan dengan PIN yang digunakan di client
if ($pinFromRequest !== $validPin) {
    http_response_code(403);
    echo json_encode(array("success" => false, "error" => "Akses ditolak. PIN tidak valid."));
    exit();
}

// Mengambil file backup JSON dari server (misalnya, backup terbaru)
$backupFilename = "backup_latest.json"; // Sesuaikan dengan nama file backup yang ada di server
if (!file_exists($backupFilename)) {
    http_response_code(404);
    echo json_encode(array("success" => false, "error" => "Backup tidak ditemukan."));
    exit();
}

// Membaca isi file backup
$backupData = file_get_contents($backupFilename);

// Memberikan respons kepada client dengan data backup
echo json_encode(array("success" => true, "data" => $backupData));
