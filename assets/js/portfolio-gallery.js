document.addEventListener('DOMContentLoaded', async () => {

    // --- DOM Elements ---
    const pageHeader = document.querySelector('.page-header');
    const pageTitleEl = document.querySelector('.page-title');
    const pageSubtitleEl = document.querySelector('.page-subtitle');
    const galleryContainer = document.getElementById('auto-gallery');
    const filtersContainer = document.getElementById('portfolio-filters');
    const backButton = document.getElementById('back-button');

    if (!galleryContainer) return;

    // --- State ---
    let portfolioData = null;

    // --- Functions ---

    /**
     * Fetches the portfolio data from the JSON file.
     * @returns {Promise<object|null>} The portfolio data or null if an error occurs.
     */
    async function fetchPortfolioData() {
        if (portfolioData) return portfolioData;
        try {
            const res = await fetch('assets/js/portfolio-data.json?t=' + Date.now());
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            portfolioData = await res.json();
            return portfolioData;
        } catch (e) {
            console.error("Could not fetch portfolio data.", e);
            galleryContainer.innerHTML = `<p class='error-message' style='text-align: center;'>Không thể tải portfolio. Vui lòng thử lại sau.</p>`;
            return null;
        }
    }

    /**
     * Renders the main view with all categories and their albums.
     * @param {object} data - The portfolio data.
     */
    function renderCategoryIndexView(data) {
        pageTitleEl.textContent = 'Portfolio';
        pageSubtitleEl.textContent = 'Những khoảnh khắc tự nhiên của Kool D. Studio';
        backButton.classList.add('hidden');
        filtersContainer.innerHTML = ''; // Clear filters for now

        let html = '';
        data.categories.forEach(category => {
            html += `
                <section class="portfolio-section" data-aos="fade-up">
                    <h2 class="section-title">${category.title}</h2>
                    <p class="section-subtitle">${category.description}</p>
                    <div class="album-grid">
                        ${category.albums.map(album => renderAlbumCard(album)).join('')}
                    </div>
                </section>
            `;
        });
        galleryContainer.innerHTML = html;
        AOS.refresh();
    }

    /**
     * Generates the HTML for a single album card.
     * @param {object} album - The album data object.
     * @returns {string} The HTML string for the album card.
     */
    function renderAlbumCard(album) {
        const imageUrl = `assets/img/portfolio/${album.path}/${album.coverImage}`;
        const albumLink = `?category=${album.path.split('/')[0]}&album=${encodeURIComponent(album.id)}`;
        return `
            <a href="${albumLink}" class="album-card" data-aos="fade-up" data-aos-delay="100">
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
    }

    /**
     * Renders the detail view for a single album.
     * @param {string} categoryId - The ID of the category.
     * @param {string} albumId - The ID of the album.
     * @param {object} data - The portfolio data.
     */
    function renderAlbumDetailView(categoryId, albumId, data) {
        const category = data.categories.find(c => c.id === categoryId);
        const album = category ? category.albums.find(a => a.id === albumId) : null;

        if (!album) {
            galleryContainer.innerHTML = `<p class='error-message' style='text-align: center;'>Không tìm thấy album.</p>`;
            backButton.classList.remove('hidden');
            return;
        }

        // Update header
        pageTitleEl.textContent = album.title;
        pageSubtitleEl.textContent = album.description;
        document.title = `${album.title} - ${category.title} | Kool D. Studio`;


        // Show back button and clear filters
        backButton.classList.remove('hidden');
        filtersContainer.innerHTML = '';

        // Generate image grid
        let imageGridHtml = '<div class="portfolio-grid">';
        album.images.forEach(imageFile => {
            const imageUrl = `assets/img/portfolio/${album.path}/${imageFile}`;
            imageGridHtml += `
                <div class="grid-item" data-src="${imageUrl}" data-aos="fade-up">
                    <img src="${imageUrl}" alt="Image from ${album.title}" loading="lazy">
                </div>
            `;
        });
        imageGridHtml += '</div>';

        galleryContainer.innerHTML = imageGridHtml;
        setupLightbox(album);
        AOS.refresh();
    }
    
    /**
     * Sets up the lightbox functionality for the album detail view.
     * @param {object} album - The album data object.
     */
    function setupLightbox(album) {
        const lightbox = document.getElementById('lightbox');
        const lightboxWrapper = lightbox.querySelector('.swiper-wrapper');
        const closeButton = document.getElementById('lightbox-close');
        
        // Create lightbox slides
        lightboxWrapper.innerHTML = album.images.map(imageFile => {
            const imageUrl = `assets/img/portfolio/${album.path}/${imageFile}`;
            return `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="${imageUrl}"></div></div>`;
        }).join('');

        // Initialize Swiper for the lightbox
        const lightboxSwiper = new Swiper(lightbox.querySelector('.swiper-container'), {
            zoom: true,
            pagination: { el: '.swiper-pagination', type: 'fraction' },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });

        // Add event listeners to grid items
        document.querySelectorAll('.grid-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxSwiper.slideTo(index, 0); // Go to the clicked slide without animation
            });
        });

        // Close lightbox
        closeButton.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) { // only close if clicking on the background
            lightbox.style.display = 'none';
          }
        })
    }


    /**
     * Main application router.
     */
    async function main() {
        const data = await fetchPortfolioData();
        if (!data) return;

        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category');
        const albumId = decodeURIComponent(urlParams.get('album') || '');

        if (categoryId && albumId) {
            renderAlbumDetailView(categoryId, albumId, data);
        } else {
            renderCategoryIndexView(data);
        }
        
        backButton.addEventListener('click', () => {
            window.history.pushState(null, '', window.location.pathname); // Clear URL params
            renderCategoryIndexView(data);
        });
    }

    // --- Run Application ---
    main();
});
