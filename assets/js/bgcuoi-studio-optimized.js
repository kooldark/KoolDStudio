document.addEventListener('DOMContentLoaded', function() {
    // === PACKAGE SELECTOR ===
    const packageRadios = document.querySelectorAll('.pkg-radio');
    const packageContents = document.querySelectorAll('.pkg-content');

    packageRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            packageContents.forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.pkg-content-${selectedValue}`).classList.add('active');
            updateCalculation();
        });
    });

    // Initialize with package B active
    document.getElementById('pkg-b').checked = true;
    document.querySelector('.pkg-content-b').classList.add('active');

    // === UPGRADE CARDS FUNCTIONALITY ===
    const upgradeCards = document.querySelectorAll('.upgrade-card');
    const baseCostEl = document.getElementById('baseCost');
    const upgradeCostEl = document.getElementById('upgradeCost');
    const finalTotalEl = document.getElementById('finalTotal');
    const bookingBtn = document.getElementById('bookingBtn');
    const selectedUpgradesEl = document.getElementById('selectedUpgrades');
    const upgradeListEl = document.getElementById('upgradeList');
    const summaryUpgradesRow = document.getElementById('summaryUpgradesRow');

    // Base prices for each package
    const packagePrices = {
        'a': 2500000,
        'b': 3500000,
        'c': 5500000
    };

    let selectedPackage = 'b'; // Default to package B
    let selectedUpgrades = [];

    function formatCurrency(value) {
        if (value === 0) return "0k";
        const priceInK = value / 1000;
        // Using 'de-DE' locale is a trick to get dots as thousand separators e.g., 1.500
        return priceInK.toLocaleString('de-DE') + "k";
    }

    function getPackageFromURL() {
        const params = new URLSearchParams(window.location.search);
        const pkg = params.get('package');
        if (pkg && pkg.includes('wedding_studio_a')) return 'a';
        if (pkg && pkg.includes('wedding_studio_b')) return 'b';
        if (pkg && pkg.includes('wedding_studio_c')) return 'c';
        return 'b'; // default
    }

    function updateCalculation() {
        selectedPackage = document.querySelector('.pkg-radio:checked').value;
        const basePrice = packagePrices[selectedPackage];
        const upgradesTotal = selectedUpgrades.reduce((sum, price) => sum + price, 0);
        const finalTotal = basePrice + upgradesTotal;

        // Update display
        baseCostEl.textContent = formatCurrency(basePrice);
        upgradeCostEl.textContent = formatCurrency(upgradesTotal);
        finalTotalEl.textContent = formatCurrency(finalTotal);
        bookingBtn.href = `booking.html?package=wedding_studio_${selectedPackage}&upgrades=${upgradesTotal}`;

        // Show/hide upgrades row
        if (upgradesTotal > 0) {
            summaryUpgradesRow.style.display = 'flex';
        } else {
            summaryUpgradesRow.style.display = 'none';
        }

        // Show/hide selected upgrades section
        if (selectedUpgrades.length > 0) {
            selectedUpgradesEl.style.display = 'block';
        } else {
            selectedUpgradesEl.style.display = 'none';
        }
    }

    function updateSelectedUpgrades() {
        const selected = [];
        upgradeCards.forEach(card => {
            if (card.classList.contains('active')) {
                selected.push(card.querySelector('h4').textContent);
            }
        });

        upgradeListEl.innerHTML = selected
            .map(name => `<p class="upgrade-item">✓ ${name}</p>`)
            .join('');
    }

    // Add click handler to upgrade cards
    upgradeCards.forEach(card => {
        card.addEventListener('click', () => {
            const price = Number(card.dataset.price);
            card.classList.toggle('active');

            if (card.classList.contains('active')) {
                selectedUpgrades.push(price);
            } else {
                selectedUpgrades = selectedUpgrades.filter(p => p !== price);
            }

            updateSelectedUpgrades();
            updateCalculation();
        });
    });

    // Initialize
    selectedPackage = getPackageFromURL();
    document.getElementById(`pkg-${selectedPackage}`).checked = true;
    document.querySelectorAll('.pkg-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.pkg-content-${selectedPackage}`).classList.add('active');
    updateCalculation();

    // === STANDARD PAGE SCRIPTS ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

