/**
 * Online Ordering and Checkout Page Controller
 */
const OrderPage = {
  orderType: 'takeaway', // 'takeaway' or 'delivery'

  init() {
    this.bindOrderTypeToggle();
    this.renderCheckoutItems();
    this.bindSubmitForm();
  },

  bindOrderTypeToggle() {
    const radioTakeaway = document.getElementById('orderTypeTakeaway');
    const radioDelivery = document.getElementById('orderTypeDelivery');
    const deliveryFields = document.getElementById('deliveryFields');
    const takeawayFields = document.getElementById('takeawayFields');

    const updateType = (type) => {
      this.orderType = type;
      if (type === 'delivery') {
        if (deliveryFields) deliveryFields.style.display = 'block';
        if (takeawayFields) takeawayFields.style.display = 'none';
      } else {
        if (deliveryFields) deliveryFields.style.display = 'none';
        if (takeawayFields) takeawayFields.style.display = 'block';
      }
      this.renderCheckoutItems();
    };

    if (radioTakeaway) {
      radioTakeaway.addEventListener('change', () => updateType('takeaway'));
    }
    if (radioDelivery) {
      radioDelivery.addEventListener('change', () => updateType('delivery'));
    }
  },

  renderCheckoutItems() {
    const container = document.getElementById('orderCheckoutItems');
    const subtotalEl = document.getElementById('orderSubtotal');
    const totalEl = document.getElementById('orderTotal');
    const checkoutBtn = document.getElementById('orderSubmitBtn');
    if (!container) return;

    const items = window.CartService ? window.CartService.getItems() : [];

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--color-text-muted);">
          <p style="font-size: var(--text-base); font-weight: 600; margin-bottom: 8px;">Your order is currently empty</p>
          <p style="font-size: var(--text-sm); margin-bottom: 16px;">Browse our menu to select fresh, authentic Kenyan meals.</p>
          <a href="menu.html" class="btn btn-primary btn-sm">Explore Menu</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'KSh 0';
      if (totalEl) totalEl.textContent = 'KSh 0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    const subtotal = window.CartService.getSubtotal();

    container.innerHTML = items.map(item => `
      <div style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--color-border-light); align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover;" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
        <div style="flex: 1;">
          <h4 style="font-size: var(--text-sm); font-family: var(--font-serif); margin-bottom: 2px;">${item.name}</h4>
          <span style="font-size: var(--text-xs); color: var(--color-terracotta); font-weight: 600;">KSh ${(item.price * item.quantity).toLocaleString()}</span>
          ${item.notes ? `<div style="font-size: 0.75rem; color: var(--color-text-light); font-style: italic;">Note: ${item.notes}</div>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="qty-btn" onclick="CartService.updateQuantity('${item.id}', -1)">−</button>
          <span style="font-size: var(--text-sm); font-weight: 600; min-width: 18px; text-align: center;">${item.quantity}</span>
          <button class="qty-btn" onclick="CartService.updateQuantity('${item.id}', 1)">+</button>
          <button onclick="CartService.removeItem('${item.id}')" style="font-size: 0.75rem; color: var(--color-danger); margin-left: 8px;">✕</button>
        </div>
      </div>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = `KSh ${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `KSh ${subtotal.toLocaleString()}`;
  },

  bindSubmitForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleOrderSubmission();
    });
  },

  handleOrderSubmission() {
    const items = window.CartService ? window.CartService.getItems() : [];
    if (items.length === 0) {
      if (window.Utils) window.Utils.showToast('Please add items to your basket before ordering.', 'error');
      return;
    }

    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    const addressInput = document.getElementById('custAddress');
    const pickupTimeInput = document.getElementById('custPickupTime');
    const notesInput = document.getElementById('custNotes');

    const name = (nameInput || {}).value || "";
    const phone = (phoneInput || {}).value || "";
    const address = (addressInput || {}).value || "";
    const pickupTime = (pickupTimeInput || {}).value || "";
    const notes = (notesInput || {}).value || "";

    // Validation
    let hasError = false;
    document.querySelectorAll('.has-error').forEach(e => e.classList.remove('has-error'));

    if (!window.ValidationUtils.isNonEmpty(name)) {
      document.getElementById('custNameGroup').classList.add('has-error');
      hasError = true;
    }

    if (!window.ValidationUtils.isValidPhone(phone)) {
      document.getElementById('custPhoneGroup').classList.add('has-error');
      hasError = true;
    }

    if (this.orderType === 'delivery' && !window.ValidationUtils.isNonEmpty(address)) {
      document.getElementById('custAddressGroup').classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      if (window.Utils) window.Utils.showToast('Please correct the highlighted fields.', 'error');
      return;
    }

    const refNumber = 'KD-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = window.CartService.getSubtotal();

    const orderRecord = {
      refNumber: refNumber,
      customerName: name,
      phone: phone,
      type: this.orderType,
      address: this.orderType === 'delivery' ? address : null,
      collectionTime: this.orderType === 'takeaway' ? pickupTime : null,
      notes: notes,
      items: [...items],
      subtotal: subtotal,
      total: subtotal,
      createdAt: new Date().toISOString()
    };

    if (window.StorageService) {
      window.StorageService.saveOrder(orderRecord);
    }

    // Save for confirmation receipt page
    sessionStorage.setItem('latest_order', JSON.stringify(orderRecord));

    // Clear cart
    if (window.CartService) {
      window.CartService.clear();
    }

    // Redirect to order-success.html
    window.location.href = 'order-success.html';
  }
};

window.OrderPage = OrderPage;
