'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startLiveBtn');
    const stopBtn = document.getElementById('stopLiveBtn');
    const usernameInput = document.getElementById('liveStreamNameInput');
    const errorDiv = document.getElementById('liveBridgeError');
    const giftContainer = document.getElementById('floatingGiftContainer');
    const giftHistoryList = document.getElementById('giftHistoryList');
    const giftHistoryPage = document.getElementById('giftHistoryPage');

    let isConnected = false;

    // Fungsi untuk menampilkan notifikasi gift melayang di layar
    function showFloatingGift(username, giftName, count, diamondCount) {
        if (!giftContainer) return;

        const alertBox = document.createElement('div');
        alertBox.className = 'gift-alert';
        alertBox.innerHTML = `🎁 <strong>${username}</strong> mengirim <strong>${giftName}</strong> (x${count}) [💎 ${diamondCount}]`;
        
        giftContainer.appendChild(alertBox);

        // Tambahkan ke riwayat gift jika elemennya ada
        if (giftHistoryList && giftHistoryPage) {
            giftHistoryPage.classList.remove('hidden');
            const li = document.createElement('li');
            li.textContent = `${username} mengirim ${giftName} x${count} (${diamondCount} diamonds)`;
            giftHistoryList.prepend(li);
        }

        // Hapus otomatis setelah 4 detik
        setTimeout(() => {
            alertBox.remove();
        }, 4000);
    }

    // Tombol Mulai Hubungkan
    startBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (!username) {
            errorDiv.textContent = 'Silakan masukkan username TikTok terlebih dahulu!';
            return;
        }

        errorDiv.textContent = '';
        isConnected = true;
        
        // Ubah indikator atau berikan info bahwa sistem siap memantau
        errorDiv.style.color = '#4caf50';
        errorDiv.textContent = `Berhasil mengaktifkan pemantauan untuk akun: ${username}`;
        
        console.log(`Memulai koneksi live untuk: ${username}`);
        
        // Contoh simulasi test gift otomatis setelah 2 detik terhubung (bisa dihapus nanti)
        setTimeout(() => {
            if (isConnected) {
                showFloatingGift(username.replace('@', ''), 'Rose', 1, 1);
            }
        }, 2000);
    });

    // Tombol Putuskan Koneksi
    stopBtn.addEventListener('click', () => {
        isConnected = false;
        errorDiv.style.color = '#ff5252';
        errorDiv.textContent = 'Koneksi diputus.';
        console.log('Koneksi dihentikan.');
    });

    // Memuat data pendukung jika ada
    async function initApp() {
        try {
            console.log('Aplikasi siap digunakan.');
        } catch (e) {
            console.error('Terjadi kesalahan inisialisasi:', e);
        }
    }

    initApp();
});
