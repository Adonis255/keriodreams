/**
 * Central Configuration for Kerio Dreams Restaurant
 * Source of truth for business contact details, hours, and prototype settings.
 */
const RESTAURANT_CONFIG = {
  name: "Kerio Dreams Restaurant",
  tagline: "Authentic Kenyan Flavours, Beautiful Moments",
  location: "Eldoret, Kenya",
  address: "Along Kisumu Road, opposite Soin Hotel, Eldoret, Kenya",
  postalAddress: "P.O. Box 4660-30100, Eldoret",
  phones: {
    primary: "+254 720 778 059",
    secondary: "+254 721 223 661",
    whatsapp: "254720778059",
    whatsappDisplay: "+254 720 778 059"
  },
  hours: {
    display: "Monday – Sunday: 7:00 AM – 10:00 PM",
    openHour: 7,
    closeHour: 22,
    kitchenCloses: "9:30 PM"
  },
  currency: {
    symbol: "KSh",
    code: "KES"
  },
  googleMaps: {
    searchQuery: "Kerio+Dreams+Restaurant+Kisumu+Road+Eldoret",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kerio+Dreams+Restaurant+Eldoret+Kisumu+Road"
  },
  announcement: {
    enabled: true,
    text: "Karibu Kerio Dreams — Enjoy charcoal-grilled Nyama Choma & lush garden dining in Eldoret.",
    linkText: "Reserve Table",
    linkUrl: "booking.html"
  },
  prototypeNotice: "Client Presentation Prototype — Prices & availability are sample data subject to owner confirmation."
};

// Export to window for vanilla browser script usage
window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
