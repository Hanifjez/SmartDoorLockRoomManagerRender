document.getElementById('keyCodeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat formulir disubmit

    const keyCode = document.getElementById('keyCodeInput').value;
    const description = document.getElementById('descriptionInput').value;
    const active = document.getElementById('activeInput').checked;

    try {
        const response = await fetch('/api/keycodes/newKeyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyCode, active, description })
        });

        const data = await response.json();
        document.getElementById('message').innerText = data.message;

        if (data.success) {
            loadKeyCodes(); // Memuat ulang daftar key codes setelah berhasil menambahkan
            document.getElementById('keyCodeForm').reset(); // Mengosongkan form setelah submit
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Error adding key code!';
    }
});

// Fungsi untuk memuat semua key codes dengan tombol hapus
async function loadKeyCodes() {
    try {
        const response = await fetch('/api/keycodes');
        const data = await response.json();
        const keyCodeList = document.getElementById('keyCodeList');
        keyCodeList.innerHTML = ''; // Kosongkan daftar sebelum menambah yang baru

        if (data.success) {
            data.keyCodes.forEach((keyCode) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${keyCode.keyCode} - ${keyCode.description} (Active: ${keyCode.active})
                    <button onclick="deleteKeyCode('${keyCode.keyCode}')">🗑️</button>
                `;
                keyCodeList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error loading key codes:', error);
    }
}

// Fungsi untuk menghapus key code
async function deleteKeyCode(keyCode) {
    try {
        const response = await fetch(`/api/keycodes/${keyCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        document.getElementById('message').innerText = data.message;

        if (data.success) {
            loadKeyCodes(); // Memuat ulang daftar key codes setelah berhasil dihapus
        }
    } catch (error) {
        console.error('Error deleting key code:', error);
        document.getElementById('message').innerText = 'Error deleting key code!';
    }
}

// Memuat key codes saat halaman dimuat
window.onload = loadKeyCodes;
