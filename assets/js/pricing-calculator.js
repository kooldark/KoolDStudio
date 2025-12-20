document.addEventListener('DOMContentLoaded', () => {
    const basePackage = document.querySelector('.base-package');
    const upsellCards = document.querySelectorAll('.upsell-card');
    const finalPriceEl = document.getElementById('final-price');
    const selectedUpgradesListEl = document.getElementById('selected-upgrades-list');
    const messengerBtn = document.getElementById('messenger-btn');
    const zaloBtn = document.getElementById('zalo-btn');

    if (!basePackage || !upsellCards.length || !finalPriceEl || !selectedUpgradesListEl || !messengerBtn || !zaloBtn) {
        console.error('Pricing calculator elements not found.');
        return;
    }

    const basePrice = parseInt(basePackage.dataset.price, 10);
    const baseName = basePackage.querySelector('.package-title').textContent;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price) + 'k';
    };

    // Store current package info
    const currentPackage = {
        baseName: baseName,
        basePrice: basePrice,
        selectedOptions: [],
        totalPrice: basePrice
    };

    const updateTotalPrice = () => {
        let currentTotal = basePrice;
        let selectedOptions = [];
        let upgradesHTML = '';

        upsellCards.forEach(card => {
            if (card.classList.contains('active')) {
                const price = parseInt(card.dataset.price, 10);
                const name = card.querySelector('.upsell-name').textContent;
                currentTotal += price;
                selectedOptions.push(`${name} (+${formatPrice(price)})`);

                upgradesHTML += `
                    <div class="upgrade-item">
                        ${name}
                    </div>
                `;
            }
        });

        finalPriceEl.textContent = formatPrice(currentTotal);
        selectedUpgradesListEl.innerHTML = upgradesHTML;
        
        // Update package info
        currentPackage.selectedOptions = selectedOptions;
        currentPackage.totalPrice = currentTotal;
    };

    upsellCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            updateTotalPrice();
        });
    });

    const sendPackageViaMessenger = function() {
        const pkg = currentPackage;
        const totalFormatted = new Intl.NumberFormat('en-US').format(pkg.totalPrice) + 'k';
        
        let message = `Chào Kool D. Studio!\n\n`;
        message += `Tôi muốn chụp ảnh cưới studio với gói sau:\n\n`;
        message += `📦 Gói: ${pkg.baseName}\n`;
        message += `💰 Giá gốc: ${new Intl.NumberFormat('en-US').format(pkg.basePrice) + 'k'}\n`;
        
        if (pkg.selectedOptions.length > 0) {
            message += `\n✨ Nâng cấp:\n`;
            pkg.selectedOptions.forEach(opt => {
                message += `  • ${opt}\n`;
            });
        }
        
        message += `\n💵 Tổng cộng: ${totalFormatted}\n\n`;
        message += `Tôi sẽ chờ tư vấn thêm từ bạn để lên lịch hẹn chi tiết.`;
        
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://m.me/KoolDStudio?text=${encodedMsg}`, '_blank');
    };

    const sendPackageViaZalo = function() {
        const pkg = currentPackage;
        const totalFormatted = new Intl.NumberFormat('en-US').format(pkg.totalPrice) + 'k';
        
        let message = `Chào Kool D. Studio!\n\n`;
        message += `Tôi muốn chụp ảnh cưới studio với gói sau:\n\n`;
        message += `📦 Gói: ${pkg.baseName}\n`;
        message += `💰 Giá gốc: ${new Intl.NumberFormat('en-US').format(pkg.basePrice) + 'k'}\n`;
        
        if (pkg.selectedOptions.length > 0) {
            message += `\n✨ Nâng cấp:\n`;
            pkg.selectedOptions.forEach(opt => {
                message += `  • ${opt}\n`;
            });
        }
        
        message += `\n💵 Tổng cộng: ${totalFormatted}\n\n`;
        message += `Tôi sẽ chờ tư vấn thêm từ bạn để lên lịch hẹn chi tiết.`;
        
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://zalo.me/0379031662?text=${encodedMsg}`, '_blank');
    };

    messengerBtn.addEventListener('click', sendPackageViaMessenger);
    zaloBtn.addEventListener('click', sendPackageViaZalo);

    // Initial call to set up the page correctly
    updateTotalPrice();
});
