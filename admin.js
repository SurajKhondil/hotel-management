function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = '';
    document.getElementById('page-title').textContent = {
        'dashboard': 'Dashboard',
        'room-management': 'Room Management',
        'reservation-management': 'Reservation Management',
        'guest-management': 'Guest Management'
    }[tabId] || '';
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tabId}Tab`).classList.add('active');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Reservation Table: Fetch from backend
async function updateReservationTable() {
    const tbody = document.querySelector('#reservation-management table tbody');
    if (!tbody) return;
    const res = await fetch('https://hotel-management-2-i7o5.onrender.com/api/reservations');
    const reservations = await res.json();
    tbody.innerHTML = reservations.map(res => `
        <tr>
            <td>${res._id}</td>
            <td>${res.guestName}</td>
            <td>${res.roomType}</td>
            <td>${res.checkIn}</td>
            <td>${res.checkOut}</td>
            <td><span class="status-badge ${res.status}">${res.status}</span></td>
            <td>
                <button class="action-btn" title="Delete" onclick="deleteReservation('${res._id}')"><i class="fas fa-times"></i></button>
            </td>
        </tr>
    `).join('');
}

// Delete Reservation from backend
async function deleteReservation(id) {
    await fetch(`https://hotel-management-2-i7o5.onrender.com/api/reservations/${id}`, { method: 'DELETE' });
    updateReservationTable();
    updateDashboardCards();
}

// Guest Table: Fetch from backend
async function updateGuestTable() {
    const tbody = document.querySelector('#guest-management table tbody');
   if (!tbody) return;
    const res = await fetch('https://hotel-management-2-i7o5.onrender.com/api/guests');
    const guests = await res.json();
    tbody.innerHTML = guests.map(guest => `
        <tr>
            <td>${guest.fullName || ''}</td>
            <td>${guest.email || ''}</td>
            <td>${guest.phone || ''}</td>
            <td>${guest.roomType || ''}</td>
            <td>
                <button class="action-btn" title="Delete" onclick="deleteGuest('${guest._id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Delete Guest from backend
async function deleteGuest(id) {
    await fetch(`https://hotel-management-2-i7o5.onrender.com/api/guests/${id}`, { method: 'DELETE' });
    updateGuestTable();
}

// Dashboard Cards: Fetch reservations and update cards
async function updateDashboardCards() {
    const res = await fetch('https://hotel-management-2-i7o5.onrender.com/api/reservations');
    const reservations = await res.json();
    const today = new Date().toISOString().slice(0, 10);

    const checkInsToday = reservations.filter(r => r.checkIn === today).length;
   const checkOutsToday = reservations.filter(r => r.checkOut === today).length;
    const guestsInHouse = reservations.filter(r => r.checkIn <= today && r.checkOut >= today).length;

    if (document.getElementById('checkins-today')) {
        document.getElementById('checkins-today').textContent = checkInsToday;
    }
    if (document.getElementById('checkouts-today')) {
        document.getElementById('checkouts-today').textContent = checkOutsToday;
    }
    if (document.getElementById('guests-inhouse')) {
        document.getElementById('guests-inhouse').textContent = guestsInHouse;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    function updateDateTime() {
        const now = new Date();
        if (document.getElementById('current-date')) {
            document.getElementById('current-date').textContent = now.toLocaleDateString();
        }
        if (document.getElementById('current-time')) {
            document.getElementById('current-time').textContent = now.toLocaleTimeString();
        }
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = () => closeModal(btn.closest('.modal').id);
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    updateReservationTable();
    updateGuestTable();
    updateDashboardCards();
});