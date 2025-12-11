// The Smoothie Machine - Part 1
// -----------------------------
// In this step we:
// - Define a Smoothie class
// - Grab form + output elements
// - Wire up basic event listeners (no full logic yet)

/**
 * Smoothie class to represent a customer's smoothie order.
 * Follows basic OOP best practices.
 */
class Smoothie {
  /**
   * @param {Object} options - smoothie configuration
   * @param {string} options.size
   * @param {string} options.base
   * @param {string[]} options.fruits
   * @param {string[]} options.extras
   * @param {string} options.sweetener
   * @param {string} options.customerName
   * @param {string} options.notes
   */
  constructor(options) {
    this.size = options.size;
    this.base = options.base;
    this.fruits = options.fruits;
    this.extras = options.extras;
    this.sweetener = options.sweetener;
    this.customerName = options.customerName;
    this.notes = options.notes;
  }

  /**
   * Placeholder price method for now.
   * We'll implement the real pricing logic in Part 2.
   */
  calculatePrice() {
    return 0;
  }

  /**
   * Build a human-readable description of the smoothie.
   * Will be expanded in Part 2.
   */
  getDescription() {
    return "Custom smoothie";
  }
}

// DOM wiring and basic listeners
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("smoothieForm");
  const summaryText = document.getElementById("summaryText");
  const cupLiquid = document.getElementById("cupLiquid");
  const resetBtn = document.getElementById("resetBtn");

  // For now, just log when the form is submitted
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Smoothie form submitted (Part 1).");
    summaryText.textContent =
      "Your smoothie order will appear here once the logic is implemented.";
  });

  // Reset button: simple placeholder behaviour
  resetBtn.addEventListener("click", function () {
    summaryText.textContent =
      "Fill in the form and click \"Order smoothie\" to see your custom blend and price.";
    // Cup visual will be updated properly in Part 2
    cupLiquid.style.height = "0%";
  });

  console.log("Smoothie Machine JS Part 1 loaded.");
});
