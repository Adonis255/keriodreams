/**
 * Special Offers & Campaigns Configuration
 * Clearly marked sample promotional content for owner review.
 */
const SAMPLE_OFFERS = [
  {
    id: "offer-01",
    title: "Weekend Nyama Choma Family Platter",
    badge: "Sample Offer",
    desc: "1.5kg slow-roasted goat ribs, large basket of golden potato chips, hot chapatis, mukimo, and two bowls of freshly diced spicy kachumbari.",
    image: "/assets/images/nyama-choma.jpg",
    validity: "Saturdays & Sundays (Sample Proposal)",
    terms: "Subject to owner approval. Requires advance table reservation.",
    ctaText: "Reserve for Weekend",
    ctaLink: "booking.html"
  },
  {
    id: "offer-02",
    title: "Garden Sunset High Tea & Herbal Dawa",
    badge: "Sample Offer",
    desc: "Unwind in our serene garden with fresh pots of spiced ginger dawa tea or masala tea, accompanied by hot mandazi and samosas.",
    image: "/assets/images/garden-dining.jpg",
    validity: "Daily 3:00 PM – 6:00 PM (Sample Proposal)",
    terms: "Sample promotional package for guest afternoon dining.",
    ctaText: "Inquire on WhatsApp",
    whatsappAction: true
  },
  {
    id: "offer-03",
    title: "Corporate & Group Luncheon Feast",
    badge: "Group Special",
    desc: "Customizable buffet or family-style sharing platters featuring charcoal-grilled chicken, beef stew, tilapia, traditional greens, and accompaniments.",
    image: "/assets/images/family-dining.jpg",
    validity: "Weekdays by advance reservation (Groups of 8+)",
    terms: "Deposit required on live bookings upon management confirmation.",
    ctaText: "Request Group Quote",
    ctaLink: "experience.html#group-inquiry"
  }
];

const OffersController = {
  init() {
    this.renderOffers();
  },

  renderOffers() {
    const container = document.getElementById('offersGrid');
    if (!container) return;

    container.innerHTML = SAMPLE_OFFERS.map(offer => `
      <div class="card" style="display: flex; flex-direction: column;">
        <div style="height: 220px; overflow: hidden; position: relative;">
          <img src="${offer.image}" alt="${offer.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/assets/images/hero-kenyan-dining.jpg'">
          <span class="badge badge-terracotta" style="position: absolute; top: 12px; left: 12px;">${offer.badge}</span>
        </div>
        <div class="card-body" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: var(--text-xl); font-family: var(--font-serif); margin-bottom: 8px;">${offer.title}</h3>
            <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: 16px; line-height: 1.5;">${offer.desc}</p>
            <div style="font-size: var(--text-xs); color: var(--color-primary); font-weight: 600; margin-bottom: 4px;">
              ⏱ ${offer.validity}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: 20px;">
              * Note: ${offer.terms}
            </div>
          </div>
          <div>
            ${offer.whatsappAction 
              ? `<button class="btn btn-primary btn-sm" onclick="WhatsAppService.openGeneralInquiry()" style="width: 100%;">
                  ${offer.ctaText}
                 </button>`
              : `<a href="${offer.ctaLink}" class="btn btn-primary btn-sm" style="width: 100%;">
                  ${offer.ctaText}
                 </a>`
            }
          </div>
        </div>
      </div>
    `).join('');
  }
};

window.OffersController = OffersController;
