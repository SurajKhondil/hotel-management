document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const booking = {
            guestName: form.elements['firstName'].value + ' ' + form.elements['lastName'].value,
            roomType: form.elements['roomType'].value,
            checkIn: form.elements['checkIn'].value,
            checkOut: form.elements['checkOut'].value,
            guestCount: 1,
            status: 'pending',
            email: form.elements['email'].value,
            phone: form.elements['phone'].value,
            specialRequests: form.elements['specialRequests'].value
        };

        // Send reservation to backend
        await fetch('https://hotel-management-2-i7o5.onrender.com/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        // Optionally, also send guest info to backend
        const guest = {
            fullName: booking.guestName,
            email: booking.email,
            phone: booking.phone,
            roomType: booking.roomType
        };
        await fetch('https://hotel-management-2-i7o5.onrender.com/api/guests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guest)
        });

        alert('Booking submitted!');
        form.reset();
    });
});