// ===== TAB SWITCHING =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Add active to clicked button
    btn.classList.add('active');
    
    // Show selected tab
    document.getElementById(`${tabName}-content`).classList.add('active');
  });
});

// ===== STUDIO WEDDING CALCULATOR =====
const studioBasePrice = 3500;
let studioPrice = studioBasePrice;
const studioAddons = {};

function updateStudioPrice() {
  studioPrice = studioBasePrice;
  
  // Outfit
  const outfit = document.querySelector('input[name="studio-outfit"]:checked');
  if (outfit) studioPrice += parseInt(outfit.dataset.price) || 0;
  
  // Casual outfit
  const casual1 = document.querySelector('input[name="studio-casual"]:checked');
  if (casual1) studioPrice += parseInt(casual1.dataset.price) || 0;
  
  const casual2 = document.querySelector('input[name="studio-casual-2"]:checked');
  if (casual2) studioPrice += parseInt(casual2.dataset.price) || 0;
  
  // Retouch
  const retouch = document.querySelector('input[name="studio-retouch"]:checked');
  if (retouch) studioPrice += parseInt(retouch.dataset.price) || 0;
  
  // Prints
  const prints = document.querySelector('input[name="studio-prints"]:checked');
  if (prints) studioPrice += parseInt(prints.dataset.price) || 0;
  
  // Album
  const album = document.querySelector('input[name="studio-album"]:checked');
  if (album) studioPrice += parseInt(album.dataset.price) || 0;
  
  // Slideshow
  const slideshow = document.querySelector('input[name="studio-slideshow"]:checked');
  if (slideshow) studioPrice += parseInt(slideshow.dataset.price) || 0;
  
  // Update display
  document.getElementById('studio-price').textContent = formatPrice(studioPrice);
  updateStudioItems();
}

function updateStudioItems() {
  const items = [];
  
  const outfit = document.querySelector('input[name="studio-outfit"]:checked');
  if (outfit) {
    const text = outfit.parentElement.querySelector('.option-text').textContent;
    items.push(text);
  }
  
  const retouch = document.querySelector('input[name="studio-retouch"]:checked');
  if (retouch && retouch.value !== '12') {
    items.push(retouch.value + ' ảnh chỉnh sửa');
  }
  
  const prints = document.querySelector('input[name="studio-prints"]:checked');
  if (prints && prints.value !== '2') {
    items.push(prints.value + ' ảnh 60x90cm');
  }
  
  const hasAlbum = document.querySelector('input[name="studio-album"]:checked');
  if (hasAlbum) items.push('Album Photobook');
  
  const hasSlideshow = document.querySelector('input[name="studio-slideshow"]:checked');
  if (hasSlideshow) items.push('Video Slideshow');
  
  const itemsHtml = items.map(item => `<div class="summary-item">${item}</div>`).join('');
  document.getElementById('studio-items').innerHTML = itemsHtml;
}

// Add event listeners for studio inputs
document.querySelectorAll('input[name*="studio"]').forEach(input => {
  input.addEventListener('change', updateStudioPrice);
});

updateStudioPrice();

// ===== FAMILY CALCULATOR =====
const familyBasePrice = 1500;
const familyPricePerPerson = 300;
let familyPrice = familyBasePrice;

function updateFamilyPrice() {
  const members = parseInt(document.getElementById('family-members-slider').value);
  const makeup = parseInt(document.getElementById('family-makeup-slider').value);
  
  // Base price for 3 people
  familyPrice = familyBasePrice + (members - 3) * familyPricePerPerson;
  
  // Add makeup cost (first one free)
  if (makeup > 1) {
    familyPrice += (makeup - 1) * 400;
  }
  
  // Album
  const album = document.querySelector('input[name="family-album"]:checked');
  if (album) familyPrice += parseInt(album.dataset.price) || 0;
  
  // Prints
  const prints = document.querySelector('input[name="family-prints"]:checked');
  if (prints) familyPrice += parseInt(prints.dataset.price) || 0;
  
  // Update display
  document.getElementById('family-price').textContent = formatPrice(familyPrice);
  updateFamilySliderHints(members, makeup);
  updateFamilyItems(members, makeup);
}

