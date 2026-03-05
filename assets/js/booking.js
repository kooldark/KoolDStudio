document.addEventListener('DOMContentLoaded', async () => {
  // --- PATH DETECTION FOR PAGES/ SUBDIRECTORY ---
  const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
  
  const packageGrid = document.getElementById('packageGrid');
  const timeGrid = document.getElementById('timeGrid');
  const bookingForm = document.getElementById('bookingForm');
  const bookBtn = document.getElementById('bookBtn');
  const zaloBtn = document.getElementById('zaloBtn');
  const bookingDate = document.getElementById('bookingDate');
  const clientName = document.getElementById('clientName');
  const clientPhone = document.getElementById('clientPhone');

  let packages = [];
  let selectedPackageData = null;

  // Load booking details from localStorage
  const storedBookingData = localStorage.getItem('bookingDetails');
  if (storedBookingData) {
    selectedPackageData = JSON.parse(storedBookingData);
  }

  // Fetch pricing data
  try {
    const res = await fetch(basePath + 'config/pricing-data.json');
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    packages = data.packages || [];
  } catch (e) {
    console.error('Error loading pricing data:', e);
    packages = [
      { id: 'studio', name: 'Ảnh Cưới Studio', price: '4-8 triệu' },
      { id: 'family', name: 'Gia Đình', price: '2-4 triệu' },
      { id: 'event', name: 'Sự Kiện', price: '2.5-5 triệu' },
      { id: 'custom', name: 'Gói Tùy Chỉnh', price: 'Liên hệ' }
    ];
  }

  const timePeriods = [
    { id: 'morning', label: '☀️ Sáng', time: '8:00 - 12:00' },
    { id: 'afternoon', label: '🌤️ Chiều', time: '13:00 - 17:00' },
    { id: 'evening', label: '🌙 Tối', time: '18:00 - 22:00' }
  ];

  let selectedPackage = selectedPackageData ? selectedPackageData.packageName : '';
  let selectedTime = '';

  // Get package from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const packageFromUrl = urlParams.get('package');

  // Render packages
  packageGrid.innerHTML = '';
  packages.forEach(pkg => {
    const card = document.createElement('div');
    card.className = 'package-card';
    card.innerHTML = `
      <div class="package-name">${pkg.name}</div>
      <div class="package-price">${pkg.price}</div>
    `;
    
    // Auto-select package from stored data or URL
    if (selectedPackageData && pkg.id === selectedPackageData.packageType) {
      card.classList.add('selected');
      selectPackageCard(card, pkg.name);
    } else if (packageFromUrl && pkg.id === packageFromUrl) {
      card.classList.add('selected');
      selectPackageCard(card, pkg.name);
    }
    
    card.onclick = () => {
      document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectPackageCard(card, pkg.name);
    };
    packageGrid.appendChild(card);
  });

  function selectPackageCard(card, name) {
    selectedPackage = name;
    // Clear stored data when manually selecting new package
    if (!selectedPackageData || selectedPackageData.packageName !== name) {
      localStorage.removeItem('bookingDetails');
      selectedPackageData = null;
    }
  }

  // Render time periods
  timeGrid.innerHTML = '';
  timePeriods.forEach(period => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-slot';
    btn.innerHTML = `<div style="font-weight: 600; font-size: 16px;">${period.label}</div><div style="font-size: 12px; color: inherit; opacity: 0.8;">${period.time}</div>`;
    btn.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = period.label;
    };
    timeGrid.appendChild(btn);
  });

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  bookingDate.min = today;

  // Generate message
  function generateMessage() {
    let detailsMessage = '';

    if (selectedPackageData) {
      detailsMessage = `
--- CHI TIẾT GÓI CHỌN ---
- Gói: ${selectedPackageData.packageName}
${selectedPackageData.details ? `- Tùy chỉnh: ${selectedPackageData.details}\n` : ''}${selectedPackageData.price ? `- Giá dự kiến: ${selectedPackageData.price}\n` : ''}------------------------------------
`;
    }

    const bookingInfo = `
--- THÔNG TIN ĐẶT LỊCH ---
- Gói chính: ${selectedPackage || '(chưa chọn)'}
${selectedPackageData && selectedPackageData.price ? `- Giá: ${selectedPackageData.price}\n` : ''}${!selectedPackageData && packages.find(p => p.name === selectedPackage) ? `- Giá: ${packages.find(p => p.name === selectedPackage).price}\n` : ''}${bookingDate.value ? `- Ngày: ${new Date(bookingDate.value).toLocaleDateString('vi-VN')}\n` : ''}${selectedTime ? `- Giờ: ${selectedTime}\n` : ''}${clientName.value ? `- Tên: ${clientName.value}\n` : ''}${clientPhone.value ? `- SĐT: ${clientPhone.value}` : ''}`;

    if (detailsMessage) {
      return `Mình muốn giữ lịch với các chi tiết sau:${detailsMessage}${bookingInfo}`;
    }
    
    return `Mình muốn giữ lịch chụp ảnh:${bookingInfo}`;
  }

  // Messenger booking
  bookBtn.onclick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = generateMessage();
    const messengerUrl = `https://m.me/KoolDStudio?text=${encodeURIComponent(message)}`;
    window.open(messengerUrl, '_blank');
    localStorage.removeItem('bookingDetails');
  };

  // Zalo booking
  zaloBtn.onclick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = generateMessage();
    const zaloUrl = `https://zalo.me/0379031662?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
    localStorage.removeItem('bookingDetails');
  };

  function validateForm() {
    if (!selectedPackage) {
      alert('Bạn vui lòng chọn gói dịch vụ nhé');
      return false;
    }
    if (!bookingDate.value) {
      alert('Bạn vui lòng chọn ngày nhé');
      return false;
    }
    if (!selectedTime) {
      alert('Bạn vui lòng chọn giờ nhé');
      return false;
    }
    if (!clientName.value) {
      alert('Bạn vui lòng nhập tên nhé');
      return false;
    }
    if (!clientPhone.value) {
      alert('Bạn vui lòng nhập số điện thoại nhé');
      return false;
    }
    return true;
  }
});
