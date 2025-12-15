/**
 * Modal Dialog Manager
 * Replacement for browser alert() with beautiful, branded modals
 */

class ModalManager {
  constructor() {
    this.createModalHTML();
  }

  createModalHTML() {
    // Check if modal already exists
    if (document.getElementById('modal-overlay')) return;

    const modalHTML = `
      <div id="modal-overlay" class="modal-overlay">
        <div class="modal-dialog" id="modal-dialog">
          <div class="modal-header">
            <div class="modal-icon" id="modal-icon">ℹ️</div>
            <h2 class="modal-title" id="modal-title">Thông báo</h2>
          </div>
          <p class="modal-message" id="modal-message"></p>
          <div class="modal-actions" id="modal-actions">
            <button class="modal-btn modal-btn-primary" id="modal-confirm">Đóng</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.overlay = document.getElementById('modal-overlay');
    this.dialog = document.getElementById('modal-dialog');
    this.titleEl = document.getElementById('modal-title');
    this.messageEl = document.getElementById('modal-message');
    this.actionsEl = document.getElementById('modal-actions');
    this.iconEl = document.getElementById('modal-icon');

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  }

  show(options = {}) {
    const {
      type = 'info', // 'info', 'success', 'error', 'warning'
      title = 'Thông báo',
      message = '',
      confirmText = 'Đóng',
      cancelText = null,
      onConfirm = null,
      onCancel = null,
      autoClose = false,
      autoCloseDelay = 3000
    } = options;

    // Set type
    this.dialog.className = `modal-dialog ${type}`;

    // Set content
    this.titleEl.textContent = title;
    this.messageEl.textContent = message;

    // Set icon
    const icons = {
      info: 'ℹ️',
      success: '✓',
      error: '✕',
      warning: '⚠'
    };
    this.iconEl.textContent = icons[type] || '✓';

    // Clear previous actions
    this.actionsEl.innerHTML = '';

    // Add confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'modal-btn modal-btn-primary';
    confirmBtn.textContent = confirmText;
    confirmBtn.onclick = () => {
      this.close();
      if (onConfirm) onConfirm();
    };
    this.actionsEl.appendChild(confirmBtn);

    // Add cancel button if provided
    if (cancelText) {
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'modal-btn modal-btn-secondary';
      cancelBtn.textContent = cancelText;
      cancelBtn.onclick = () => {
        this.close();
        if (onCancel) onCancel();
      };
      this.actionsEl.appendChild(cancelBtn);
    }

    // Show modal
    this.overlay.classList.add('active');

    // Auto close if enabled
    if (autoClose) {
      this.autoCloseTimer = setTimeout(() => this.close(), autoCloseDelay);
    }

    // Focus confirm button
    setTimeout(() => confirmBtn.focus(), 100);

    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }

  close() {
    this.overlay.classList.remove('active');
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
    if (this.resolvePromise) {
      this.resolvePromise();
    }
  }

  // Convenience methods
  info(message, title = 'Thông báo', confirmText = 'Đóng') {
    return this.show({ type: 'info', title, message, confirmText });
  }

  success(message, title = 'Thành công', confirmText = 'Đóng') {
    return this.show({ type: 'success', title, message, confirmText, autoClose: true, autoCloseDelay: 2500 });
  }

  error(message, title = 'Lỗi', confirmText = 'Đóng') {
    return this.show({ type: 'error', title, message, confirmText });
  }

  warning(message, title = 'Cảnh báo', confirmText = 'Đóng') {
    return this.show({ type: 'warning', title, message, confirmText });
  }

  confirm(message, title = 'Xác nhận', confirmText = 'Có', cancelText = 'Không') {
    return new Promise((resolve) => {
      this.show({
        type: 'info',
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  }
}

// Initialize global modal manager
const modal = new ModalManager();

// Also provide a global alert replacement
window.showModal = (message, title = 'Thông báo') => {
  return modal.info(message, title);
};
