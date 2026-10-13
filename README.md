# Kerio Dreams Restaurant — Premium Digital Experience Prototype

## 1. Executive Summary & Overview
This digital experience prototype is built specifically for **Kerio Dreams Restaurant**, located along Kisumu Road, opposite Soin Hotel in Eldoret, Kenya.

The prototype replaces static web pages with an interactive hospitality platform that allows guests to:
- Discover authentic charcoal-grilled Nyama Choma, signature chicken with mukimo, Lake Victoria fried tilapia, and traditional accompaniments.
- Search and filter through an interactive digital menu with detailed item modals and ingredient notes.
- Assemble orders in a persistent LocalStorage shopping basket with instant price recalculation.
- Complete a multi-step table reservation wizard with tailored seating preferences (Garden Dining, Indoor Dining Hall, Family Gatherings, Charcoal Jiko).
- Directly transmit orders and table bookings via verified WhatsApp links (`+254 720 778 059`) and telephone.
- Browse high-resolution visual storytelling with filterable masonry galleries and responsive lightboxes.

---

## 2. Verified Business Context
- **Name**: Kerio Dreams Restaurant
- **Location**: Along Kisumu Road, opposite Soin Hotel, Eldoret, Kenya
- **Postal Address**: P.O. Box 4660-30100, Eldoret
- **Telephones**: 
  - Primary / WhatsApp: `+254 720 778 059` (wa.me format: `254720778059`)
  - Secondary: `+254 721 223 661`
- **Operating Hours**: Monday – Sunday, 7:00 AM – 10:00 PM
- **Cuisine & Atmosphere**: Authentic Kenyan cuisine, Charcoal-grilled Nyama Choma, relaxing garden dining, family-friendly patio, traveler meals.

---

## 3. Architecture & File Structure
This prototype is constructed strictly using vanilla HTML5, CSS3, ES6+ JavaScript, and LocalStorage:

```
├── index.html              # Homepage with cinematic hero, experience tabs & featured dishes
├── menu.html               # Full digital interactive menu with search, categories & modals
├── order.html              # Takeaway / delivery checkout flow & cart summary
├── booking.html            # 5-step table reservation journey with validation
├── booking-success.html    # Demo booking confirmation receipt & WhatsApp integration
├── order-success.html      # Demo order confirmation receipt & WhatsApp dispatch
├── experience.html         # Atmosphere storytelling & group inquiry form
├── gallery.html            # Photography gallery with category filters & lightbox
├── about.html              # Restaurant narrative and Kenyan culinary heritage
├── reviews.html            # Google Business reviews layout & feedback tool
├── offers.html             # Promotional dining specials & campaign cards
├── contact.html            # Verified contacts, Google Maps navigation & FAQs
│
├── assets/
│   ├── images/             # High-resolution photorealistic Kenyan food & garden assets
│   └── icons/
│
├── css/
│   ├── variables.css       # Earthy brand palette, typography, shadows & layout variables
│   ├── reset.css           # Modern box-sizing reset & reduced-motion support
│   ├── global.css          # Core elements, typography, badges & container styling
│   ├── components.css      # Buttons, header, drawer, cards, modals & floating action bar
│   ├── pages.css           # Page layouts (hero, menu, wizard, checkout, lightbox, tickets)
│   ├── animations.css      # Smooth fade, slide, and pulse microinteractions
│   └── responsive.css      # Mobile breakpoints (320px, 375px, 430px, tablet, desktop)
│
├── js/
│   ├── config.js           # Central business data configuration
│   ├── storage.js          # LocalStorage persistence service (cart, orders, bookings)
│   ├── menu-data.js        # Authentic Kenyan dishes dataset with KSh pricing
│   ├── cart.js             # Live shopping cart state, drawer rendering & count badges
│   ├── menu.js             # Live search, category filtering & item modal handler
│   ├── booking.js          # Multi-step table reservation wizard with step validation
│   ├── order.js            # Checkout logic, takeaway/delivery toggles & validation
│   ├── gallery.js          # Filterable image grid & keyboard-controlled lightbox
│   ├── reviews.js          # Customer reviews data controller
│   ├── offers.js           # Campaign packages controller
│   ├── forms.js            # Group inquiry & message dispatch via WhatsApp
│   ├── whatsapp.js         # Verified pre-filled wa.me URL generator
│   ├── validation.js       # Kenyan phone number and form validators
│   ├── utils.js            # Toast notifications, modal handlers & clipboard copy
│   └── main.js             # Application bootstrap & interactive tab transitions
```

---

## 4. Client Demonstration Guide: What to Test

