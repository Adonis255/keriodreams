/**
 * Navigation and Header interactions for Kerio Dreams
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll effect for header
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
        header.classList.remove('is-transparent');
      } else {
        if (header.dataset.transparent === "true") {
          header.classList.add('is-transparent');
          header.classList.remove('is-scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile drawer navigation
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileNavClose');

  const openMobileNav = () => {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('is-open');
      mobileOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileNav = () => {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('is-open');
      mobileOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  // 3. Highlight active nav link
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link, .bottom-bar-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === pageName || (pageName === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Keyboard Escape support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof closeMobileNav === 'function') closeMobileNav();
      if (window.CartService && typeof window.CartService.closeDrawer === 'function') {
        window.CartService.closeDrawer();
      }
      if (window.Utils && typeof window.Utils.closeModal === 'function') {
        window.Utils.closeModal();
      }
    }
  });
});
