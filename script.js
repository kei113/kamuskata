// --- DATA KAMUS ---
// Data harus diurutkan berdasarkan 'indonesia' untuk pencarian awal.

// --- LOGIKA APLIKASI ---

// Variabel untuk menyimpan data yang sudah diurutkan berdasarkan bahasa Inggris
let kamusInggrisIndonesia;

// Variabel untuk melacak mode terjemahan saat ini
// true: ID -> EN, false: EN -> ID
let modeIndonesiaKeInggris = true;

// Mengambil elemen-elemen dari HTML
const inputKata = document.getElementById('input-kata');
const cariBtn = document.getElementById('cari-btn');
const swapBtn = document.getElementById('swap-btn');
const hasilTerjemahan = document.getElementById('hasil-terjemahan');
const bahasaSumberEl = document.getElementById('bahasa-sumber');
const bahasaTargetEl = document.getElementById('bahasa-target');

/**
 * Fungsi Binary Search
 * @param {Array} data - Array data kamus yang sudah terurut.
 * @param {string} kata - Kata yang ingin dicari.
 * @param {string} kunci - Kunci objek yang akan dicari ('indonesia' atau 'inggris').
 * @returns {Object|null} - Mengembalikan objek kata jika ditemukan, atau null.
 */
function binarySearch(data, kata, kunci) {
    let low = 0;
    let high = data.length - 1;
    kata = kata.toLowerCase();

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const kataTengah = data[mid][kunci];

        if (kataTengah === kata) {
            return data[mid];
        } else if (kataTengah < kata) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return null; // Kata tidak ditemukan
}

// Fungsi untuk melakukan pencarian
function lakukanPencarian() {
    const kataDicari = inputKata.value.trim();
    if (kataDicari === '') {
        hasilTerjemahan.innerHTML = '<p>Silakan masukkan sebuah kata.</p>';
        return;
    }

    let hasil;
    if (modeIndonesiaKeInggris) {
        hasil = binarySearch(dataKamus, kataDicari, 'indonesia');
        if (hasil) {
            hasilTerjemahan.innerHTML = `<p><strong>${hasil.inggris}</strong></p>`;
        } else {
            hasilTerjemahan.innerHTML = `<p>Kata tidak ditemukan.</p>`;
        }
    } else { // Mode Inggris ke Indonesia
        hasil = binarySearch(kamusInggrisIndonesia, kataDicari, 'inggris');
        if (hasil) {
            hasilTerjemahan.innerHTML = `<p><strong>${hasil.indonesia}</strong></p>`;
        } else {
            hasilTerjemahan.innerHTML = `<p>Word not found.</p>`;
        }
    }
}

// Fungsi untuk menukar bahasa
function tukarBahasa() {
    modeIndonesiaKeInggris = !modeIndonesiaKeInggris; // Balikkan mode

    // Tukar teks pada header
    const temp = bahasaSumberEl.textContent;
    bahasaSumberEl.textContent = bahasaTargetEl.textContent;
    bahasaTargetEl.textContent = temp;

    // Bersihkan input dan hasil
    inputKata.value = '';
    hasilTerjemahan.innerHTML = '<p>Hasil terjemahan akan muncul di sini.</p>';
    
    // Ubah placeholder
    if(modeIndonesiaKeInggris){
        inputKata.placeholder = 'Ketik kata untuk dicari...';
    } else {
        inputKata.placeholder = 'Type a word to search...';
    }
}

// --- EVENT LISTENERS ---

// Menambahkan event listener untuk tombol Cari
cariBtn.addEventListener('click', lakukanPencarian);

// Memungkinkan pencarian dengan menekan tombol 'Enter'
inputKata.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        lakukanPencarian();
    }
});

// Menambahkan event listener untuk tombol Tukar Bahasa
swapBtn.addEventListener('click', tukarBahasa);


// --- INISIALISASI ---
// Fungsi yang dijalankan saat halaman pertama kali dimuat
function inisialisasi() {
    // Buat salinan kamus dan urutkan berdasarkan bahasa Inggris
    // Ini diperlukan agar binary search bisa bekerja untuk mode EN -> ID
    kamusInggrisIndonesia = [...dataKamus].sort((a, b) => {
        if (a.inggris < b.inggris) return -1;
        if (a.inggris > b.inggris) return 1;
        return 0;
    });
}

// Panggil fungsi inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', inisialisasi);