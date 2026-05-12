/**
 * ================================================
 * Smart Welcome Popup JavaScript
 * Modern, Premium, Dynamic Greeting System
 * ================================================
 */

// Greeting configuration and data
const SmartWelcomePopup = {
  // Configuration
  config: {
    enableSessionMemory: true,
    showOnPageLoad: true,
    allowManualTrigger: true,
    autoCloseDelay: null, // Set to milliseconds to auto-close, null to disable
  },

  // Motivational quotes pool
  quotes: [
    "Small progress every day leads to big success.",
    "Learn smart. Build faster. Grow stronger.",
    "Your future starts with what you learn today.",
    "One lecture closer to your dream career.",
    "Consistency is the key to mastery.",
    "Every minute of study is an investment in your future.",
    "Success is not a destination, it's a journey.",
    "Challenge yourself to be better every single day.",
    "Your education is your most valuable asset.",
    "Small steps today, giant leaps tomorrow.",
    "Excellence is not an act, but a habit.",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your potential is limitless. Start now.",
    "Every expert was once a beginner. Keep going.",
  ],

  // Greeting configurations by time
  greetings: {
    morning: {
      time: "5:00 AM - 11:59 AM",
      greeting: "Good Morning, Vishal!",
      subtext: "Ready to learn something amazing today?",
      emoji: "🌞",
      gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    },
    afternoon: {
      time: "12:00 PM - 4:59 PM",
      greeting: "Good Afternoon, Vishal!",
      subtext: "Keep your momentum strong and stay productive.",
      emoji: "☀️",
      gradient: "linear-gradient(135deg, #FF9500, #FF6B6B)",
    },
    evening: {
      time: "5:00 PM - 8:59 PM",
      greeting: "Good Evening, Vishal!",
      subtext: "Time for focused learning and smart progress.",
      emoji: "🌇",
      gradient: "linear-gradient(135deg, #FF6B9D, #C44569)",
    },
    night: {
      time: "9:00 PM - 4:59 AM",
      greeting: "Good Night, Vishal!",
      subtext: "Late-night learners build powerful futures.",
      emoji: "🌙",
      gradient: "linear-gradient(135deg, #2D3436, #636E72)",
    },
  },

  // Get current period based on hour
  getCurrentPeriod: function() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'morning';
    } else if (hour >= 12 && hour < 17) {
      return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'evening';
    } else {
      return 'night';
    }
  },

  // Initialize popup
  init: function() {
    if (this.config.showOnPageLoad) {
      this.attachEventListeners();
      this.checkAndShow();
      this.setupAutoClose();
    }
  },

  // Attach event listeners
  attachEventListeners: function() {
    const closeBtn = document.getElementById('closeWelcomePopup');
    const overlay = document.getElementById('smartWelcomeOverlay');
    const mainCTA = document.getElementById('startExploringBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    }

    if (mainCTA) {
      mainCTA.addEventListener('click', (e) => {
        // Propagation handled by onclick
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    // Allow manual trigger via keyboard shortcut (Ctrl+/)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (this.config.allowManualTrigger) {
          this.show();
        }
      }
    });
  },

  // Check if popup should be shown
  checkAndShow: function() {
    const isFirstVisit = !sessionStorage.getItem('welcomePopupClosed');
    const shouldShow = isFirstVisit || sessionStorage.getItem('showWelcomeAgain') === 'true';

    if (shouldShow) {
      this.updateDynamicContent();
      this.show();
      sessionStorage.removeItem('showWelcomeAgain');
    }
  },

  // Update dynamic content
  updateDynamicContent: function() {
    this.updateGreeting();
    this.updateQuote();
    this.updateDate();
    this.updateStreak();
  },

  // Update greeting based on time
  updateGreeting: function() {
    const period = this.getCurrentPeriod();
    const greetingData = this.greetings[period];

    const greetingEl = document.getElementById('timeBasedGreeting');
    const subtextEl = document.getElementById('greetingSubtext');
    const emojiEl = document.getElementById('greetingEmoji');

    if (greetingEl) greetingEl.textContent = greetingData.greeting;
    if (subtextEl) subtextEl.textContent = greetingData.subtext;
    if (emojiEl) emojiEl.textContent = greetingData.emoji;
  },

  // Update motivational quote
  updateQuote: function() {
    const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    const quoteEl = document.getElementById('motivationQuote');

    if (quoteEl) {
      quoteEl.style.transition = 'opacity 0.3s ease';
      quoteEl.style.opacity = '0';

      setTimeout(() => {
        quoteEl.textContent = randomQuote;
        quoteEl.style.opacity = '1';
      }, 150);
    }
  },

  // Update today's date
  updateDate: function() {
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);

    const dateEl = document.getElementById('todayDate');
    if (dateEl) dateEl.textContent = formattedDate;
  },

  // Update study streak
  updateStreak: function() {
    const streakData = localStorage.getItem('studyStreak') || '5';
    const streakEl = document.getElementById('studyStreak');

    if (streakEl) {
      streakEl.textContent = `${streakData} days 🔥`;
    }
  },

  // Show popup
  show: function() {
    const overlay = document.getElementById('smartWelcomeOverlay');
    const modal = document.getElementById('smartWelcomeModal');

    if (overlay && modal) {
      overlay.classList.add('show');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scroll
      this.setupAutoClose();
    }
  },

  // Close popup
  close: function() {
    const overlay = document.getElementById('smartWelcomeOverlay');
    const modal = document.getElementById('smartWelcomeModal');

    if (overlay && modal) {
      overlay.classList.remove('show');
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
      sessionStorage.setItem('welcomePopupClosed', 'true');
    }
  },

  // Toggle popup visibility
  toggle: function() {
    const overlay = document.getElementById('smartWelcomeOverlay');
    if (overlay && overlay.classList.contains('show')) {
      this.close();
    } else {
      this.show();
    }
  },

  // Setup auto-close timer
  setupAutoClose: function() {
    if (this.config.autoCloseDelay) {
      setTimeout(() => {
        this.close();
      }, this.config.autoCloseDelay);
    }
  },

  // Clear session memory (force show on next visit)
  forceShowNext: function() {
    sessionStorage.removeItem('welcomePopupClosed');
    sessionStorage.setItem('showWelcomeAgain', 'true');
  },

  // Set new configuration
  setConfig: function(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
    };
  },

  // Add custom quote
  addQuote: function(quote) {
    if (typeof quote === 'string' && quote.length > 0) {
      this.quotes.push(quote);
    }
  },

  // Add multiple quotes
  addQuotes: function(quotesArray) {
    if (Array.isArray(quotesArray)) {
      this.quotes.push(...quotesArray);
    }
  },

  // Get current greeting data
  getGreetingData: function() {
    const period = this.getCurrentPeriod();
    return this.greetings[period];
  },

  // Get random quote
  getRandomQuote: function() {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  },
};

// Navigation function (called from HTML)
window.navigateToPage = function(section) {
  SmartWelcomePopup.close();

  const navigationMap = {
    continue: '/semester.html?sem=1',
    attendance: '/attendance-admin.html',
    notes: '/semester.html?notes=true',
    lectures: '/semester.html?lectures=true',
  };

  const targetUrl = navigationMap[section];
  if (targetUrl) {
    window.location.href = targetUrl;
  }
};

// Close function (called from HTML)
window.closeWelcomePopup = function() {
  SmartWelcomePopup.close();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Ensure modal elements exist before initializing
  if (document.getElementById('smartWelcomeOverlay')) {
    SmartWelcomePopup.init();
  }
});

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartWelcomePopup;
}
