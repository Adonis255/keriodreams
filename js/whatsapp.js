/**
 * WhatsApp Integration Utilities for Kerio Dreams
 * Generates verified wa.me links with URL-encoded prefilled messages.
 */
const WhatsAppService = {
  PHONE_NUMBER: "254720778059", // Published restaurant WhatsApp line

  buildLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${this.PHONE_NUMBER}?text=${encoded}`;
  },

  openGeneralInquiry() {
    const msg = "Hello Kerio Dreams, I would like to learn more about your restaurant, garden dining, and menu.";
    window.open(this.buildLink(msg), '_blank', 'noopener,noreferrer');
  },

  openBookingInquiry(details) {
    const { date, time, guests, experience, name, notes } = details;
    let msg = `Hello Kerio Dreams, I would like to request a table reservation:\n\n` +
              `• Date: ${date || 'To be confirmed'}\n` +
              `• Time: ${time || 'To be confirmed'}\n` +
              `• Guests: ${guests || 1} people\n` +
              `• Seating Preference: ${experience || 'Garden Dining'}\n` +
              `• Name: ${name || 'Valued Guest'}\n`;
    if (notes) {
      msg += `• Special Requests: ${notes}\n`;
    }
    msg += `\nPlease confirm table availability and arrangements. Thank you!`;
    window.open(this.buildLink(msg), '_blank', 'noopener,noreferrer');
  },

  openOrderInquiry(order) {
    const { refNumber, customerName, phone, type, items, total, address, collectionTime, notes } = order;
    let itemsText = items.map(i => `  - ${i.quantity}x ${i.name} (KSh ${(i.price * i.quantity).toLocaleString()})`).join('\n');

    let msg = `Hello Kerio Dreams, I would like to inquire about placing this order (Demo Ref: #${refNumber}):\n\n` +
              `• Customer: ${customerName} (${phone})\n` +
              `• Order Type: ${type === 'delivery' ? 'Delivery' : 'Takeaway / Collection'}\n`;
    
    if (type === 'delivery' && address) {
      msg += `• Delivery Address: ${address}\n`;
    }
    if (type === 'takeaway' && collectionTime) {
      msg += `• Preferred Pickup Time: ${collectionTime}\n`;
    }
    if (notes) {
      msg += `• Instructions: ${notes}\n`;
    }

    msg += `\nItems:\n${itemsText}\n\n` +
           `• Total: KSh ${total.toLocaleString()}\n\n` +
           `Please confirm menu pricing, availability, and preparation arrangements.`;

    window.open(this.buildLink(msg), '_blank', 'noopener,noreferrer');
  }
};

window.WhatsAppService = WhatsAppService;
