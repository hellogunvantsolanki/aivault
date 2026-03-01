// --- ELEMENTS ---
const searchInput = document.getElementById('toolSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.category-section');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('noResults');
const resetBtn = document.getElementById('resetBtn');

// --- CORE FILTER LOGIC ---
function updateGallery() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.filter-btn.active').textContent.toLowerCase();
    
    let visibleCount = 0;

    // 1. Filter Individual Cards
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();

        const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
        const matchesCategory = (activeCategory === 'all' || category === activeCategory);

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = "1", 10);
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = "0";
        }
    });

    // 2. Hide Empty Sections (Headings)
    sections.forEach(section => {
        const sectionHasCards = Array.from(section.querySelectorAll('.card'))
            .some(c => c.style.display === 'block');
        
        section.style.display = sectionHasCards ? 'block' : 'none';
    });

    // 3. Toggle "No Results" state
    noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
}

// --- EVENT LISTENERS ---

// Search input typing
searchInput.addEventListener('input', updateGallery);

// Category button clicking
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Switch active class
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // Update gallery
        updateGallery();
    });
});

// Reset Button
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterButtons[0].click(); // Simulate clicking 'All'
});