/**
 * Kerio Dreams Main Application Entry
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Cart
  if (window.CartService) {
    window.CartService.init();
  }

  // Initialize Homepage Dining Preview Tabs if present
  initDiningPreviewTabs();

  // Initialize Page-Specific Controllers
  if (document.getElementById('menuGrid') && window.MenuController) {
    window.MenuController.init();
  }

  if (document.getElementById('bookingWizard') && window.BookingWizard) {
    window.BookingWizard.init();
  }

  if (document.getElementById('orderCheckoutItems') && window.OrderPage) {
    window.OrderPage.init();
  }

  if (document.getElementById('galleryGrid') && window.GalleryController) {
    window.GalleryController.init();
  }

  if (document.getElementById('reviewsGrid') && window.ReviewsController) {
    window.ReviewsController.init();
  }

  if (document.getElementById('offersGrid') && window.OffersController) {
    window.OffersController.init();
  }

  if (window.FormsHandler) {
    window.FormsHandler.initGroupInquiry();
    window.FormsHandler.initContactForm();
  }
});

/**
 * Interactive Dining Experience Preview (Homepage)
 */
function initDiningPreviewTabs() {
  const tabs = document.querySelectorAll('.dining-tab-btn');
  const previewImg = document.getElementById('diningPreviewImg');
  const previewTitle = document.getElementById('diningPreviewTitle');
  const previewDesc = document.getElementById('diningPreviewDesc');
  const previewTag = document.getElementById('diningPreviewTag');
  const previewCta = document.getElementById('diningPreviewCta');

  if (!tabs.length || !previewImg) return;

  const experienceData = {
    "garden": {
      title: "Lush Garden Dining",
      tag: "Tranquil Outdoor Oasis",
      desc: "Dine amidst blooming flowers, shaded canvas parasols, and gentle breezes in our peaceful Eldoret garden. Perfect for relaxed afternoon lunches, weekend family outings, and celebratory dinners under lantern light.",
      image: "/assets/images/garden-dining.jpg",
      ctaText: "Book Garden Table",
      ctaLink: "booking.html"
    },
    "family": {
      title: "Family Dining Feasts",
      tag: "Generous Sharing Meals",
      desc: "Gather your loved ones around spacious handcrafted wooden tables. Generous platters of charcoal nyama choma, kuku kienyeji, golden chips, and mukimo bring everyone together with authentic Kenyan warmth.",
      image: "/assets/images/family-dining.jpg",
      ctaText: "Plan Family Visit",
      ctaLink: "booking.html"
    },
    "groups": {
      title: "Group Gatherings & Celebrations",
      tag: "Hospitality for All",
      desc: "From birthdays and anniversaries to corporate get-togethers, our team accommodates large parties with tailored seating arrangements and pre-arranged feasts.",
      image: "/assets/images/restaurant-interior.jpg",
      ctaText: "Inquire for Groups",
      ctaLink: "experience.html"
    },
    "everyday": {
      title: "Comforting Everyday Kenyan Meals",
      tag: "Freshly Made Daily",
      desc: "Whether pausing during your travels along Kisumu Road or dropping by for a hearty lunch, enjoy piping hot ugali, slow-stewed beef, whole tilapia, and freshly sautéed traditional greens.",
      image: "/assets/images/traditional-ugali-managu.jpg",
      ctaText: "View Full Menu",
      ctaLink: "menu.html"
    },
    "takeaway": {
      title: "Quick Takeaway & Advance Orders",
      tag: "Hot & Packed with Care",
      desc: "Short on time? Order your favorite grilled meats and accompaniments in advance for seamless pickup or takeaway without long waiting times.",
      image: "/assets/images/nyama-choma.jpg",
      ctaText: "Order Takeaway Online",
      ctaLink: "order.html"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const expKey = tab.dataset.experience;
      const data = experienceData[expKey];
      if (data) {
        previewImg.style.opacity = '0.4';
        setTimeout(() => {
          previewImg.src = data.image;
          previewTitle.textContent = data.title;
          previewDesc.textContent = data.desc;
          if (previewTag) previewTag.textContent = data.tag;
          if (previewCta) {
            previewCta.textContent = data.ctaText;
            previewCta.href = data.ctaLink;
          }
          previewImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}
