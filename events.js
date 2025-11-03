const events = [
    {
        title: "Royal Wedding Package",
        category: "Wedding",
        date: "2025-10-15",
        desc: "Celebrate your special day with our luxurious wedding package, including banquet, decor, and honeymoon suite."
    },
    {
        title: "Business Leadership Conference",
        category: "Business",
        date: "2025-11-05",
        desc: "Join industry leaders for a day of networking, workshops, and keynote speeches in our grand ballroom."
    },
    {
        title: "Gourmet Food Festival",
        category: "Food",
        date: "2025-10-28",
        desc: "Taste culinary delights from around the world, prepared by our award-winning chefs."
    },
    {
        title: "Live Jazz Night",
        category: "Music",
        date: "2025-10-20",
        desc: "Enjoy an evening of live jazz music and signature cocktails at our rooftop lounge."
    },
    {
        title: "Spa & Wellness Retreat",
        category: "Spa",
        date: "2025-11-12",
        desc: "Relax and rejuvenate with exclusive spa treatments and wellness workshops."
    },
    {
        title: "Diwali Celebration",
        category: "Holiday",
        date: "2025-11-01",
        desc: "Join us for a festive Diwali evening with traditional food, music, and fireworks."
    },
    {
        title: "City Heritage Tour",
        category: "Tour",
        date: "2025-10-22",
        desc: "Explore the city's rich history with our guided heritage tour, starting from the hotel lobby."
    },
    {
        title: "Infinity Pool Party",
        category: "Party",
        date: "2025-10-25",
        desc: "Dive into fun at our infinity pool party with live DJ, snacks, and games."
    }
];

// Category color mapping
const categoryColors = {
    "Wedding": "#e17055",
    "Business": "#0984e3",
    "Food": "#00b894",
    "Music": "#6c5ce7",
    "Spa": "#00bfae",
    "Holiday": "#fdcb6e",
    "Tour": "#636e72",
    "Party": "#fd79a8"
};

function renderEvents(filterText = "", filterCategory = "") {
    const list = document.getElementById('eventsList');
    if (!list) return;
    let filtered = events.filter(ev => {
        const matchText = ev.title.toLowerCase().includes(filterText) || ev.desc.toLowerCase().includes(filterText);
        const matchCat = !filterCategory || ev.category === filterCategory;
        return matchText && matchCat;
    });
    if (filtered.length === 0) {
        list.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#888;">No events found.</div>`;
        return;
    }
    list.innerHTML = filtered.map((ev, idx) => `
        <div class="event-card" style="border-left-color:${categoryColors[ev.category] || '#5f2c82'};animation-delay:${0.07*idx}s;">
            <div class="event-title">${ev.title}</div>
            <span class="event-category" style="background:${categoryColors[ev.category] || '#e0eafc'}10;color:${categoryColors[ev.category] || '#5f2c82'};">
                ${ev.category}
            </span>
            <span class="event-date">${new Date(ev.date).toLocaleDateString()}</span>
            <div class="event-desc">${ev.desc}</div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const search = document.getElementById('eventSearch');
    const category = document.getElementById('eventCategory');
    function update() {
        renderEvents(search.value.trim().toLowerCase(), category.value);
    }
    if (search && category) {
        search.addEventListener('input', update);
        category.addEventListener('change', update);
    }
    renderEvents();
});