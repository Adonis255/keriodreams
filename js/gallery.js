/**
 * Interactive Photography Gallery with Category Filtering & Lightbox
 */
const GalleryData = [
  {
    id: 1,
    title: "Sizzling Nyama Choma Platter",
    category: "Food",
    categoryTag: "Charcoal Grill",
    image: "/assets/images/nyama-choma.jpg",
    caption: "Slow-roasted goat ribs served on rustic timber with freshly diced kachumbari and crispy golden chips."
  },
  {
    id: 2,
    title: "Kerio Signature Kuku with Mukimo",
    category: "Food",
    categoryTag: "Kenyan Heritage",
    image: "/assets/images/signature-chicken-mukimo.jpg",
    caption: "Traditional kuku kienyeji braised with tomatoes and herbs, paired with mashed pumpkin leaf mukimo."
  },
  {
    id: 3,
    title: "Whole Lake Victoria Fried Tilapia",
    category: "Food",
    categoryTag: "Fish Special",
    image: "/assets/images/fried-tilapia.jpg",
    caption: "Fresh whole tilapia fried to a golden crunch, accompanied by hot ugali and sauteed greens."
  },
  {
    id: 4,
    title: "Lush Green Garden Dining Grounds",
    category: "Garden",
    categoryTag: "Outdoor Dining",
    image: "/assets/images/garden-dining.jpg",
    caption: "Manicured lawns, blooming bougainvillea, and peaceful shaded patio tables in our serene Eldoret garden."
  },
  {
    id: 5,
    title: "Family Celebrations & Gatherings",
    category: "Groups and gatherings",
    categoryTag: "Family Dining",
    image: "/assets/images/family-dining.jpg",
    caption: "Joyous shared moments over platters of authentic Kenyan food in a hospitable open-air atmosphere."
  },
  {
    id: 6,
    title: "Warm Timber Dining Hall",
    category: "Interior",
    categoryTag: "Indoor Ambiance",
    image: "/assets/images/restaurant-interior.jpg",
    caption: "Artisan woven lantern pendants, timber vaulted ceilings, and panoramic windows opening to the garden."
  },
  {
    id: 7,
    title: "Traditional Beef Stew & Indigenous Greens",
    category: "Food",
    categoryTag: "Comfort Classics",
    image: "/assets/images/traditional-ugali-managu.jpg",
    caption: "Slow-cooked beef stew in thick tomato gravy with fluffy cornmeal ugali and freshly wilted managu greens."
  },
  {
    id: 8,
    title: "Chef at the Outdoor Charcoal Jiko",
    category: "Grilling",
    categoryTag: "Open Fire",
    image: "/assets/images/charcoal-grill.jpg",
    caption: "Master grillers roasting seasoned cuts over hot acacia coals with fragrant aroma filling the garden air."
  },
  {
    id: 9,
    title: "Garden Evening Lantern Atmosphere",
    category: "Outdoor dining",
    categoryTag: "Evening Dining",
    image: "/assets/images/hero-kenyan-dining.jpg",
    caption: "Warm evening lantern lights glowing among tropical palms as dinner is served under the Eldoret sky."
  }
];

const GalleryController = {
  currentFilter: "All",
  currentIndex: 0,
  activeItems: [],

  init() {
    this.activeItems = [...GalleryData];
    this.renderFilters();
    this.renderGrid();
    this.bindLightboxKeyboard();
  },

  renderFilters() {
    const categories = ["All", "Food", "Garden", "Interior", "Outdoor dining", "Grilling", "Groups and gatherings"];
    const container = document.getElementById('galleryFilterNav');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
      <button class="menu-cat-btn ${cat === this.currentFilter ? 'active' : ''}" 
              onclick="GalleryController.setFilter('${cat}')">
        ${cat}
      </button>
    `).join('');
  },

  setFilter(category) {
    this.currentFilter = category;
    this.renderFilters();
    this.activeItems = category === "All" 
      ? [...GalleryData] 
      : GalleryData.filter(i => i.category.toLowerCase() === category.toLowerCase());
    this.renderGrid();
  },

  renderGrid() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = this.activeItems.map((item, index) => `
      <div class="gallery-item animate-fade-in" onclick="GalleryController.openLightbox(${index})">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
        <div class="gallery-caption-overlay">
          <span class="badge badge-terracotta" style="margin-bottom: 6px; align-self: flex-start; font-size: 0.65rem;">${item.categoryTag}</span>
          <h4 style="font-size: var(--text-base); color: var(--color-ivory); margin-bottom: 4px;">${item.title}</h4>
          <p style="font-size: var(--text-xs); color: rgba(247, 243, 233, 0.85);">${item.caption}</p>
        </div>
      </div>
    `).join('');
  },

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.activeItems[index];
    if (!item) return;

    const modal = document.getElementById('galleryLightbox');
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const caption = document.getElementById('lightboxCaption');
    const counter = document.getElementById('lightboxCounter');

    if (img) img.src = item.image;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = item.caption;
    if (counter) counter.textContent = `${index + 1} of ${this.activeItems.length}`;

    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeLightbox() {
    const modal = document.getElementById('galleryLightbox');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  },

  prevImage() {
    if (this.activeItems.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.activeItems.length) % this.activeItems.length;
    this.openLightbox(this.currentIndex);
  },

  nextImage() {
    if (this.activeItems.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.activeItems.length;
    this.openLightbox(this.currentIndex);
  },

  bindLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('galleryLightbox');
      if (modal && modal.classList.contains('is-active')) {
        if (e.key === 'ArrowLeft') this.prevImage();
        if (e.key === 'ArrowRight') this.nextImage();
        if (e.key === 'Escape') this.closeLightbox();
      }
    });
  }
};

window.GalleryController = GalleryController;
