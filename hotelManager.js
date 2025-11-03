// Modal functionality
function initializeModals() {
    // Get all modals
    const modals = {
        room: document.getElementById('roomModal'),
        reservation: document.getElementById('reservationModal'),
        guest: document.getElementById('guestModal')
    };

    // Add click handlers for all close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = function() {
            const modal = btn.closest('.modal');
            if (modal) modal.style.display = 'none';
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Form submission handlers
    document.getElementById('roomForm').onsubmit = function(e) {
        e.preventDefault();
        // Handle room form submission
        console.log('Room form submitted');
        modals.room.style.display = 'none';
    }

    document.getElementById('reservationForm').onsubmit = function(e) {
        e.preventDefault();
        // Handle reservation form submission
        console.log('Reservation form submitted');
        modals.reservation.style.display = 'none';
    }

    document.getElementById('guestForm').onsubmit = function(e) {
        e.preventDefault();
        // Handle guest form submission
        console.log('Guest form submitted');
        modals.guest.style.display = 'none';
    }

    // Add click handlers for dashboard buttons
    document.querySelector('[data-section="rooms"]').onclick = () => modals.room.style.display = 'block';
    document.querySelector('[data-section="reservations"]').onclick = () => modals.reservation.style.display = 'block';
    document.querySelector('[data-section="guests"]').onclick = () => modals.guest.style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModals);