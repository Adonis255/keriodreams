/**
 * UI Utilities: Toasts, Modals, Currency Formatting, Clipboard
 */
const Utils = {
  formatPrice(num) {
    return `KSh ${Number(num || 0).toLocaleString()}`;
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button style="margin-left:auto; opacity:0.7; font-weight:bold; cursor:pointer;" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3500);
  },

  copyToClipboard(text, successMessage = "Copied to clipboard!") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMessage, 'success');
      }).catch(() => {
        this.fallbackCopy(text, successMessage);
      });
    } else {
      this.fallbackCopy(text, successMessage);
    }
  },

  fallbackCopy(text, successMessage) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast(successMessage, 'success');
    } catch (e) {
      this.showToast('Unable to copy automatically.', 'error');
    }
    document.body.removeChild(ta);
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    } else {
      const activeModals = document.querySelectorAll('.modal-overlay.is-active, .lightbox-modal.is-active');
      activeModals.forEach(m => m.classList.remove('is-active'));
      document.body.style.overflow = '';
    }
  }
};

window.Utils = Utils;