1. **Homepage Wow-Moment (`index.html`)**:
   - Scroll down to experience the sticky header transition from transparent over the hero to solid ivory.
   - Click the interactive "Dining Experiences at Kerio Dreams" tabs (Garden Dining, Family Dining, Group Gatherings, Everyday Meals, Takeaway) to preview dynamic photography and descriptions without page reload.
   - Click "+ Add to Order" on any featured dish card to test instant basket updates and toast feedback.

2. **Interactive Digital Menu (`menu.html`)**:
   - Type dish names in the instant search field (e.g. `Mbuzi`, `Chicken`, `Ugali`, `Dawa`).
   - Filter by categories: `From the Jiko`, `Grill & Fry`, `Kenyan Classics`, `Sides & Accompaniments`, `Drinks`.
   - Click any dish card to open the Detail Modal, adjust quantity, add preparation notes, and add to basket.
   - Notice the live floating cart count updating in the header and the mobile bottom navigation.

3. **Multi-Step Table Reservation Wizard (`booking.html`)**:
   - **Step 1**: Pick a date (past dates are disabled), select a dining time slot button, and adjust guest count.
   - **Step 2**: Select a seating preference card (Garden Dining, Indoor Dining, Family Gathering, or Jiko).
   - **Step 3**: Enter guest name and phone number (validates Kenyan formats such as `0720 778 059` or `+254 720...`).
   - **Step 4**: Review all booking information and check the acknowledgment box.
   - **Step 5**: Click "Confirm Reservation Request" to generate a unique demo reference (`KD-RES-XXXX`), save it to LocalStorage, and navigate to `booking-success.html`.
   - On the success page, click "Send Request to WhatsApp" to inspect the pre-formatted WhatsApp message ready to send to `+254 720 778 059`.

4. **Online Order & Checkout (`order.html`)**:
   - Review cart items, toggle between "Takeaway Pickup" and "Delivery Inquiry".
   - Adjust quantities or remove items directly in the checkout summary.
   - Enter name and contact details, and submit order to see `order-success.html` with itemized breakdown and WhatsApp dispatch.

5. **Photo Gallery Lightbox (`gallery.html`)**:
   - Filter photography by Food, Garden, Interior, Outdoor dining, Grilling, Groups.
   - Click any photo to open the fullscreen lightbox. Use Left/Right buttons or keyboard arrow keys to navigate, and Escape or `✕` to close.

6. **Mobile Responsiveness & Bottom Bar**:
   - Shrink browser viewport to mobile widths (375px or 430px) to test the fixed bottom action bar (Menu, Order, Book, WhatsApp) and the slide-out navigation drawer.

---

## 5. Image Assets & Owner Review Notice
The prototype features high-resolution food and venue imagery:
- `hero-kenyan-dining.jpg`: Lush garden dining atmosphere with lanterns.
- `nyama-choma.jpg`: Sizzling charcoal-grilled goat ribs with kachumbari and chips.
- `signature-chicken-mukimo.jpg`: Braised chicken kienyeji with traditional green mukimo.
- `fried-tilapia.jpg`: Crispy whole Lake Victoria tilapia with ugali and sukuma wiki.
- `traditional-ugali-managu.jpg`: Beef stew with indigenous managu and white ugali.
- `garden-dining.jpg`: Manicured green lawns with garden tables and umbrellas.
- `family-dining.jpg`: Kenyan family sharing communal feast in garden.
- `restaurant-interior.jpg`: Rustic indoor dining hall with timber beams and woven lamps.
- `charcoal-grill.jpg`: Chef roasting seasoned meats over acacia charcoal embers.

*Note for client launch*: In production, the owner may substitute or supplement these with photographs of the physical restaurant kitchen and staff.

---

## 6. Prototype Limitations & Future Production Requirements
As a front-end prototype designed for client demonstration without paid server overhead:
1. **Live Table Inventory**: Does not connect to live table management software (e.g. SevenRooms, OpenTable, or custom POS). Reservations are submitted as structured requests for restaurant staff confirmation.
2. **Payment Gateway**: Simulates front-end checkout without live M-Pesa Daraja STK Push or card processing. In production, an M-Pesa Express API can be integrated to collect deposits or takeaway prepayments.
3. **Google Business Profile API**: Reviews are currently rendered from curated demonstration cards. In production, this can hook directly into the Google Places API to stream live Google reviews and star ratings.
4. **Kitchen Printer / POS Dispatch**: Orders and reservation requests are stored in the client's LocalStorage session and prepared for WhatsApp transmission rather than automatically triggering kitchen thermal receipt printing.
