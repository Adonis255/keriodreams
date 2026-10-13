/**
 * Customer Reviews Module
 * Clearly labeled prototype review data for Google Business Profile verification.
 */
const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: "Faith K.",
    rating: 5,
    date: "Prototype Sample Feedback",
    source: "Google Review Placeholder",
    text: "The mbuzi choma here is exceptional! Juicy, tender, and properly grilled. The garden setting makes it the best spot in Eldoret for Sunday family meals.",
    avatarText: "FK"
  },
  {
    id: 2,
    name: "David M.",
    rating: 5,
    date: "Prototype Sample Feedback",
    source: "Google Review Placeholder",
    text: "Very peaceful ambiance opposite Soin Hotel. We enjoyed the whole fried tilapia with hot ugali and managu. Friendly staff and authentic Kenyan hospitality.",
    avatarText: "DM"
  },
  {
    id: 3,
    name: "Caroline W.",
    rating: 5,
    date: "Prototype Sample Feedback",
    source: "Google Review Placeholder",
    text: "Kerio Dreams is our go-to when traveling along Kisumu Road. Fast service, spacious green lawns for the kids, and their herbal Dawa tea is unmatched.",
    avatarText: "CW"
  },
  {
    id: 4,
    name: "Brian O.",
    rating: 5,
    date: "Prototype Sample Feedback",
    source: "Google Review Placeholder",
    text: "Great portions and authentic flavor. The mukimo and kienyeji chicken reminded me of genuine home cooking. Can't wait to return with colleagues.",
    avatarText: "BO"
  }
];

const ReviewsController = {
  init() {
    this.renderReviews();
  },

  renderReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;

    container.innerHTML = SAMPLE_REVIEWS.map(r => `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div class="card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-full); background: var(--color-primary); color: var(--color-ivory); display: flex; align-items: center; justify-content: center; font-weight: 700;">
                ${r.avatarText}
              </div>
              <div>
                <h4 style="font-size: var(--text-base); font-family: var(--font-serif); margin-bottom: 2px;">${r.name}</h4>
                <div style="color: #F5A623; font-size: 0.9rem;">
                  ${'★'.repeat(r.rating)}
                </div>
              </div>
            </div>
            <span class="badge badge-gold" style="font-size: 0.65rem;">Sample Review</span>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-main); line-height: 1.6; font-style: italic;">
            "${r.text}"
          </p>
        </div>
        <div style="padding: 12px 24px; background: rgba(32, 35, 31, 0.02); border-top: 1px solid var(--color-border-light); font-size: var(--text-xs); color: var(--color-text-light); display: flex; justify-content: space-between;">
          <span>${r.source}</span>
          <span>Pending Owner Google Link</span>
        </div>
      </div>
    `).join('');
  }
};

window.ReviewsController = ReviewsController;
