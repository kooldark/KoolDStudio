document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        basePackage: document.querySelector('.base-package'),
        membersSlider: document.getElementById('members'),
        makeupSlider: document.getElementById('makeup'),
        membersVal: document.getElementById('membersVal'),
        makeupVal: document.getElementById('makeupVal'),
        membersHint: document.getElementById('membersHint'),
        makeupHint: document.getElementById('makeupHint'),
        retouchCount: document.getElementById('retouch-count'),
        packageTitle: document.getElementById('package-title'),
        upsellCards: document.querySelectorAll('.upsell-card'),
        selectedUpgradesList: document.getElementById('selected-upgrades-list'),
        finalPriceDisplay: document.getElementById('final-price'),
        totalPriceDisplay: document.getElementById('total-price-display'),
        messengerBtn: document.getElementById('messenger-btn'),
        zaloBtn: document.getElementById('zalo-btn'),
        bookingBtn: document.getElementById('bookingBtn'),
    };

    const config = {
        basePrice: 1500,
        baseMembers: 4,
        extraMemberPrice: 300,
        baseRetouch: 10,
        extraRetouchPerPerson: 5,
        baseMakeup: 1,
        extraMakeupPrice: 300,
    };

    let currentTotal = config.basePrice;

    function formatCurrency(value) {
        return value.toLocaleString('de-DE') + 'k';
    }

    function calculatePrice() {
        const numMembers = parseInt(elements.membersSlider.value, 10);
        const numMakeup = parseInt(elements.makeupSlider.value, 10);

        let total = config.basePrice;

        // Member cost
        if (numMembers > config.baseMembers) {
            total += (numMembers - config.baseMembers) * config.extraMemberPrice;
        }

        // Makeup cost
        if (numMakeup > config.baseMakeup) {
            total += (numMakeup - config.baseMakeup) * config.extraMakeupPrice;
        }

        // Upsell cost
        let selectedUpgradesHTML = '';
        elements.upsellCards.forEach(card => {
            if (card.classList.contains('selected')) {
                const price = parseInt(card.dataset.price, 10);
                total += price;
                const name = card.querySelector('.upsell-name').textContent;
                const priceText = card.querySelector('.upsell-price').textContent;
                selectedUpgradesHTML += `
                    <div class="total-line">
                        <span>${name}</span>
                        <span>${priceText}</span>
                    </div>`;
            }
        });

        elements.selectedUpgradesList.innerHTML = selectedUpgradesHTML;
        elements.finalPriceDisplay.textContent = formatCurrency(total);
        elements.totalPriceDisplay.textContent = `Tổng cộng: ${formatCurrency(total)}`;
        currentTotal = total;
    }

    function updateHints() {
        const numMembers = elements.membersSlider.value;
        const numMakeup = elements.makeupSlider.value;

        elements.membersVal.textContent = numMembers;
        elements.makeupVal.textContent = numMakeup;

        // Update makeup slider max value
        elements.makeupSlider.max = numMembers;
        if (parseInt(numMakeup) > parseInt(numMembers)) {
            elements.makeupSlider.value = numMembers;
            elements.makeupVal.textContent = numMembers;
        }

        // Update package title based on family size
        if (numMembers <= 4) {
            elements.packageTitle.textContent = "Gói Gia Đình Nhỏ — Ấm Cúng";
        } else if (numMembers <= 7) {
            elements.packageTitle.textContent = "Gói Gia Đình Nhiều Thế Hệ";
        } else {
            elements.packageTitle.textContent = "Gói Đại Gia Đình — Sum Vầy";
        }

        // Update hints
        if (numMembers <= 4) {
            elements.membersHint.textContent = "Gia đình nhỏ ấm cúng";
        } else if (numMembers <= 7) {
            elements.membersHint.textContent = "Gia đình nhiều thế hệ";
        } else {
            elements.membersHint.textContent = "Đại gia đình sum vầy";
        }

        if (numMakeup == 0) {
            elements.makeupHint.textContent = "Gia đình tự chuẩn bị";
        } else if (numMakeup == 1) {
            elements.makeupHint.textContent = "Miễn phí cho 01 người đầu";
        } else {
            elements.makeupHint.textContent = `Phụ thu ${formatCurrency(config.extraMakeupPrice)}/người từ người thứ 2`;
        }

        // Update retouch count
        const retouch = config.baseRetouch + (Math.max(0, numMembers - config.baseMembers) * config.extraRetouchPerPerson);
        elements.retouchCount.textContent = retouch;
    }

    function generateMessage() {
        let message = `Chào Kool D. Studio, mình muốn tư vấn gói chụp ảnh gia đình:\n`;
        message += `- Số thành viên: ${elements.membersSlider.value}\n`;
        message += `- Số người makeup: ${elements.makeupSlider.value}\n`;

        const selectedUpgrades = [];
        elements.upsellCards.forEach(card => {
            if (card.classList.contains('selected')) {
                selectedUpgrades.push(card.querySelector('.upsell-name').textContent);
            }
        });

        if (selectedUpgrades.length > 0) {
            message += `- Dịch vụ thêm: ${selectedUpgrades.join(', ')}\n`;
        }

        message += `- Tổng chi phí dự kiến: ${formatCurrency(currentTotal)}\n\n`;
        message += `Nhờ studio tư vấn thêm giúp mình nhé!`;
        return encodeURIComponent(message);
    }

    // Event Listeners
    [elements.membersSlider, elements.makeupSlider].forEach(slider => {
        slider.addEventListener('input', () => {
            updateHints();
            calculatePrice();
        });
    });

    elements.upsellCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            calculatePrice();
        });
    });

    if (elements.messengerBtn) {
        elements.messengerBtn.addEventListener('click', () => {
            const message = generateMessage();
            window.open(`https://m.me/KoolDStudio?text=${message}`, '_blank');
        });
    }

    if (elements.zaloBtn) {
        elements.zaloBtn.addEventListener('click', () => {
            const message = generateMessage();
            window.open(`https://zalo.me/0379031662?text=${message}`, '_blank');
        });
    }

    if (elements.bookingBtn) {
        elements.bookingBtn.addEventListener('click', () => {
            const selectedUpgrades = [];
            elements.upsellCards.forEach(card => {
                if (card.classList.contains('selected')) {
                    selectedUpgrades.push(card.querySelector('.upsell-name').textContent);
                }
            });

            const bookingDetails = {
                packageName: document.getElementById('package-title').textContent,
                members: elements.membersSlider.value,
                makeup: elements.makeupSlider.value,
                upgrades: selectedUpgrades,
                totalPrice: formatCurrency(currentTotal),
            };

            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        });
    }

    // Initial setup
    updateHints();
    calculatePrice();
});