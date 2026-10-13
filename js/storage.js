/**
 * LocalStorage Persistence Layer for Kerio Dreams Prototype
 */
const StorageService = {
  KEYS: {
    CART: 'kerio_cart_v1',
    RESERVATIONS: 'kerio_reservations_v1',
    ORDERS: 'kerio_orders_v1',
    INQUIRIES: 'kerio_inquiries_v1'
  },

  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn('Storage read error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage write error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage remove error:', e);
    }
  },

  // Cart operations
  getCart() {
    return this.get(this.KEYS.CART, []);
  },

  saveCart(cart) {
    return this.set(this.KEYS.CART, cart);
  },

  clearCart() {
    return this.remove(this.KEYS.CART);
  },

  // Reservation requests
  saveReservation(reservation) {
    const list = this.get(this.KEYS.RESERVATIONS, []);
    list.unshift(reservation);
    this.set(this.KEYS.RESERVATIONS, list);
    return reservation;
  },

  getReservations() {
    return this.get(this.KEYS.RESERVATIONS, []);
  },

  // Orders
  saveOrder(order) {
    const list = this.get(this.KEYS.ORDERS, []);
    list.unshift(order);
    this.set(this.KEYS.ORDERS, list);
    return order;
  },

  getOrders() {
    return this.get(this.KEYS.ORDERS, []);
  }
};

window.StorageService = StorageService;
