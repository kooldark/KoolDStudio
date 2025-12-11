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

  const timeSlots = [
    '08:00', '09:00', '10:00',
    '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00'
  ];

  let selectedPackage = '';
  let selectedTime = '';

  // Render packages
  packageGrid.innerHTML = '';
  packages.forEach(pkg => {
    const card = document.createElement('div');
    card.className = 'package-card';
    card.innerHTML = `
      <div class="package-name">${pkg.name}</div>
      <div class="package-price">${pkg.price}</div>
    `;
    card.onclick = () => {
      document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPackage = pkg.name;
    };
    packageGrid.appendChild(card);
  });

  // Render time slots
  timeGrid.innerHTML = '';
  timeSlots.forEach(time => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-slot';
    btn.textContent = time;
    btn.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = time;
    };
    timeGrid.appendChild(btn);
  });

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  bookingDate.min = today;

  // Generate message
  function generateMessage() {
    return `Tôi muốn đặt lịch chụp ảnh:
- Gói: ${selectedPackage || '(chưa chọn)'}
- Ngày: ${bookingDate.value || '(chưa chọn)'}
- Giờ: ${selectedTime || '(chưa chọn)'}
- Tên: ${clientName.value || '(chưa nhập)'}
- SĐT: ${clientPhone.value || '(chưa nhập)'}`;
  }

  // Messenger booking
  bookBtn.onclick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = generateMessage();
    const messengerUrl = `https://m.me/KoolDStudio?text=${encodeURIComponent(message)}`;
    window.open(messengerUrl, '_blank');
  };

  // Zalo booking
  zaloBtn.onclick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = generateMessage();
    const zaloUrl = `https://zalo.me/0379031662?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
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
