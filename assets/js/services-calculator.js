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
  
  // Outdoor
  const outdoor = document.querySelector('input[name="studio-outdoor"]:checked');
  if (outdoor) studioPrice += parseInt(outdoor.dataset.price) || 0;
  
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
  
  const outdoor = document.querySelector('input[name="studio-outdoor"]:checked');
  if (outdoor) items.push('Chụp Ngoài Trời');
  
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
  
  // Prints (số lượng ảnh phóng lớn)
  const printsCount = parseInt(document.getElementById('family-prints-slider').value) || 0;
  const printUnitPrice = parseInt(document.getElementById('family-prints-slider').dataset.price) || 0;
  familyPrice += printsCount * printUnitPrice;
  
  // Update display
  document.getElementById('family-price').textContent = formatPrice(familyPrice);
  updateFamilySliderHints(members, makeup, printsCount);
  updateFamilyItems(members, makeup, printsCount);
}

function updateFamilySliderHints(members, makeup, printsCount) {
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
  
  document.getElementById('family-prints-hint').textContent =
    printsCount === 0
      ? 'Không in ảnh phóng lớn'
      : `${printsCount} ảnh phóng lớn (60x90cm)`;
  document.getElementById('family-prints-count').textContent = printsCount;
}

function updateFamilyItems(members, makeup, printsCount) {
  const items = [];
  
  if (members !== 3) {
    items.push(`${members} thành viên gia đình`);
  }
  
  if (makeup > 1) {
    items.push(`Makeup cho ${makeup} người`);
  }
  
  const hasAlbum = document.querySelector('input[name="family-album"]:checked');
  if (hasAlbum) items.push('Album Photobook');
  
  if (printsCount > 0) {
    items.push(`${printsCount} ảnh gỗ pha lê 60x90cm`);
  }
  
  const itemsHtml = items.map(item => `<div class="summary-item">${item}</div>`).join('');
  document.getElementById('family-items').innerHTML = itemsHtml;
}

// Add event listeners for family inputs
document.getElementById('family-members-slider').addEventListener('input', updateFamilyPrice);
document.getElementById('family-makeup-slider').addEventListener('input', updateFamilyPrice);
document.getElementById('family-prints-slider').addEventListener('input', updateFamilyPrice);
document.querySelectorAll('input[name*="family"]').forEach(input => {
  if (!input.id.includes('slider')) {
    input.addEventListener('change', updateFamilyPrice);
  }
});

updateFamilyPrice();

// ===== MAKEUP CALCULATOR =====
const makeupBasePrice = 1800;
let makeupPrice = makeupBasePrice;

function updateMakeupPrice() {
  // Lấy giá từ makeup-service option được chọn
  const serviceOption = document.querySelector('input[name="makeup-service"]:checked');
  if (serviceOption) {
    makeupPrice = parseInt(serviceOption.dataset.price) || makeupBasePrice;
  } else {
    makeupPrice = makeupBasePrice;
  }

  // Update display
  document.getElementById('makeup-price').textContent = formatPrice(makeupPrice);
  updateMakeupItems();
}

function updateMakeupItems() {
  const items = [];
  
  const service = document.querySelector('input[name="makeup-service"]:checked');
  if (service) {
    const text = service.parentElement.querySelector('.option-text').textContent;
    items.push(text);
  }
  
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
  // price is in thousands (k), so >= 1000 means >= 1 million
  if (price >= 1000) {
    const millions = price / 1000;
    let formatted = millions.toFixed(2).replace(/\.?0+$/, '');
    return formatted.replace('.', ',') + ' triệu';
  } else {
    return price + 'k';
  }
}

// Update selected classes for visual feedback
function updateSelectedClasses() {
  // Remove selected class from all option items
  document.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
  
  // Add selected class to checked inputs' parents
  document.querySelectorAll('input:checked').forEach(input => {
    input.closest('.option-item').classList.add('selected');
  });
}

// Call updateSelectedClasses after any change
document.addEventListener('change', updateSelectedClasses);
updateSelectedClasses();

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