function updateFamilySliderHints(members, makeup) {
  const memberHints = {
    1: 'Cặp đôi hoặc 1 người',
    2: 'Đôi vợ chồng',
    3: 'Gia đình nhỏ ấm cúng',
    4: 'Gia đình nhỏ 4 người',
    5: 'Gia đình 5 người',
    10: 'Gia đình lớn',
    15: 'Nhóm lớn'
  };
  
  let memberHint = '';
  if (members <= 5) memberHint = memberHints[members] || memberHints[3];
  else if (members <= 8) memberHint = 'Gia đình lớn';
  else memberHint = 'Nhóm lớn';
  
  document.getElementById('family-members-hint').textContent = memberHint;
  document.getElementById('family-members').textContent = members;
  
  const makeupHints = {
    0: 'Không makeup',
    1: 'Miễn phí cho 01 người đầu',
    2: 'Makeup 2 người',
    3: 'Makeup 3 người',
    4: 'Makeup 4 người'
  };
  
  document.getElementById('family-makeup-hint').textContent = makeupHints[makeup] || makeupHints[1];
  document.getElementById('family-makeup').textContent = makeup;
}

function updateFamilyItems(members, makeup) {
  const items = [];
  
  if (members !== 3) {
    items.push(`${members} thành viên gia đình`);
  }
  
  if (makeup > 1) {
    items.push(`Makeup cho ${makeup} người`);
  }
  
  const hasAlbum = document.querySelector('input[name="family-album"]:checked');
  if (hasAlbum) items.push('Album Photobook');
  
  const hasPrints = document.querySelector('input[name="family-prints"]:checked');
  if (hasPrints) items.push('Ảnh gỗ pha lê 60x90cm');
  
  const itemsHtml = items.map(item => `<div class="summary-item">${item}</div>`).join('');
  document.getElementById('family-items').innerHTML = itemsHtml;
}

// Add event listeners for family inputs
document.getElementById('family-members-slider').addEventListener('input', updateFamilyPrice);
document.getElementById('family-makeup-slider').addEventListener('input', updateFamilyPrice);
document.querySelectorAll('input[name*="family"]').forEach(input => {
  if (!input.id.includes('slider')) {
    input.addEventListener('change', updateFamilyPrice);
  }
});

updateFamilyPrice();

// ===== MAKEUP CALCULATOR =====
const makeupBasePrice = 1500;
let makeupPrice = makeupBasePrice;

function updateMakeupPrice() {
  makeupPrice = makeupBasePrice;
  
  // Type
  const type = document.querySelector('input[name="makeup-type"]:checked');
  if (type) makeupPrice = parseInt(type.dataset.price) || 1500;
  
  // Hair
  const hair = document.querySelector('input[name="makeup-hair"]:checked');
  if (hair && hair.value !== 'none') makeupPrice += parseInt(hair.dataset.price) || 0;
  
  // Touch up
  const touchup = document.querySelector('input[name="makeup-touchup"]:checked');
  if (touchup) makeupPrice += parseInt(touchup.dataset.price) || 0;
  
  // Update display
  document.getElementById('makeup-price').textContent = formatPrice(makeupPrice);
  updateMakeupItems();
}

function updateMakeupItems() {
  const items = [];
  
  const type = document.querySelector('input[name="makeup-type"]:checked');
  if (type) {
    const text = type.parentElement.querySelector('.option-text').textContent;
    items.push(text.split(' - ')[0]);
  }
  
  const hair = document.querySelector('input[name="makeup-hair"]:checked');
  if (hair && hair.value !== 'none') {
    items.push('Tạo kiểu tóc');
  }
  
  const touchup = document.querySelector('input[name="makeup-touchup"]:checked');
  if (touchup) items.push('Touch up trong tiệc');
  
  const itemsHtml = items.map(item => `<div class="summary-item">${item}</div>`).join('');
  document.getElementById('makeup-items').innerHTML = itemsHtml;
}

document.querySelectorAll('input[name*="makeup"]').forEach(input => {
  input.addEventListener('change', updateMakeupPrice);
});

updateMakeupPrice();

// ===== EVENT CALCULATOR =====
const eventBasePrice = 2500;
let eventPrice = eventBasePrice;

