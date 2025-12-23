document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMENT SELECTORS ---
    const outfits = document.getElementById('outfits');
    const accessories = document.getElementById('accessories');
    const cards = document.querySelectorAll('.card');
    
    const outfitsVal = document.getElementById('outfitsVal');
    const accessoriesVal = document.getElementById('accessoriesVal');
    
    const outfitsHint = document.getElementById('outfitsHint');
    const accessoriesHint = document.getElementById('accessoriesHint');
    
    const totalPriceEl = document.getElementById('totalPrice');
    const emotionNote = document.getElementById('emotionNote');
    const bookingBtn = document.getElementById('bookingBtn');

    // Summary Table Elements
    const summaryBase = document.getElementById('summaryBase');
    const summaryOutfits = document.getElementById('summaryOutfits');
    const summaryAccessories = document.getElementById('summaryAccessories');
    const summaryProducts = document.getElementById('summaryProducts');
    const summaryOutfitsRow = document.getElementById('summaryOutfitsRow');
    const summaryAccessoriesRow = document.getElementById('summaryAccessoriesRow');
    const summaryProductsRow = document.getElementById('summaryProductsRow');

    // --- PRICING CONFIGURATION ---
    const BASE_PRICE = 3000000;
    const BASE_OUTFITS = 1;
    const EXTRA_OUTFIT_PRICE = 800000;
    const EXTRA_ACCESSORY_PRICE = 500000;

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + " đ";
    }

    function updateHints() {
        if (!outfits || !accessories) return;

        outfitsVal.textContent = outfits.value;
        accessoriesVal.textContent = accessories.value;

        // Update hints based on slider values
        if (outfits.value == 1) {
            outfitsHint.textContent = "Gói cơ bản: 1 bộ trang phục";
        } else if (outfits.value == 2) {
            outfitsHint.textContent = "2 bộ trang phục, tạo nên sự đa dạng trong bộ ảnh";
        } else {
            outfitsHint.textContent = "3 bộ trang phục, câu chuyện style đầy đủ";
        }

        if (accessories.value == 0) {
            accessoriesHint.textContent = "Không sử dụng chùm hoa hoặc phụ kiện riêng";
        } else if (accessories.value == 1) {
            accessoriesHint.textContent = "Cơ bản: 1 chùm hoa & voan cưới";
        } else {
            accessoriesHint.textContent = `Phụ thu ${formatCurrency(EXTRA_ACCESSORY_PRICE)}/item từ item thứ 2`;
        }
    }

    function calculate() {
        let total = BASE_PRICE;
        const numOutfits = parseInt(outfits.value);
        const numAccessories = parseInt(accessories.value);

        // 1. Calculate extra outfits cost
        const extraOutfitsCost = numOutfits > BASE_OUTFITS 
            ? (numOutfits - BASE_OUTFITS) * EXTRA_OUTFIT_PRICE 
            : 0;
        total += extraOutfitsCost;

        // 2. Calculate accessories cost (first one is free)
        const accessoriesCost = Math.max(0, numAccessories - 1) * EXTRA_ACCESSORY_PRICE;
        total += accessoriesCost;

        // 3. Calculate selected products cost
        let productsCost = 0;
        const selectedProducts = [];
        cards.forEach(card => {
            if (card.classList.contains('active')) {
                productsCost += Number(card.dataset.price);
                selectedProducts.push(card.querySelector('h4').textContent);
            }
        });
        total += productsCost;

        // Update selected products display
        const selectedProductsSection = document.getElementById('selectedProducts');
        const selectedList = document.getElementById('selectedList');
        if (selectedProducts.length > 0) {
            selectedProductsSection.style.display = 'block';
            selectedList.innerHTML = selectedProducts.map(product => `<p class="product-item">✓ ${product}</p>`).join('');
        } else {
            selectedProductsSection.style.display = 'none';
        }

        // --- UPDATE SUMMARY TABLE ---
        summaryBase.textContent = formatCurrency(BASE_PRICE);
        
        summaryOutfits.textContent = formatCurrency(extraOutfitsCost);
        summaryOutfitsRow.style.display = extraOutfitsCost > 0 ? 'flex' : 'none';

        summaryAccessories.textContent = formatCurrency(accessoriesCost);
        summaryAccessoriesRow.style.display = accessoriesCost > 0 ? 'flex' : 'none';
        
        summaryProducts.textContent = formatCurrency(productsCost);
        summaryProductsRow.style.display = productsCost > 0 ? 'flex' : 'none';

        // --- UPDATE TOTAL & FINAL UI ---
        totalPriceEl.textContent = formatCurrency(total);
        bookingBtn.href = `booking.html?package=wedding_studio_custom&price=${total}`;

        // Update emotion note
        if (numOutfits == 1 && numAccessories <= 1) {
            emotionNote.textContent = "Gói chụp cơ bản, đơn giản và tinh tế.";
        } else if (numOutfits == 2 && numAccessories == 1) {
            emotionNote.textContent = "Gói đầy đủ, đa dạng style và phụ kiện.";
        } else {
            emotionNote.textContent = "Gói premium, kỷ niệm cưới được ghi lại trọn vẹn.";
        }
    }

    // --- EVENT LISTENERS ---
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const activeCount = document.querySelectorAll('.card.active').length;
            // Nếu card này đã active, cho phép tắt
            // Nếu card này chưa active và đã có 2 active, không cho phép
            if (!card.classList.contains('active') && activeCount >= 2) {
                return;
            }
            card.classList.toggle('active');
            calculate();
        });
    });

    [outfits, accessories].forEach(el => {
        if (el) {
            el.addEventListener('input', () => {
                updateHints();
                calculate();
            });
        }
    });

    // --- INITIALIZATION ---
    updateHints();
    calculate();

    // --- Standard page scripts ---
    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu is initialized by load-template.js
    // No need to duplicate initialization here
