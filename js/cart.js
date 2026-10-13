/**
 * Shopping Cart Management for Kerio Dreams Prototype
 */
const CartService = {
  cart: [],

  init() {
    this.cart = window.StorageService ? window.StorageService.getCart() : [];
    this.updateBadges();
    this.bindDrawerEvents();
  },

  getItems() {
    return this.cart;
  },

  addItem(dishId, quantity = 1, notes = "") {
    const itemData = window.MENU_ITEMS ? window.MENU_ITEMS.find(i => i.id === dishId) : null;
    if (!itemData) return false;

    const existingIndex = this.cart.findIndex(i => i.id === dishId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
      if (notes) this.cart[existingIndex].notes = notes;
    } else {
      this.cart.push({
        id: itemData.id,
        name: itemData.name,
        price: itemData.price,
        image: itemData.image,
        unit: itemData.unit,
        quantity: quantity,
        notes: notes
      });
    }

    this.save();
    this.updateBadges();
    this.renderDrawer();
    
    if (window.Utils) {
      window.Utils.showToast(`Added ${itemData.name} to order!`, 'success');
    }
    return true;
  },

  updateQuantity(dishId, delta) {
    const itemIndex = this.cart.findIndex(i => i.id === dishId);
    if (itemIndex === -1) return;

    this.cart[itemIndex].quantity += delta;
    if (this.cart[itemIndex].quantity <= 0) {
      this.cart.splice(itemIndex, 1);
    }

    this.save();
    this.updateBadges();
    this.renderDrawer();

    // Trigger re-render of order page if on order.html
    if (window.OrderPage && typeof window.OrderPage.renderCheckoutItems === 'function') {
      window.OrderPage.renderCheckoutItems();
    }
  },

  removeItem(dishId) {
    this.cart = this.cart.filter(i => i.id !== dishId);
    this.save();
    this.updateBadges();
    this.renderDrawer();

    if (window.OrderPage && typeof window.OrderPage.renderCheckoutItems === 'function') {
      window.OrderPage.renderCheckoutItems();
    }
  },

  clear() {
    this.cart = [];
    this.save();
    this.updateBadges();
    this.renderDrawer();
  },

  save() {
    if (window.StorageService) {
      window.StorageService.saveCart(this.cart);
    }
  },

  getTotalCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  updateBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      this.renderDrawer();
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  },

  renderDrawer() {
    const itemsContainer = document.getElementById('cartDrawerItems');
    const totalElement = document.getElementById('cartDrawerSubtotal');
    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px; display: block; opacity: 0.5;">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p style="font-weight: 600; font-size: 1rem; margin-bottom: 4px;">Your order basket is empty</p>
          <p style="font-size: 0.85rem;">Explore authentic dishes from our kitchen and add your favourites.</p>
          <a href="menu.html" class="btn btn-secondary btn-sm" style="margin-top: 16px;">Browse Menu</a>
        </div>
      `;
      if (totalElement) totalElement.textContent = "KSh 0";
      return;
    }

    const html = this.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">KSh ${(item.price * item.quantity).toLocaleString()} <span style="font-size: 0.75rem; color: var(--color-text-light); font-weight: normal;">(${item.quantity} × KSh ${item.price.toLocaleString()})</span></div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="CartService.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
            <span style="font-size: 0.875rem; font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
            <button class="qty-btn" onclick="CartService.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
            <button onclick="CartService.removeItem('${item.id}')" style="margin-left: auto; font-size: 0.75rem; color: var(--color-danger); text-decoration: underline;" aria-label="Remove item">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    itemsContainer.innerHTML = html;
    if (totalElement) {
      totalElement.textContent = `KSh ${this.getSubtotal().toLocaleString()}`;
    }
  },

  bindDrawerEvents() {
    const toggleBtns = document.querySelectorAll('.cart-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById('cartDrawerClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeDrawer());
    }
  }
};

window.CartService = CartService;
