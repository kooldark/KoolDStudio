document.addEventListener('DOMContentLoaded', async () => {
    const galleryContainer = document.getElementById('home-gallery-container');
    if (!galleryContainer) return;

    let portfolioData = {};
    try {
        const res = await fetch('assets/js/portfolio-data.json?t=' + Date.now());
        if (!res.ok) throw new Error(`Failed to load portfolio data, status: ${res.status}`);
        portfolioData = await res.json();
    } catch (e) {
        console.error("Could not load portfolio data.", e);
        galleryContainer.innerHTML = "<p class='error-message'>Không thể tải thư viện ảnh.</p>";
        return;
    }

    /**
     * Gets one random representative image from each album across all categories.
     */
    function getHomepageImages() {
        const representativeImages = [];
        if (!portfolioData.categories) return [];

        portfolioData.categories.forEach(category => {
            category.albums.forEach(album => {
                if (album.images && album.images.length > 0) {
                    const randomImageFile = album.images[Math.floor(Math.random() * album.images.length)];
                    const imagePath = `assets/img/portfolio/${album.path}/${randomImageFile}`;
                    representativeImages.push(imagePath);
                }
            });
        });
        return representativeImages;
    }

    // Get one image from every album
    const allImages = getHomepageImages();

    // Shuffle the array to ensure a different random set on each page load
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(allImages);

    // Determine the number of images to display based on screen size
    const isMobile = window.innerWidth < 768;
    const maxImages = isMobile ? 6 : 12;

    // Slice the array to get the desired number of images for the gallery
    const galleryImages = allImages.slice(0, maxImages);

    let galleryHtml = '';
    galleryImages.forEach(imgPath => {
        // The lightbox functionality can be added here if desired.
        // For now, it's just the grid item.
        galleryHtml += `
            <div class="grid-item" data-aos="fade-up">
                <img src="${imgPath}" alt="Kool D. Studio Portfolio Image" loading="lazy" decoding="async">
            </div>
        `;
    });

    galleryContainer.innerHTML = galleryHtml;

    // Re-initialize AOS if it's available
    if (window.AOS) {
        AOS.init({ once: true });
    }
});