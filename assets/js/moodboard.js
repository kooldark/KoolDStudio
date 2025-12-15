document.addEventListener('DOMContentLoaded', async () => {
  const categoryTabs = document.getElementById('categoryTabs');
  const moodboardGrid = document.getElementById('moodboardGrid');
  const previewSection = document.getElementById('previewSection');
  const previewGrid = document.getElementById('previewGrid');
  const codeSection = document.getElementById('codeSection');
  const generateCodeBtn = document.getElementById('generateCodeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const filterCheckbox = document.getElementById('filterCheckbox');
  const preloader = document.getElementById('preloader');

  let portfolioData = {};
  let selectedImages = [];
  let currentCategory = '';
  let filterMode = false;

  // Fetch moodboard data
  try {
    const res = await fetch('assets/js/moodboard-data.json');
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    portfolioData = data;

    // Load moodboard from URL if exists
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    // Load from localStorage draft
    const draft = localStorage.getItem('moodboardDraft');
    if (draft && !code) {
      selectedImages = JSON.parse(draft);
    }

    renderCategories();
    
    // Load from URL code AFTER categories are rendered
    if (code) {
      loadFromCode(code);
    }
    
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
      btn.setAttribute('data-cat', cat.id);
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

    const imagesToRender = filterMode
      ? category.images.filter(img => selectedImages.includes(img.name))
      : category.images;

    imagesToRender.forEach(img => {
      const imgPath = `${category.path}/${img.name}`;
      const anchor = document.createElement('a');
      anchor.href = imgPath;
      anchor.setAttribute('data-width', img.width);
      anchor.setAttribute('data-height', img.height);

      const imageElement = document.createElement('img');
      imageElement.src = imgPath;
      imageElement.alt = category.title;
      imageElement.loading = 'lazy';
      
      anchor.appendChild(imageElement);

      if (selectedImages.includes(img.name)) {
        anchor.classList.add('selected');
      }
      
      anchor.onclick = (e) => {
        e.preventDefault();
        toggleImage(imgPath, img.name, anchor);
      };
      moodboardGrid.appendChild(anchor);
    });
  }

  function toggleImage(fullPath, imgName, anchorEl) {
    if (selectedImages.includes(imgName)) {
      selectedImages = selectedImages.filter(i => i !== imgName);
      anchorEl.classList.remove('selected');
    } else {
      selectedImages.push(imgName);
      anchorEl.classList.add('selected');
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
    
    selectedImages.forEach((imgName, idx) => {
      const item = document.createElement('div');
      item.className = 'preview-item';

      // Find the category that this image belongs to
      let categoryPath = '';
      for (const cat of portfolioData.categories) {
        if (cat.images.some(imageObj => imageObj.name === imgName)) {
          categoryPath = cat.path;
          break;
        }
      }

      const imgPath = `${categoryPath}/${imgName}`;
      item.innerHTML = `
        <img src="${imgPath}" alt="preview" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23eee%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 text-anchor=%22middle%22 x=%2250%25%22 y=%2250%25%22%3EImage not found%3C/text%3E%3C/svg%3E'">
        <button class="preview-remove" data-index="${idx}">✕</button>
      `;
      const removeBtn = item.querySelector('.preview-remove');
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        const removedImgName = selectedImages.splice(idx, 1)[0];
        localStorage.setItem('moodboardDraft', JSON.stringify(selectedImages));
        updatePreview();

        // Also unselect in the main grid
        const mainGridImage = moodboardGrid.querySelector(`a[href*="${removedImgName}"]`);
        if (mainGridImage) {
          mainGridImage.classList.remove('selected');
        }
      };
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

    document.getElementById('shareLink').textContent = shareUrl;
    codeSection.style.display = 'block';
    
    codeSection.scrollIntoView({ behavior: 'smooth' });
  };

  clearBtn.onclick = () => {
    if (confirm('Xóa tất cả lựa chọn?')) {
      selectedImages = [];
      localStorage.removeItem('moodboardDraft');
      document.querySelectorAll('.moodboard-grid .jg-row > a.selected').forEach(el => el.classList.remove('selected'));
      previewSection.style.display = 'none';
      codeSection.style.display = 'none';
      if ($(moodboardGrid).data('jg.data')) {
          $(moodboardGrid).justifiedGallery('norewind');
      }
    }
  };

  // Messenger share button
  const messengerShareBtn = document.getElementById('messengerShareBtn');
  if (messengerShareBtn) {
    messengerShareBtn.onclick = () => {
      const shareLink = document.getElementById('shareLink').innerText;
      const message = `Xin chào! Tôi vừa tạo moodboard trên Kool D. Studio. Bạn có thể xem tại đây: ${shareLink}`;
      const messengerUrl = `https://m.me/KoolDStudio?text=${encodeURIComponent(message)}`;
      window.open(messengerUrl, '_blank');
    };
  }

  // Filter checkbox handler
  filterCheckbox.onchange = () => {
    filterMode = filterCheckbox.checked;
    const activeBtn = document.querySelector('.category-btn.active');
    if (activeBtn) {
      const catId = activeBtn.getAttribute('data-cat');
      selectCategory(catId, activeBtn);
    }
  };

  function loadFromCode(code) {
    try {
      const decoded = decodeURIComponent(atob(code));
      const data = JSON.parse(decoded);
      selectedImages = data.images || [];
      currentCategory = data.category || '';
      
      // Auto-enable filter mode when loading code
      filterMode = true;
      filterCheckbox.checked = true;
      
      // Auto-select the category button and render grid
      if (currentCategory) {
        const categoryBtn = document.querySelector(`.category-btn[data-cat="${currentCategory}"]`);
        if (categoryBtn) {
          categoryBtn.click();
        } else {
          // If category button not found, use first category
          const firstBtn = document.querySelector('.category-btn');
          if (firstBtn) firstBtn.click();
        }
      } else {
        // No category stored, use first category
        const firstBtn = document.querySelector('.category-btn');
        if (firstBtn) firstBtn.click();
      }
      
      updatePreview();
    } catch (e) {
      console.error('Invalid code:', e);
      alert('Link moodboard không hợp lệ. Vui lòng thử lại.');
    }
  }

  window.copyToClipboard = function(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Đã sao chép!');
    });
  };
});
