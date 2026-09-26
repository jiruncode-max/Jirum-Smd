'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startLiveBtn');
    const stopBtn = document.getElementById('stopLiveBtn');
    const usernameInput = document.getElementById('liveStreamNameInput');
    const errorDiv = document.getElementById('liveBridgeError');
    const giftContainer = document.getElementById('floatingGiftContainer');

    let ws = null;

    // Fungsi untuk menampilkan notifikasi gift melayang
    function showFloatingGift(username, giftName, count, diamondCount) {
        const alertBox = document.createElement('div');
        alertBox.className = 'gift-alert';
        alertBox.innerHTML = `🎁 <strong>${username}</strong> mengirim <strong>${giftName}</strong> (x${count}) [${diamondCount} Diamonds]`;
        
        giftContainer.appendChild(alertBox);

        // Hapus otomatis setelah 4 detik
        setTimeout(() => {
            alertBox.remove();
        }, 4000);
    }

    // Tombol Mulai Koneksi
    startBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (!username) {
            errorDiv.textContent = 'Silakan masukkan username TikTok terlebih dahulu!';
            return;
        }

        errorDiv.textContent = '';
        console.log(`Menghubungkan ke live stream: ${username}`);

        // Simulasi Koneksi WebSocket Backend (Sesuaikan dengan endpoint backend Anda)
        // ws = new WebSocket('ws://localhost:8080');
        
        // Contoh trigger simulasi data masuk (bisa dihapus jika sudah pakai WS asli)
        alert('Terhubung! (Catatan: Sambungkan ke server WebSocket backend Anda untuk data real-time)');
    });

    // Tombol Putuskan Koneksi
    stopBtn.addEventListener('click', () => {
        if (ws) {
            ws.close();
            ws = null;
        }
        errorDiv.textContent = 'Koneksi diputus.';
        console.log('Koneksi WebSocket ditutup.');
    });

    // Memuat katalog auto-mode (opsional dari fetch lokal)
    async function loadAutoCatalog() {
        try {
            const response = await fetch('./assets/gifts.json');
            if (response.ok) {
                const data = await response.json();
                console.log('Katalog gift berhasil dimuat:', data);
            }
        } catch (e) {
            console.log('Menggunakan fallback data gift internal.');
        }
    }

    loadAutoCatalog();
});
