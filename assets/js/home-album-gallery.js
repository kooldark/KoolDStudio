document.addEventListener('DOMContentLoaded', async () => {
    const galleryContainer = document.getElementById('album-showcase-grid');
    if (!galleryContainer) return;

    let portfolioData = {};
    try {
        const res = await fetch('assets/js/portfolio-data.json?t=' + Date.now());
        if (!res.ok) throw new Error(`Failed to load portfolio data, status: ${res.status}`);
        portfolioData = await res.json();
    } catch (e) {
        console.error("Could not load portfolio data.", e);
        galleryContainer.innerHTML = "<p class='error-message'>Không thể tải album ảnh.</p>";
        return;
    }

    // --- Album Selection Logic ---
    function selectHomepageAlbums(categories, maxAlbums) {
        const allAlbums = [];
        categories.forEach(category => {
            category.albums.forEach(album => {
                allAlbums.push({
                    ...album,
                    categoryTitle: category.title // Add category title for context if needed
                });
            });
        });

        // Shuffle all albums to ensure variety on each page load
        for (let i = allAlbums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAlbums[i], allAlbums[j]] = [allAlbums[j], allAlbums[i]];
        }

        return allAlbums.slice(0, maxAlbums);
    }
    
    const isMobile = window.innerWidth < 768;
    const homepageAlbums = selectHomepageAlbums(portfolioData.categories || [], isMobile ? 4 : 6);

    if (homepageAlbums.length === 0) {
        galleryContainer.innerHTML = "<p>Chưa có album nào để hiển thị.</p>";
        return;
    }

    // --- HTML Generation ---
    let galleryHtml = '';
    homepageAlbums.forEach(album => {
        const imageUrl = `assets/img/portfolio/${album.path}/${album.coverImage}`;
        // The portfolio page isn't set up to filter yet, so the link will just go to the main page for now.
        // A future improvement would be portfolio.html?album=...
        const albumLink = `portfolio.html`; 

        galleryHtml += `
            <a href="${albumLink}" class="album-card" data-aos="fade-up">
                <img src="${imageUrl}" alt="${album.title}" class="album-card-thumbnail" loading="lazy">
                <div class="album-card-overlay"></div>
                <h3 class="album-card-title">${album.title}</h3>
                <div class="album-card-actions">
                    <span class="album-share-btn">
                        <span class="share-text">Xem Album</span>
                    </span>
                </div>
            </a>
        `;
    });

    galleryContainer.innerHTML = galleryHtml;

    // Re-initialize AOS to apply animations to the newly added elements
    if (window.AOS) {
        AOS.init({
            once: true,
            duration: 800
        });
    }
});
