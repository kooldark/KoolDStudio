document.addEventListener('DOMContentLoaded', async () => {
  const packageGrid = document.getElementById('packageGrid');
  const timeGrid = document.getElementById('timeGrid');
  const bookingForm = document.getElementById('bookingForm');
  const bookBtn = document.getElementById('bookBtn');
  const zaloBtn = document.getElementById('zaloBtn');
  const bookingDate = document.getElementById('bookingDate');
  const clientName = document.getElementById('clientName');
  const clientPhone = document.getElementById('clientPhone');

  let packages = [];

  // Fetch pricing data
  try {
    const res = await fetch('assets/js/pricing-data.json');
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

  let selectedPackage = '';
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
    
    // Auto-select package from URL
    if (packageFromUrl && pkg.id === packageFromUrl) {
      card.classList.add('selected');
      selectedPackage = pkg.name;
    }
    
    card.onclick = () => {
      document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPackage = pkg.name;
    };
    packageGrid.appendChild(card);
  });

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
    const storedDetails = localStorage.getItem('bookingDetails');
    let detailsMessage = '';

    if (storedDetails) {
        const details = JSON.parse(storedDetails);
        detailsMessage = `
--- CHI TIẾT GÓI TÙY CHỈNH ---
- Gói: ${details.packageName}
- Số thành viên: ${details.members}
- Số người makeup: ${details.makeup}
- Dịch vụ thêm: ${details.upgrades.length > 0 ? details.upgrades.join(', ') : 'Không có'}
- Tổng chi phí dự kiến: ${details.totalPrice}
------------------------------------
`;
    }

    const bookingInfo = `
--- THÔNG TIN ĐẶT LỊCH ---
- Gói chính: ${selectedPackage || '(chưa chọn)'}
- Ngày: ${bookingDate.value || '(chưa chọn)'}
- Giờ: ${selectedTime || '(chưa chọn)'}
- Tên: ${clientName.value || '(chưa nhập)'}
- SĐT: ${clientPhone.value || '(chưa nhập)'}`;

    if (detailsMessage) {
      return `Tôi muốn đặt lịch với các chi tiết sau:${detailsMessage}${bookingInfo}`;
    }
    
    return `Tôi muốn đặt lịch chụp ảnh:${bookingInfo}`;
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
      alert('Vui lòng chọn gói dịch vụ');
      return false;
    }
    if (!bookingDate.value) {
      alert('Vui lòng chọn ngày');
      return false;
    }
    if (!selectedTime) {
      alert('Vui lòng chọn giờ');
      return false;
    }
    if (!clientName.value) {
      alert('Vui lòng nhập tên');
      return false;
    }
    if (!clientPhone.value) {
      alert('Vui lòng nhập số điện thoại');
      return false;
    }
    return true;
  }
});
