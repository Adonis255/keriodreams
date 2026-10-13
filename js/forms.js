/**
 * Form handlers for Group Inquiries and General Feedback
 */
const FormsHandler = {
  initGroupInquiry() {
    const form = document.getElementById('groupInquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('groupName') || {}).value || "";
      const phone = (document.getElementById('groupPhone') || {}).value || "";
      const date = (document.getElementById('groupDate') || {}).value || "";
      const guests = (document.getElementById('groupGuests') || {}).value || "";
      const occasion = (document.getElementById('groupOccasion') || {}).value || "";
      const notes = (document.getElementById('groupNotes') || {}).value || "";

      if (!window.ValidationUtils.isNonEmpty(name) || !window.ValidationUtils.isValidPhone(phone)) {
        if (window.Utils) window.Utils.showToast('Please provide your name and a valid phone number.', 'error');
        return;
      }

      // Pre-filled WhatsApp inquiry
      let msg = `Hello Kerio Dreams, I would like to inquire about a Group Dining / Event Reservation:\n\n` +
                `• Name: ${name}\n` +
                `• Phone: ${phone}\n` +
                `• Preferred Date: ${date || 'Flexible'}\n` +
                `• Estimated Guests: ${guests || '10+'}\n` +
                `• Occasion: ${occasion || 'Group Meal'}\n`;
      if (notes) {
        msg += `• Details: ${notes}\n`;
      }
      msg += `\nPlease advise on package options, seating, and confirmation.`;

      window.open(window.WhatsAppService.buildLink(msg), '_blank', 'noopener,noreferrer');
      if (window.Utils) window.Utils.showToast('Group inquiry prepared for WhatsApp!', 'success');
      form.reset();
    });
  },

  initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('contactName') || {}).value || "";
      const phone = (document.getElementById('contactPhone') || {}).value || "";
      const message = (document.getElementById('contactMessage') || {}).value || "";

      if (!window.ValidationUtils.isNonEmpty(name) || !window.ValidationUtils.isValidPhone(phone)) {
        if (window.Utils) window.Utils.showToast('Please provide your name and a valid phone number.', 'error');
        return;
      }

      let msg = `Hello Kerio Dreams, my name is ${name} (${phone}).\n\n${message}`;
      window.open(window.WhatsAppService.buildLink(msg), '_blank', 'noopener,noreferrer');
      if (window.Utils) window.Utils.showToast('Message prepared for WhatsApp!', 'success');
      form.reset();
    });
  }
};

window.FormsHandler = FormsHandler;
