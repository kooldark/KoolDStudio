document.addEventListener('DOMContentLoaded', async () => {
  const categoryTabs = document.getElementById('categoryTabs');
  const moodboardGrid = document.getElementById('moodboardGrid');
  const previewSection = document.getElementById('previewSection');
  const previewGrid = document.getElementById('previewGrid');
  const codeSection = document.getElementById('codeSection');
  const generateCodeBtn = document.getElementById('generateCodeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const emailForm = document.getElementById('emailForm');
  const preloader = document.getElementById('preloader');

  let portfolioData = {};
  let selectedImages = [];
  let currentCategory = '';

  // Fetch moodboard data
  try {
    const res = await fetch('assets/js/moodboard-data.json');
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    portfolioData = data;

    // Load moodboard from URL if exists
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      loadFromCode(code);
    }

    // Load from localStorage draft
    const draft = localStorage.getItem('moodboardDraft');
    if (draft && !code) {
      selectedImages = JSON.parse(draft);
      updatePreview();
    }

    renderCategories();
    preloader.classList.add('hidden');
  } catch (e) {
    console.error('Error:', e);
    moodboardGrid.innerHTML = '<div class="empty-state">Không thể tải dữ liệu. Vui lòng tải lại.</div>';
    preloader.classList.add('hidden');
  }

  function renderCategories() {
    const categories = portfolioData.categories || [];
    categoryTabs.innerHTML = '';
    
    categories.forEach((cat, idx) => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = cat.title;
      btn.onclick = () => selectCategory(cat.id, btn);
      categoryTabs.appendChild(btn);
    });

    if (categories.length > 0) {
      selectCategory(categories[0].id, categoryTabs.querySelector('.category-btn.active'));
    }
  }

  function selectCategory(catId, btnEl) {
    // Remove active from all buttons
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    currentCategory = catId;
    const category = portfolioData.categories.find(c => c.id === catId);
    
    moodboardGrid.innerHTML = '';
    if (!category || !category.images) return;

    category.images.forEach(img => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'moodboard-item';
      if (selectedImages.includes(img)) itemDiv.classList.add('selected');
      
      const imgPath = `${category.path}/${img}`;
      itemDiv.innerHTML = `<img src="${imgPath}" alt="${category.title}" loading="lazy">`;
      
      itemDiv.onclick = () => toggleImage(imgPath, img, itemDiv);
      moodboardGrid.appendChild(itemDiv);
    });
  }

  function toggleImage(fullPath, imgName, itemEl) {
    if (selectedImages.includes(imgName)) {
      selectedImages = selectedImages.filter(i => i !== imgName);
      itemEl.classList.remove('selected');
    } else {
      selectedImages.push(imgName);
      itemEl.classList.add('selected');
    }
    
    updatePreview();
    localStorage.setItem('moodboardDraft', JSON.stringify(selectedImages));
  }

  function updatePreview() {
    if (selectedImages.length === 0) {
      previewSection.style.display = 'none';
      return;
    }

    previewSection.style.display = 'block';
    previewGrid.innerHTML = '';
    
    selectedImages.forEach(img => {
      const item = document.createElement('div');
      item.className = 'preview-item';
      item.innerHTML = `
        <img src="assets/img/portfolio/${currentCategory}/${img}" alt="preview" loading="lazy">
        <button class="preview-remove" onclick="this.parentElement.remove()">✕</button>
      `;
      previewGrid.appendChild(item);
    });
  }

  generateCodeBtn.onclick = () => {
    if (selectedImages.length === 0) {
      alert('Vui lòng chọn ít nhất 1 ảnh');
      return;
    }

    const moodboardData = {
      images: selectedImages,
      category: currentCategory,
      created: new Date().toISOString()
    };

    const json = JSON.stringify(moodboardData);
    const encoded = btoa(encodeURIComponent(json));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encoded}`;

    document.getElementById('codeBox').textContent = json;
    document.getElementById('shareLink').textContent = shareUrl;
    codeSection.style.display = 'block';
    
    codeSection.scrollIntoView({ behavior: 'smooth' });
  };

  clearBtn.onclick = () => {
    if (confirm('Xóa tất cả lựa chọn?')) {
      selectedImages = [];
      localStorage.removeItem('moodboardDraft');
      document.querySelectorAll('.moodboard-item.selected').forEach(el => el.classList.remove('selected'));
      previewSection.style.display = 'none';
      codeSection.style.display = 'none';
    }
  };

  emailForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const email = emailForm.querySelector('input[type="email"]').value;
    const name = emailForm.querySelector('input[type="text"]').value;
    const note = emailForm.querySelector('textarea').value;

    const moodboardData = {
      images: selectedImages,
      category: currentCategory,
      created: new Date().toISOString(),
      clientInfo: { email, name, note }
    };

    const encoded = btoa(encodeURIComponent(JSON.stringify(moodboardData)));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encoded}`;

    // Send via Formspree or similar
    try {
      const response = await fetch('https://formspree.io/f/xyzqwert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          note,
          moodboardCode: encoded,
          moodboardLink: shareUrl,
          imagesCount: selectedImages.length
        })
      });

      if (response.ok) {
        alert('Gửi thành công! Chúng tôi sẽ xem xét moodboard của bạn.');
        emailForm.reset();
      }
    } catch (err) {
      console.error('Email error:', err);
      alert('Lỗi gửi email. Vui lòng thử lại hoặc copy link chia sẻ.');
    }
  };

  function loadFromCode(code) {
    try {
      const decoded = decodeURIComponent(atob(code));
      const data = JSON.parse(decoded);
      selectedImages = data.images || [];
      currentCategory = data.category || '';
      updatePreview();
    } catch (e) {
      console.error('Invalid code:', e);
    }
  }

  window.copyToClipboard = function(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Đã sao chép!');
    });
  };
});