function updateEventPrice() {
  eventPrice = eventBasePrice;
  
  // Duration
  const duration = document.querySelector('input[name="event-duration"]:checked');
  if (duration) eventPrice = parseInt(duration.dataset.price) || 2500;
  
  // Video
  const video = document.querySelector('input[name="event-video"]:checked');
  if (video) eventPrice += parseInt(video.dataset.price) || 0;
  
  // Album
  const album = document.querySelector('input[name="event-album"]:checked');
  if (album) eventPrice += parseInt(album.dataset.price) || 0;
  
  // Drone
  const drone = document.querySelector('input[name="event-drone"]:checked');
  if (drone) eventPrice += parseInt(drone.dataset.price) || 0;
  
  // Update display
  document.getElementById('event-price').textContent = formatPrice(eventPrice);
  updateEventItems();
}

function updateEventItems() {
  const items = [];
  
  const duration = document.querySelector('input[name="event-duration"]:checked');
  if (duration) {
    const text = duration.parentElement.querySelector('.option-text').textContent;
    items.push(text.split(' - ')[0]);
  }
  
  const hasVideo = document.querySelector('input[name="event-video"]:checked');
  if (hasVideo) items.push('Video 4K + Highlight');
  
  const hasAlbum = document.querySelector('input[name="event-album"]:checked');
  if (hasAlbum) items.push('Album 30 trang');
  
  const hasDrone = document.querySelector('input[name="event-drone"]:checked');
  if (hasDrone) items.push('Chụp từ Drone');
  
  const itemsHtml = items.map(item => `<div class="summary-item">${item}</div>`).join('');
  document.getElementById('event-items').innerHTML = itemsHtml;
}

document.querySelectorAll('input[name*="event"]').forEach(input => {
  input.addEventListener('change', updateEventPrice);
});

updateEventPrice();

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1).replace(/\.0$/, '') + 'M ₫';
  } else if (price >= 1000) {
    return (price / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return price.toLocaleString('vi-VN') + ' ₫';
}

// ===== SAVE BOOKING DETAILS TO LOCALSTORAGE =====
function saveBookingDetails(packageName, price, details, packageType) {
  const bookingData = {
    packageName: packageName,
    price: price,
    details: details,
    packageType: packageType,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem('bookingDetails', JSON.stringify(bookingData));
}

// Add click handlers to "Đặt Lịch" buttons
document.addEventListener('click', function(e) {
  const bookingLink = e.target.closest('a[href*="booking.html"]');
  if (!bookingLink) return;
  
  const tab = document.querySelector('.tab-content.active');
  if (!tab) return;
  
  let packageName = '';
  let price = '';
  let details = '';
  let packageType = '';
  
  if (tab.id === 'studio-content') {
    packageName = 'Album Ảnh Cưới Studio';
    price = document.getElementById('studio-price').textContent;
    packageType = 'studio';
    
    const items = Array.from(document.querySelectorAll('#studio-items .summary-item'))
      .map(item => item.textContent);
    details = items.join(' | ');
  } else if (tab.id === 'family-content') {
    packageName = 'Khoảnh Khắc Gia Đình';
    price = document.getElementById('family-price').textContent;
    packageType = 'family';
    
    const items = Array.from(document.querySelectorAll('#family-items .summary-item'))
      .map(item => item.textContent);
    details = items.join(' | ');
  } else if (tab.id === 'makeup-content') {
    packageName = 'Trang Điểm & Làm Tóc';
    price = document.getElementById('makeup-price').textContent;
    packageType = 'makeup';
    
    const items = Array.from(document.querySelectorAll('#makeup-items .summary-item'))
      .map(item => item.textContent);
    details = items.join(' | ');
  } else if (tab.id === 'event-content') {
    packageName = 'Chụp Ảnh Sự Kiện';
    price = document.getElementById('event-price').textContent;
    packageType = 'event';
    
    const items = Array.from(document.querySelectorAll('#event-items .summary-item'))
      .map(item => item.textContent);
    details = items.join(' | ');
  }
  
  if (packageName && price) {
    saveBookingDetails(packageName, price, details, packageType);
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
