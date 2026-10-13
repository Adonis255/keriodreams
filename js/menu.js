/**
 * Interactive Digital Menu Controller
 */
const MenuController = {
  currentCategory: "All Dishes",
  searchQuery: "",
  activeModalDish: null,

  init() {
    this.bindEvents();
    this.renderCategoryNav();
    this.renderMenuGrid();
  },

  bindEvents() {
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderMenuGrid();
      });
    }

    const resetBtn = document.getElementById('menuResetFilter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
  },

  resetFilters() {
    this.currentCategory = "All Dishes";
    this.searchQuery = "";
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) searchInput.value = "";
    this.renderCategoryNav();
    this.renderMenuGrid();
  },

  setCategory(category) {
    this.currentCategory = category;
    this.renderCategoryNav();
    this.renderMenuGrid();
  },

  renderCategoryNav() {
    const navContainer = document.getElementById('menuCategoryNav');
    if (!navContainer || !window.MENU_CATEGORIES) return;

    navContainer.innerHTML = window.MENU_CATEGORIES.map(cat => `
      <button class="menu-cat-btn ${cat === this.currentCategory ? 'active' : ''}" 
              onclick="MenuController.setCategory('${cat}')">
        ${cat}
      </button>
    `).join('');
  },

  getFilteredItems() {
    if (!window.MENU_ITEMS) return [];
    return window.MENU_ITEMS.filter(item => {
      const matchesCategory = this.currentCategory === "All Dishes" || item.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.category.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });
  },

  renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const items = this.getFilteredItems();

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--color-ivory-light); border-radius: var(--radius-xl); border: 1px dashed var(--color-border);">
          <h3 style="font-size: var(--text-xl); margin-bottom: 8px;">No dishes match your selection</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 20px;">Try searching for a different dish name like "Mbuzi", "Chicken", or "Ugali".</p>
          <button class="btn btn-secondary btn-sm" onclick="MenuController.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(dish => `
      <div class="dish-card animate-fade-in" id="card-${dish.id}">
        <div class="dish-card-img-wrapper" onclick="MenuController.openDishModal('${dish.id}')" style="cursor: pointer;">
          <img src="${dish.image}" alt="${dish.name}" class="dish-card-img" loading="lazy" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
          <span class="dish-card-category-tag">${dish.category}</span>
          ${dish.samplePrice ? '<span class="dish-card-sample-tag">Sample Price</span>' : ''}
        </div>
        <div class="dish-card-content">
          <div class="dish-card-header">
            <h3 class="dish-card-title" onclick="MenuController.openDishModal('${dish.id}')" style="cursor: pointer;">${dish.name}</h3>
            <span class="dish-card-price">KSh ${dish.price.toLocaleString()}</span>
          </div>
          <p class="dish-card-desc">${dish.description}</p>
          <div class="dish-card-footer">
            <button class="btn btn-secondary btn-sm" onclick="MenuController.openDishModal('${dish.id}')">
              Details
            </button>
            <button class="btn btn-terracotta btn-sm" onclick="CartService.addItem('${dish.id}', 1)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Add to Order
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  openDishModal(dishId) {
    const dish = window.MENU_ITEMS.find(d => d.id === dishId);
    if (!dish) return;

    this.activeModalDish = dish;
    const modalContent = document.getElementById('dishModalBody');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div style="position: relative; max-height: 280px; overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
        <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 280px; object-fit: cover;" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
        <span class="badge badge-dark" style="position: absolute; top: 16px; left: 16px;">${dish.category}</span>
      </div>
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h2 style="font-size: var(--text-2xl); font-family: var(--font-serif);">${dish.name}</h2>
          <span style="font-size: var(--text-2xl); font-weight: 700; color: var(--color-terracotta);">KSh ${dish.price.toLocaleString()}</span>
        </div>
        <p style="color: var(--color-text-muted); line-height: 1.6; margin-bottom: 16px;">${dish.description}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          ${(dish.dietary || []).map(tag => `<span class="badge badge-sage">${tag}</span>`).join('')}
          <span class="badge badge-terracotta">${dish.unit}</span>
          <span class="badge badge-gold">Prototype Sample Pricing</span>
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label" for="modalDishNotes" style="font-size: var(--text-xs);">Kitchen preparation request (Optional):</label>
          <input type="text" id="modalDishNotes" class="form-control" placeholder="e.g. Mild chili, separate kachumbari, well done...">
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 16px; border-top: 1px solid var(--color-border-light);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="qty-btn" id="modalQtyMinus" style="width: 36px; height: 36px; font-size: 1.2rem;">−</button>
            <span id="modalQtyVal" style="font-size: 1.1rem; font-weight: 700; min-width: 24px; text-align: center;">1</span>
            <button class="qty-btn" id="modalQtyPlus" style="width: 36px; height: 36px; font-size: 1.2rem;">+</button>
          </div>
          <button class="btn btn-terracotta" id="modalAddCartBtn" style="flex: 1;">
            Add to Order • <span id="modalAddPrice">KSh ${dish.price.toLocaleString()}</span>
          </button>
        </div>
      </div>
    `;

    let qty = 1;
    const qtyVal = document.getElementById('modalQtyVal');
    const addPrice = document.getElementById('modalAddPrice');
    const updateModalCalc = () => {
      if (qtyVal) qtyVal.textContent = qty;
      if (addPrice) addPrice.textContent = `KSh ${(dish.price * qty).toLocaleString()}`;
    };

    document.getElementById('modalQtyMinus').onclick = () => {
      if (qty > 1) { qty--; updateModalCalc(); }
    };
    document.getElementById('modalQtyPlus').onclick = () => {
      qty++; updateModalCalc();
    };
    document.getElementById('modalAddCartBtn').onclick = () => {
      const notes = (document.getElementById('modalDishNotes') || {}).value || "";
      window.CartService.addItem(dish.id, qty, notes);
      window.Utils.closeModal('dishModal');
    };

    window.Utils.openModal('dishModal');
  }
};

window.MenuController = MenuController;
