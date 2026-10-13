/**
 * Multi-Step Interactive Table Booking Wizard for Kerio Dreams
 */
const BookingWizard = {
  currentStep: 1,
  data: {
    date: "",
    time: "1:00 PM",
    guests: 2,
    occasion: "Casual Dining",
    experience: "Garden Dining",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
    acknowledged: false
  },

  timeSlots: [
    "8:00 AM", "9:00 AM", "10:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "3:30 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
  ],

  experiences: [
    {
      id: "Garden Dining",
      title: "Lush Garden Dining",
      desc: "Open-air seating surrounded by manicured lawns, tropical flora, and birdsong under shaded umbrellas.",
      image: "/assets/images/garden-dining.jpg",
      tag: "Most Popular"
    },
    {
      id: "Indoor Dining",
      title: "Rustic Indoor Hall",
      desc: "Comfortable high-timber dining hall with artisan lighting, natural breeze, and cozy wood tables.",
      image: "/assets/images/restaurant-interior.jpg",
      tag: "Cozy & Quiet"
    },
    {
      id: "Family Gathering",
      title: "Family Patio Setup",
      desc: "Spacious communal tables ideal for multi-generational dining with children and family feasts.",
      image: "/assets/images/family-dining.jpg",
      tag: "Family Friendly"
    },
    {
      id: "Jiko & Nyama Choma",
      title: "Charcoal Jiko Experience",
      desc: "Tables situated near our outdoor open charcoal barbecue station with fresh cuts hot off the grill.",
      image: "/assets/images/charcoal-grill.jpg",
      tag: "Meat Lovers"
    }
  ],

  init() {
    this.setupMinDate();
    this.renderTimeSlots();
    this.renderExperienceCards();
    this.bindEvents();
    this.updateStepView();
    this.updateSummaryCard();
  },

  setupMinDate() {
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      // Default to today
      if (!this.data.date) {
        this.data.date = today;
        dateInput.value = today;
      }
    }
  },

  renderTimeSlots() {
    const container = document.getElementById('bookingTimeSlots');
    if (!container) return;

    container.innerHTML = this.timeSlots.map(time => `
      <button type="button" class="time-slot-btn ${this.data.time === time ? 'active' : ''}" 
              onclick="BookingWizard.selectTime('${time}')">
        ${time}
      </button>
    `).join('');
  },

  selectTime(time) {
    this.data.time = time;
    this.renderTimeSlots();
    this.updateSummaryCard();
  },

  renderExperienceCards() {
    const container = document.getElementById('bookingExperienceCards');
    if (!container) return;

    container.innerHTML = this.experiences.map(exp => `
      <div class="experience-card-select ${this.data.experience === exp.id ? 'active' : ''}"
           onclick="BookingWizard.selectExperience('${exp.id}')">
        <div style="height: 120px; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 8px;">
          <img src="${exp.image}" alt="${exp.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/assets/images/garden-dining.jpg'">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="font-size: var(--text-base); font-family: var(--font-serif);">${exp.title}</h4>
          <span class="badge badge-sage" style="font-size: 0.65rem;">${exp.tag}</span>
        </div>
        <p style="font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.4;">${exp.desc}</p>
      </div>
    `).join('');
  },

  selectExperience(expId) {
    this.data.experience = expId;
    this.renderExperienceCards();
    this.updateSummaryCard();
  },

  bindEvents() {
    // Step navigation buttons
    const nextBtn = document.getElementById('wizardNextBtn');
    const prevBtn = document.getElementById('wizardPrevBtn');
    const submitBtn = document.getElementById('wizardSubmitBtn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextStep());
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevStep());
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitReservation());
    }

    // Input listeners
    const dateInput = document.getElementById('bookDate');
    const guestsInput = document.getElementById('bookGuests');
    const occasionSelect = document.getElementById('bookOccasion');
    const nameInput = document.getElementById('bookName');
    const phoneInput = document.getElementById('bookPhone');
    const emailInput = document.getElementById('bookEmail');
    const notesInput = document.getElementById('bookNotes');
    const ackCheck = document.getElementById('bookAcknowledge');

    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        this.data.date = e.target.value;
        this.updateSummaryCard();
      });
    }
    if (guestsInput) {
      guestsInput.addEventListener('input', (e) => {
        this.data.guests = Math.max(1, parseInt(e.target.value) || 1);
        this.updateSummaryCard();
      });
    }
    if (occasionSelect) {
      occasionSelect.addEventListener('change', (e) => {
        this.data.occasion = e.target.value;
        this.updateSummaryCard();
      });
    }
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.data.name = e.target.value;
        this.updateSummaryCard();
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        this.data.phone = e.target.value;
        this.updateSummaryCard();
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.data.email = e.target.value;
      });
    }
    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        this.data.specialRequests = e.target.value;
        this.updateSummaryCard();
      });
    }
    if (ackCheck) {
      ackCheck.addEventListener('change', (e) => {
        this.data.acknowledged = e.target.checked;
      });
    }
  },

  validateStep(step) {
    this.clearErrors();
    let isValid = true;

    if (step === 1) {
      const dateInput = document.getElementById('bookDate');
      if (!this.data.date || !window.ValidationUtils.isFutureDate(this.data.date)) {
        this.showError('bookDateGroup', 'Please select a valid upcoming reservation date');
        isValid = false;
      }
      if (!this.data.time) {
        this.showError('bookTimeGroup', 'Please select a preferred dining time');
        isValid = false;
      }
      if (!this.data.guests || this.data.guests < 1) {
        this.showError('bookGuestsGroup', 'Party size must be at least 1 guest');
        isValid = false;
      }
    } else if (step === 2) {
      if (!this.data.experience) {
        isValid = false;
      }
    } else if (step === 3) {
      if (!window.ValidationUtils.isNonEmpty(this.data.name)) {
        this.showError('bookNameGroup', 'Please enter your full name');
        isValid = false;
      }
      if (!window.ValidationUtils.isValidPhone(this.data.phone)) {
        this.showError('bookPhoneGroup', 'Please enter a valid telephone number (e.g., 0720 778 059 or +254 720...)');
        isValid = false;
      }
      if (this.data.email && !window.ValidationUtils.isValidEmail(this.data.email)) {
        this.showError('bookEmailGroup', 'Please enter a valid email address');
        isValid = false;
      }
    } else if (step === 4) {
      const ackCheck = document.getElementById('bookAcknowledge');
      if (!this.data.acknowledged) {
        this.showError('bookAckGroup', 'Please confirm you acknowledge reservations require restaurant confirmation');
        isValid = false;
      }
    }

    return isValid;
  },

  showError(groupId, msg) {
    const group = document.getElementById(groupId);
    if (group) {
      group.classList.add('has-error');
      const errorMsg = group.querySelector('.form-error-msg');
      if (errorMsg) errorMsg.textContent = msg;
    }
  },

  clearErrors() {
    document.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
  },

  goToStep(stepNumber) {
    this.currentStep = stepNumber;
    this.updateStepView();
    this.updateSummaryCard();
  },

  nextStep() {
    if (!this.validateStep(this.currentStep)) return;
    if (this.currentStep < 4) {
      this.currentStep++;
      this.updateStepView();
      this.updateSummaryCard();
      window.scrollTo({ top: document.querySelector('.booking-wizard').offsetTop - 100, behavior: 'smooth' });
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepView();
      this.updateSummaryCard();
    }
  },

  updateStepView() {
    // Hide/show step sections
    for (let i = 1; i <= 4; i++) {
      const stepElem = document.getElementById(`bookingStep${i}`);
      if (stepElem) {
        stepElem.classList.toggle('active', i === this.currentStep);
      }
      const indicator = document.getElementById(`stepIndicator${i}`);
      if (indicator) {
        indicator.classList.toggle('active', i === this.currentStep);
        indicator.classList.toggle('completed', i < this.currentStep);
      }
    }

    // Button states
    const prevBtn = document.getElementById('wizardPrevBtn');
    const nextBtn = document.getElementById('wizardNextBtn');
    const submitBtn = document.getElementById('wizardSubmitBtn');

    if (prevBtn) {
      prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
    }
    if (nextBtn) {
      nextBtn.style.display = this.currentStep < 4 ? 'inline-flex' : 'none';
    }
    if (submitBtn) {
      submitBtn.style.display = this.currentStep === 4 ? 'inline-flex' : 'none';
    }
  },

  updateSummaryCard() {
    // Update live summary box on step 4 review
    const sumDate = document.getElementById('reviewDate');
    const sumTime = document.getElementById('reviewTime');
    const sumGuests = document.getElementById('reviewGuests');
    const sumExperience = document.getElementById('reviewExperience');
    const sumName = document.getElementById('reviewName');
    const sumPhone = document.getElementById('reviewPhone');
    const sumNotes = document.getElementById('reviewNotes');

    if (sumDate) sumDate.textContent = this.data.date || 'Not selected';
    if (sumTime) sumTime.textContent = this.data.time || 'Not selected';
    if (sumGuests) sumGuests.textContent = `${this.data.guests} Guest${this.data.guests > 1 ? 's' : ''}`;
    if (sumExperience) sumExperience.textContent = this.data.experience;
    if (sumName) sumName.textContent = this.data.name || 'Not provided';
    if (sumPhone) sumPhone.textContent = this.data.phone || 'Not provided';
    if (sumNotes) sumNotes.textContent = this.data.specialRequests || 'None provided';
  },

  submitReservation() {
    if (!this.validateStep(4)) return;

    const refNumber = 'KD-RES-' + Math.floor(100000 + Math.random() * 900000);
    const reservationRecord = {
      refNumber: refNumber,
      date: this.data.date,
      time: this.data.time,
      guests: this.data.guests,
      occasion: this.data.occasion,
      experience: this.data.experience,
      name: this.data.name,
      phone: this.data.phone,
      email: this.data.email,
      specialRequests: this.data.specialRequests,
      createdAt: new Date().toISOString()
    };

    if (window.StorageService) {
      window.StorageService.saveReservation(reservationRecord);
    }

    // Save active reference for success page
    sessionStorage.setItem('latest_reservation', JSON.stringify(reservationRecord));

    // Redirect to booking-success.html
    window.location.href = 'booking-success.html';
  }
};

window.BookingWizard = BookingWizard;
