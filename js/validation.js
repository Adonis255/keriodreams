/**
 * Validation Helper Functions
 */
const ValidationUtils = {
  isValidPhone(phone) {
    if (!phone) return false;
    // Cleans phone of spaces and dashes
    const clean = phone.replace(/[\s\-()]/g, '');
    // Kenyan formats: +2547XXXXXXXX, +2541XXXXXXXX, 07XXXXXXXX, 01XXXXXXXX, or 2547XXXXXXXX
    const kenyaRegex = /^(?:\+?254|0)[17]\d{8}$/;
    return kenyaRegex.test(clean);
  },

  isValidEmail(email) {
    if (!email) return true; // optional unless required
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  isFutureDate(dateStr) {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  },

  isNonEmpty(str) {
    return typeof str === 'string' && str.trim().length > 0;
  }
};

window.ValidationUtils = ValidationUtils;
